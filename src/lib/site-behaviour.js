/* PA Building Group site behaviour
   Plain ES5-safe JS, no dependencies. Run once after hydration by
   src/components/SiteScripts.tsx. Adapted from the Santa'lana Builders build. */
export function initSite() {
  'use strict';

  var root = document.documentElement;
  root.classList.add('js-reveal');
  var BASE = document.body.getAttribute('data-base') || '';

  /* ---------- Full-screen menu ---------- */
  var toggle = document.getElementById('navToggle');
  var panel = document.getElementById('navPanel');

  if (toggle && panel) {
    var scrollLock = 0;

    var setPanel = function (open) {
      panel.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Menu');
      // `inert` keeps the closed panel out of the tab order and away from
      // screen readers, which visibility:hidden alone does not guarantee
      // during the transition.
      if (open) { panel.removeAttribute('inert'); } else { panel.setAttribute('inert', ''); }

      if (open) {
        scrollLock = window.scrollY;
        document.body.classList.add('nav-open');
        var first = panel.querySelector('.nav__link');
        if (first) {
          window.setTimeout(function () {
            try { first.focus({ preventScroll: true }); } catch (err) { first.focus(); }
          }, 220);
        }
      } else if (document.body.classList.contains('nav-open')) {
        document.body.classList.remove('nav-open');
        window.scrollTo(0, scrollLock);
      }
    };

    setPanel(false);
    toggle.addEventListener('click', function () { setPanel(!panel.classList.contains('is-open')); });
    panel.addEventListener('click', function (e) { if (e.target.closest('a')) { setPanel(false); } });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panel.classList.contains('is-open')) { setPanel(false); toggle.focus(); }
    });

    // Keep focus inside the panel while it is open.
    panel.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab' || !panel.classList.contains('is-open')) { return; }
      var items = Array.prototype.slice.call(panel.querySelectorAll('a[href], button:not([disabled])'));
      items.push(toggle);
      var firstEl = items[0], lastEl = items[items.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) { e.preventDefault(); lastEl.focus(); }
      else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); firstEl.focus(); }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 1040 && panel.classList.contains('is-open')) { setPanel(false); }
    });
  }

  /* ---------- Header tightens once you scroll ---------- */
  var header = document.getElementById('siteHeader');
  if (header) {
    var lastCompact = null;
    var onScroll = function () {
      var compact = window.scrollY > 120;
      if (compact !== lastCompact) { header.classList.toggle('is-compact', compact); lastCompact = compact; }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Floating dock ----------
     Hidden while the hero's own buttons are on screen, shown once they have
     scrolled off the top. Pages without hero buttons just show it. */
  var dock = document.querySelector('.dock');
  var heroCta = document.querySelector('.hero__cta, .pagehero__cta');
  if (dock) {
    if (heroCta) {
      var syncDock = function () {
        dock.classList.toggle('is-visible', heroCta.getBoundingClientRect().bottom <= 0);
      };
      window.addEventListener('scroll', syncDock, { passive: true });
      window.addEventListener('resize', syncDock);
      syncDock();
    } else {
      dock.classList.add('is-visible');
    }
  }

  /* ---------- Reveal on scroll ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    Array.prototype.forEach.call(reveals, function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('is-in'); io.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    Array.prototype.forEach.call(reveals, function (el) { io.observe(el); });
  }

  /* ======================================================================
     Enquiry forms

     Each form ships its stages as .fstep blocks in the HTML. With scripting
     off every stage is visible and the form is one long page. The completed
     enquiry posts to Web3Forms (key on the form's data-w3f attribute) and
     lands on /thank-you/. If the post fails, the visitor is given the phone
     number and email rather than a silent failure.
     ====================================================================== */
  var LABELS = {
    service: 'Service', property: 'Property', stage: 'Stage', suburb: 'Suburb',
    detail: 'Details', name: 'Name', phone: 'Phone', email: 'Email'
  };
  var ORDER = ['name', 'phone', 'email', 'suburb', 'service', 'property', 'stage', 'detail'];

  function fieldsIn(el) {
    return Array.prototype.slice.call(el.querySelectorAll('input:not([type="hidden"]):not([name="botcheck"]), select, textarea'));
  }

  function stageValid(stepEl, statusEl) {
    var controls = fieldsIn(stepEl);
    for (var i = 0; i < controls.length; i++) {
      var c = controls[i];
      if (typeof c.checkValidity === 'function' && !c.checkValidity()) {
        // A radio group hides its inputs, so reportValidity has nothing to
        // anchor its bubble to. Write the message out instead.
        if (c.type === 'radio') {
          if (statusEl) { statusEl.textContent = 'Please choose one to continue.'; }
          var firstTile = stepEl.querySelector('.choice');
          if (firstTile) { firstTile.focus(); }
        } else {
          c.focus();
          if (typeof c.reportValidity === 'function') { c.reportValidity(); }
        }
        return false;
      }
    }
    if (statusEl) { statusEl.textContent = ''; }
    return true;
  }

  function setupStages(form) {
    var steps = Array.prototype.slice.call(form.querySelectorAll('.fstep'));
    var backBtn = form.querySelector('[data-back]');
    var nextBtn = form.querySelector('[data-next]');
    var sendBtn = form.querySelector('[data-send]');
    var statusEl = form.querySelector('[data-fstatus]');
    if (steps.length < 2 || !nextBtn || !sendBtn || !backBtn) { return null; }

    form.classList.add('is-stepped');

    var prog = document.createElement('div');
    prog.className = 'fprogress';
    var label = document.createElement('span');
    label.className = 'fprogress__label';
    var track = document.createElement('span');
    track.className = 'fprogress__track';
    var segs = steps.map(function () {
      var seg = document.createElement('span');
      seg.className = 'fprogress__seg';
      track.appendChild(seg);
      return seg;
    });
    prog.appendChild(label);
    prog.appendChild(track);
    form.insertBefore(prog, form.firstChild);

    var at = 0;

    function render(focus) {
      steps.forEach(function (s, i) {
        s.classList.toggle('is-active', i === at);
        fieldsIn(s).forEach(function (c) {
          if (i === at) { c.removeAttribute('tabindex'); } else { c.setAttribute('tabindex', '-1'); }
        });
      });
      segs.forEach(function (seg, i) { seg.classList.toggle('is-done', i <= at); });
      var title = steps[at].getAttribute('data-title') || '';
      label.textContent = 'Step ' + (at + 1) + ' of ' + steps.length + (title ? '  ·  ' + title : '');
      var last = at === steps.length - 1;
      backBtn.hidden = at === 0;
      nextBtn.hidden = last;
      sendBtn.hidden = !last;
      if (focus) {
        var first = steps[at].querySelector('.choice, input:not(.choice__input), select, textarea');
        if (first && first.focus) {
          try { first.focus({ preventScroll: true }); } catch (err) { first.focus(); }
        }
      }
    }

    function go(n, focus) {
      at = Math.max(0, Math.min(steps.length - 1, n));
      render(focus !== false);
    }

    nextBtn.addEventListener('click', function () {
      if (!stageValid(steps[at], statusEl)) { return; }
      go(at + 1);
    });
    backBtn.addEventListener('click', function () {
      if (statusEl) { statusEl.textContent = ''; }
      go(at - 1);
    });

    // Picking a tile is a complete answer, so move straight on.
    form.addEventListener('change', function (e) {
      if (e.target.classList && e.target.classList.contains('choice__input') && at < steps.length - 1) {
        if (statusEl) { statusEl.textContent = ''; }
        window.setTimeout(function () { go(at + 1); }, 200);
      }
    });

    // Enter advances rather than submitting a half-filled enquiry.
    form.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA' && at < steps.length - 1) {
        e.preventDefault();
        nextBtn.click();
      }
    });

    render(false);
    return { steps: steps, status: statusEl, go: go };
  }

  function handleSubmit(form, stages) {
    return function (e) {
      e.preventDefault();
      var statusEl = form.querySelector('[data-fstatus]');

      if (stages) {
        for (var i = 0; i < stages.steps.length; i++) {
          if (!stageValid(stages.steps[i], stages.status)) {
            stages.go(i);
            stageValid(stages.steps[i], stages.status);
            return;
          }
        }
      } else if (typeof form.checkValidity === 'function' && !form.checkValidity()) {
        var bad = form.querySelector(':invalid');
        if (bad) { bad.focus(); if (typeof form.reportValidity === 'function') { form.reportValidity(); } }
        return;
      }

      var data = new FormData(form);

      // Honeypot: real people never tick a checkbox they can't see.
      if (data.get('botcheck')) { window.location.href = BASE + '/thank-you/'; return; }

      var context = form.getAttribute('data-context') || 'Website';
      var payload = {
        access_key: form.getAttribute('data-w3f'),
        subject: 'Website enquiry — ' + context +
          (data.get('service') ? ': ' + data.get('service') : ''),
        from_name: 'PA Building Group website',
        replyto: (data.get('email') || '').toString(),
        Page: window.location.href
      };
      ORDER.forEach(function (key) {
        var v = data.get(key);
        if (v === null) { return; }
        v = v.toString().trim();
        if (v) { payload[LABELS[key]] = v; }
      });

      var sendBtn = form.querySelector('[data-send]');
      var original = sendBtn ? sendBtn.innerHTML : '';
      if (sendBtn) { sendBtn.disabled = true; sendBtn.textContent = 'Sending…'; }

      var fail = function () {
        if (sendBtn) { sendBtn.disabled = false; sendBtn.innerHTML = original; }
        if (statusEl) {
          statusEl.textContent = 'Sorry, that didn’t send. Please call ' +
            (form.getAttribute('data-phone') || '') + ' or email ' +
            (form.getAttribute('data-email') || '') + '.';
        }
      };

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok, j: j }; }); })
        .then(function (res) {
          if (res.ok && res.j && res.j.success) { window.location.href = BASE + '/thank-you/'; }
          else { fail(); }
        })
        .catch(fail);
    };
  }

  Array.prototype.forEach.call(document.querySelectorAll('.js-enquiry'), function (form) {
    var stages = setupStages(form);
    form.addEventListener('submit', handleSubmit(form, stages));
  });

  /* ---------- Footer year ---------- */
  var year = document.getElementById('year');
  if (year) { year.textContent = new Date().getFullYear(); }
}
