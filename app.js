/* ============================================================
   APP.JS — Logique du site (ne pas modifier pour usage normal)
   ============================================================ */

// ── Utilitaires ──────────────────────────────────────────────

function etoiles(note, max = 5) {
  if (!note) return '<span style="color:var(--text-muted);font-size:0.8rem">Non noté</span>';
  let s = '';
  for (let i = 1; i <= max; i++) s += i <= note ? '★' : '☆';
  return `<span class="note" title="${note}/5">${s}</span>`;
}

function formatDate(str) {
  if (!str) return '';
  const d = new Date(str);
  return d.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
}

function formatStatut(s) {
  const map = {
    'en-cours': 'En cours',
    'termine': 'Terminé',
    'en-pause': 'En pause',
    'prevu': 'Prévu',
    'backlog': 'Backlog',
    'abandonne': 'Abandonné',
    'platine': 'Platine 🏆',
  };
  return map[s] || s;
}

// ── Menu mobile ───────────────────────────────────────────────

function toggleMenu() {
  document.querySelector('.nav-links')?.classList.toggle('open');
}

// ── Compteurs animés (page accueil) ──────────────────────────

function animateCounter(el, target, duration = 1200) {
  let start = null;
  function step(ts) {
    if (!start) start = ts;
    const progress = Math.min((ts - start) / duration, 1);
    el.textContent = Math.floor(progress * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }
  requestAnimationFrame(step);
}

// ── Injection accueil ─────────────────────────────────────────

function renderAccueil() {
  // Stats
  const statAvis = document.querySelector('#stat-avis .stat-num');
  const statLp   = document.querySelector('#stat-lp .stat-num');
  const statJeux = document.querySelector('#stat-jeux .stat-num');
  if (statAvis) animateCounter(statAvis, DATA.avis.length);
  if (statLp)   animateCounter(statLp, DATA.letsplay.length);
  if (statJeux) animateCounter(statJeux, DATA.catalogue.length);

  // Derniers avis (3 max)
  const gridAvis = document.getElementById('recent-avis');
  if (gridAvis) {
    const recents = [...DATA.avis].sort((a,b) => new Date(b.date) - new Date(a.date)).slice(0, 3);
    gridAvis.innerHTML = recents.map(a => cardAvis(a)).join('');
    gridAvis.querySelectorAll('.card').forEach(c => c.addEventListener('click', () => {
      const id = parseInt(c.dataset.id);
      openModal(DATA.avis.find(a => a.id === id));
    }));
  }

  // Derniers LP (3 max)
  const listLp = document.getElementById('recent-lp');
  if (listLp) {
    const recents = DATA.letsplay.slice(0, 3);
    listLp.innerHTML = recents.map((lp, i) => rowLp(lp, i + 1)).join('');
  }
}

// ── Card avis ─────────────────────────────────────────────────

function cardAvis(a) {
  const cover = a.image
    ? `<img class="card-cover" src="${a.image}" alt="${a.titre}" loading="lazy" />`
    : `<div class="card-cover-placeholder">${a.emoji || '🎮'}</div>`;
  return `
    <div class="card" data-id="${a.id}">
      ${cover}
      <div class="card-body">
        <div class="card-meta">
          <span class="tag ${a.genre}">${a.genre}</span>
          <span style="font-size:0.75rem;color:var(--text-muted)">${a.plateforme}</span>
        </div>
        <h3>${a.titre}</h3>
        <p>${a.resume}</p>
        ${etoiles(a.note)}
      </div>
    </div>`;
}

// ── Row let's play ────────────────────────────────────────────

function rowLp(lp, num) {
  const ep = lp.total_episodes
    ? `Épisode ${lp.episode} / ${lp.total_episodes}`
    : lp.episode > 0 ? `Épisode ${lp.episode}` : 'Pas encore commencé';
  const lien = lp.lien ? `<a href="${lp.lien}" target="_blank" class="btn btn-ghost" style="font-size:0.75rem;padding:0.4rem 1rem;" onclick="event.stopPropagation()">Voir ▶</a>` : '';
  return `
    <div class="lp-item">
      <span class="lp-num">${String(num).padStart(2,'0')}</span>
      <div class="lp-info">
        <h3>${lp.titre}</h3>
        <p>${lp.sous_titre} · ${ep} · ${lp.plateforme}</p>
      </div>
      ${lien}
      <span class="lp-status ${lp.statut}">${formatStatut(lp.statut)}</span>
    </div>`;
}

// ── MODAL avis ────────────────────────────────────────────────

function openModal(avis) {
  const overlay = document.getElementById('modal-overlay');
  if (!overlay || !avis) return;
  overlay.querySelector('.modal-tag').textContent = `// ${avis.genre} · ${avis.plateforme}`;
  overlay.querySelector('.modal-title').textContent = avis.titre;
  overlay.querySelector('.modal-date').textContent = formatDate(avis.date);
  overlay.querySelector('.modal-note').innerHTML = etoiles(avis.note);
  overlay.querySelector('.modal-body').textContent = avis.texte;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal-overlay')?.classList.remove('open');
  document.body.style.overflow = '';
}

// ── Page AVIS ─────────────────────────────────────────────────

function renderAvis() {
  const grid = document.getElementById('avis-grid');
  if (!grid) return;

  let filtre = 'tous';

  function render() {
    const items = filtre === 'tous'
      ? DATA.avis
      : DATA.avis.filter(a => a.genre === filtre);
    grid.innerHTML = items.map(a => cardAvis(a)).join('');
    grid.querySelectorAll('.card').forEach(c => c.addEventListener('click', () => {
      openModal(DATA.avis.find(a => a.id === parseInt(c.dataset.id)));
    }));
  }

  // Genres présents
  const genres = ['tous', ...new Set(DATA.avis.map(a => a.genre))];
  const filterBar = document.getElementById('avis-filters');
  if (filterBar) {
    filterBar.innerHTML = genres.map(g =>
      `<button class="filter-btn ${g === 'tous' ? 'active' : ''}" data-genre="${g}">${g === 'tous' ? 'Tous' : g}</button>`
    ).join('');
    filterBar.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filtre = btn.dataset.genre;
        render();
      });
    });
  }

  render();
}

