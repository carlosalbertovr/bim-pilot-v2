"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";

interface IProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: IProps) {
  return (
    <NextThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </NextThemeProvider>
  );
}
