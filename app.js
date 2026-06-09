/* ============================================================
   APP.JS — Ne pas modifier pour usage normal
   ============================================================ */

// ── Utilitaires ──────────────────────────────────────────────

function etoiles(note, max = 5) {
  if (!note) return '<span style="color:var(--text-muted);font-size:0.8rem">Non noté</span>';
  let s = '';
  for (let i = 1; i <= max; i++) s += i <= note ? '★' : '☆';
  return `<span class="note">${s}</span>`;
}

function formatDate(str) {
  if (!str) return '';
  return new Date(str).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
}

function formatStatut(s) {
  return { 'en-cours':'En cours','termine':'Terminé','en-pause':'En pause','prevu':'Prévu','backlog':'Backlog','abandonne':'Abandonné','platine':'Platine 🏆','recherche':'Recherché','trouve':'Trouvé','commande':'Commandé' }[s] || s;
}

function toggleMenu() {
  document.getElementById('nav-links')?.classList.toggle('open');
}

function animateCounter(el, target, duration = 1000) {
  let start = null;
  (function step(ts) {
    if (!start) start = ts;
    const p = Math.min((ts - start) / duration, 1);
    el.textContent = Math.floor(p * target);
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = target;
  })(performance.now());
}

// ── Card avis ─────────────────────────────────────────────────

function cardAvis(a) {
  const cover = a.image
    ? `<img class="card-cover" src="${a.image}" alt="${a.titre}" loading="lazy" />`
    : `<div class="card-cover-placeholder">${a.emoji || '🎮'}</div>`;
  return `<div class="card" data-id="${a.id}">${cover}
    <div class="card-body">
      <div class="card-meta"><span class="tag ${a.genre}">${a.genre}</span><span style="font-size:0.75rem;color:var(--text-muted)">${a.plateforme}</span></div>
      <h3>${a.titre}</h3><p>${a.resume}</p>${etoiles(a.note)}
    </div></div>`;
}

// ── Row let's play ────────────────────────────────────────────

function rowLp(lp, num) {
  const ep = lp.total_episodes ? `Ép. ${lp.episode}/${lp.total_episodes}` : lp.episode > 0 ? `Ép. ${lp.episode}` : '';
  const btn = lp.lien ? `<a href="${lp.lien}" target="_blank" class="btn btn-ghost" style="font-size:0.75rem;padding:0.4rem 1rem" onclick="event.stopPropagation()">Voir ▶</a>` : '';
  return `<div class="lp-item">
    <span class="lp-num">${String(num).padStart(2,'0')}</span>
    <div class="lp-info"><h3>${lp.titre}</h3><p>${lp.sous_titre}${ep ? ' · '+ep : ''}${lp.plateforme ? ' · '+lp.plateforme : ''}</p></div>
    ${btn}<span class="lp-status ${lp.statut}">${formatStatut(lp.statut)}</span>
  </div>`;
}

// ── Card recherche ────────────────────────────────────────────

function cardRecherche(r) {
  return `<div class="recherche-card">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:0.4rem">
      <span class="priorite-badge ${r.priorite}">${r.priorite}</span>
      <span class="statut-rech ${r.statut}">${formatStatut(r.statut)}</span>
    </div>
    <h3>${r.titre}</h3>
    <div class="meta">${r.plateforme} · ${r.annee}${r.prix_max ? ' · max '+r.prix_max+'€' : ''}</div>
    ${r.note ? `<div class="note-text">${r.note}</div>` : ''}
  </div>`;
}

// ── Card vidéo ────────────────────────────────────────────────

function cardVideo(v) {
  let thumb;
  if (v.youtube_id) {
    thumb = `<div class="video-thumb">
      <a href="https://youtu.be/${v.youtube_id}" target="_blank" class="play-placeholder">
        <div class="play-btn">▶</div>
        <img src="https://img.youtube.com/vi/${v.youtube_id}/mqdefault.jpg" alt="${v.titre}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:-1;border-radius:0" />
      </a></div>`;
  } else if (v.lien) {
    thumb = `<div class="video-thumb"><a href="${v.lien}" target="_blank" class="play-placeholder"><div class="play-btn">▶</div></a></div>`;
  } else {
    thumb = `<div class="video-thumb"><div class="play-placeholder no-link"><div class="play-btn" style="background:var(--bg3);color:var(--text-muted)">▶</div><span style="font-size:0.7rem;color:var(--text-muted);margin-top:0.3rem">Bientôt</span></div></div>`;
  }
  return `<div class="video-card">${thumb}
    <div class="video-body">
      <div class="video-meta"><span class="video-type ${v.type}">${v.type}</span><span class="video-duree">${v.duree || ''}</span></div>
      <h3>${v.titre}</h3><p>${v.description}</p>
      <p style="font-size:0.75rem;color:var(--text-muted);margin-top:0.5rem">${formatDate(v.date)}</p>
    </div></div>`;
}