// ── Page LET'S PLAY ───────────────────────────────────────────

function renderLetsPlay() {
  const list = document.getElementById('lp-grid');
  if (!list) return;

  let filtre = 'tous';

  function render() {
    const items = filtre === 'tous'
      ? DATA.letsplay
      : DATA.letsplay.filter(lp => lp.statut === filtre);
    list.innerHTML = items.map((lp, i) => `
      <div class="lp-item" style="animation-delay:${i*0.05}s">
        <span class="lp-num">${String(i+1).padStart(2,'0')}</span>
        <div class="lp-info">
          <h3>${lp.titre}</h3>
          <p>${lp.sous_titre}</p>
          <p style="margin-top:0.3rem">${lp.description}</p>
          ${lp.date_debut ? `<p style="margin-top:0.4rem;color:var(--text-muted);font-size:0.75rem">Début : ${formatDate(lp.date_debut)}${lp.date_fin ? ' · Fin : ' + formatDate(lp.date_fin) : ''}</p>` : ''}
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:0.5rem">
          ${lp.lien ? `<a href="${lp.lien}" target="_blank" class="btn btn-primary" style="font-size:0.75rem;padding:0.4rem 1rem">Voir ▶</a>` : ''}
          <span class="lp-status ${lp.statut}">${formatStatut(lp.statut)}</span>
          ${lp.episode > 0 ? `<span style="font-size:0.75rem;color:var(--text-muted)">Ép. ${lp.episode}${lp.total_episodes ? '/'+lp.total_episodes : ''}</span>` : ''}
        </div>
      </div>`).join('');
  }

  const filterBar = document.getElementById('lp-filters');
  if (filterBar) {
    const statuts = ['tous', 'en-cours', 'termine', 'en-pause', 'prevu'];
    filterBar.innerHTML = statuts.map(s =>
      `<button class="filter-btn ${s === 'tous' ? 'active' : ''}" data-s="${s}">${s === 'tous' ? 'Tous' : formatStatut(s)}</button>`
    ).join('');
    filterBar.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filtre = btn.dataset.s;
        render();
      });
    });
  }

  render();
}

// ── Page CATALOGUE ────────────────────────────────────────────

