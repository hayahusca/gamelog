# 🎮 GameLog — Mon site gaming personnel

Site statique pour archiver vos avis de jeux vidéo, vos Let's Play et votre catalogue de jeux.
**Zéro publicité · Zéro base de données · Gratuit sur GitHub Pages.**

---

## 📁 Structure des fichiers

```
/
├── index.html       ← Page d'accueil
├── avis.html        ← Vos avis de jeux
├── letsplay.html    ← Vos Let's Play
├── catalogue.html   ← Votre catalogue complet
├── style.css        ← Design du site (ne pas modifier sauf pour personnaliser)
├── app.js           ← Logique du site (ne pas modifier)
├── data.js          ← ⭐ LE SEUL FICHIER À MODIFIER
└── img/             ← Mettez vos images ici (optionnel)
```

---

## ✏️ Comment mettre à jour le contenu

**Ouvrez `data.js`** dans n'importe quel éditeur de texte (Notepad, VSCode…).

### Ajouter un avis
Copiez-collez un bloc existant dans la section `avis: [...]` :

```js
{
  id: 5,                          // Numéro unique (incrémentez)
  titre: "Nom du jeu",
  genre: "rpg",                   // rpg · fps · indie · action · aventure · strategie · simulation · sport · horreur · plateforme
  plateforme: "PC",
  note: 4,                        // Sur 5
  date: "2024-06-01",             // Format AAAA-MM-JJ
  image: "img/mon-image.jpg",     // Optionnel, laissez "" sinon
  emoji: "🎮",                     // Affiché si pas d'image
  resume: "Résumé court (1-2 phrases)",
  texte: `Texte complet de votre avis...`,
},
```

### Ajouter un Let's Play
Dans la section `letsplay: [...]` :

```js
{
  id: 6,
  titre: "Nom du jeu",
  sous_titre: "Description courte",
  statut: "en-cours",             // en-cours · termine · en-pause · prevu
  episode: 3,
  total_episodes: null,           // null si pas défini
  date_debut: "2024-06-01",
  date_fin: null,
  plateforme: "PC",
  lien: "https://youtube.com/...", // Lien vidéo, ou "" si vide
  description: "Description détaillée...",
},
```

### Ajouter un jeu au catalogue
Dans la section `catalogue: [...]` :

```js
{ id: 19, titre: "Nom du jeu", genre: "action", plateforme: "PC", annee: 2024, statut: "backlog", heures: 0, note: null },
```

**Statuts catalogue :** `termine` · `en-cours` · `backlog` · `abandonne` · `platine`

---

## 🚀 Déploiement sur GitHub Pages (gratuit)

### Première fois

1. Créez un compte sur [github.com](https://github.com) si vous n'en avez pas
2. Cliquez sur **"New repository"** (bouton vert)
3. Nommez-le `gamelog` (ou ce que vous voulez)
4. Laissez-le **Public** (obligatoire pour GitHub Pages gratuit)
5. Cliquez **"Create repository"**

### Uploader les fichiers

**Option simple (sans terminal) :**
1. Sur la page de votre repository, cliquez **"uploading an existing file"**
2. Glissez-déposez tous vos fichiers
3. Cliquez **"Commit changes"**

**Option terminal (Git) :**
```bash
git init
git add .
git commit -m "Mon site gaming"
git remote add origin https://github.com/VOTRE_PSEUDO/gamelog.git
git push -u origin main
```

### Activer GitHub Pages

1. Allez dans **Settings** de votre repository
2. Section **Pages** (dans le menu de gauche)
3. Source : **Deploy from a branch**
4. Branch : **main** · Folder : **/ (root)**
5. Cliquez **Save**

⏳ Attendez 1-2 minutes, votre site sera disponible à :
`https://VOTRE_PSEUDO.github.io/gamelog/`

---

## 🔄 Mettre à jour le site

1. Modifiez `data.js` en local
2. Sur GitHub : allez dans votre repo → cliquez sur `data.js` → icône crayon ✏️ → modifiez → **"Commit changes"**
3. Le site se met à jour automatiquement en ~1 minute.

---

## 🎨 Personnalisation du design

Ouvrez `style.css` et modifiez les variables au début :

```css
:root {
  --accent: #e8ff00;    /* Couleur principale (jaune fluo par défaut) */
  --accent2: #ff4d6d;   /* Couleur secondaire */
  --bg: #0d0d0f;        /* Fond principal */
}
```

Pour changer le nom du site, éditez `data.js` → section `site:`.
Pour changer le titre dans chaque page HTML, éditez la balise `<title>` dans chaque `.html`.

---

## 📸 Ajouter des images de jeux

1. Créez un dossier `img/` à la racine
2. Ajoutez vos images (`.jpg`, `.png`, `.webp`)
3. Dans `data.js`, renseignez le champ `image: "img/mon-jeu.jpg"`

Taille recommandée : **600×300 px minimum**, ratio **2:1**.

---

*Site généré sans framework, sans build tool, sans dépendances. Fonctionne partout.*
