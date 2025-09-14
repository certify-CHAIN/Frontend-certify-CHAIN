import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultConfig,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  mainnet,
  sepolia,
  polygon,
  optimism,
  arbitrum,
  base,
} from "wagmi/chains";

import App from "./App.tsx";
import CertificatePage from "./CertificatePage";
import "./index.css";
import { somniaTestnet } from "./chains/chains";

// 🚀 Configuración de wagmi + rainbowkit
const config = getDefaultConfig({
  appName: "Mi App RainbowKit",
  projectId: "4764cb0b8852760547f5a36b9d826354",
  chains: [mainnet, sepolia, polygon, optimism, arbitrum, base, somniaTestnet],
  ssr: true,
});

const queryClient = new QueryClient();

// 🚀 Render con Router y Providers
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/:id" element={<CertificatePage />} />
            </Routes>
          </BrowserRouter>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>
);