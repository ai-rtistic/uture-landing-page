// uture — interactive layer (embers, cursor aura, spotlight, tilt, magnetic, scrollspy, progress)
(function () {
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- scroll progress bar ---------- */
  function initScrollProgress() {
    const bar = document.createElement('div');
    bar.className = 'scroll-progress';
    document.body.appendChild(bar);
    let ticking = false;
    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  /* ---------- hero ember particles ---------- */
  function initHeroEmbers() {
    const hero = document.querySelector('.hero');
    const bg = hero && hero.querySelector('.hero-bg');
    if (!bg) return;

    const canvas = document.createElement('canvas');
    canvas.className = 'hero-embers';
    bg.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    let w = 0, h = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = bg.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const spawn = (anywhere) => ({
      x: Math.random() * w,
      y: anywhere ? Math.random() * h : h + 12,
      r: 0.7 + Math.random() * 1.7,
      vy: 0.1 + Math.random() * 0.32,
      vx: (Math.random() - 0.5) * 0.1,
      tw: Math.random() * Math.PI * 2,
      tws: 0.006 + Math.random() * 0.018,
      hue: 18 + Math.random() * 16,
    });
    const count = Math.round(Math.min(70, Math.max(28, w / 18)));
    const parts = Array.from({ length: count }, () => spawn(true));

    let mx = -9999, my = -9999;
    if (finePointer) {
      hero.addEventListener('pointermove', (e) => {
        const rect = bg.getBoundingClientRect();
        mx = e.clientX - rect.left;
        my = e.clientY - rect.top;
      }, { passive: true });
      hero.addEventListener('pointerleave', () => { mx = -9999; my = -9999; });
    }

    let inView = true, raf = null;
    const tick = () => {
      if (!inView || document.hidden) { raf = null; return; }
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.y -= p.vy;
        p.x += p.vx;
        p.tw += p.tws;

        const dx = p.x - mx, dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let near = 0;
        if (dist < 180) {
          near = 1 - dist / 180;
          const push = near * near * 2.4;
          p.x += (dx / (dist || 1)) * push;
          p.y += (dy / (dist || 1)) * push;
        }
        if (p.y < -14 || p.x < -14 || p.x > w + 14) Object.assign(p, spawn(false));

        const alpha = 0.14 + 0.42 * Math.abs(Math.sin(p.tw));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r + near * 0.9, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 95%, ${58 + near * 20}%, ${Math.min(0.85, alpha + near * 0.5)})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    const start = () => { if (!raf) raf = requestAnimationFrame(tick); };

    new IntersectionObserver((entries) => {
      inView = entries[0].isIntersecting;
      if (inView) start();
    }).observe(hero);
    document.addEventListener('visibilitychange', () => { if (!document.hidden) start(); });
    start();
  }

  /* ---------- card spotlight + 3D tilt (shared delegated handler) ---------- */
  const SPOT_SEL = '.concern-card, .fde-card, .bento-card, .sol1-card, .case-card, .stat-cell';
  const TILT_SEL = '.proposal-card, .fde-card';
  function initCardEffects() {
    document.addEventListener('pointermove', (e) => {
      if (!e.target || !e.target.closest) return;
      const spot = e.target.closest(SPOT_SEL);
      if (spot) {
        const r = spot.getBoundingClientRect();
        spot.style.setProperty('--mx', (e.clientX - r.left).toFixed(1) + 'px');
        spot.style.setProperty('--my', (e.clientY - r.top).toFixed(1) + 'px');
      }
      const tilt = e.target.closest(TILT_SEL);
      if (tilt) {
        const r = tilt.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        tilt.style.setProperty('--ry', (px * 5).toFixed(2) + 'deg');
        tilt.style.setProperty('--rx', (-py * 5).toFixed(2) + 'deg');
      }
    }, { passive: true });
    document.addEventListener('pointerout', (e) => {
      if (!e.target || !e.target.closest) return;
      const tilt = e.target.closest(TILT_SEL);
      if (tilt && (!e.relatedTarget || !tilt.contains(e.relatedTarget))) {
        tilt.style.setProperty('--rx', '0deg');
        tilt.style.setProperty('--ry', '0deg');
      }
    }, { passive: true });
  }

  /* ---------- magnetic buttons ---------- */
  const MAG_SEL = '.btn-primary, .nav-cta';
  function initMagnetic() {
    document.addEventListener('pointermove', (e) => {
      if (!e.target || !e.target.closest) return;
      const el = e.target.closest(MAG_SEL);
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      el.style.setProperty('--magx', (dx * 0.16).toFixed(1) + 'px');
      el.style.setProperty('--magy', (dy * 0.22).toFixed(1) + 'px');
    }, { passive: true });
    document.addEventListener('pointerout', (e) => {
      if (!e.target || !e.target.closest) return;
      const el = e.target.closest(MAG_SEL);
      if (el && (!e.relatedTarget || !el.contains(e.relatedTarget))) {
        el.style.setProperty('--magx', '0px');
        el.style.setProperty('--magy', '0px');
      }
    }, { passive: true });
  }

  /* ---------- nav scrollspy ---------- */
  function initScrollSpy() {
    const links = Array.from(document.querySelectorAll('.nav-links a')).filter((a) => {
      const href = a.getAttribute('href') || '';
      return href.startsWith('#') && href.length > 1;
    });
    if (!links.length) return;
    const byId = {};
    links.forEach((a) => { byId[a.getAttribute('href').slice(1)] = a; });
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        links.forEach((l) => l.classList.remove('active'));
        const link = byId[en.target.id];
        if (link) link.classList.add('active');
      });
    }, { rootMargin: '-35% 0px -55% 0px' });
    Object.keys(byId).forEach((id) => {
      const section = document.getElementById(id);
      if (section) io.observe(section);
    });
  }

  /* ---------- process timeline fill ---------- */
  function initProcessProgress() {
    const list = document.querySelector('.process-list');
    if (!list) return;
    const fill = document.createElement('div');
    fill.className = 'process-progress';
    list.appendChild(fill);
    let ticking = false;
    const update = () => {
      const r = list.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (window.innerHeight * 0.62 - r.top) / r.height));
      fill.style.transform = `scaleY(${p.toFixed(4)})`;
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  /* ---------- cases drag-to-scroll ---------- */
  function initCasesDrag() {
    const track = document.querySelector('.cases-track');
    if (!track) return;
    let down = false, startX = 0, startLeft = 0;
    track.addEventListener('pointerdown', (e) => {
      if (e.pointerType !== 'mouse') return;
      down = true;
      startX = e.clientX;
      startLeft = track.scrollLeft;
      track.classList.add('dragging');
      track.setPointerCapture(e.pointerId);
    });
    track.addEventListener('pointermove', (e) => {
      if (!down) return;
      track.scrollLeft = startLeft - (e.clientX - startX);
    });
    const end = () => { down = false; track.classList.remove('dragging'); };
    track.addEventListener('pointerup', end);
    track.addEventListener('pointercancel', end);
  }

  window.initInteractive = function initInteractive() {
    if (window.__interactiveInit) return;
    window.__interactiveInit = true;
    initScrollProgress();
    initScrollSpy();
    initProcessProgress();
    if (!reducedMotion) {
      initHeroEmbers();
      if (finePointer) {
        initCardEffects();
        initMagnetic();
        initCasesDrag();
      }
    }
  };
})();
