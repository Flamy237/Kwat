// Tout le contenu éditorial de la démo est ici : renommer la marque ou ajuster
// un texte ne demande de toucher qu'à ce fichier.

export const site = {
  name: "Kwat",
  url: "https://kwat-nu.vercel.app",
  tagline: "Le réseau des voisins",
  quartier: "Bonamoussadi",
  ville: "Douala",
  region: "Littoral",
};

export type Feature = {
  slug: string;
  label: string;
  title: string;
  promise: string;
  planned: string[];
};

export const features: Feature[] = [
  {
    slug: "fil",
    label: "Le fil du quartier",
    title: "Le fil du quartier",
    promise: "Tout ce qui se passe près de chez vous, au même endroit, sans le bruit des groupes WhatsApp.",
    planned: ["Publications réservées aux voisins vérifiés", "Tri par secteur : Denver, Kotto, Makèpè, Santa Barbara…", "Résumé quotidien léger en données"],
  },
  {
    slug: "palabre",
    label: "Le Palabre",
    title: "Le Palabre",
    promise: "Le forum du quartier : des cercles par sujet où l'on discute, décide et agit ensemble.",
    planned: ["Cercles thématiques ouverts ou privés", "Sondages et décisions collectives", "Plans d'action suivis, avec volontaires et cotisations", "Modération par des référents de bloc"],
  },
  {
    slug: "alertes",
    label: "Alertes",
    title: "Les alertes du quartier",
    promise: "Coupure de courant, eau qui monte, route impraticable : l'information confirmée par vos voisins, en quelques minutes.",
    planned: ["Signalement en deux gestes", "Confirmation par les voisins proches", "Notifications ciblées par secteur", "Repli par SMS en cas de réseau faible"],
  },
  {
    slug: "marche",
    label: "Le Marché",
    title: "Le Marché",
    promise: "Vendre, donner, prêter et trouver entre voisins, à quelques rues de chez soi.",
    planned: ["Annonces avec photos et prix en FCFA", "Dons et prêts d'objets", "Paiement Mobile Money à l'étude"],
  },
  {
    slug: "adresses",
    label: "Bonnes adresses",
    title: "Les bonnes adresses",
    promise: "Le plombier sérieux, la couturière, la pharmacie de garde : recommandés par des gens qui habitent à côté.",
    planned: ["Recommandations de voisins vérifiés", "Fiches des artisans et commerces du quartier", "Espace pour les commerçants locaux"],
  },
  {
    slug: "agenda",
    label: "Agenda",
    title: "L'agenda du quartier",
    promise: "Curage collectif, réunion de bloc, match au Petit Terrain : ce qui rassemble le quartier cette semaine.",
    planned: ["Calendrier partagé", "Inscriptions et rappels", "Événements issus des décisions du Palabre"],
  },
  {
    slug: "carte",
    label: "Carte",
    title: "La carte vivante",
    promise: "Le quartier en temps réel : alertes, annonces et points d'attention posés sur vos vraies rues.",
    planned: ["Carte interactive du quartier", "Points signalés par les voisins", "Version allégée pour les petits forfaits"],
  },
  {
    slug: "messagerie",
    label: "Messagerie",
    title: "La messagerie",
    promise: "Écrire à un voisin sans partager son numéro de téléphone.",
    planned: ["Discussions privées entre voisins", "Discussions de groupe", "Blocage et signalement intégrés"],
  },
  {
    slug: "inscription",
    label: "Rejoindre mon kwat",
    title: "Rejoindre mon kwat",
    promise: "Une inscription par numéro de téléphone, puis une vérification par parrainage d'un voisin.",
    planned: ["Inscription par téléphone", "Vérification de l'adresse par parrainage", "Choix du secteur et des cercles"],
  },
  {
    slug: "connexion",
    label: "Se connecter",
    title: "Se connecter",
    promise: "Votre compte de voisin, sur le web comme sur mobile.",
    planned: ["Connexion par code SMS", "Profil et paramètres de confidentialité"],
  },
  {
    slug: "charte",
    label: "Charte de confiance",
    title: "La charte de confiance",
    promise: "Les règles qui gardent le quartier respirable : respect, vérité, et voisins vérifiés.",
    planned: ["Charte du voisinage", "Procédure de signalement", "Politique de protection des données"],
  },
  {
    slug: "partenaires",
    label: "Communes et partenaires",
    title: "Communes et partenaires",
    promise: "Un canal direct entre les habitants et ceux qui peuvent agir sur le terrain.",
    planned: ["Espace d'information pour les communes", "Remontée des besoins prioritaires", "Tableau de bord par quartier"],
  },
  {
    slug: "a-propos",
    label: "À propos",
    title: "À propos",
    promise: "Pourquoi ce projet commence à Bonamoussadi, et comment il grandira jusqu'aux dix régions du Cameroun.",
    planned: ["Histoire et équipe", "Feuille de route par quartier"],
  },
  {
    slug: "contact",
    label: "Contact",
    title: "Contact",
    promise: "Une question, un quartier à ouvrir, un partenariat : parlons-en.",
    planned: ["Formulaire de contact", "Demande d'ouverture d'un nouveau quartier"],
  },
];

