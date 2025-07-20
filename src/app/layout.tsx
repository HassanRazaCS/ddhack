import "~/styles/globals.css";

import { type Metadata } from "next";
import { Newsreader } from "next/font/google";
import { TRPCReactProvider } from "~/trpc/react";
import { Navbar } from "~/components/navbar";
import { Footer } from "~/components/footer";
import { Providers } from "~/components/providers";

export const metadata: Metadata = {
  title: "Advocado - Connecting Legal Needs with Pro Bono Professionals",
  description: "Advocado bridges the justice gap by connecting individuals who need legal assistance with lawyers willing to provide pro bono services.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${newsreader.variable}`}>
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
