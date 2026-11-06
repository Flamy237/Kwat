# Kwat : démo client

Maquette de présentation du réseau de voisinage de Bonamoussadi (Douala). Seule la page d'accueil est réalisée.
Tous les liens mènent à `/demo/[fonctionnalité]`, qui explique que la fonctionnalité sera développée une fois le
contrat validé. Il n'y a ni backend ni donnée réelle d'utilisateur.

## Lancer le projet

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # version de production
```

## Où modifier quoi

| Besoin | Fichier |
| --- | --- |
| Nom de la marque, textes, fonctionnalités, exemples | `lib/content.ts` |
| Couleurs, typographie, mise en page | `app/globals.css` |
| Sections de la page d'accueil | `components/` |
| Page « version de démonstration » | `components/DemoView.tsx` |

Pour renommer la marque, modifier `site.name` dans `lib/content.ts`, puis les mentions « Kwat » restantes
(`app/layout.tsx`, `components/Constat.tsx`) et l'expression « mon kwat » dans les textes.

## Carte

Les calques de `public/map/` et `lib/geo.json` sont générés par `scripts/build-map.py` et
`scripts/render-layers.mjs` à partir d'extraits OpenStreetMap et geoBoundaries. L'attribution figure dans le pied de
page et doit y rester : © contributeurs OpenStreetMap (ODbL), geoBoundaries (CC BY).

## Mobile

Les scènes mobiles sont distinctes du desktop : styles dans le bloc `max-width: 899px` en fin de `app/globals.css`,
animations dans les blocs `mm.add(MOBILE, ...)` de chaque composant. Elles reposent sur `position: sticky` plutôt que
sur l'épinglage GSAP, qui saccade au doigt.

## Pile technique

Next.js (App Router), TypeScript, GSAP et ScrollTrigger pour les animations, Lenis pour le défilement fluide. Les
animations respectent le réglage « réduire les animations » du système.