export const featureBySlug = (slug: string) => features.find((f) => f.slug === slug);

export const navLinks = ["fil", "palabre", "alertes", "marche", "adresses"].map((s) => featureBySlug(s)!);

// Positions réelles (projection OpenStreetMap) dans le repère de carte 1600 × 1000.
export const heroPins = [
  { x: 718, y: 578, place: "Denver", tag: "Alerte", text: "Courant coupé depuis 18 h", meta: "14 voisins confirment", tone: "alert", side: "right" },
  { x: 912, y: 459, place: "Carrefour Yoro Joss", tag: "Palabre", text: "Le drain déborde encore", meta: "38 voisins en parlent", tone: "palabre", side: "right" },
  { x: 852, y: 739, place: "Petit Terrain", tag: "Agenda", text: "Match samedi, 16 h", meta: "22 participants", tone: "agenda", side: "right" },
  { x: 1235, y: 380, place: "Kotto", tag: "Bonne adresse", text: "Un plombier sérieux ?", meta: "3 voisins recommandent", tone: "adresse", side: "left" },
  { x: 1211, y: 775, place: "Makèpè", tag: "Marché", text: "Congélateur à vendre", meta: "85 000 FCFA", tone: "marche", side: "left" },
] as const;

export const chaosMessages = [
  { group: "Bona Solidarité", text: "Vous avez aussi le courant ??", x: 4, y: 6, r: -6, keep: -1 },
  { group: "Bloc C Denver", text: "Bonjour à tous, svp qui connaît un bon plombier ?", x: 48, y: 2, r: 4, keep: 1 },
  { group: "Parents Lycée", text: "Transféré plusieurs fois : image.jpg", x: 12, y: 26, r: 3, keep: -1 },
  { group: "Infos Douala 5e", text: "La route de Makèpè est passable ou pas ?", x: 58, y: 28, r: -4, keep: 0 },
  { group: "Bona Solidarité", text: "Bonne journée bénie à tous", x: 0, y: 46, r: 5, keep: -1 },
  { group: "Voisins Santa Barbara", text: "Qui a vu les clés perdues au carrefour ?", x: 28, y: 53, r: -3, keep: 3 },
  { group: "Bloc C Denver", text: "ENEO a dit quoi ?", x: 76, y: 52, r: 6, keep: -1 },
  { group: "Infos Douala 5e", text: "Le drain déborde encore, il faut faire quelque chose", x: 8, y: 74, r: -2, keep: 2 },
  { group: "Parents Lycée", text: "Qui a ajouté ce numéro ?", x: 54, y: 80, r: 3, keep: -1 },
];

export const sortedMessages = [
  { tag: "Alerte", text: "Route de Makèpè impraticable, 9 voisins confirment" },
  { tag: "Bonne adresse", text: "Plombier à Denver, 3 voisins recommandent" },
  { tag: "Palabre", text: "Drain de Yoro Joss, 38 voisins, décision samedi" },
  { tag: "Objet trouvé", text: "Clés retrouvées à Santa Barbara" },
];

