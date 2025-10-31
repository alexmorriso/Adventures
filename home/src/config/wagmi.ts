import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Encrypted Adventure',
  projectId: '27e484dcd9e3efcfeac35fcf1ea8bcaa',
  chains: [sepolia],
  ssr: false,
});
