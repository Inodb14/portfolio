/* ==========================================================
   Contact form: checks the fields, sends the message to the
   service set in config.js, and shows a clear result.
   ========================================================== */
(function () {
  'use strict';
  var C = window.SITE_CONFIG || {};
  var F = C.form || {};
  var esc = window.esc, icon = window.icon;

  /* contact details on the left */
  var rows = document.getElementById('contact-rows');
  if (rows) {
    var r = function (ic, label, value, href, ext) {
      return '<div class="c-row"><div class="ico">' + icon(ic, 20) + '</div><div><small>' + label + '</small>' +
        (href ? '<a href="' + esc(href) + '"' + (ext ? ' target="_blank" rel="noopener noreferrer"' : '') + '>' + esc(value) + '</a>' : '<b>' + esc(value) + '</b>') + '</div></div>';
    };
    rows.innerHTML =
      r('mail', 'Email', C.email, 'mailto:' + C.email) +
      r('phone', 'Phone / WhatsApp', C.phone, 'https://wa.me/' + String(C.phoneLink || '').replace(/\D/g, ''), true) +
      r('linkedin', 'LinkedIn', 'View my LinkedIn profile', C.linkedin, true) +
      r('globe', 'Languages', 'French (native) · English (professional)') +
      (C.cvUrl ? '<a class="btn btn-outline" style="margin-top:22px" href="' + esc(C.cvUrl) + '" download>' + icon('download', 18, 2) + 'Download my CV</a>' : '');
  }

  var form = document.getElementById('contact-form');
  if (!form) return;
  var btn = document.getElementById('f-submit');
  var msgBox = document.getElementById('form-msg');
  var success = document.getElementById('form-success');
  var msg = document.getElementById('f-message');
  var count = document.getElementById('msg-count');

  // pre-fill subject from link: contact.html?subject=Job%20opportunity
  try {
    var qs = new URLSearchParams(location.search).get('subject');
    if (qs) { var sel = document.getElementById('f-subject'); for (var i = 0; i < sel.options.length; i++) if (sel.options[i].text === qs) sel.selectedIndex = i; }
  } catch (e) {}

  // keep a draft while typing (only in this browser)
  var DRAFT = 'contact-draft';
  try {
    var d = JSON.parse(localStorage.getItem(DRAFT) || 'null');
    if (d) ['name', 'email', 'company', 'message'].forEach(function (k) { if (d[k] && form.elements[k]) form.elements[k].value = d[k]; });
  } catch (e) {}
  function saveDraft() {
    try {
      localStorage.setItem(DRAFT, JSON.stringify({ name: form.elements.name.value, email: form.elements.email.value, company: form.elements.company.value, message: form.elements.message.value }));
    } catch (e) {}
  }
  function clearDraft() { try { localStorage.removeItem(DRAFT); } catch (e) {} }

  function updateCount() { count.textContent = msg.value.length + ' / 2000'; }
  msg.addEventListener('input', updateCount); updateCount();
  form.addEventListener('input', function (e) { saveDraft(); var f = e.target.closest('.field'); if (f) setErr(f, ''); });

  function setErr(field, text) {
    field.classList.toggle('invalid', !!text);
    var e = field.querySelector('.err'); if (e) e.textContent = text;
    var input = field.querySelector('input,textarea');
    if (input) { if (text) input.setAttribute('aria-invalid', 'true'); else input.removeAttribute('aria-invalid'); }
  }
  function validate() {
    var ok = true, first = null;
    var name = form.elements.name, email = form.elements.email;
    if (name.value.trim().length < 2) { setErr(name.closest('.field'), 'Please enter your name.'); ok = false; first = first || name; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) { setErr(email.closest('.field'), 'Please enter a valid email address.'); ok = false; first = first || email; }
    if (msg.value.trim().length < 10) { setErr(msg.closest('.field'), 'Please write a message (at least 10 characters).'); ok = false; first = first || msg; }
    if (first) first.focus();
    return ok;
  }
  function show(type, html) { msgBox.className = 'form-msg show ' + type; msgBox.innerHTML = html; }
  function hide() { msgBox.className = 'form-msg'; msgBox.innerHTML = ''; }
  function busy(on) {
    btn.disabled = on; btn.classList.toggle('loading', on);
    btn.querySelector('.label').textContent = on ? 'Sending…' : 'Send message';
  }
  function mailtoLink(data) {
    return 'mailto:' + C.email + '?subject=' + encodeURIComponent(data.subject + ' — ' + data.name) +
      '&body=' + encodeURIComponent(data.message + '\n\n' + data.name + (data.company ? ' (' + data.company + ')' : '') + '\n' + data.email);
  }

  function send(data) {
    var provider = F.provider, url = F.endpoint;
    if (provider === 'google') {
      var fd = new FormData();
      Object.keys(data).forEach(function (k) { fd.append(k, data[k]); });
      return fetch(url, { method: 'POST', body: fd }).then(function (res) { return res.json(); }).then(function (j) {
        if (!j || j.result !== 'success') throw new Error((j && j.error) || 'Unknown error');
      });
    }
    if (provider === 'formspree') {
      return fetch(url, { method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
        .then(function (res) { if (!res.ok) throw new Error('HTTP ' + res.status); });
    }
    if (provider === 'web3forms') {
      var body = Object.assign({ access_key: F.web3formsKey, from_name: 'Portfolio contact form' }, data);
      return fetch(url || 'https://api.web3forms.com/submit', { method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
        .then(function (res) { return res.json(); }).then(function (j) { if (!j.success) throw new Error(j.message || 'Error'); });
    }
    return Promise.reject(new Error('Unknown provider'));
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    hide();
    if (form.elements.website.value) return; // spam bot filled the hidden field
    if (!validate()) return;
    var data = {
      name: form.elements.name.value.trim(),
      email: form.elements.email.value.trim(),
      company: form.elements.company.value.trim(),
      subject: form.elements.subject.value,
      message: msg.value.trim(),
      page: location.href,
      sentAt: new Date().toISOString()
    };
    var notReady = !F.endpoint || (F.provider === 'web3forms' && !F.web3formsKey);
    if (notReady) {
      show('info', 'The form is not connected yet. You can <a href="' + esc(mailtoLink(data)) + '">send this message by email instead</a>.');
      return;
    }
    busy(true);
    send(data).then(function () {
      clearDraft();
      form.reset(); updateCount();
      form.style.display = 'none';
      document.getElementById('success-name').textContent = data.name ? ', ' + data.name.split(' ')[0] : '';
      success.classList.add('show'); success.focus();
    }).catch(function () {
      show('error', 'Sorry, the message could not be sent. Please try again, or <a href="' + esc(mailtoLink(data)) + '">send it by email</a>.');
    }).then(function () { busy(false); });
  });

  document.getElementById('send-another').addEventListener('click', function () {
    success.classList.remove('show'); form.style.display = ''; form.elements.name.focus();
  });
})();