// ── Card réseau ───────────────────────────────────────────────

function cardReseau(r) {
  const actif = !!r.lien;
  const badge = actif
    ? `<span class="reseau-badge actif">Actif</span>`
    : `<span class="reseau-badge bientot">Bientôt</span>`;
  const tag = actif ? `a href="${r.lien}" target="_blank"` : 'div';
  const endTag = actif ? 'a' : 'div';
  return `<${tag} class="reseau-card${actif ? '' : ' inactive'}">
    <div class="reseau-icone" style="background:${r.couleur}22;color:${r.couleur}">${r.icone}</div>
    <div class="reseau-info"><h3>${r.nom}</h3><p>${r.description}</p>${badge}</div>
  </${endTag}>`;
}

// ── Modal ─────────────────────────────────────────────────────

function injectModal() {
  const d = document.createElement('div');
  d.id = 'modal-overlay'; d.className = 'modal-overlay';
  d.innerHTML = `<div class="modal">
    <button class="modal-close" onclick="closeModal()">✕</button>
    <span class="modal-tag section-tag"></span>
    <h2 class="modal-title"></h2>
    <p class="modal-date modal-meta"></p>
    <div class="modal-note"></div>
    <div class="modal-body" style="margin-top:1.5rem"></div>
  </div>`;
  d.addEventListener('click', e => { if (e.target === d) closeModal(); });
  document.body.appendChild(d);
}

function openModal(avis) {
  const o = document.getElementById('modal-overlay');
  if (!o || !avis) return;
  o.querySelector('.modal-tag').textContent = `// ${avis.genre} · ${avis.plateforme}`;
  o.querySelector('.modal-title').textContent = avis.titre;
  o.querySelector('.modal-date').textContent = formatDate(avis.date);
  o.querySelector('.modal-note').innerHTML = etoiles(avis.note);
  o.querySelector('.modal-body').textContent = avis.texte;
  o.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal-overlay')?.classList.remove('open');
  document.body.style.overflow = '';
}

// ── PAGES ────────────────────────────────────────────────────

function renderAccueil() {
  const cnt = (id, n) => { const el = document.getElementById(id); if (el) animateCounter(el, n); };
  cnt('cnt-avis', DATA.avis.length);
  cnt('cnt-lp', DATA.letsplay.length);
  cnt('cnt-jeux', DATA.catalogue.length);
  cnt('cnt-rech', DATA.recherches.filter(r => r.statut === 'recherche').length);

  const ga = document.getElementById('recent-avis');
  if (ga) {
    const items = [...DATA.avis].sort((a,b) => new Date(b.date)-new Date(a.date)).slice(0,3);
    ga.innerHTML = items.map(cardAvis).join('');
    ga.querySelectorAll('.card').forEach(c => c.addEventListener('click', () => openModal(DATA.avis.find(a => a.id === +c.dataset.id))));
  }

  const gl = document.getElementById('recent-lp');
  if (gl) gl.innerHTML = DATA.letsplay.slice(0,3).map((lp,i) => rowLp(lp, i+1)).join('');

  const gr = document.getElementById('recent-rech');
  if (gr) gr.innerHTML = DATA.recherches.filter(r => r.statut === 'recherche').slice(0,3).map(cardRecherche).join('');
}

function renderAvis() {
  const grid = document.getElementById('avis-grid');
  const fb = document.getElementById('avis-filters');
  if (!grid) return;
  let filtre = 'tous';
  const render = () => {
    const items = filtre === 'tous' ? DATA.avis : DATA.avis.filter(a => a.genre === filtre);
    grid.innerHTML = items.map(cardAvis).join('');
    grid.querySelectorAll('.card').forEach(c => c.addEventListener('click', () => openModal(DATA.avis.find(a => a.id === +c.dataset.id))));
  };
  if (fb) {
    const genres = ['tous', ...new Set(DATA.avis.map(a => a.genre))];
    fb.innerHTML = genres.map(g => `<button class="filter-btn ${g==='tous'?'active':''}" data-g="${g}">${g==='tous'?'Tous':g}</button>`).join('');
    fb.querySelectorAll('.filter-btn').forEach(btn => btn.addEventListener('click', () => {
      fb.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active'); filtre = btn.dataset.g; render();
    }));
  }
  render();
}

