"use client";
import { ColorModeScript } from "@chakra-ui/react";
import { Providers } from "./providers";
import { mainTheme } from "./lib/themes/mainTheme";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ColorModeScript
            initialColorMode={mainTheme.config?.initialColorMode}
          />
          {children}
        </Providers>
      </body>
    </html>
  );
}
