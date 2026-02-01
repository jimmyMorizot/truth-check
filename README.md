# TruthCheck - AI Fake News Detector

> Détecteur de Fake News basé sur l'IA (Challenge DevChallenges #2026-WEEK-05)

Application web moderne permettant d'analyser la crédibilité d'articles de presse ou de contenus textuels grâce à l'intelligence artificielle (OpenAI GPT-4).

## Stack Technique

- **Next.js** 16.1.6 (App Router)
- **React** 19.2.3
- **TypeScript** 5
- **shadcn/ui** (thème Caffeine)
- **Tailwind CSS** v4
- **OpenAI API** (GPT-4)
- **Zod** - Validation des données
- **React Hook Form** - Gestion des formulaires

## Installation

### Prérequis

- Node.js 18+
- pnpm (recommandé) ou npm
- Une clé API OpenAI

### Étapes

1. Cloner le projet:

```bash
git clone <repository-url>
cd truth-check
```

2. Installer les dépendances:

```bash
pnpm install
```

3. Configurer les variables d'environnement:

```bash
cp .env.example .env.local
```

4. Ajouter votre clé API OpenAI dans `.env.local`:

```env
OPENAI_API_KEY=sk-votre-clé-api-ici
```

5. Lancer le serveur de développement:

```bash
pnpm dev
```

6. Ouvrir [http://localhost:3000](http://localhost:3000)

## Utilisation

1. Collez le texte d'un article (50-5000 caractères)
2. Cliquez sur "Analyser"
3. Consultez le score de crédibilité et les explications détaillées

## Critères d'analyse

L'IA évalue la crédibilité selon 5 critères:

- **Langage et ton**: Détection de langage émotionnel, clickbait, sensationnalisme
- **Sources**: Présence de sources vérifiables, citations, références
- **Cohérence**: Logique interne, contradictions, incohérences factuelles
- **Biais**: Partialité évidente, manipulation, propagande
- **Structure**: Qualité de l'écriture, professionnalisme

## Score de crédibilité

- **0-39%**: Peu crédible (rouge)
- **40-69%**: Moyennement crédible (orange)
- **70-100%**: Crédible (vert)

## Build de production

```bash
pnpm build
pnpm start
```

## Scripts disponibles

- `pnpm dev` - Serveur de développement
- `pnpm build` - Build de production
- `pnpm start` - Serveur de production
- `pnpm lint` - Linter ESLint

## Structure du projet

```
truth-check/
├── app/
│   ├── api/analyze/route.ts    # API route pour l'analyse
│   ├── layout.tsx              # Layout global
│   ├── page.tsx                # Page d'accueil
│   └── globals.css             # Styles globaux + thème Caffeine
├── components/
│   ├── ui/                     # Composants shadcn/ui
│   ├── analyzer-form.tsx       # Formulaire d'analyse
│   ├── credibility-gauge.tsx   # Jauge de crédibilité
│   └── result-display.tsx      # Affichage des résultats
├── lib/
│   ├── analyzer.ts             # Logique d'analyse IA
│   ├── openai-client.ts        # Client OpenAI
│   ├── prompts.ts              # Prompts GPT
│   └── utils.ts                # Utilitaires
└── types/
    └── index.ts                # Types TypeScript
```

## Documentation

- **Spécifications complètes**: [SPECS.md](./SPECS.md)
- **Guide de développement**: [CLAUDE.md](./CLAUDE.md)
- **Quick Start**: [QUICKSTART.md](./QUICKSTART.md)

## Disclaimer

Cet outil est destiné à fournir une première analyse automatique. Il ne remplace pas une vérification factuelle approfondie par des experts. Les résultats doivent être considérés comme indicatifs.

## Licence

MIT

---

Challenge DevChallenges #2026-WEEK-05 | Powered by OpenAI GPT-4
# truth-check
