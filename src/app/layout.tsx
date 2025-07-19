import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { TRPCReactProvider } from "~/trpc/react";
import { Navbar } from "~/components/navbar";
import { Footer } from "~/components/footer";
import { Providers } from "~/components/providers";

export const metadata: Metadata = {
  title: "Legal Aid Connect - Connecting Legal Needs with Pro Bono Professionals",
  description: "Bridging the justice gap by connecting individuals who need legal assistance with lawyers willing to provide pro bono services.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
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
      <body className="min-h-screen bg-gray-50">
        <TRPCReactProvider>
          <Providers>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
          </Providers>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
