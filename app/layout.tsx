/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { ColorModeScript } from "@chakra-ui/react";
import { Providers } from "./providers";
import { mainTheme } from "./lib/themes/mainTheme";
import { useEffect } from "react";
import { useAuthState } from "./state/auth";
import { usePathname, useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authState = useAuthState();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    authState.verify().then((isLoggedIn) => {
      if (!isLoggedIn) {
        router.push("/login");
      } else {
        if (pathname === "/login") {
          router.push("/");
        }
      }
    });
  }, []);

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
