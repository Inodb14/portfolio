/* ==========================================================
   Shared behaviour for every page:
   header, footer, theme, menu, animations, and page renderers.
   ========================================================== */
(function () {
  'use strict';
  var C = window.SITE_CONFIG || {};
  var page = document.body.getAttribute('data-page') || '';

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  window.esc = esc;

  /* ---------- icons (stroke SVG) ---------- */
  var P = {
    menu: 'M4 6h16M4 12h16M4 18h16', close: 'M6 6l12 12M18 6 6 18',
    sun: 'M12 4V2M12 22v-2M4.9 4.9 3.5 3.5M20.5 20.5l-1.4-1.4M4 12H2M22 12h-2M4.9 19.1l-1.4 1.4M20.5 3.5l-1.4 1.4M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z',
    moon: 'M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z',
    linkedin: 'M3 3h18v18H3zM8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7',
    mail: 'M3 5h18v14H3zM3 7l9 6 9-6', phone: 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2',
    github: 'M9 19c-4 1.5-4-2-6-2.5M15 22v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V22',
    download: 'M12 3v12M7 10l5 5 5-5M5 21h14', up: 'M12 19V5M5 12l7-7 7 7', arrow: 'M5 12h14M13 6l6 6-6 6',
    doc: 'M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5M9 13h6M9 17h6',
    chart: 'M4 20V12M10 20V6M16 20v-9M22 20H2', flow: 'M4 5h6v5H4zM14 14h6v5h-6zM7 10v4a3 3 0 0 0 3 3h4',
    team: 'M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 20c0-3 3-5 6-5s6 2 6 5M17 11a2.5 2.5 0 1 0 0-5M21 19c0-2-1.5-3.5-3.5-4',
    home: 'M3 11 12 4l9 7M5 10v10h14V10M10 20v-6h4v6', bars: 'M4 20V12M10 20V6M16 20v-9M22 20H2',
    laptop: 'M4 5h16v10H4zM2 19h20', bag: 'M3 8h18v12H3zM8 8V5h8v3M3 13h18',
    trend: 'm3 17 6-6 4 4 8-8M14 7h7v7', search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-5-5',
    pin: 'M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12zM12 6.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z',
    globe: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18',
    grad: 'm2 9 10-5 10 5-10 5zM6 11v5c3 2 9 2 12 0v-5', check: 'm5 12 5 5 9-10'
  };
  function icon(name, size, sw) {
    return '<svg width="' + (size || 20) + '" height="' + (size || 20) + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + (sw || 1.8) + '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="' + P[name] + '"/></svg>';
  }
  window.icon = icon;

  /* ---------- theme ---------- */
  var root = document.documentElement;
  function storedTheme() { try { return localStorage.getItem('theme'); } catch (e) { return null; } }
  function isDark() {
    var t = root.getAttribute('data-theme');
    if (t) return t === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  var st = storedTheme(); if (st) root.setAttribute('data-theme', st);

  /* ---------- header ---------- */
  var links = [
    ['index.html', 'Home', 'home'], ['about.html', 'About', 'about'], ['experience.html', 'Experience', 'experience'],
    ['projects.html', 'Projects', 'projects'], ['services.html', 'Services', 'services'], ['contact.html', 'Contact', 'contact']
  ];
  var activeKey = page === 'case' ? 'projects' : page;
  var header = document.getElementById('site-header');
  if (header) {
    header.className = 'site-header';
    header.innerHTML =
      '<div class="wrap nav">' +
      '<a class="brand" href="index.html" aria-label="' + esc(C.name) + ', home"><span class="brand-mark">I<span>S</span></span>' +
      '<span class="brand-name"><strong>' + esc(C.name) + '</strong><small>' + esc(C.role) + '</small></span></a>' +
      '<nav aria-label="Main"><ul class="nav-links" id="nav-links">' +
      links.map(function (l) { return '<li><a href="' + l[0] + '"' + (l[2] === activeKey ? ' class="active" aria-current="page"' : '') + '>' + l[1] + '</a></li>'; }).join('') +
      '</ul></nav>' +
      '<div class="nav-actions">' +
      (C.cvUrl ? '<a class="btn btn-primary btn-sm btn-cv" href="' + esc(C.cvUrl) + '" download>' + icon('download', 16, 2) + 'Download CV</a>' : '') +
      '<button class="icon-btn lang-btn" id="lang-btn" type="button" data-no-i18n aria-label="Passer en français"><span class="on">EN</span><span>FR</span></button>' +
      '<button class="icon-btn" id="theme-btn" type="button" aria-label="Switch light or dark mode"></button>' +
      '<button class="icon-btn menu-btn" id="menu-btn" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="nav-links">' + icon('menu', 22) + '</button>' +
      '</div></div>';

    var themeBtn = document.getElementById('theme-btn');
    var paintTheme = function () { themeBtn.innerHTML = icon(isDark() ? 'sun' : 'moon', 20); };
    paintTheme();
    themeBtn.addEventListener('click', function () {
      var next = isDark() ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      paintTheme();
    });

    var menuBtn = document.getElementById('menu-btn');
    var navList = document.getElementById('nav-links');
    var setMenu = function (open) {
      navList.classList.toggle('open', open);
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      menuBtn.innerHTML = icon(open ? 'close' : 'menu', 22);
    };
    menuBtn.addEventListener('click', function () { setMenu(!navList.classList.contains('open')); });
    navList.addEventListener('click', function (e) { if (e.target.tagName === 'A') setMenu(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  }

  /* ---------- footer ---------- */
  var footer = document.getElementById('site-footer');
  if (footer) {
    footer.className = 'site-footer';
    footer.innerHTML =
      '<div class="wrap"><div class="foot-top">' +
      '<a class="brand" href="index.html"><span class="brand-mark" style="font-size:30px">I<span>S</span></span><span class="brand-name"><strong>' + esc(C.name) + '</strong><small>' + esc(C.role) + '</small></span></a>' +
      '<nav aria-label="Footer" class="foot-nav">' + links.map(function (l) { return '<a href="' + l[0] + '">' + l[1] + '</a>'; }).join('') + '</nav>' +
      '<div class="socials">' +
      '<a href="' + esc(C.linkedin) + '" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">' + icon('linkedin', 18) + '</a>' +
      '<a href="mailto:' + esc(C.email) + '" aria-label="Email">' + icon('mail', 18) + '</a>' +
      (C.github ? '<a href="' + esc(C.github) + '" target="_blank" rel="noopener noreferrer" aria-label="GitHub">' + icon('github', 18) + '</a>' : '') +
      (C.cvUrl ? '<a href="' + esc(C.cvUrl) + '" download aria-label="Download CV">' + icon('download', 18) + '</a>' : '') +
      '</div></div>' +
      '<div class="foot-bottom"><span style="font-style:italic">“Better analysis. Smarter decisions. Greater impact.”</span>' +
      '<span>' + esc(C.location) + ' · © ' + new Date().getFullYear() + ' ' + esc(C.name) + '</span></div></div>';
  }

  /* ---------- CTA band ---------- */
  var cta = document.getElementById('cta-band');
  if (cta) {
    cta.className = 'cta-band';
    cta.innerHTML = '<div class="wrap"><div class="stack" style="gap:6px"><h2>Have a role or a project in mind?</h2><p>I’m open to Business Analyst and BI opportunities in the UAE and beyond.</p></div>' +
      '<a class="btn btn-primary" href="contact.html">Let’s talk ' + icon('arrow', 18, 2) + '</a></div>';
  }

  /* ---------- animations ---------- */
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      var el = en.target;
      el.classList.add('in');
      io.unobserve(el);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }) : null;

  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    if (isNaN(target)) return;
    var start = null, dur = 1400;
    function step(ts) {
      if (!start) start = ts;
      var k = Math.min((ts - start) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - k, 3))) + suffix;
      if (k < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var cio = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      var el = en.target;
      if (el.hasAttribute('data-count')) animateCount(el);
      el.querySelectorAll && el.querySelectorAll('[data-w]').forEach(function (d) { d.style.width = d.getAttribute('data-w'); });
      cio.unobserve(el);
    });
  }, { threshold: 0.3 }) : null;

  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function observe(scope) {
    var s = scope || document;
    if (reduced) {
      s.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
      s.querySelectorAll('[data-w]').forEach(function (d) { d.style.width = d.getAttribute('data-w'); });
      return;
    }
    s.querySelectorAll('.reveal:not(.in)').forEach(function (el) { io ? io.observe(el) : el.classList.add('in'); });
    s.querySelectorAll('[data-count]').forEach(function (el) { cio ? cio.observe(el) : animateCount(el); });
    s.querySelectorAll('.bar').forEach(function (el) {
      if (cio) cio.observe(el);
      else el.querySelectorAll('[data-w]').forEach(function (d) { d.style.width = d.getAttribute('data-w'); });
    });
  }

  /* ---------- project cards ---------- */
  var THUMBS = {
    brd: '<svg viewBox="0 0 300 150" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="300" height="150" fill="#eaf2f8"/><rect x="36" y="14" width="108" height="122" rx="6" fill="#fff" stroke="#c4d4de"/><rect x="36" y="14" width="108" height="22" rx="6" fill="#1f4e79"/><text x="48" y="29" font-family="DM Sans,sans-serif" font-size="10" font-weight="800" fill="#fff" letter-spacing="1">BRD</text><g fill="#d4e1ec"><rect x="48" y="44" width="84" height="5" rx="2"/><rect x="48" y="53" width="66" height="5" rx="2"/></g><text x="48" y="72" font-family="DM Sans,sans-serif" font-size="8" font-weight="800" fill="#1f4e79">OBJECTIVES</text><g fill="#c4d4de"><rect x="48" y="78" width="76" height="4" rx="2"/><rect x="48" y="86" width="60" height="4" rx="2"/></g><text x="48" y="105" font-family="DM Sans,sans-serif" font-size="8" font-weight="800" fill="#1f4e79">REQUIREMENTS</text><g font-family="DM Sans,sans-serif" font-size="8" font-weight="800" text-anchor="middle"><rect x="48" y="111" width="18" height="12" rx="3" fill="#0b7d77"/><text x="57" y="120" fill="#fff">M</text><rect x="70" y="111" width="18" height="12" rx="3" fill="#1f4e79"/><text x="79" y="120" fill="#fff">S</text><rect x="92" y="111" width="18" height="12" rx="3" fill="#5b8db8"/><text x="101" y="120" fill="#fff">C</text><rect x="114" y="111" width="18" height="12" rx="3" fill="#d4e1ec"/><text x="123" y="120" fill="#1f4e79">W</text></g><g stroke="#9db3c6" stroke-width="1.5"><path d="M220 75 182 42M220 75l38-33M220 75l-38 33M220 75l38 33"/></g><circle cx="220" cy="75" r="20" fill="#1f4e79"/><text x="220" y="78.5" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="9" font-weight="800" fill="#fff">NEEDS</text><g fill="#fff" stroke="#1f4e79" stroke-width="1.5"><circle cx="182" cy="42" r="12"/><circle cx="258" cy="42" r="12"/><circle cx="182" cy="108" r="12"/><circle cx="258" cy="108" r="12"/></g><g fill="#0b7d77"><circle cx="182" cy="39" r="3.5"/><circle cx="258" cy="39" r="3.5"/><circle cx="182" cy="105" r="3.5"/><circle cx="258" cy="105" r="3.5"/></g></svg>',
    frd: '<svg viewBox="0 0 300 150" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="300" height="150" fill="#e6f5f1"/><g fill="none" stroke="#0b6b66" stroke-width="2.5" stroke-linecap="round"><circle cx="46" cy="50" r="9"/><path d="M46 59v31M30 70h32M46 90l-12 22M46 90l12 22"/></g><text x="46" y="128" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="9" font-weight="700" fill="#0b4f4b">User</text><rect x="104" y="18" width="184" height="114" rx="8" fill="#fff" stroke="#9fd9d3" stroke-width="1.5"/><text x="114" y="32" font-family="DM Sans,sans-serif" font-size="8" font-weight="800" fill="#52677a">ACTORS · FLOWS</text><g stroke="#52677a" stroke-width="1.3"><path d="M64 68l56-16M64 74l56 16"/></g><g fill="#e3f4f2" stroke="#0b7d77" stroke-width="1.5"><ellipse cx="160" cy="52" rx="40" ry="13"/><ellipse cx="160" cy="90" rx="40" ry="13"/><ellipse cx="248" cy="52" rx="32" ry="13"/><ellipse cx="248" cy="90" rx="32" ry="13"/></g><g font-family="DM Sans,sans-serif" font-size="9" font-weight="700" fill="#0b4f4b" text-anchor="middle"><text x="160" y="55">Register</text><text x="160" y="93">Book event</text><text x="248" y="55">Pay</text><text x="248" y="93">Check-in</text></g><g fill="#0b7d77"><rect x="116" y="112" width="10" height="10" rx="2"/><rect x="130" y="112" width="10" height="10" rx="2"/><rect x="144" y="112" width="10" height="10" rx="2" fill="#d4e1ec"/><rect x="158" y="112" width="10" height="10" rx="2"/><rect x="172" y="112" width="10" height="10" rx="2"/></g><text x="190" y="121" font-family="DM Sans,sans-serif" font-size="8" font-weight="800" fill="#52677a">TRACEABILITY</text></svg>',
    hotel: '<svg viewBox="0 0 300 150" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="300" height="150" fill="#0f2a44"/><rect x="22" y="44" width="84" height="90" rx="3" fill="#1d4466"/><rect x="34" y="26" width="60" height="16" rx="3" fill="#5fd3c8"/><text x="64" y="38" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="10" font-weight="800" fill="#0f2a44" letter-spacing="2">HOTEL</text><g fill="#4fb3ff"><rect x="32" y="54" width="12" height="10" rx="1"/><rect x="58" y="54" width="12" height="10" rx="1"/><rect x="84" y="54" width="12" height="10" rx="1"/><rect x="32" y="74" width="12" height="10" rx="1"/><rect x="84" y="74" width="12" height="10" rx="1"/><rect x="58" y="94" width="12" height="10" rx="1"/></g><rect x="56" y="114" width="16" height="20" fill="#5fd3c8"/><rect x="124" y="22" width="160" height="110" rx="8" fill="#1d4466"/><text x="136" y="40" font-family="DM Sans,sans-serif" font-size="10" font-weight="700" fill="#fff">BOOKINGS · CITY · ROOM TYPE</text><g fill="#2c5679"><rect x="136" y="52" width="16" height="14" rx="2"/><rect x="156" y="52" width="16" height="14" rx="2"/><rect x="196" y="70" width="16" height="14" rx="2"/><rect x="256" y="52" width="16" height="14" rx="2"/><rect x="136" y="88" width="16" height="14" rx="2"/><rect x="216" y="106" width="16" height="14" rx="2"/></g><g fill="#4fb3ff"><rect x="176" y="52" width="16" height="14" rx="2"/><rect x="216" y="52" width="16" height="14" rx="2"/><rect x="156" y="70" width="16" height="14" rx="2"/><rect x="236" y="88" width="16" height="14" rx="2"/><rect x="176" y="106" width="16" height="14" rx="2"/></g><g fill="#5fd3c8"><rect x="236" y="52" width="16" height="14" rx="2"/><rect x="256" y="70" width="16" height="14" rx="2"/><rect x="156" y="88" width="16" height="14" rx="2"/><rect x="196" y="88" width="16" height="14" rx="2"/><rect x="256" y="106" width="16" height="14" rx="2"/></g></svg>',
    process: '<svg viewBox="0 0 300 150" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="300" height="150" fill="#f0f5f8"/><text x="12" y="51" font-family="DM Sans,sans-serif" font-size="9" font-weight="800" fill="#52677a">AS-IS</text><text x="12" y="109" font-family="DM Sans,sans-serif" font-size="9" font-weight="800" fill="#52677a">TO-BE</text><path d="M12 76h276" stroke="#c4d4de" stroke-dasharray="4 4"/><g fill="#fff" stroke="#1f4e79" stroke-width="1.5"><rect x="78" y="36" width="50" height="24" rx="5"/><rect x="140" y="36" width="50" height="24" rx="5"/><rect x="240" y="36" width="48" height="24" rx="5"/></g><path d="M214 34l14 14-14 14-14-14z" fill="#e7a33e"/><g fill="#0b7d77"><rect x="78" y="94" width="70" height="24" rx="5"/><rect x="162" y="94" width="70" height="24" rx="5"/></g></svg>',
    seg: '<svg viewBox="0 0 300 150" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="300" height="150" fill="#13202e"/><g fill="#5fd3c8"><circle cx="70" cy="94" r="4"/><circle cx="82" cy="104" r="4"/><circle cx="90" cy="88" r="4"/></g><g fill="#ffd166"><circle cx="150" cy="54" r="4"/><circle cx="162" cy="48" r="4"/><circle cx="168" cy="62" r="4"/></g><g fill="#4fb3ff"><circle cx="230" cy="92" r="4"/><circle cx="242" cy="86" r="4"/><circle cx="248" cy="100" r="4"/></g></svg>'
  };

  function cardHTML(p, i) {
    var cat = window.CATEGORIES[p.category] || { label: p.category, cls: '' };
    var media = p.card.image
      ? '<img src="' + esc(p.card.image) + '" alt="" loading="lazy">'
      : (THUMBS[p.card.thumb] || '');
    return '<a class="card pcard reveal d' + (i % 3 + 1) + '" href="project.html?id=' + encodeURIComponent(p.id) + '">' +
      '<div class="thumb">' + media + '</div>' +
      '<div class="pbody"><div class="pmeta"><span class="tag ' + cat.cls + '">' + esc(cat.label) + '</span><small>' + esc(p.context) + '</small></div>' +
      '<h3>' + esc(p.card.title) + '</h3><p>' + esc(p.card.desc) + '</p>' +
      '<div class="result">' + icon('trend', 16, 2.2) + esc(p.card.result) + '</div>' +
      '<div class="tools">' + p.card.tools.map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('') + '</div>' +
      '<div class="cta">Read case study →</div></div></a>';
  }
  function published() { return (window.PROJECTS || []).filter(function (p) { return p.published; }); }

  /* ---------- page: home ---------- */
  if (page === 'home') {
    var fp = document.getElementById('featured');
    if (fp) fp.innerHTML = published().filter(function (p) { return p.featured; }).slice(0, 4).map(cardHTML).join('');
    var sv = document.getElementById('services');
    if (sv) sv.innerHTML = window.SERVICES.map(function (s, i) {
      return '<a class="card feature reveal d' + (i + 1) + '" href="' + esc(s.link) + '" style="text-decoration:none;color:inherit">' +
        '<div class="ico">' + icon(s.icon, 26) + '</div><div><h3 style="font-size:19px">' + esc(s.title) + '</h3><small style="color:var(--muted)">' + esc(s.sub) + '</small></div>' +
        '<ul>' + s.items.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' +
        '<span class="link-arrow" style="color:var(--teal);margin-top:auto">See an example <span>→</span></span></a>';
    }).join('');
    var sk = document.getElementById('skills');
    if (sk) sk.innerHTML = window.SKILLS.map(function (g, i) {
      return '<div class="card feature reveal d' + (i + 1) + '"><div class="ico">' + icon(g.icon, 26) + '</div><h3 style="font-size:19px">' + esc(g.name) + '</h3>' +
        '<div class="skill-list">' + g.items.map(function (x) { return '<span class="chip">' + esc(x) + '</span>'; }).join('') + '</div></div>';
    }).join('');
    var ha = document.querySelector('.hero-actions');
    if (ha && C.cvUrl) ha.insertAdjacentHTML('beforeend', '<a class="btn btn-outline" href="' + esc(C.cvUrl) + '" download>' + icon('download', 18, 2) + 'Download my CV</a>');
    var pc = document.getElementById('project-count');
    if (pc) pc.setAttribute('data-count', published().length);

    // typing effect
    var typed = document.getElementById('typed');
    if (typed && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      var words = ['Business Analyst', 'Business Intelligence', 'Power BI · Excel · SQL', 'Requirements · BRD · FRD'];
      var wi = 0, ci = 0, del = false;
      (function tick() {
        var w = window.tr ? window.tr(words[wi]) : words[wi];
        typed.textContent = w.slice(0, ci);
        if (!del && ci < w.length) { ci++; setTimeout(tick, 70); }
        else if (!del) { del = true; setTimeout(tick, 1600); }
        else if (ci > 0) { ci--; setTimeout(tick, 35); }
        else { del = false; wi = (wi + 1) % words.length; setTimeout(tick, 300); }
      })();
    }
  }

  /* ---------- page: projects ---------- */
  if (page === 'projects') {
    var grid = document.getElementById('project-grid');
    var filterBox = document.getElementById('filters');
    var q = document.getElementById('project-search');
    var state = { cat: 'all', text: '' };
    try { var hashCat = location.hash.replace('#', ''); if (window.CATEGORIES[hashCat]) state.cat = hashCat; } catch (e) {}
    var all = published();
    var cats = [['all', 'All']].concat(Object.keys(window.CATEGORIES).map(function (k) { return [k, window.CATEGORIES[k].label]; }));
    function renderFilters() {
      filterBox.innerHTML = cats.map(function (c) {
        var n = c[0] === 'all' ? all.length : all.filter(function (p) { return p.category === c[0]; }).length;
        if (!n) return '';
        return '<button type="button" class="filter-btn" data-cat="' + c[0] + '" aria-pressed="' + (state.cat === c[0]) + '">' + esc(c[1]) + ' <span style="opacity:.7">(' + n + ')</span></button>';
      }).join('');
    }
    function renderGrid() {
      var t = state.text.toLowerCase();
      var list = all.filter(function (p) {
        if (state.cat !== 'all' && p.category !== state.cat) return false;
        if (!t) return true;
        var tx = window.tr || function (x) { return x; };
        var hay = p.card.title + ' ' + p.card.desc + ' ' + p.card.tools.join(' ') + ' ' + p.context;
        hay += ' ' + tx(p.card.title) + ' ' + tx(p.card.desc) + ' ' + tx(p.context);
        return hay.toLowerCase().indexOf(t) > -1;
      });
      grid.innerHTML = list.length ? list.map(cardHTML).join('') : '<p class="empty">No project matches your search.</p>';
      observe(grid);
    }
    filterBox.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-cat]'); if (!b) return;
      state.cat = b.getAttribute('data-cat'); renderFilters(); renderGrid();
      try { history.replaceState(null, '', state.cat === 'all' ? 'projects.html' : '#' + state.cat); } catch (err) {}
    });
    if (q) q.addEventListener('input', function () { state.text = q.value.trim(); renderGrid(); });
    renderFilters(); renderGrid();
  }

  /* ---------- page: experience ---------- */
  if (page === 'experience') {
    var tl = document.getElementById('timeline');
    if (tl) tl.innerHTML = window.EXPERIENCE.map(function (j, i) {
      return '<article class="job reveal d' + (i % 3 + 1) + '"><div class="dot">' + icon(j.icon, 22) + '</div><div class="card">' +
        '<div class="job-top"><div><h3>' + esc(j.title) + '</h3><div class="org">' + esc(j.org) + ' <span style="color:var(--muted);font-weight:500">· ' + esc(j.place) + '</span></div></div><div class="dates">' + esc(j.dates) + '</div></div>' +
        '<div class="chips" style="margin-top:10px">' + j.tags.map(function (t) { return '<span class="chip">' + esc(t) + '</span>'; }).join('') + '</div>' +
        '<ul>' + j.points.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') + '</ul></div></article>';
    }).join('');
    var tg = document.getElementById('tools');
    if (tg) tg.innerHTML = window.TOOLS.map(function (t, i) {
      return '<div class="box tool reveal d' + (i % 3 + 1) + '"><i style="background:' + esc(t.color) + '">' + esc(t.abbr) + '</i><b style="color:var(--heading)">' + esc(t.name) + '</b></div>';
    }).join('');
  }

  /* ---------- page: services ---------- */
  if (page === 'services') {
    var fl = document.getElementById('freelance');
    if (fl) fl.innerHTML = (window.FREELANCE || []).map(function (f, i) {
      return '<div class="card feature reveal d' + (i + 1) + '">' +
        '<div class="ico">' + icon(f.icon, 26) + '</div>' +
        '<h3 style="font-size:20px">' + esc(f.title) + '</h3>' +
        '<div><small style="font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.5px">For</small><p style="color:var(--text-2);font-size:15px;margin-top:4px">' + esc(f.who) + '</p></div>' +
        '<div><small style="font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.5px">What you get</small><ul class="check" style="margin-top:10px;font-size:15px">' + f.get.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul></div>' +
        '<a class="link-arrow" style="color:var(--teal)" href="' + esc(f.example) + '">' + esc(f.exampleLabel) + ' <span>→</span></a>' +
        '<a class="btn btn-primary" style="margin-top:auto;align-self:flex-start" href="contact.html?subject=' + encodeURIComponent(f.subject) + '">Request a quote</a></div>';
    }).join('');
  }

  /* ---------- page: about ---------- */
  if (page === 'about') {
    var ed = document.getElementById('education');
    if (ed) ed.innerHTML = window.EDUCATION.map(function (e) {
      return '<div class="edu reveal"><div class="ico">' + icon('grad', 22) + '</div><div><b style="color:var(--heading)">' + esc(e.t) + '</b><div style="color:var(--teal);font-size:15px">' + esc(e.org) + '</div><small style="color:var(--muted)">' + esc(e.y) + (e.note ? ' · ' + esc(e.note) : '') + '</small></div></div>';
    }).join('');
  }

  /* ---------- page: case study ---------- */
  if (page === 'case') renderCase();

  function renderCase() {
    var id = new URLSearchParams(location.search).get('id');
    var list = published();
    var idx = -1;
    for (var i = 0; i < list.length; i++) if (list[i].id === id) idx = i;
    var mount = document.getElementById('case');
    if (idx < 0) {
      document.title = 'Project not found · ' + C.name;
      mount.innerHTML = '<section class="page-hero"><div class="wrap stack"><h1>Project not found</h1><p class="lead">This project does not exist or is not published yet.</p><a class="btn btn-primary" style="align-self:flex-start" href="projects.html">See all projects</a></div></section>';
      return;
    }
    var p = list[idx];
    var cat = window.CATEGORIES[p.category];
    document.title = p.card.title + ' · ' + C.name;
    var md = document.querySelector('meta[name="description"]'); if (md) md.setAttribute('content', p.intro);

    var h = '<section class="page-hero"><div class="wrap stack-lg">' +
      '<div class="stack"><a class="back" href="projects.html">← All projects</a>' +
      '<span class="tag ' + cat.cls + '">' + esc(p.tagline) + '</span>' +
      '<h1>' + esc(p.title) + '<br><span class="accent">' + esc(p.accent) + '</span></h1>' +
      '<p class="lead">' + esc(p.intro) + '</p></div>' +
      (p.meta && p.meta.length ? '<div class="meta-grid">' + p.meta.map(function (m) { return '<div class="box"><small>' + esc(m.k) + '</small><b>' + esc(m.v) + '</b></div>'; }).join('') + '</div>' : '') +
      (p.heroStats ? '<div class="stats c3">' + p.heroStats.map(statHTML).join('') + '</div>' : '') +
      (p.heroImage ? '<figure style="margin:0" class="reveal"><img class="shot" src="' + esc(p.heroImage.src) + '" alt="' + esc(p.heroImage.alt) + '"><figcaption class="shot-cap">Click the image to enlarge</figcaption></figure>' : '') +
      '</div></section>';

    p.sections.forEach(function (s) { h += sectionHTML(s); });

    // next / previous
    var prev = list[(idx - 1 + list.length) % list.length], next = list[(idx + 1) % list.length];
    h += '<section class="section tight"><div class="wrap grid g2 next-grid">' +
      navCard(prev, '← Previous project') + navCard(next, 'Next project →') + '</div></section>';
    mount.innerHTML = h;
  }

  function navCard(p, label) {
    return '<a class="card pad stack" style="gap:6px" href="project.html?id=' + encodeURIComponent(p.id) + '"><small style="font-weight:700;color:var(--muted)">' + label + '</small>' +
      '<b style="font-family:var(--font-head);font-size:19px;color:var(--heading)">' + esc(p.card.title) + '</b><span style="color:var(--text-2);font-size:14px">' + esc(p.card.result) + '</span></a>';
  }
  function statHTML(s) { return '<div class="stat"><b data-count-text="' + esc(s.v) + '">' + esc(s.v) + '</b><span>' + esc(s.l) + '</span></div>'; }
  function head(s) {
    return '<div class="head-block">' + (s.eyebrow ? '<div class="eyebrow">' + esc(s.eyebrow) + '</div>' : '') +
      (s.title ? '<h2 class="h2">' + esc(s.title) + '</h2>' : '') + (s.intro ? '<p class="lead">' + esc(s.intro) + '</p>' : '') + '</div>';
  }
  function cardsHTML(cards, cols) {
    return '<div class="grid g' + (cols || 3) + '">' + cards.map(function (c, i) {
      return '<div class="box pad stack reveal d' + (i % 3 + 1) + '" style="gap:8px"><div style="display:flex;justify-content:space-between;gap:10px;align-items:baseline"><b style="color:var(--heading);font-size:16px">' + esc(c.t) + '</b>' +
        (c.badge ? '<span style="font-size:12px;font-weight:800;color:var(--teal);white-space:nowrap">' + esc(c.badge) + '</span>' : '') + '</div><p style="font-size:14px;color:var(--text-2)">' + esc(c.d) + '</p></div>';
    }).join('') + '</div>';
  }
  function sectionHTML(s) {
    var tone = s.tone ? ' ' + s.tone : '';
    var o = '<section class="section' + tone + '"><div class="wrap">';
    switch (s.type) {
      case 'problem':
        o += '<div class="split"><div class="stack">' + head({ eyebrow: s.eyebrow, title: s.title }) +
          s.paragraphs.map(function (t) { return '<p class="body">' + esc(t) + '</p>'; }).join('') +
          (s.chips ? '<div class="box pad stack" style="gap:10px;background:var(--bg-soft)"><small style="font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.5px">' + esc(s.chipsLabel) + '</small><div class="chips">' + s.chips.map(function (c) { return '<span class="chip">' + esc(c) + '</span>'; }).join('') + '</div></div>' : '') +
          '</div><div class="stack">' + head({ eyebrow: 'The business questions', title: s.questionsTitle }) +
          '<ol class="qlist">' + s.questions.map(function (q, i) { return '<li class="box reveal d' + (i % 3 + 1) + '"><span class="num">' + (i + 1) + '</span><span style="padding-top:4px">' + esc(q) + '</span></li>'; }).join('') + '</ol></div></div>';
        break;
      case 'stats':
        o += head(s) + '<div class="stack-lg"><div class="stats">' + s.stats.map(statHTML).join('') + '</div>' +
          (s.image ? '<img class="shot reveal" src="' + esc(s.image.src) + '" alt="' + esc(s.image.alt) + '" loading="lazy">' : '') +
          (s.cards ? cardsHTML(s.cards, 3) : '') + '</div>';
        break;
      case 'qa':
        o += head(s) + '<div class="stack-lg">' + (s.stats ? '<div class="stats">' + s.stats.map(statHTML).join('') + '</div>' : '') +
          '<div class="box qa"><div class="qa-row head"><div>Business question</div><div>Where the dashboard answers it</div></div>' +
          s.rows.map(function (r) { return '<div class="qa-row"><div>' + esc(r.q) + '</div><div>' + esc(r.a) + '</div></div>'; }).join('') + '</div></div>';
        break;
      case 'recs':
        o += head(s) + '<div class="stack">' + s.items.map(function (r, i) {
          return '<div class="box rec reveal d' + (i % 3 + 1) + '"><div><small>WHAT THE DATA SHOWS</small><p>' + esc(r.f) + '</p></div>' +
            '<div class="mine"><small>MY RECOMMENDATION</small><p>' + esc(r.r) + '</p></div><div><small>BUSINESS BENEFIT</small><p style="color:var(--text-2)">' + esc(r.b) + '</p></div></div>';
        }).join('') + '</div>';
        break;
      case 'allocation':
        o += head(s) + '<div class="stack-lg"><div class="bar" role="img" aria-label="' + esc(s.parts.map(function (x) { return x.name + ' ' + x.pct + '% ' + x.amount; }).join(', ')) + '">' +
          s.parts.map(function (x) { return '<div data-w="' + x.pct + '%" style="background:' + x.bg + ';color:' + x.fg + '">' + esc(x.name) + ' ' + x.pct + '%</div>'; }).join('') + '</div>' +
          '<div class="grid g3 alloc">' + s.parts.map(function (x, i) {
            return '<div class="box reveal d' + (i + 1) + '" style="overflow:hidden"><div class="alloc-head" style="background:' + x.bg + ';color:' + x.fg + '"><small>' + esc(x.name) + ' · ' + x.pct + '%</small><b>' + esc(x.amount) + '</b></div>' +
              '<div class="pad stack" style="gap:12px"><div><small>WHAT TO BUY</small><b style="color:var(--heading)">' + esc(x.what) + '</b></div><div><small>WHY</small><span style="color:var(--text-2);font-size:14px">' + esc(x.why) + '</span></div><div><small class="ok">BENEFIT</small><span style="color:var(--text-2);font-size:14px">' + esc(x.benefit) + '</span></div></div></div>';
          }).join('') + '</div></div>';
        break;
      case 'steps':
        o += head(s) + '<div class="grid g' + Math.min(s.steps.length, s.steps.length > 4 ? 3 : 4) + ' steps' + (s.light ? ' light-steps' : '') + '">' + s.steps.map(function (x, i) {
          return '<div class="step reveal d' + (i % 3 + 1) + '"><b>' + (i < 9 ? '0' : '') + (i + 1) + '</b><h3>' + esc(x.t) + '</h3><p>' + esc(x.d) + '</p></div>';
        }).join('') + '</div>';
        break;
      case 'table':
        o += '<div class="split"><div class="stack">' + head({ eyebrow: s.eyebrow, title: s.title }) +
          (s.paragraphs || []).map(function (t) { return '<p class="body">' + esc(t) + '</p>'; }).join('') + '</div>' +
          '<div class="table-wrap reveal"><table class="tbl"><thead><tr>' + s.headers.map(function (x) { return '<th scope="col">' + esc(x) + '</th>'; }).join('') + '</tr></thead><tbody>' +
          s.rows.map(function (r) { return '<tr>' + r.map(function (c, ci) { return '<td' + (ci === r.length - 1 && s.headers.length === 3 && s.headers[2] === 'Target' ? ' class="hi"' : '') + '>' + esc(c) + '</td>'; }).join('') + '</tr>'; }).join('') +
          '</tbody></table></div></div>';
        break;
      case 'priority':
        var total = s.segments.reduce(function (a, b) { return a + b.value; }, 0);
        o += head(s) + '<div class="stack-lg"><div class="box pad"><div class="bar" role="img" aria-label="' + esc(s.segments.map(function (x) { return x.label; }).join(', ')) + '">' +
          s.segments.map(function (x) { return '<div data-w="' + (x.value / total * 100) + '%" style="background:' + x.bg + ';color:' + x.fg + '">' + esc(x.label) + '</div>'; }).join('') + '</div>' +
          '<div class="legend">' + s.legend.map(function (l) { return '<span>' + esc(l) + '</span>'; }).join('') + '</div></div>' + cardsHTML(s.cards, 3) + '</div>';
        break;
      case 'kpis':
        o += head(s) + '<div class="grid g3">' + s.items.map(function (k, i) { return '<div class="kpi-line reveal d' + (i % 3 + 1) + '"><b>' + esc(k.v) + '</b><span>' + esc(k.l) + '</span></div>'; }).join('') + '</div>' +
          (s.note ? '<p style="margin-top:26px;color:#c8d6e3;max-width:780px;font-size:15px">' + esc(s.note) + '</p>' : '');
        break;
      case 'list':
        o += head(s) + '<ul class="check">' + s.items.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>';
        break;
      case 'cards':
        o += head(s) + (s.tone === 'dark'
          ? '<div class="grid g' + (s.cols || 3) + '">' + s.cards.map(function (c, i) { return '<div class="reveal d' + (i % 3 + 1) + '" style="background:var(--navy-2);border-radius:12px;padding:20px"><b style="color:var(--mint);font-size:16px;display:block;margin-bottom:8px">' + esc(c.t) + '</b><p style="font-size:14px;color:#e6eef6">' + esc(c.d) + '</p></div>'; }).join('') + '</div>'
          : cardsHTML(s.cards, s.cols));
        break;
      case 'flows':
        o += head(s) + '<div class="grid g3">' + s.items.map(function (f, i) {
          return '<div class="box pad stack reveal d' + (i + 1) + '" style="gap:12px"><div><b style="font-size:17px;color:var(--heading)">' + esc(f.t) + '</b><div style="font-size:13px;font-weight:700;color:var(--teal)">' + esc(f.a) + '</div></div>' +
            '<ol style="margin:0;padding-left:20px;font-size:14px;color:var(--text-2);line-height:1.7">' + f.steps.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ol></div>';
        }).join('') + '</div>';
        break;
      case 'chain':
        var arrow = '<div class="arrow" aria-hidden="true">' + icon('arrow', 24, 2.4) + '</div>';
        o += head(s) + '<div class="chain">' +
          '<div class="box pad stack" style="gap:10px"><div style="display:flex;gap:8px;align-items:center"><span class="id">' + esc(s.br.id) + '</span><small style="font-weight:700;color:var(--muted)">' + esc(s.br.label).toUpperCase() + '</small></div><p>' + esc(s.br.text) + '</p><small style="color:var(--muted)">' + esc(s.br.note) + '</small></div>' + arrow +
          '<div class="box pad stack" style="gap:10px"><div style="display:flex;gap:8px;align-items:center"><span class="id g">' + esc(s.fr.id) + '</span><small style="font-weight:700;color:var(--muted)">' + esc(s.fr.label).toUpperCase() + '</small></div><p>' + esc(s.fr.text) + '</p></div>' + arrow +
          '<div class="box pad" style="background:var(--bg-soft)"><small style="font-weight:700;color:var(--muted)">ACCEPTANCE CRITERIA</small><ul class="check" style="margin-top:10px;font-size:14px">' + s.criteria.map(function (c) { return '<li>' + esc(c) + '</li>'; }).join('') + '</ul></div></div>';
        break;
    }
    return o + '</div></section>';
  }

  observe(document);

  /* ---------- scroll: progress, header shadow, back to top ---------- */
  var bar = document.createElement('div'); bar.className = 'progress'; bar.setAttribute('aria-hidden', 'true'); document.body.appendChild(bar);
  var top = document.createElement('button'); top.className = 'to-top'; top.type = 'button'; top.setAttribute('aria-label', 'Back to top'); top.innerHTML = icon('up', 22, 2.2);
  top.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  document.body.appendChild(top);
  function onScroll() {
    var y = window.scrollY, hmax = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (hmax > 0 ? y / hmax * 100 : 0) + '%';
    if (header) header.classList.toggle('scrolled', y > 10);
    top.classList.toggle('show', y > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* ---------- lightbox for screenshots ---------- */
  var lb = document.createElement('div'); lb.className = 'lightbox'; lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true'); lb.setAttribute('aria-label', 'Enlarged image');
  lb.innerHTML = '<img alt=""><button class="icon-btn" type="button" aria-label="Close" style="background:rgba(0,0,0,.4)">' + icon('close', 22) + '</button>';
  document.body.appendChild(lb);
  var lastFocus = null;
  function closeLb() { lb.classList.remove('open'); if (lastFocus) lastFocus.focus(); }
  lb.addEventListener('click', closeLb);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && lb.classList.contains('open')) closeLb(); });
  document.addEventListener('click', function (e) {
    var img = e.target.closest && e.target.closest('img.shot'); if (!img) return;
    lastFocus = img; lb.querySelector('img').src = img.src; lb.querySelector('img').alt = img.alt; lb.classList.add('open'); lb.querySelector('button').focus();
  });
})();