function renderLetsPlay() {
  const grid = document.getElementById('lp-grid');
  const fb = document.getElementById('lp-filters');
  if (!grid) return;
  let filtre = 'tous';
  const render = () => {
    const items = filtre === 'tous' ? DATA.letsplay : DATA.letsplay.filter(lp => lp.statut === filtre);
    grid.innerHTML = items.map((lp, i) => `<div class="lp-item" style="animation-delay:${i*0.05}s">
      <span class="lp-num">${String(i+1).padStart(2,'0')}</span>
      <div class="lp-info">
        <h3>${lp.titre}</h3>
        <p>${lp.sous_titre}</p>
        <p style="margin-top:0.3rem">${lp.description}</p>
        ${lp.date_debut ? `<p style="margin-top:0.4rem;font-size:0.75rem;color:var(--text-muted)">Début : ${formatDate(lp.date_debut)}${lp.date_fin ? ' · Fin : '+formatDate(lp.date_fin) : ''}</p>` : ''}
      </div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:0.5rem">
        ${lp.lien ? `<a href="${lp.lien}" target="_blank" class="btn btn-primary" style="font-size:0.75rem;padding:0.4rem 1rem">Voir ▶</a>` : ''}
        <span class="lp-status ${lp.statut}">${formatStatut(lp.statut)}</span>
        ${lp.episode > 0 ? `<span style="font-size:0.75rem;color:var(--text-muted)">Ép. ${lp.episode}${lp.total_episodes?'/'+lp.total_episodes:''}</span>` : ''}
      </div>
    </div>`).join('');
  };
  if (fb) {
    ['tous','en-cours','termine','en-pause','prevu'].forEach((s, idx) => {
      const btn = document.createElement('button');
      btn.className = 'filter-btn' + (idx===0?' active':'');
      btn.dataset.s = s; btn.textContent = s==='tous'?'Tous':formatStatut(s);
      btn.addEventListener('click', () => { fb.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); filtre=s; render(); });
      fb.appendChild(btn);
    });
  }
  render();
}

function renderCatalogue() {
  const tbody = document.getElementById('catalogue-body');
  const fb = document.getElementById('cat-filters');
  const si = document.getElementById('cat-search');
  if (!tbody) return;
  let filtre = 'tous', sortKey = 'titre', sortAsc = true, search = '';

  const updateSummary = () => {
    const s = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
    s('sum-total', DATA.catalogue.length);
    s('sum-termines', DATA.catalogue.filter(j => ['termine','platine'].includes(j.statut)).length);
    s('sum-heures', DATA.catalogue.reduce((a,j) => a+(j.heures||0), 0));
    s('sum-platines', DATA.catalogue.filter(j => j.statut==='platine').length);
  };

  const render = () => {
    let items = DATA.catalogue.filter(j => {
      const fm = filtre==='tous'||j.statut===filtre||j.genre===filtre||j.plateforme===filtre;
      const sm = !search||j.titre.toLowerCase().includes(search)||j.genre.toLowerCase().includes(search);
      return fm && sm;
    }).sort((a,b) => {
      let va=a[sortKey], vb=b[sortKey];
      if (va==null) va=sortAsc?Infinity:-Infinity;
      if (vb==null) vb=sortAsc?Infinity:-Infinity;
      if (typeof va==='string') va=va.toLowerCase();
      if (typeof vb==='string') vb=vb.toLowerCase();
      return sortAsc?(va>vb?1:-1):(va<vb?1:-1);
    });
    tbody.innerHTML = items.length ? items.map(j => `<tr>
      <td><strong>${j.titre}</strong></td>
      <td><span class="tag ${j.genre}">${j.genre}</span></td>
      <td style="font-size:0.8rem;color:var(--text-muted)">${j.plateforme}</td>
      <td style="font-size:0.8rem;color:var(--text-muted)">${j.annee}</td>
      <td><span class="status-badge ${j.statut}">${formatStatut(j.statut)}</span></td>
      <td style="font-family:var(--font-mono);font-size:0.8rem;color:var(--text-muted)">${j.heures?j.heures+'h':'—'}</td>
      <td>${etoiles(j.note)}</td>
    </tr>`).join('') : '<tr><td colspan="7" style="text-align:center;color:var(--text-muted);padding:2rem">Aucun résultat.</td></tr>';
  };

  document.querySelectorAll('.catalogue-table th[data-sort]').forEach(th => th.addEventListener('click', () => {
    if (sortKey===th.dataset.sort) sortAsc=!sortAsc; else { sortKey=th.dataset.sort; sortAsc=true; } render();
  }));

  if (fb) {
    ['tous','platine','termine','en-cours','backlog','abandonne'].forEach((s,i) => {
      const btn = document.createElement('button');
      btn.className='filter-btn'+(i===0?' active':''); btn.dataset.s=s; btn.textContent=s==='tous'?'Tous':formatStatut(s);
      btn.addEventListener('click',()=>{ fb.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); filtre=s; render(); });
      fb.appendChild(btn);
    });
  }

  if (si) si.addEventListener('input', () => { search=si.value.toLowerCase().trim(); render(); });

  updateSummary(); render();
}

