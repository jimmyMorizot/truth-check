import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ShieldCheck, Github, Heart } from "lucide-react";
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
        <div className="min-h-screen bg-gradient-to-b from-background via-orange-50/30 to-background dark:from-background dark:via-orange-950/10 dark:to-background">
          <header className="border-b border-orange-100 dark:border-orange-900/30 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg">
                    <ShieldCheck className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent">
                      TruthCheck
                    </h1>
                    <p className="text-xs text-muted-foreground">
                      Détecteur de Fake News par IA
                    </p>
                  </div>
                </div>
                <a
                  href="https://github.com/jimmyMorizot/truth-check"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl border border-orange-200 dark:border-orange-900/30 hover:bg-orange-50 dark:hover:bg-orange-950/20 transition-all"
                >
                  <Github className="w-4 h-4" />
                  <span className="text-sm font-medium">GitHub</span>
                </a>
              </div>
            </div>
          </header>
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
          <footer className="border-t border-orange-100 dark:border-orange-900/30 mt-auto bg-gradient-to-br from-orange-50/50 to-amber-50/50 dark:from-orange-950/10 dark:to-amber-950/10">
            <div className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2 justify-center md:justify-start">
                    <ShieldCheck className="w-5 h-5 text-orange-600" />
                    TruthCheck
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Analysez la crédibilité de vos articles avec l'intelligence artificielle GPT-4.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Disclaimer</h3>
                  <p className="text-xs text-muted-foreground">
                    Cet outil fournit une analyse automatique indicative. Il ne remplace pas une vérification factuelle approfondie par des experts.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Challenge</h3>
                  <p className="text-sm text-muted-foreground">
                    DevChallenges #2026-WEEK-05
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Powered by OpenAI GPT-4
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-orange-100 dark:border-orange-900/30 text-center">
                <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                  Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by{" "}
                  <a
                    href="https://github.com/jimmyMorizot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                  >
                    Jimmy Morizot
                  </a>
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
