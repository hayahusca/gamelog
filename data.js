/* =====================================================================
   DATA.JS — LE SEUL FICHIER À MODIFIER POUR METTRE À JOUR LE SITE
   =====================================================================
   
   Pour ajouter un avis, un let's play, ou un jeu :
   → Copiez un objet existant, modifiez les champs, sauvegardez.
   → Le site se met à jour automatiquement.
   
   NOTES : utilisez des étoiles "★" et "☆" pour les notes (sur 5)
   IMAGES : mettez vos images dans le dossier /img/ et référencez-les
             avec "img/mon-image.jpg". Laissez "" pour l'emoji par défaut.
   ===================================================================== */

const DATA = {

  /* ──────────────────────────────────
     👤 INFOS DU SITE (modifiez ici)
  ────────────────────────────────── */
  site: {
    titre: "GameLog",
    sousTitre: "Mon univers gaming",
    description: "Avis honnêtes · Let's Play · Catalogue personnel",
    auteur: "Pseudo",
  },

  /* ──────────────────────────────────
     ⭐ AVIS DE JEUX
     Genres disponibles : rpg · fps · indie · action · aventure
                          strategie · simulation · sport · horreur · plateforme
  ────────────────────────────────── */
  avis: [
    {
      id: 1,
      titre: "Elden Ring",
      genre: "action",
      plateforme: "PC",
      note: 5,           // sur 5
      date: "2024-03-15",
      image: "",         // ex: "img/elden-ring.jpg" ou laisser vide
      emoji: "🗡️",       // utilisé si pas d'image
      resume: "Un chef-d'œuvre absolu. FromSoftware signe son jeu le plus ambitieux avec un monde ouvert dense et cohérent. Chaque zone regorge de secrets.",
      texte: `Elden Ring est une expérience qui redéfinit le genre action-RPG en monde ouvert. Là où beaucoup de jeux peuplent leur map de contenu superficiel, FromSoftware propose une densité et une cohérence rare.

L'exploration est la vraie star du jeu : chaque recoin recèle une surprise, un mini-boss, un objet de lore ou une zone secrète. Le sentiment de découverte est constant et jamais dilué.

Côté combat, on retrouve le système éprouvé des Soulsborne avec une liberté de build décuplée. Que vous préfériez la magie, les armes lourdes ou un style furtif, le jeu s'adapte.

Seuls bémols : quelques zones tardives en retrait par rapport au reste, et des performances PC perfectibles à la sortie.

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
      resume: "Un metroidvania parfait. Atmosphère unique, gameplay précis, contenu colossal pour le prix. Team Cherry a signé un monument du genre.",
      texte: `Hollow Knight est probablement le meilleur rapport qualité/prix du jeu vidéo indépendant. Pour une dizaine d'euros, vous avez entre 40 et 60 heures de jeu si vous voulez tout explorer.

L'univers de Hallownest est mélancolique, mystérieux, et cohérent. Le lore se découvre progressivement sans jamais être imposé.

Le gameplay est exigeant mais juste. Chaque mort est une leçon, jamais une punition arbitraire. La progression des capacités donne une vraie sensation de montée en puissance.

Les DLC gratuits ajoutent encore du contenu de qualité. Impossible de ne pas le recommander.`,
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
      resume: "Après ses débuts chaotiques, Cyberpunk 2077 s'est transformé en l'un des meilleurs RPG de sa génération. Night City est une ville vivante et fascinante.",
      texte: `J'ai attendu la version 2.0 pour m'y mettre, et c'était la bonne décision. Le jeu patché et avec l'extension Phantom Liberty est une expérience remarquable.

Night City est la vraie star : dense, verticale, regorgeant d'histoires et de détails. Se perdre dans ses ruelles est un plaisir en soi.

Le système de jeu remanié en 2.0 est bien plus cohérent avec des arbres de compétences qui donnent une vraie identité à votre V.

La fin de Phantom Liberty m'a genuinement touché. CDPR a su rattraper le coup.

Je retire une étoile pour les missions de police encore un peu creuses et quelques quêtes secondaires inégales.`,
    },
    {
      id: 4,
      titre: "Stardew Valley",
      genre: "simulation",
      plateforme: "PC",
      note: 5,
      date: "2023-08-05",
      image: "",
      emoji: "🌻",
      resume: "Le jeu parfait pour décompresser. Stardew Valley est une ode au slow gaming, une perle développée seul par ConcernedApe.",
      texte: `Difficile d'expliquer pourquoi Stardew Valley est aussi addictif. Sur le papier, c'est un simulateur de ferme. En pratique, c'est un jeu de gestion, un RPG social, un jeu d'exploration et un simulateur de pêche.

L'absence de pression est sa grande force : vous avancez à votre rythme, sans objectif imposé.

Le fait qu'une seule personne ait développé ce jeu (graphismes, musique, code, game design) est proprement stupéfiant quand on voit le résultat.

Idéal le soir pour se vider la tête.`,
    },
  ],

  /* ──────────────────────────────────
     🎮 LET'S PLAY / PRÉSENTATIONS
     Statuts : "en-cours" · "termine" · "en-pause" · "prevu"
  ────────────────────────────────── */
  letsplay: [
    {
      id: 1,
      titre: "Baldur's Gate 3",
      sous_titre: "Playthrough complet - Druide de la Lune",
      statut: "en-cours",
      episode: 12,
      total_episodes: null, // null si pas encore défini
      date_debut: "2024-02-01",
      date_fin: null,
      plateforme: "PC",
      lien: "",  // lien YouTube, Twitch, etc. ou laisser vide
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
      description: "Challenge run : terminer Dark Souls III sans monter de niveau. Chaque boss est un puzzle à résoudre sans stats.",
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
      description: "Playthrough complet avec toutes les quêtes principales, secondaires, les contrats de sorceleur et les deux DLC.",
    },
    {
      id: 4,
      titre: "Hades II",
      sous_titre: "Découverte Early Access",
      statut: "en-pause",
      episode: 3,
      total_episodes: null,
      date_debut: "2024-04-10",
      date_fin: null,
      plateforme: "PC",
      lien: "",
      description: "Exploration de l'early access de Hades II. En pause en attendant une version plus complète.",
    },
    {
      id: 5,
      titre: "Metaphor: ReFantazio",
      sous_titre: "Premier playthrough",
      statut: "prevu",
      episode: 0,
      total_episodes: null,
      date_debut: null,
      date_fin: null,
      plateforme: "PC",
      lien: "",
      description: "Prochain let's play prévu : le nouveau RPG d'Atlus.",
    },
  ],

  /* ──────────────────────────────────
     📚 CATALOGUE DE JEUX POSSÉDÉS
     Statuts : "termine" · "en-cours" · "backlog" · "abandonne" · "platine"
     Plateformes : "PC" · "PS5" · "Xbox" · "Switch" · "PS4" etc.
  ────────────────────────────────── */
  catalogue: [
    { id: 1,  titre: "Elden Ring",           genre: "action",     plateforme: "PC",     annee: 2022, statut: "platine",   heures: 180, note: 5 },
    { id: 2,  titre: "Hollow Knight",        genre: "indie",      plateforme: "PC",     annee: 2017, statut: "platine",   heures: 65,  note: 5 },
    { id: 3,  titre: "The Witcher 3",        genre: "rpg",        plateforme: "PC",     annee: 2015, statut: "termine",   heures: 210, note: 5 },
    { id: 4,  titre: "Cyberpunk 2077",       genre: "rpg",        plateforme: "PC",     annee: 2020, statut: "termine",   heures: 120, note: 4 },
    { id: 5,  titre: "Baldur's Gate 3",      genre: "rpg",        plateforme: "PC",     annee: 2023, statut: "en-cours",  heures: 95,  note: 5 },
    { id: 6,  titre: "Stardew Valley",       genre: "simulation", plateforme: "PC",     annee: 2016, statut: "platine",   heures: 320, note: 5 },
    { id: 7,  titre: "Celeste",              genre: "indie",      plateforme: "PC",     annee: 2018, statut: "platine",   heures: 40,  note: 5 },
    { id: 8,  titre: "Dark Souls III",       genre: "action",     plateforme: "PC",     annee: 2016, statut: "platine",   heures: 130, note: 5 },
    { id: 9,  titre: "Hades",               genre: "action",     plateforme: "PC",     annee: 2020, statut: "platine",   heures: 90,  note: 5 },
    { id: 10, titre: "Disco Elysium",        genre: "rpg",        plateforme: "PC",     annee: 2019, statut: "termine",   heures: 45,  note: 4 },
    { id: 11, titre: "Sekiro",              genre: "action",     plateforme: "PC",     annee: 2019, statut: "termine",   heures: 60,  note: 4 },
    { id: 12, titre: "Monster Hunter: Rise", genre: "action",     plateforme: "PC",     annee: 2022, statut: "en-cours",  heures: 55,  note: 4 },
    { id: 13, titre: "Hades II",            genre: "action",     plateforme: "PC",     annee: 2024, statut: "en-cours",  heures: 20,  note: null },
    { id: 14, titre: "Metaphor: ReFantazio", genre: "rpg",        plateforme: "PC",     annee: 2024, statut: "backlog",   heures: 0,   note: null },
    { id: 15, titre: "Lies of P",           genre: "action",     plateforme: "PC",     annee: 2023, statut: "backlog",   heures: 0,   note: null },
    { id: 16, titre: "Persona 5 Royal",     genre: "rpg",        plateforme: "Switch", annee: 2019, statut: "termine",   heures: 115, note: 5 },
    { id: 17, titre: "Breath of the Wild",  genre: "aventure",   plateforme: "Switch", annee: 2017, statut: "termine",   heures: 85,  note: 5 },
    { id: 18, titre: "Tears of the Kingdom", genre: "aventure",  plateforme: "Switch", annee: 2023, statut: "en-cours",  heures: 40,  note: 5 },
  ],

};
