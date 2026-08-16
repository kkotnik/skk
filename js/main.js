document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    function setNavOpen(open) {
      if (open) {
        nav.classList.add('is-open');
        toggle.classList.add('is-open');
        toggle.setAttribute('aria-expanded', 'true');
        toggle.setAttribute('aria-label', 'Zapri meni');
      } else {
        nav.classList.remove('is-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Odpri meni');
      }
    }

    toggle.addEventListener('click', () => {
      const open = nav.classList.contains('is-open') === false;
      setNavOpen(open);
    });

    document.querySelectorAll('.main-nav a').forEach(link => {
      link.addEventListener('click', () => setNavOpen(false));
    });

    document.addEventListener('click', (event) => {
      if (nav.classList.contains('is-open') === false) {
        return;
      }
      const header = document.querySelector('.site-header');
      if (header && header.contains(event.target) === false) {
        setNavOpen(false);
      }
    });
  }

  const heroTrack = document.querySelector('.hero-track');
  const heroDots = document.querySelectorAll('.hero-dots button');
  const heroPanels = document.querySelectorAll('.hero-panel');
  if (heroTrack && heroDots.length && heroPanels.length) {
    let heroIndex = 0;
    let heroTimer = null;
    let heroAutoOff = false;

    function setHeroDot(index) {
      heroDots.forEach((dot, i) => {
        if (i === index) {
          dot.classList.add('is-active');
        } else {
          dot.classList.remove('is-active');
        }
      });
    }

    function isHeroCarousel() {
      return window.matchMedia('(max-width: 480px)').matches;
    }

    function goToHero(index) {
      if (index >= heroPanels.length) {
        heroIndex = 0;
      } else if (index < 0) {
        heroIndex = heroPanels.length - 1;
      } else {
        heroIndex = index;
      }
      heroTrack.scrollTo({
        left: heroPanels[heroIndex].offsetLeft,
        behavior: 'smooth'
      });
      setHeroDot(heroIndex);
    }

    function stopHeroTimer() {
      if (heroTimer) {
        window.clearInterval(heroTimer);
        heroTimer = null;
      }
    }

    function stopHeroAuto() {
      heroAutoOff = true;
      stopHeroTimer();
    }

    function startHeroTimer() {
      stopHeroTimer();
      if (heroAutoOff) {
        return;
      }
      if (isHeroCarousel() === false) {
        return;
      }
      heroTimer = window.setInterval(() => {
        goToHero(heroIndex + 1);
      }, 5000);
    }

    heroDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        stopHeroAuto();
        goToHero(index);
      });
    });

    heroTrack.addEventListener('scroll', () => {
      const width = heroTrack.clientWidth;
      if (width === 0) {
        return;
      }
      heroIndex = Math.round(heroTrack.scrollLeft / width);
      setHeroDot(heroIndex);
    });

    heroTrack.addEventListener('pointerdown', stopHeroAuto);

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopHeroTimer();
      } else {
        startHeroTimer();
      }
    });

    window.addEventListener('resize', startHeroTimer);
    startHeroTimer();
  }

  const trustTrack = document.querySelector('.trust-track');
  const trustDots = document.querySelectorAll('.trust-dots button');
  const trustPanels = document.querySelectorAll('.trust-track > div');
  if (trustTrack && trustDots.length && trustPanels.length) {
    let trustIndex = 0;
    let trustTimer = null;
    let trustAutoOff = false;

    function setTrustDot(index) {
      trustDots.forEach((dot, i) => {
        if (i === index) {
          dot.classList.add('is-active');
        } else {
          dot.classList.remove('is-active');
        }
      });
    }

    function isTrustCarousel() {
      return window.matchMedia('(max-width: 480px)').matches;
    }

    function goToTrust(index) {
      if (index >= trustPanels.length) {
        trustIndex = 0;
      } else if (index < 0) {
        trustIndex = trustPanels.length - 1;
      } else {
        trustIndex = index;
      }
      trustTrack.scrollTo({
        left: trustPanels[trustIndex].offsetLeft,
        behavior: 'smooth'
      });
      setTrustDot(trustIndex);
    }

    function stopTrustTimer() {
      if (trustTimer) {
        window.clearInterval(trustTimer);
        trustTimer = null;
      }
    }

    function stopTrustAuto() {
      trustAutoOff = true;
      stopTrustTimer();
    }

    function startTrustTimer() {
      stopTrustTimer();
      if (trustAutoOff) {
        return;
      }
      if (isTrustCarousel() === false) {
        return;
      }
      trustTimer = window.setInterval(() => {
        goToTrust(trustIndex + 1);
      }, 5000);
    }

    trustDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        stopTrustAuto();
        goToTrust(index);
      });
    });

    trustTrack.addEventListener('scroll', () => {
      const width = trustTrack.clientWidth;
      if (width === 0) {
        return;
      }
      trustIndex = Math.round(trustTrack.scrollLeft / width);
      setTrustDot(trustIndex);
    });

    trustTrack.addEventListener('pointerdown', stopTrustAuto);

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopTrustTimer();
      } else {
        startTrustTimer();
      }
    });

    window.addEventListener('resize', startTrustTimer);
    startTrustTimer();
  }

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.querySelector('.lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');
  if (!lightbox || !lightboxImg || !lightboxClose) {
    return;
  }

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    if (alt) {
      lightboxImg.alt = alt;
    } else {
      lightboxImg.alt = '';
    }
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
    lightboxClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');
  }

  document.querySelectorAll('.feature-photo, .gallery-photo').forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      openLightbox(img.currentSrc || img.src, img.alt);
    });
  });

  lightboxClose.addEventListener('click', (event) => {
    event.stopPropagation();
    closeLightbox();
  });

  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  lightboxImg.addEventListener('click', (event) => {
    event.stopPropagation();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && lightbox.classList.contains('is-open')) {
      closeLightbox();
    }
  });
});
