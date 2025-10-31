import { useEffect, useMemo, useState } from 'react';
import { Contract } from 'ethers';
import { useAccount, useReadContract } from 'wagmi';
import { useEthersSigner } from '../hooks/useEthersSigner';
import { useZamaInstance } from '../hooks/useZamaInstance';
import { ADVENTURE_CONTRACT_ABI, ADVENTURE_CONTRACT_ADDRESS, SEPOLIA_CHAIN_ID } from '../config/contract';
import { Header } from './Header';
import '../styles/AdventureApp.css';

type PendingAction = 'join' | 'attack' | null;

export function AdventureApp() {
  const { address, chainId, isConnected } = useAccount();
  const signerPromise = useEthersSigner({ chainId: SEPOLIA_CHAIN_ID });
  const { instance, isLoading: zamaLoading, error: zamaError } = useZamaInstance();

  const [isDecrypting, setIsDecrypting] = useState(false);
  const [decryptedWeapon, setDecryptedWeapon] = useState<bigint | null>(null);
  const [decryptedCoins, setDecryptedCoins] = useState<bigint | null>(null);
  const [lastLoot, setLastLoot] = useState<bigint | null>(null);
  const [pendingAction, setPendingAction] = useState<PendingAction>(null);
  const [coinsBeforeAction, setCoinsBeforeAction] = useState<bigint | null>(null);
  const [transactionMessage, setTransactionMessage] = useState<string | null>(null);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);

  const hasJoinedQuery = useReadContract({
    address: ADVENTURE_CONTRACT_ADDRESS,
    abi: ADVENTURE_CONTRACT_ABI,
    functionName: 'hasJoined',
    args: address ? [address] : undefined,
    query: {
      enabled: Boolean(address),
    },
  });

  const hasJoined = useMemo(() => Boolean(hasJoinedQuery.data), [hasJoinedQuery.data]);

  const weaponQuery = useReadContract({
    address: ADVENTURE_CONTRACT_ADDRESS,
    abi: ADVENTURE_CONTRACT_ABI,
    functionName: 'getWeaponPower',
    args: address ? [address] : undefined,
    query: {
      enabled: Boolean(address) && hasJoined,
    },
  });

  const coinsQuery = useReadContract({
    address: ADVENTURE_CONTRACT_ADDRESS,
    abi: ADVENTURE_CONTRACT_ABI,
    functionName: 'getCoinBalance',
    args: address ? [address] : undefined,
    query: {
      enabled: Boolean(address) && hasJoined,
    },
  });

  useEffect(() => {
    if (!instance || !signerPromise || !address || !hasJoined) {
      return;
    }

    const weaponHandle = weaponQuery.data as string | undefined;
    const coinHandle = coinsQuery.data as string | undefined;
    if (!weaponHandle || !coinHandle) {
      return;
    }

    let cancelled = false;

    const decryptStats = async () => {
      try {
        setIsDecrypting(true);

        const signer = await signerPromise;
        if (!signer) {
          return;
        }

        const keypair = instance.generateKeypair();
        const handleContractPairs = [
          { handle: weaponHandle, contractAddress: ADVENTURE_CONTRACT_ADDRESS },
          { handle: coinHandle, contractAddress: ADVENTURE_CONTRACT_ADDRESS },
        ];

        const startTimestamp = Math.floor(Date.now() / 1000).toString();
        const durationDays = '7';
        const contractAddresses = [ADVENTURE_CONTRACT_ADDRESS];

        const eip712 = instance.createEIP712(keypair.publicKey, contractAddresses, startTimestamp, durationDays);

        const signature = await signer.signTypedData(
          eip712.domain,
          {
            UserDecryptRequestVerification: eip712.types.UserDecryptRequestVerification,
          },
          eip712.message
        );

        const normalizedSignature = signature.startsWith('0x') ? signature.slice(2) : signature;

        const decryptedResult = await instance.userDecrypt(
          handleContractPairs,
          keypair.privateKey,
          keypair.publicKey,
          normalizedSignature,
          contractAddresses,
          address,
          startTimestamp,
          durationDays
        );

        if (cancelled) {
          return;
        }

        const weaponValue = decryptedResult[weaponHandle as string];
        const coinValue = decryptedResult[coinHandle as string];

        setDecryptedWeapon(weaponValue ? BigInt(weaponValue) : null);
        setDecryptedCoins(coinValue ? BigInt(coinValue) : null);
      } catch (error) {
        if (!cancelled) {
          console.error('Failed to decrypt player stats', error);
        }
      } finally {
        if (!cancelled) {
          setIsDecrypting(false);
        }
      }
    };

    decryptStats();

    return () => {
      cancelled = true;
    };
  }, [instance, signerPromise, address, hasJoined, weaponQuery.data, coinsQuery.data]);

  useEffect(() => {
    if (pendingAction === 'attack' && coinsBeforeAction !== null && decryptedCoins !== null) {
      if (decryptedCoins !== coinsBeforeAction) {
        const loot = decryptedCoins - coinsBeforeAction;
        if (loot >= 0n) {
          setLastLoot(loot);
        }
        setPendingAction(null);
        setCoinsBeforeAction(null);
      }
    }
  }, [pendingAction, coinsBeforeAction, decryptedCoins]);

  const handleJoinGame = async () => {
    if (!signerPromise) {
      setTransactionMessage('Wallet signer is not available.');
      return;
    }

    try {
      setTransactionMessage('Joining the adventure...');
      setTransactionHash(null);

      const signer = await signerPromise;
      if (!signer) {
        throw new Error('Signer unavailable');
      }

      const contract = new Contract(ADVENTURE_CONTRACT_ADDRESS, ADVENTURE_CONTRACT_ABI, signer);
      const tx = await contract.joinGame();
      setTransactionHash(tx.hash);
      await tx.wait();

      setPendingAction('join');
      setLastLoot(null);
      setTransactionMessage('Joined successfully. Refreshing stats...');
      await hasJoinedQuery.refetch();
      await Promise.all([weaponQuery.refetch(), coinsQuery.refetch()]);
      setTransactionMessage('Ready to explore!');
      setPendingAction(null);
    } catch (error) {
      console.error('Failed to join game', error);
      const message = error instanceof Error ? error.message : 'Unknown error';
      setTransactionMessage(`Join failed: ${message}`);
    }
  };

  const handleAttackMonster = async () => {
    if (!signerPromise) {
      setTransactionMessage('Wallet signer is not available.');
      return;
    }
    if (!hasJoined) {
      setTransactionMessage('Join the adventure before attacking monsters.');
      return;
    }

    try {
      setTransactionMessage('Engaging the monster...');
      setTransactionHash(null);

      const signer = await signerPromise;
      if (!signer) {
        throw new Error('Signer unavailable');
      }

      if (decryptedCoins !== null) {
        setCoinsBeforeAction(decryptedCoins);
      }
      setPendingAction('attack');

      const contract = new Contract(ADVENTURE_CONTRACT_ADDRESS, ADVENTURE_CONTRACT_ABI, signer);
      const tx = await contract.attackMonster();
      setTransactionHash(tx.hash);
      await tx.wait();

      setTransactionMessage('Monster defeated! Updating treasure...');
      await Promise.all([weaponQuery.refetch(), coinsQuery.refetch()]);
    } catch (error) {
      console.error('Failed to attack monster', error);
      const message = error instanceof Error ? error.message : 'Unknown error';
      setTransactionMessage(`Attack failed: ${message}`);
      setPendingAction(null);
      setCoinsBeforeAction(null);
    }
  };

  if (!isConnected) {
    return (
      <>
        <Header />
        <div className="adventure-layout">
          <div className="adventure-card">
            <h2>Connect your wallet</h2>
            <p>Link your Sepolia wallet to begin the encrypted adventure.</p>
          </div>
        </div>
      </>
    );
  }

  if (chainId !== SEPOLIA_CHAIN_ID) {
    return (
      <>
        <Header />
        <div className="adventure-layout">
          <div className="adventure-card warning">
            <h2>Switch to Sepolia</h2>
            <p>This adventure runs on the Sepolia FHEVM network. Please switch networks and try again.</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="adventure-layout">
      {zamaError && (
        <div className="adventure-card error">
          <h2>Zama Relayer error</h2>
          <p>{zamaError}</p>
        </div>
      )}

      <section className="adventure-card">
        <h2>Player Status</h2>
        <div className="status-grid">
          <div className="status-item">
            <span className="status-label">Progress</span>
            <span className="status-value">{hasJoined ? 'Explorer' : 'Newcomer'}</span>
          </div>
          <div className="status-item">
            <span className="status-label">Weapon Power</span>
            <span className="status-value">
              {isDecrypting || zamaLoading
                ? 'Decrypting...'
                : decryptedWeapon !== null
                ? `${decryptedWeapon.toString()}`
                : hasJoined
                ? 'Awaiting access'
                : 'Unknown'}
            </span>
          </div>
          <div className="status-item">
            <span className="status-label">Coin Pouch</span>
            <span className="status-value">
              {isDecrypting || zamaLoading
                ? 'Decrypting...'
                : decryptedCoins !== null
                ? `${decryptedCoins.toString()}`
                : hasJoined
                ? 'Awaiting access'
                : 'Unknown'}
            </span>
          </div>
        </div>
      </section>

      <section className="adventure-card actions">
        <h2>Adventure Actions</h2>
        <p className="action-description">
          All stats are encrypted end-to-end. Join the game to mint a private weapon and secure coin stash,
          then battle monsters to grow your encrypted fortune.
        </p>
        <div className="action-buttons">
          <button
            className="primary"
            onClick={handleJoinGame}
            disabled={hasJoined || zamaLoading}
          >
            {hasJoined ? 'Already Joined' : 'Join Adventure'}
          </button>
          <button
            className="secondary"
            onClick={handleAttackMonster}
            disabled={!hasJoined || zamaLoading}
          >
            Attack Monster
          </button>
        </div>
        {transactionMessage && (
          <p className="action-status">{transactionMessage}</p>
        )}
        {transactionHash && (
          <p className="action-status hash">Tx: {transactionHash}</p>
        )}
        {lastLoot !== null && pendingAction === null && (
          <p className="loot-message">Latest loot: {lastLoot.toString()} coins</p>
        )}
      </section>
    </div>
    </>
  );
}
