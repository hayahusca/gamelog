/* =====================================================================
   DATA.JS — LE SEUL FICHIER À MODIFIER POUR METTRE À JOUR LE SITE
   =====================================================================
   Sections : site · avis · letsplay · catalogue · recherches · videos · reseaux
   ===================================================================== */

const DATA = {

  /* ── INFOS DU SITE ── */
  site: {
    titre: "GameLog",
    sousTitre: "Mon univers gaming",
    description: "Let's Play · Avis · Catalogue · Recherches · Vidéos",
    auteur: "hayahusca",
  },

  /* ── AVIS DE JEUX ──
     Genres : rpg · fps · indie · action · aventure · strategie · simulation · sport · horreur · plateforme
     note : sur 5  |  image : "img/nom.jpg" ou ""  |  emoji : affiché si pas d'image
  */
  avis: [
    {
      id: 1,
      titre: "Elden Ring",
      genre: "action",
      plateforme: "PC",
      note: 5,
      date: "2024-03-15",
      image: "",
      emoji: "🗡️",
      resume: "Un chef-d'œuvre absolu. FromSoftware signe son jeu le plus ambitieux avec un monde ouvert dense et cohérent.",
      texte: `Elden Ring est une expérience qui redéfinit le genre action-RPG en monde ouvert. Là où beaucoup de jeux peuplent leur map de contenu superficiel, FromSoftware propose une densité et une cohérence rare.

L'exploration est la vraie star du jeu : chaque recoin recèle une surprise, un mini-boss, un objet de lore ou une zone secrète.

Côté combat, on retrouve le système éprouvé des Soulsborne avec une liberté de build décuplée.

En résumé : incontournable.`,
    },
    {
      id: 2,
      titre: "Hollow Knight",
      genre: "indie",
      plateforme: "PC",
      note: 5,
      date: "2024-01-20",
      image: "",
      emoji: "🦋",
      resume: "Un metroidvania parfait. Atmosphère unique, gameplay précis, contenu colossal pour le prix.",
      texte: `Hollow Knight est probablement le meilleur rapport qualité/prix du jeu vidéo indépendant. Pour une dizaine d'euros, vous avez entre 40 et 60 heures de jeu.

L'univers de Hallownest est mélancolique, mystérieux, et cohérent. Le lore se découvre progressivement sans jamais être imposé.

Impossible de ne pas le recommander.`,
    },
    {
      id: 3,
      titre: "Cyberpunk 2077",
      genre: "rpg",
      plateforme: "PC",
      note: 4,
      date: "2023-12-10",
      image: "",
      emoji: "🌃",
      resume: "Après ses débuts chaotiques, Cyberpunk 2077 s'est transformé en l'un des meilleurs RPG de sa génération.",
      texte: `J'ai attendu la version 2.0 pour m'y mettre, et c'était la bonne décision.

Night City est la vraie star : dense, verticale, regorgeant d'histoires et de détails.

La fin de Phantom Liberty m'a genuinement touché. CDPR a su rattraper le coup.`,
    },
  ],

  /* ── LET'S PLAY ──
     statut : "en-cours" · "termine" · "en-pause" · "prevu"
     lien   : URL YouTube/Twitch ou ""
  */
  letsplay: [
    {
      id: 1,
      titre: "Baldur's Gate 3",
      sous_titre: "Playthrough complet - Druide de la Lune",
      statut: "en-cours",
      episode: 12,
      total_episodes: null,
      date_debut: "2024-02-01",
      date_fin: null,
      plateforme: "PC",
      lien: "",
      description: "Un playthrough RP poussé avec un druide de la lune. Focus sur les dialogues, les choix moraux et l'exploration de chaque zone.",
    },
    {
      id: 2,
      titre: "Dark Souls III",
      sous_titre: "Run SL1 - Niveau 1 du début à la fin",
      statut: "en-cours",
      episode: 5,
      total_episodes: null,
      date_debut: "2024-03-01",
      date_fin: null,
      plateforme: "PC",
      lien: "",
      description: "Challenge run : terminer Dark Souls III sans monter de niveau.",
    },
    {
      id: 3,
      titre: "The Witcher 3",
      sous_titre: "100% - Toutes les quêtes et DLC",
      statut: "termine",
      episode: 28,
      total_episodes: 28,
      date_debut: "2023-10-01",
      date_fin: "2024-01-15",
      plateforme: "PC",
      lien: "",
      description: "Playthrough complet avec toutes les quêtes principales, secondaires et les deux DLC.",
    },
    {
      id: 4,
      titre: "Metaphor: ReFantazio",
      sous_titre: "Premier playthrough",
      statut: "prevu",
      episode: 0,
      total_episodes: null,
      date_debut: null,
      date_fin: null,
      plateforme: "PC",
      lien: "",
      description: "Prochain let's play prévu.",
    },
  ],

  /* ── CATALOGUE ──
     statut : "termine" · "en-cours" · "backlog" · "abandonne" · "platine"
  */
  catalogue: [
    { id: 1,  titre: "Elden Ring",            genre: "action",     plateforme: "PC",     annee: 2022, statut: "platine",  heures: 180, note: 5 },
    { id: 2,  titre: "Hollow Knight",         genre: "indie",      plateforme: "PC",     annee: 2017, statut: "platine",  heures: 65,  note: 5 },
    { id: 3,  titre: "The Witcher 3",         genre: "rpg",        plateforme: "PC",     annee: 2015, statut: "termine",  heures: 210, note: 5 },
    { id: 4,  titre: "Cyberpunk 2077",        genre: "rpg",        plateforme: "PC",     annee: 2020, statut: "termine",  heures: 120, note: 4 },
    { id: 5,  titre: "Baldur's Gate 3",       genre: "rpg",        plateforme: "PC",     annee: 2023, statut: "en-cours", heures: 95,  note: 5 },
    { id: 6,  titre: "Stardew Valley",        genre: "simulation", plateforme: "PC",     annee: 2016, statut: "platine",  heures: 320, note: 5 },
    { id: 7,  titre: "Celeste",               genre: "indie",      plateforme: "PC",     annee: 2018, statut: "platine",  heures: 40,  note: 5 },
    { id: 8,  titre: "Dark Souls III",        genre: "action",     plateforme: "PC",     annee: 2016, statut: "platine",  heures: 130, note: 5 },
    { id: 9,  titre: "Hades",                genre: "action",     plateforme: "PC",     annee: 2020, statut: "platine",  heures: 90,  note: 5 },
    { id: 10, titre: "Persona 5 Royal",      genre: "rpg",        plateforme: "Switch", annee: 2019, statut: "termine",  heures: 115, note: 5 },
    { id: 11, titre: "Breath of the Wild",   genre: "aventure",   plateforme: "Switch", annee: 2017, statut: "termine",  heures: 85,  note: 5 },
    { id: 12, titre: "Tears of the Kingdom", genre: "aventure",   plateforme: "Switch", annee: 2023, statut: "en-cours", heures: 40,  note: 5 },
    { id: 13, titre: "Metaphor: ReFantazio", genre: "rpg",        plateforme: "PC",     annee: 2024, statut: "backlog",  heures: 0,   note: null },
    { id: 14, titre: "Lies of P",            genre: "action",     plateforme: "PC",     annee: 2023, statut: "backlog",  heures: 0,   note: null },
  ],

  /* ── JEUX RECHERCHÉS ──
     priorite : "haute" · "moyenne" · "basse"
     statut   : "recherche" · "trouve" · "commande"
     prix_max : budget max en euros (ou null)
  */
  recherches: [
    {
      id: 1,
      titre: "Vagrant Story",
      plateforme: "PS1",
      annee: 2000,
      priorite: "haute",
      statut: "recherche",
      prix_max: 40,
      note: "Version française de préférence. Accepte boîte sans notice.",
    },
    {
      id: 2,
      titre: "Tactics Ogre: Let Us Cling Together",
      plateforme: "PSP",
      annee: 2011,
      priorite: "haute",
      statut: "recherche",
      prix_max: 35,
      note: "Version PSP uniquement, pas le remake PS4.",
    },
    {
      id: 3,
      titre: "Chrono Trigger",
      plateforme: "DS",
      annee: 2008,
      priorite: "moyenne",
      statut: "commande",
      prix_max: 60,
      note: "Version DS idéalement. En cours de commande.",
    },
    {
      id: 4,
      titre: "Ico",
      plateforme: "PS2",
      annee: 2001,
      priorite: "moyenne",
      statut: "recherche",
      prix_max: 25,
      note: "Boîte + CD suffisent.",
    },
    {
      id: 5,
      titre: "Shadow of the Colossus",
      plateforme: "PS2",
      annee: 2005,
      priorite: "basse",
      statut: "trouve",
      prix_max: null,
      note: "Trouvé ! En attente de réception.",
    },
  ],

  /* ── VIDÉOS ──
     type : "letsplay" · "test" · "top" · "conseil" · "autre"
     Mettez l'ID YouTube dans youtube_id (ex: pour https://youtu.be/dQw4w9WgXcQ → "dQw4w9WgXcQ")
     ou une URL directe dans lien.
  */
  videos: [
    {
      id: 1,
      titre: "Mon top 10 des RPG indispensables",
      type: "top",
      date: "2024-03-01",
      youtube_id: "",   // ex: "dQw4w9WgXcQ"
      lien: "",         // ou URL directe
      description: "Ma sélection personnelle des RPG à ne pas manquer, toutes plateformes confondues.",
      duree: "18:42",
    },
    {
      id: 2,
      titre: "Test - Elden Ring : vaut-il le prix ?",
      type: "test",
      date: "2024-02-15",
      youtube_id: "",
      lien: "",
      description: "Mon avis complet après 180h de jeu. Je passe en revue gameplay, direction artistique, durée de vie et rapport qualité/prix.",
      duree: "24:10",
    },
    {
      id: 3,
      titre: "Let's Play Baldur's Gate 3 - Épisode 1",
      type: "letsplay",
      date: "2024-02-01",
      youtube_id: "",
      lien: "",
      description: "Début du playthrough complet en Druide de la Lune. Création du personnage et premiers choix.",
      duree: "1:12:30",
    },
    {
      id: 4,
      titre: "5 conseils pour débuter dans les Souls",
      type: "conseil",
      date: "2024-01-10",
      youtube_id: "",
      lien: "",
      description: "Les erreurs classiques à éviter et les astuces pour ne pas abandonner dès les premières heures.",
      duree: "11:05",
    },
  ],

  /* ── RÉSEAUX SOCIAUX ──
     Laissez lien: "" pour masquer un réseau
     icone : emoji ou texte court
  */
  reseaux: [
    {
      nom: "YouTube",
      icone: "▶",
      lien: "",          // ex: "https://youtube.com/@hayahusca"
      description: "Mes vidéos, Let's Play et tests",
      couleur: "#ff0000",
    },
    {
      nom: "Twitch",
      icone: "◉",
      lien: "",          // ex: "https://twitch.tv/hayahusca"
      description: "Lives gaming le week-end",
      couleur: "#9146ff",
    },
    {
      nom: "Twitter / X",
      icone: "✕",
      lien: "",
      description: "Actus et réactions à chaud",
      couleur: "#1da1f2",
    },
    {
      nom: "Discord",
      icone: "◈",
      lien: "",          // ex: "https://discord.gg/XXXXX"
      description: "Rejoignez la communauté",
      couleur: "#5865f2",
    },
    {
      nom: "Instagram",
      icone: "◎",
      lien: "",
      description: "Screenshots et moments mémorables",
      couleur: "#e1306c",
    },
    {
      nom: "TikTok",
      icone: "♪",
      lien: "",
      description: "Clips et highlights",
      couleur: "#ff0050",
    },
  ],

};