export const dayPanels = [
  {
    time: "06:30", slug: "alertes", kicker: "Alertes", title: "Le courant saute. Vous n'êtes pas seul.",
    text: "Un signalement, des voisins qui confirment : en cinq minutes, tout le secteur sait ce qui se passe.",
    card: { head: "Alerte · Denver", title: "Coupure de courant", lines: ["Signalée à 06 h 12", "14 voisins confirment"], foot: "Moi aussi" },
  },
  {
    time: "09:15", slug: "adresses", kicker: "Bonnes adresses", title: "Le bon artisan, à deux rues.",
    text: "Pas un annuaire de plus : des recommandations de gens qui habitent à côté et que vous pouvez croiser demain.",
    card: { head: "Recommandé · Kotto", title: "Plomberie du Bloc 4", lines: ["3 voisins recommandent", "« Venu le jour même, prix correct »"], foot: "Contacter" },
  },
  {
    time: "12:40", slug: "marche", kicker: "Le Marché", title: "Ce qui ne sert plus ici sert à côté.",
    text: "Vendre, donner, prêter. Un portable, un berceau, un groupe électrogène pour le week-end, sans traverser Douala.",
    card: { head: "Marché · Yoro Joss", title: "Congélateur 200 L", lines: ["85 000 FCFA", "À 400 m de chez vous"], foot: "Écrire au voisin" },
  },
  {
    time: "16:30", slug: "agenda", kicker: "Agenda", title: "Le quartier se retrouve.",
    text: "Réunion de bloc, curage collectif, match au Petit Terrain : tout ce qui fait qu'on se connaît pour de vrai.",
    card: { head: "Samedi · Petit Terrain", title: "Match des anciens", lines: ["16 h · 22 participants", "Buvette tenue par le bloc D"], foot: "J'y serai" },
  },
  {
    time: "19:00", slug: "palabre", kicker: "Le Palabre", title: "Le soir, on règle les vrais sujets.",
    text: "Les cercles du forum prennent le relais : drains, sécurité, écoles. On discute, on vote, on s'organise.",
    card: { head: "Cercle · Drains", title: "Curage de samedi", lines: ["23 volontaires inscrits", "84 000 FCFA collectés"], foot: "Rejoindre" },
  },
  {
    time: "22:10", slug: "alertes", kicker: "Veille", title: "Il pleut fort. Le quartier veille.",
    text: "L'eau monte vers Makèpè-Missokè ? Les voisins en amont préviennent ceux en aval, avant que la route ne soit coupée.",
    card: { head: "Alerte · Makèpè-Missokè", title: "L'eau monte", lines: ["Évitez le pont cette nuit", "9 voisins confirment"], foot: "Prévenir mon bloc" },
  },
];

export const cercles = [
  "Courant & eau", "Drains & inondations", "Sécurité du bloc", "Routes & bendskins", "Parents d'élèves",
  "Commerçants de Santa Barbara", "Jeunes & emploi", "Tontines & njangi", "Foot au Petit Terrain",
  "Propreté", "Santé & pharmacies de garde", "Nouveaux arrivants", "Locataires de Denver", "Mamans de Kotto",
];

export const trust = [
  { title: "Voisins vérifiés", text: "On entre par parrainage d'un voisin déjà vérifié. Pas de faux profils, pas d'inconnus venus d'ailleurs.", big: true },
  { title: "Référents de bloc", text: "Chaque bloc choisit ses référents. La modération reste entre les mains du quartier.", big: false },
  { title: "Léger en données", text: "Pensé pour les petits forfaits et les réseaux capricieux. Le texte d'abord, les images à la demande.", big: false },
  { title: "Français et anglais", text: "Deux langues, un même quartier. Chacun lit et écrit dans celle qu'il préfère.", big: false },
  { title: "Mobile Money", text: "Cotisations et petites annonces réglées avec les moyens que tout le monde utilise déjà.", big: true },
];

export const stages = [
  { n: "01", title: "Bonamoussadi", text: "On commence ici, rue par rue, avec les premiers blocs." },
  { n: "02", title: "Douala", text: "Puis les autres quartiers de la ville, un par un." },
  { n: "03", title: "Le Littoral", text: "Edéa, Nkongsamba, Loum : la région entière se connecte." },
  { n: "04", title: "Le Cameroun", text: "Dix régions, un même réflexe : parler à ses voisins." },
];
