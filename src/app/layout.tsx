import type { Metadata } from "next";
import { Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";
import { Topbar } from "../components/layout/Topbar";
import { Footer } from "../components/layout/Footer";
import { ThemeProvider } from "../components/providers/ThemeProvider";
import { Toaster } from "sonner";
import { PhosphorIcon } from "../components/common/PhosphorIcon";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BIM Pilot",
  description: "A BIM viewer and collaboration tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistMono.variable} ${roboto.variable} antialiased`}>
        <ThemeProvider>
          <Toaster
            icons={{
              success: <PhosphorIcon icon="CheckCircle" />,
            }}
            position="top-center"
          />
          <main className="font-sans grid grid-rows-[auto_1fr_auto] min-h-screen">
            <Topbar />
            <div>{children}</div>
            <Footer />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