function renderCatalogue() {
  const tbody = document.getElementById('catalogue-body');
  if (!tbody) return;

  const searchInput = document.getElementById('cat-search');
  let filtre = 'tous';
  let sortKey = 'titre';
  let sortAsc = true;
  let searchTerm = '';

  // Summary bar
  function updateSummary() {
    const total = DATA.catalogue.length;
    const termines = DATA.catalogue.filter(j => ['termine','platine'].includes(j.statut)).length;
    const heures = DATA.catalogue.reduce((acc, j) => acc + (j.heures || 0), 0);
    const platines = DATA.catalogue.filter(j => j.statut === 'platine').length;
    document.getElementById('sum-total').textContent = total;
    document.getElementById('sum-termines').textContent = termines;
    document.getElementById('sum-heures').textContent = heures;
    document.getElementById('sum-platines').textContent = platines;
  }

  function render() {
    let items = DATA.catalogue.filter(j => {
      const matchFiltre = filtre === 'tous' || j.statut === filtre || j.genre === filtre || j.plateforme === filtre;
      const matchSearch = !searchTerm || j.titre.toLowerCase().includes(searchTerm) || j.genre.toLowerCase().includes(searchTerm);
      return matchFiltre && matchSearch;
    });

    items.sort((a, b) => {
      let va = a[sortKey], vb = b[sortKey];
      if (va == null) va = sortAsc ? Infinity : -Infinity;
      if (vb == null) vb = sortAsc ? Infinity : -Infinity;
      if (typeof va === 'string') va = va.toLowerCase();
      if (typeof vb === 'string') vb = vb.toLowerCase();
      return sortAsc ? (va > vb ? 1 : -1) : (va < vb ? 1 : -1);
    });

    tbody.innerHTML = items.map(j => `
      <tr>
        <td><strong>${j.titre}</strong></td>
        <td><span class="tag ${j.genre}">${j.genre}</span></td>
        <td><span style="font-size:0.8rem;color:var(--text-muted)">${j.plateforme}</span></td>
        <td><span style="font-size:0.8rem;color:var(--text-muted)">${j.annee}</span></td>
        <td><span class="status-badge ${j.statut}">${formatStatut(j.statut)}</span></td>
        <td><span style="font-family:var(--font-mono);font-size:0.8rem;color:var(--text-muted)">${j.heures ? j.heures+'h' : '—'}</span></td>
        <td>${etoiles(j.note)}</td>
      </tr>`).join('');

    if (items.length === 0) {
      tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;color:var(--text-muted);padding:2rem">Aucun jeu trouvé.</td></tr>';
    }
  }

  // Sort headers
  document.querySelectorAll('.catalogue-table th[data-sort]').forEach(th => {
    th.addEventListener('click', () => {
      const key = th.dataset.sort;
      if (sortKey === key) sortAsc = !sortAsc;
      else { sortKey = key; sortAsc = true; }
      render();
    });
  });

  // Filters
  const filterBar = document.getElementById('cat-filters');
  if (filterBar) {
    const statuts = ['tous', 'platine', 'termine', 'en-cours', 'backlog', 'abandonne'];
    filterBar.innerHTML = statuts.map(s =>
      `<button class="filter-btn ${s === 'tous' ? 'active' : ''}" data-s="${s}">${s === 'tous' ? 'Tous' : formatStatut(s)}</button>`
    ).join('');
    filterBar.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filtre = btn.dataset.s;
        render();
      });
    });
  }

  // Search
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      searchTerm = searchInput.value.toLowerCase().trim();
      render();
    });
  }

  updateSummary();
  render();
}

// ── MODAL HTML (injecté dans chaque page) ─────────────────────

function injectModal() {
  const div = document.createElement('div');
  div.id = 'modal-overlay';
  div.className = 'modal-overlay';
  div.innerHTML = `
    <div class="modal">
      <button class="modal-close" onclick="closeModal()">✕</button>
      <span class="modal-tag section-tag"></span>
      <h2 class="modal-title"></h2>
      <p class="modal-date modal-meta"></p>
      <div class="modal-note"></div>
      <div class="modal-body" style="margin-top:1.5rem"></div>
    </div>`;
  div.addEventListener('click', e => { if (e.target === div) closeModal(); });
  document.body.appendChild(div);
}

// ── Init ──────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  injectModal();

  // Détection de page via un attribut data-page sur body, ou fallback URL
  const page = document.body.dataset.page || location.pathname.split('/').pop().replace('.html','');

  if (!page || page === '' || page === 'index') renderAccueil();
  if (page === 'avis') renderAvis();
  if (page === 'letsplay') renderLetsPlay();
  if (page === 'catalogue') renderCatalogue();
});