function renderRecherches() {
  const grid = document.getElementById('rech-grid');
  const fb = document.getElementById('rech-filters');
  if (!grid) return;
  let filtre = 'tous';

  const updateSummary = () => {
    const s=(id,v)=>{const el=document.getElementById(id);if(el)el.textContent=v;};
    s('rech-total', DATA.recherches.filter(r=>r.statut==='recherche').length);
    s('rech-trouves', DATA.recherches.filter(r=>['trouve','commande'].includes(r.statut)).length);
    s('rech-budget', DATA.recherches.filter(r=>r.prix_max).reduce((a,r)=>a+r.prix_max,0));
  };

  const render = () => {
    const items = filtre==='tous' ? DATA.recherches : DATA.recherches.filter(r=>r.statut===filtre||r.priorite===filtre);
    grid.innerHTML = items.map(cardRecherche).join('') || '<p style="color:var(--text-muted)">Aucun résultat.</p>';
  };

  if (fb) {
    [['tous','Tous'],['recherche','Recherché'],['commande','Commandé'],['trouve','Trouvé'],['haute','Priorité haute'],['moyenne','Priorité moyenne'],['basse','Priorité basse']].forEach(([s,l],i)=>{
      const btn=document.createElement('button');
      btn.className='filter-btn'+(i===0?' active':''); btn.dataset.s=s; btn.textContent=l;
      btn.addEventListener('click',()=>{ fb.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); filtre=s; render(); });
      fb.appendChild(btn);
    });
  }
  updateSummary(); render();
}

function renderVideos() {
  const grid = document.getElementById('vid-grid');
  const fb = document.getElementById('vid-filters');
  if (!grid) return;
  let filtre = 'tous';
  const render = () => {
    const items = filtre==='tous' ? DATA.videos : DATA.videos.filter(v=>v.type===filtre);
    grid.innerHTML = items.map(cardVideo).join('') || '<p style="color:var(--text-muted)">Aucune vidéo.</p>';
  };
  if (fb) {
    ['tous','letsplay','test','top','conseil','autre'].forEach((s,i)=>{
      const btn=document.createElement('button');
      btn.className='filter-btn'+(i===0?' active':''); btn.dataset.s=s; btn.textContent=s==='tous'?'Tous':s;
      btn.addEventListener('click',()=>{ fb.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); filtre=s; render(); });
      fb.appendChild(btn);
    });
  }
  render();
}

function renderReseaux() {
  const grid = document.getElementById('reseaux-grid');
  if (!grid) return;
  const actifs = DATA.reseaux.filter(r => r.lien);
  const inactifs = DATA.reseaux.filter(r => !r.lien);
  grid.innerHTML = [...actifs, ...inactifs].map(cardReseau).join('');
}

// ── Init ──────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  injectModal();
  const page = document.body.dataset.page || '';
  if (!page || page==='accueil') renderAccueil();
  if (page==='avis') renderAvis();
  if (page==='letsplay') renderLetsPlay();
  if (page==='catalogue') renderCatalogue();
  if (page==='recherches') renderRecherches();
  if (page==='videos') renderVideos();
  if (page==='reseaux') renderReseaux();
});
