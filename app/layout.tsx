import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "TruthCheck - AI Fake News Detector",
  description: "Analyze article credibility with AI-powered detection",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <div className="min-h-screen bg-background">
          <header className="border-b">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">
                  TruthCheck
                </h1>
                <p className="text-sm text-muted-foreground hidden sm:block">
                  Détecteur de Fake News par IA
                </p>
              </div>
            </div>
          </header>
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
          <footer className="border-t mt-auto">
            <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
              <p>
                Challenge DevChallenges #2026-WEEK-05 | Powered by OpenAI GPT-4
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
