"use client";

import { RainbowKitProvider, midnightTheme } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { WagmiProvider } from "wagmi";
import { config } from "./config";

const queryClient = new QueryClient();
//@ts-ignore
export function Providers({ children }) {
  return (
    <ThemeProvider enableSystem defaultTheme="system" attribute="class">
      
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider theme={midnightTheme()}>
            {children}
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>

      {/* </PuzzleWalletProvider> */}
    </ThemeProvider>
  );
}
