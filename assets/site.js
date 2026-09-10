// PA Building Group — shared JS
(function(){

  /* ------------------------------------------------------------------
     TODO (Rankify): swap these three placeholders for PA's real details.
     They are also hard-coded in the HTML (tel: links, mailto: links) —
     search-and-replace across the repo when the client confirms.
     ------------------------------------------------------------------ */
  var CONFIG = {
    phone:      '0400 000 000',
    phoneHref:  '0400000000',
    email:      'hello@pabuildinggroup.com.au',
    // Web3Forms access key — public by design (it only permits sending to the
    // inbox it was registered against). If it's ever cleared, the form falls
    // back to a "call us" message instead of silently posting leads nowhere.
    web3FormsKey: '2742141c-cdc6-4e7b-be33-672d05ed3aff'
  };

  var nav = document.getElementById('nav');
  var sticky = document.querySelector('.sticky');
  var hero = document.querySelector('.hero, .phero');
  if(nav || sticky){
    var setState = function(){
      var y = window.scrollY;
      if(nav) nav.classList.toggle('scrolled', y > 50);
      if(sticky){
        var threshold = hero ? hero.offsetTop + hero.offsetHeight - 120 : window.innerHeight * 0.7;
        sticky.classList.toggle('show', y > threshold);
      }
    };
    setState();
    window.addEventListener('scroll', setState, { passive:true });
    window.addEventListener('resize', setState, { passive:true });
  }

  // Mobile drawer
  var tog = document.querySelector('.mob-tog');
  var drawer = document.querySelector('.mdrawer');
  if(tog && drawer){
    var closeDrawer = function(){
      tog.classList.remove('open');
      drawer.classList.remove('open');
      document.body.style.overflow = '';
    };
    var openDrawer = function(){
      tog.classList.add('open');
      drawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    };
    tog.addEventListener('click', function(){
      if(drawer.classList.contains('open')) closeDrawer(); else openDrawer();
    });
    var closeBtn = drawer.querySelector('.mdrawer-close');
    if(closeBtn) closeBtn.addEventListener('click', closeDrawer);
    document.addEventListener('keydown', function(ev){
      if(ev.key === 'Escape' && drawer.classList.contains('open')) closeDrawer();
    });
    drawer.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', closeDrawer);
    });
    drawer.querySelectorAll('.mdd-tog').forEach(function(btn){
      btn.addEventListener('click', function(){
        var group = btn.closest('.mdd');
        var wasOpen = group.classList.contains('open');
        drawer.querySelectorAll('.mdd').forEach(function(g){ g.classList.remove('open'); });
        if(!wasOpen) group.classList.add('open');
      });
    });
  }

  // Fade-in
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(x){ if(x.isIntersecting){ x.target.classList.add('vis'); io.unobserve(x.target); }});
    }, { threshold:0.1, rootMargin:'0px 0px -30px 0px' });
    document.querySelectorAll('.fade').forEach(function(el){ io.observe(el); });
  } else {
    document.querySelectorAll('.fade').forEach(function(el){ el.classList.add('vis'); });
  }

  // Smooth-scroll for in-page links
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(ev){
      var hash = a.getAttribute('href');
      if(hash.length <= 1) return;
      var t = document.querySelector(hash);
      if(t){ ev.preventDefault(); t.scrollIntoView({ behavior:'smooth', block:'start' }); }
    });
  });

  // Quote form (multi-step)
  document.querySelectorAll('.qform').forEach(function(qform){
    var cs = 1, fd = {};
    var slides = qform.querySelectorAll('.fslide');
    var steps = qform.querySelectorAll('.fstep');
    if(!slides.length) return;
    var maxStep = slides.length - 1;

    var upd = function(){
      slides.forEach(function(s){ s.classList.remove('active'); });
      var slide = qform.querySelector('.fslide[data-s="' + cs + '"]');
      if(slide) slide.classList.add('active');
      steps.forEach(function(s, i){
        s.classList.remove('active','done');
        if(i + 1 === cs) s.classList.add('active');
        if(i + 1 < cs) s.classList.add('done');
      });
    };

    qform.querySelectorAll('.ob').forEach(function(b){
      b.addEventListener('click', function(){
        var grp = b.closest('.og');
        grp.querySelectorAll('.ob').forEach(function(x){ x.classList.remove('sel'); });
        b.classList.add('sel');
        var slide = b.closest('.fslide');
        var key = slide.dataset.field || ('Question ' + slide.dataset.s);
        fd[key] = b.dataset.v;
        setTimeout(function(){
          if(cs < maxStep){ cs++; upd(); }
        }, 350);
      });
    });

    var showSuccess = function(){
      var base = window.location.pathname.indexOf('/locations/') !== -1 ? '../' : '';
      window.location.href = base + 'thank-you.html';
    };

    var showError = function(msg){
      var errSlot = qform.querySelector('.qform-error');
      if(!errSlot){
        errSlot = document.createElement('div');
        errSlot.className = 'qform-error';
        errSlot.style.cssText = 'margin-top:12px;padding:12px 14px;background:#fef2f2;border:1px solid #fecaca;border-left:3px solid #dc2626;color:#991b1b;font-size:.85rem;border-radius:8px;line-height:1.5';
        var contactSlide = qform.querySelector('.fslide[data-s="' + maxStep + '"]');
        if(contactSlide) contactSlide.appendChild(errSlot);
      }
      errSlot.innerHTML = msg;
    };

    var fallbackMsg = 'Sorry, we couldn\'t send that automatically. Please call ' +
      '<a href="tel:' + CONFIG.phoneHref + '" style="color:#dc2626;font-weight:700">' + CONFIG.phone + '</a>' +
      ' or email <a href="mailto:' + CONFIG.email + '" style="color:#dc2626;font-weight:700">' + CONFIG.email + '</a>.';

    var submitBtn = function(){ return qform.querySelector('.fn[data-action="submit"]'); };

    var sendQuote = function(cb){
      var inputs = qform.querySelectorAll('.fslide[data-s="' + cs + '"] .finp');
      var required = qform.querySelectorAll('.fslide[data-s="' + cs + '"] .finp:not([data-optional])');
      var missing = [];
      required.forEach(function(i){ if(!i.value.trim()) missing.push(i.placeholder || i.name); });
      if(missing.length){ alert('Please fill: ' + missing.join(', ')); cb(false); return; }
      inputs.forEach(function(i){
        if(i.value.trim()) fd[i.placeholder || i.name || i.id] = i.value.trim();
      });

      var hp = qform.querySelector('input[name="_honey"]');
      if(hp && hp.value){ cb(true); return; }

      // No form endpoint configured yet — tell the user how to reach us
      // rather than pretending the enquiry was delivered.
      if(!CONFIG.web3FormsKey){
        showError(fallbackMsg);
        cb(false);
        return;
      }

      var ctx = qform.dataset.context || 'Quote Request';
      var userEmail = '';
      Object.keys(fd).forEach(function(k){ if(/email/i.test(k) && !userEmail) userEmail = fd[k]; });

      var payload = {
        access_key: CONFIG.web3FormsKey,
        subject: 'Website enquiry — ' + ctx,
        from_name: 'PA Building Group Website',
        replyto: userEmail || '',
        email: userEmail || '',
        Service: ctx,
        Page: window.location.href
      };
      Object.keys(fd).forEach(function(k){ payload[k] = fd[k]; });

      var btn = submitBtn();
      var origText = btn ? btn.textContent : '';
      if(btn){ btn.disabled = true; btn.textContent = 'Sending…'; btn.style.opacity = '.7'; }

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      })
      .then(function(r){ return r.json().catch(function(){ return {}; }).then(function(j){ return { ok:r.ok, j:j }; }); })
      .then(function(res){
        if(btn){ btn.disabled = false; btn.textContent = origText; btn.style.opacity = ''; }
        if(res.ok && res.j && res.j.success){ cb(true); }
        else { showError(fallbackMsg); cb(false); }
      })
      .catch(function(){
        if(btn){ btn.disabled = false; btn.textContent = origText; btn.style.opacity = ''; }
        showError('Network issue. ' + fallbackMsg);
        cb(false);
      });
    };

    qform.querySelectorAll('.fn').forEach(function(btn){
      btn.addEventListener('click', function(){
        if(btn.dataset.action === 'submit'){
          sendQuote(function(success){ if(success) showSuccess(); });
          return;
        }
        if(cs >= maxStep) return;
        var sel = qform.querySelector('.fslide[data-s="' + cs + '"] .ob.sel');
        if(!sel) return;
        cs++;
        upd();
      });
    });

    qform.querySelectorAll('.fb').forEach(function(b){
      b.addEventListener('click', function(){
        if(cs <= 1) return;
        cs--;
        upd();
      });
    });
  });

  // Lightbox for non-linked project images
  var projCards = document.querySelectorAll('.proj-card:not(a)');
  if(projCards.length){
    var lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.innerHTML = '<button class="lightbox-close" aria-label="Close">&times;</button><img src="" alt=""><div class="lightbox-caption"></div>';
    document.body.appendChild(lb);
    var lbImg = lb.querySelector('img');
    var lbCap = lb.querySelector('.lightbox-caption');
    var closeLb = function(){ lb.classList.remove('open'); document.body.style.overflow = ''; };
    lb.querySelector('.lightbox-close').addEventListener('click', closeLb);
    lb.addEventListener('click', function(e){ if(e.target === lb) closeLb(); });
    document.addEventListener('keydown', function(e){ if(e.key === 'Escape') closeLb(); });
    projCards.forEach(function(card){
      card.style.cursor = 'zoom-in';
      card.addEventListener('click', function(){
        var img = card.querySelector('img');
        var title = card.querySelector('h3');
        var loc = card.querySelector('p');
        if(img){
          lbImg.src = img.src;
          lbImg.alt = img.alt;
          lbCap.textContent = (title ? title.textContent : '') + (loc ? ' — ' + loc.textContent : '');
          lb.classList.add('open');
          document.body.style.overflow = 'hidden';
        }
      });
    });
  }
})();
