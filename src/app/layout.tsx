import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "Advocado",
  description: "Your trusted legal aid platform - connecting you with qualified lawyers and legal resources",
  icons: [{ rel: "icon", url: "https://8f3riwpkblxtrplf.public.blob.vercel-storage.com/ChatGPT%20Image%20Jul%2019%2C%202025%2C%2003_03_47%20PM.png" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
        <TRPCReactProvider>
          {children}
        </TRPCReactProvider>
      </body>
    </html>
  );
}
