/* ==========================================================
   Language switch (English / French).
   The site is written in English. When French is chosen, every
   text found in assets/js/i18n-fr.js is shown in French.
   The choice is remembered in the visitor's browser.
   ========================================================== */
(function () {
  'use strict';
  var FR = window.I18N_FR || {};
  var KEY = 'lang';
  var ATTRS = ['alt', 'placeholder', 'aria-label', 'title'];
  var RULES = [
    [/^Dubai, UAE · © (\d{4}) (.*)$/, 'Dubaï, EAU · © $1 $2']
  ];

  function stored() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function save(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  var lang = stored() === 'fr' ? 'fr' : 'en';

  function frOf(key) {
    if (FR[key]) return FR[key];
    for (var i = 0; i < RULES.length; i++) if (RULES[i][0].test(key)) return key.replace(RULES[i][0], RULES[i][1]);
    return null;
  }
  function translate(s) {
    if (lang !== 'fr' || !s) return s;
    var m = /^(\s*)([\s\S]*?)(\s*)$/.exec(s);
    var fr = frOf(m[2]);
    return fr ? m[1] + fr + m[3] : s;
  }
  window.tr = translate;

  /* Each text node and attribute remembers its English source,
     so we can switch back and forth without losing it. */
  var textMem = new WeakMap();
  var attrMem = new WeakMap();

  function skip(el) {
    return !el || el.closest('script,style,noscript,svg,#typed,[data-no-i18n]');
  }
  function doText(node) {
    if (skip(node.parentElement)) return;
    var rec = textMem.get(node);
    var cur = node.nodeValue;
    var en = rec && cur === rec.out ? rec.en : cur;
    var out = translate(en);
    if (out !== cur) node.nodeValue = out;
    textMem.set(node, { en: en, out: out });
  }
  function doAttrs(el) {
    if (skip(el)) return;
    var mem = attrMem.get(el) || {};
    ATTRS.forEach(function (a) {
      if (!el.hasAttribute(a)) return;
      var cur = el.getAttribute(a);
      var rec = mem[a];
      var en = rec && cur === rec.out ? rec.en : cur;
      var out = translate(en);
      if (out !== cur) el.setAttribute(a, out);
      mem[a] = { en: en, out: out };
    });
    attrMem.set(el, mem);
  }
  function walk(root) {
    if (root.nodeType === 3) { doText(root); return; }
    if (root.nodeType !== 1) return;
    doAttrs(root);
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
    var n;
    while ((n = w.nextNode())) {
      if (n.nodeType === 3) { if (n.nodeValue.trim()) doText(n); }
      else doAttrs(n);
    }
  }

  /* page title and description */
  var head = { title: null, desc: {} };
  function doHead() {
    if (head.title === null || document.title !== head.titleOut) head.title = document.title;
    head.titleOut = translate(head.title);
    document.title = head.titleOut;
    document.querySelectorAll('meta[name="description"],meta[property="og:title"],meta[property="og:description"]').forEach(function (m, i) {
      var rec = head.desc[i];
      var cur = m.getAttribute('content');
      var en = rec && cur === rec.out ? rec.en : cur;
      var out = translate(en);
      m.setAttribute('content', out);
      head.desc[i] = { en: en, out: out };
    });
  }

  /* language button in the header */
  function paintButton() {
    var b = document.getElementById('lang-btn');
    if (!b) return;
    b.innerHTML = '<span class="' + (lang === 'en' ? 'on' : '') + '">EN</span><span class="' + (lang === 'fr' ? 'on' : '') + '">FR</span>';
    b.setAttribute('aria-label', lang === 'fr' ? 'Switch to English' : 'Passer en français');
    b.setAttribute('title', lang === 'fr' ? 'Switch to English' : 'Passer en français');
  }

  function apply() {
    document.documentElement.setAttribute('lang', lang);
    walk(document.body);
    doHead();
    paintButton();
  }

  var btn = document.getElementById('lang-btn');
  if (btn) btn.addEventListener('click', function () {
    lang = lang === 'fr' ? 'en' : 'fr';
    save(lang);
    apply();
  });

  apply();

  /* translate anything the page adds later (filters, search, form messages) */
  if ('MutationObserver' in window) {
    new MutationObserver(function (list) {
      if (lang !== 'fr') return;
      list.forEach(function (m) {
        if (m.type === 'characterData') doText(m.target);
        else if (m.type === 'attributes') doAttrs(m.target);
        else m.addedNodes.forEach(walk);
      });
    }).observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTRS });
  }
})();
