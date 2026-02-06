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
    <html lang="fr" className="dark" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <div className="min-h-screen bg-gradient-to-b from-background via-[hsl(var(--cream))]/20 to-background dark:from-[hsl(var(--espresso))] dark:via-[hsl(var(--coffee-dark))]/50 dark:to-[hsl(var(--espresso))]">
          <header className="border-b border-[hsl(var(--latte))]/20 dark:border-[hsl(var(--coffee-light))]/30 bg-white/80 dark:bg-[hsl(var(--coffee-dark))]/90 backdrop-blur-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[hsl(var(--amber))] to-[hsl(var(--caramel))] flex items-center justify-center shadow-lg shadow-[hsl(var(--amber))]/20">
                    <ShieldCheck className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-[hsl(var(--cream))] via-[hsl(var(--amber-light))] to-[hsl(var(--latte))] bg-clip-text text-transparent">
                      TruthCheck
                    </h1>
                    <p className="text-xs text-muted-foreground dark:text-[hsl(var(--latte))]/70">
                      Détecteur de Fake News par IA
                    </p>
                  </div>
                </div>
                <a
                  href="https://github.com/jimmyMorizot/truth-check"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl border border-[hsl(var(--amber))]/30 dark:border-[hsl(var(--amber))]/40 hover:bg-[hsl(var(--amber))]/10 dark:hover:bg-[hsl(var(--amber))]/15 hover:border-[hsl(var(--amber))]/50 transition-all dark:text-[hsl(var(--latte))]"
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
          <footer className="border-t border-[hsl(var(--amber))]/15 dark:border-[hsl(var(--amber))]/20 mt-auto bg-gradient-to-br from-[hsl(var(--cream))]/30 to-[hsl(var(--latte))]/20 dark:from-[hsl(var(--coffee-dark))]/50 dark:to-[hsl(var(--coffee))]/30">
            <div className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-4xl mx-auto">
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2 justify-center">
                    <ShieldCheck className="w-5 h-5 text-[hsl(var(--amber))] dark:text-[hsl(var(--amber-light))]" />
                    TruthCheck
                  </h3>
                  <p className="text-sm text-muted-foreground dark:text-[hsl(var(--latte))]/80">
                    Analysez la crédibilité de vos articles avec l'intelligence artificielle GPT-4.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Disclaimer</h3>
                  <p className="text-xs text-muted-foreground dark:text-[hsl(var(--latte))]/80">
                    Cet outil fournit une analyse automatique indicative. Il ne remplace pas une vérification factuelle approfondie par des experts.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Challenge</h3>
                  <p className="text-sm text-muted-foreground dark:text-[hsl(var(--latte))]/80">
                    DevChallenges #2026-WEEK-05
                  </p>
                  <p className="text-xs text-muted-foreground dark:text-[hsl(var(--latte))]/70 mt-2">
                    Powered by OpenAI GPT-4
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[hsl(var(--latte))]/20 dark:border-[hsl(var(--coffee-light))]/30 text-center">
                <p className="text-sm text-muted-foreground dark:text-[hsl(var(--latte))]/80 flex items-center justify-center gap-1">
                  Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by{" "}
                  <a
                    href="https://github.com/jimmyMorizot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[hsl(var(--amber))] dark:text-[hsl(var(--amber-light))] hover:text-[hsl(var(--amber-glow))] dark:hover:text-[hsl(var(--amber))] transition-colors"
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
