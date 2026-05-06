# Portfolio — Théo ALASSEUR-DEJOIE

Site statique Next.js (export) pour GitHub Pages : contenu bilingue FR/EN, orienté Management des risques et compétences data/IA.

## Prérequis

- Node.js 20+
- npm

## Développement local

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) : redirection vers `/fr` (ou `/en` selon la préférence enregistrée dans `localStorage`).

## Build statique

```bash
npm run build
```

Le dossier de sortie est `out/`.

## Déploiement sur GitHub Pages

### Site utilisateur ou organisation (`username.github.io`)

1. Créez un dépôt nommé **`username.github.io`** (nom exact).
2. Dans **Settings → Pages**, source : **GitHub Actions**.
3. Dans les **variables** du dépôt (Settings → Secrets and variables → Actions → Variables), ne définissez **pas** `NEXT_PUBLIC_BASE_PATH` (laisser vide ou ne pas créer la variable).
4. Poussez sur la branche **`main`** : le workflow `.github/workflows/deploy.yml` build et publie le contenu de `out/`.

### Site « projet » (`username.github.io/nom-du-repo`)

1. Le site est servi sous un sous-chemin : `/nom-du-repo`.
2. Créez une variable de dépôt **`NEXT_PUBLIC_BASE_PATH`** avec la valeur **`/nom-du-repo`** (slash initial, sans slash final).
3. Relancez le workflow ou refaites un push sur `main`.

En local, pour tester avec un `basePath` :

```bash
NEXT_PUBLIC_BASE_PATH=/nom-du-repo npm run build
```

Puis servez `out/` avec un serveur qui respecte le préfixe (ou ouvrez les fichiers générés en tenant compte du chemin).

### Fichier `.nojekyll`

Le fichier `public/.nojekyll` est copié dans `out/` pour éviter que Jekyll ne traite le site sur GitHub Pages.

## Photo de profil

Remplacez le placeholder (initiales **TAD**) dans `components/ProfilePlaceholder.tsx` par une balise `Image` Next pointant vers `public/profile.jpg` (ou adaptez le chemin) une fois la photo disponible.

## Stack

- Next.js 15 (`output: "export"`)
- Tailwind CSS
- Next.js 15 (`output: "export"`), Tailwind CSS, Framer Motion, tsParticles (`@tsparticles/react` + slim), `react-parallax-tilt`, `react-countup`, Lucide React
- Lucide React
- Traductions : `messages/fr.json` et `messages/en.json`

## Licence

Contenu personnel — usage privé.
