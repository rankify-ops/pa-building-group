/* PA Building Group site behaviour.
   Run once after hydration by src/components/SiteScripts.tsx.
   Adapted from the Santa'lana Builders build. */
import { isAustralianPhone, PHONE_ERROR } from "./phone.mjs";

export function initSite() {
  'use strict';

  var root = document.documentElement;
  root.classList.add('js-reveal');
  // Transitions back on after the first two frames, once the initial state
  // (scrolled header, dock, form stage) has been applied without animating.
  // The timer is a backstop: rAF doesn't fire in a background tab.
  var loaded = function () { root.classList.remove('is-loading'); };
  window.requestAnimationFrame(function () { window.requestAnimationFrame(loaded); });
  window.setTimeout(loaded, 150);
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

  /* ---------- Desktop Services menu ----------
     The word Services is a link. The chevron button opens the list:
     Enter or Space toggles it, Escape closes it, aria-expanded follows. */
  var servicesItem = document.querySelector('.nav__item--dd');
  var servicesBtn = servicesItem && servicesItem.querySelector('.nav__chevbtn');
  var servicesMenu = document.getElementById('servicesMenu');
  if (servicesItem && servicesBtn && servicesMenu) {
    var setServicesOpen = function (open) {
      servicesItem.classList.toggle('is-open', open);
      servicesBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      servicesBtn.setAttribute('aria-label', open ? 'Hide services' : 'Show services');
    };
    setServicesOpen(false);

    servicesBtn.addEventListener('click', function (e) {
      var open = servicesBtn.getAttribute('aria-expanded') !== 'true';
      setServicesOpen(open);
      if (open && e.detail === 0) {
        var firstLink = servicesMenu.querySelector('a');
        if (firstLink) { firstLink.focus(); }
      }
    });

    servicesItem.addEventListener('mouseenter', function () { setServicesOpen(true); });
    servicesItem.addEventListener('mouseleave', function () {
      if (!servicesItem.contains(document.activeElement)) { setServicesOpen(false); }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape' || !servicesItem.classList.contains('is-open')) { return; }
      if (window.matchMedia('(max-width: 1040px)').matches) { return; }
      setServicesOpen(false);
      servicesBtn.focus();
    });

    document.addEventListener('focusin', function (e) {
      if (!servicesItem.contains(e.target)) { setServicesOpen(false); }
    });
  }

  /* ---------- Header: dark glass over the hero, light glass once scrolled ---------- */
  var header = document.getElementById('siteHeader');
  if (header) {
    var lastScrolled = null;
    var onScroll = function () {
      var scrolled = window.scrollY > 40;
      if (scrolled !== lastScrolled) { header.classList.toggle('is-scrolled', scrolled); lastScrolled = scrolled; }
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

  /* ---------- Reveal on scroll ----------
     Only elements that start below the fold get hidden and faded in. Anything
     already on screen was painted before this ran, so hiding it would make it
     blink. */
  if ('IntersectionObserver' in window &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('is-in'); io.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    var fold = window.innerHeight;
    Array.prototype.forEach.call(document.querySelectorAll('.reveal'), function (el) {
      if (el.getBoundingClientRect().top < fold) { return; }
      el.classList.add('reveal-pending');
      io.observe(el);
    });
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

  function setPhoneValidity(input) {
    if (!input) { return; }
    var value = input.value.trim();
    if (!value) { input.setCustomValidity(''); return; }
    input.setCustomValidity(isAustralianPhone(value) ? '' : PHONE_ERROR);
  }

  function stageValid(stepEl, statusEl) {
    setPhoneValidity(stepEl.querySelector('input[name="phone"]'));
    var controls = fieldsIn(stepEl);
    for (var i = 0; i < controls.length; i++) {
      var c = controls[i];
      if (typeof c.checkValidity === 'function' && !c.checkValidity()) {
        // A radio group hides its inputs, so reportValidity has nothing to
        // anchor its bubble to. Write the message out instead.
        if (c.type === 'radio') {
          if (statusEl) { statusEl.textContent = 'Please choose one to continue.'; }
          // Focus the radio itself (not its label) so arrow keys and Space work.
          var firstTile = stepEl.querySelector('.choice__input');
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
    var navRow = form.querySelector('.fnav');
    if (steps.length < 2 || !nextBtn || !sendBtn || !backBtn) { return null; }

    // Progress bar is server-rendered (EnquiryForm.tsx) so the card doesn't
    // grow when the script starts.
    var label = form.querySelector('.fprogress__label');
    var segs = Array.prototype.slice.call(form.querySelectorAll('.fprogress__seg'));
    if (!label || segs.length !== steps.length) { return null; }

    form.classList.add('is-stepped');

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
      // Tapping a tile already advances, so a Continue button on a tile stage
      // is dead weight. It only shows on stages made of typed fields.
      var tileStage = !!steps[at].querySelector('.choices');
      backBtn.hidden = at === 0;
      nextBtn.hidden = last || tileStage;
      sendBtn.hidden = !last;
      if (navRow) { navRow.hidden = backBtn.hidden && nextBtn.hidden && sendBtn.hidden; }
      if (focus) {
        // Focus the chosen (or first) radio, never its tabindex=-1 label, so
        // keyboard users land on an operable control (WCAG 2.1.1 / 2.4.3).
        var first = steps[at].querySelector('.choice__input:checked') ||
          steps[at].querySelector('.choice__input, input:not([name="botcheck"]), select, textarea');
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

    // Picking a tile is a complete answer, so move straight on. Arrow keys
    // also fire change on a radio group while the user is only browsing the
    // options, so those don't advance (WCAG 3.2.2 On Input); Enter or Space
    // confirms the choice instead.
    var arrowNav = false;
    var spaceOnChecked = false;
    form.addEventListener('keydown', function (e) {
      arrowNav = /^Arrow/.test(e.key);
      spaceOnChecked = e.key === ' ' && !!e.target.checked;
    }, true);
    form.addEventListener('pointerdown', function () { arrowNav = false; }, true);
    form.addEventListener('keyup', function (e) {
      var t = e.target;
      // Space on an already-chosen tile fires no change event; advance here.
      if (e.key === ' ' && spaceOnChecked && t.classList && t.classList.contains('choice__input') && at < steps.length - 1) {
        spaceOnChecked = false;
        if (statusEl) { statusEl.textContent = ''; }
        go(at + 1);
      }
    });
    form.addEventListener('change', function (e) {
      if (arrowNav) { arrowNav = false; return; }
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

      setPhoneValidity(form.querySelector('input[name="phone"]'));

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
    var phoneInput = form.querySelector('input[name="phone"]');
    if (phoneInput) {
      phoneInput.addEventListener('input', function () { setPhoneValidity(phoneInput); });
    }
    var stages = setupStages(form);
    form.addEventListener('submit', handleSubmit(form, stages));
  });

  /* ---------- Footer year ---------- */
  var year = document.getElementById('year');
  if (year) { year.textContent = new Date().getFullYear(); }

  /* ---------- Quote attention ----------
     "Get a free quote", the dock's "Free quote" and "Request a free quote"
     smooth-scroll to #enquire and pulse the card. Same-page links skip the
     instant hash jump. A cross-page /contact/#enquire loads normally; if the
     hash is already #enquire we highlight, and scroll only when the card is
     still below the fold. Focus uses preventScroll so the clipped first
     radio does not yank the page. */
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var attentionTimer = 0;

  function isQuoteLink(a) {
    if (!a || !a.getAttribute) { return false; }
    var link = a.getAttribute('href') || '';
    if (link.indexOf('#enquire') === -1) { return false; }
    var text = (a.textContent || '').toLowerCase();
    var cls = typeof a.className === 'string' ? a.className : '';
    return text.indexOf('quote') !== -1 || cls.indexOf('quote') !== -1;
  }

  function samePage(a) {
    var link = a.getAttribute('href') || '';
    if (link.charAt(0) === '#') { return true; }
    try {
      var url = new URL(a.href, window.location.href);
      return url.pathname === window.location.pathname;
    } catch (err) { return false; }
  }

  function showQuote(box, shouldScroll) {
    if (!box) { return; }
    if (shouldScroll) {
      var top = box.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top: top, behavior: reduceMotion ? 'auto' : 'smooth' });
    }
    box.classList.remove('is-attention');
    void box.offsetWidth;
    box.classList.add('is-attention');
    window.clearTimeout(attentionTimer);
    attentionTimer = window.setTimeout(function () { box.classList.remove('is-attention'); }, 1500);
    var form = box.querySelector('form') || box;
    var first = form.querySelector('input, select, textarea');
    if (first) {
      try { first.focus({ preventScroll: true }); } catch (err) { /* old browsers: leave focus where it is */ }
    }
  }

  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a') : null;
    if (!isQuoteLink(a) || !samePage(a)) { return; }
    var box = document.getElementById('enquire');
    if (!box) { return; }
    e.preventDefault();
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, '', '#enquire');
    }
    // The mobile menu restores scroll in its own click handler, which runs
    // before this document listener. Wait one turn so that restore lands
    // first, then scroll to the card.
    window.setTimeout(function () { showQuote(box, true); }, 0);
  });

  if (window.location.hash === '#enquire') {
    var landed = document.getElementById('enquire');
    if (landed) {
      var topEdge = landed.getBoundingClientRect().top;
      var alreadyPlaced = topEdge >= 0 && topEdge < window.innerHeight * 0.55;
      showQuote(landed, !alreadyPlaced);
    }
  }
}
