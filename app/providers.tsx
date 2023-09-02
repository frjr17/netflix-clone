"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import mainTheme from "./styles/mainTheme";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={mainTheme}>{children}</ChakraProvider>
    </CacheProvider>
  );
}
