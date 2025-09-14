// src/chains/chains.ts
import type { Chain } from "wagmi/chains";

export const somniaTestnet: Chain = {
  id: 50312,
  name: "Somnia Shannon Testnet",
  network: "somnia-shannon-testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Somnia Token",
    symbol: "STT",
  },
  rpcUrls: {
    default: { http: ["https://dream-rpc.somnia.network"] }, // ✅ RPC correcto
    public: { http: ["https://dream-rpc.somnia.network"] },
  },
  blockExplorers: {
    default: {
      name: "Somnia Shannon Explorer",
      url: "https://shannon-explorer.somnia.network",
    },
  },
  testnet: true,
};
