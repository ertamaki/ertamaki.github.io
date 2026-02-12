// tamaki.ai — Main JavaScript
// Navbar scroll behavior, mobile menu, project filter

(function() {
  'use strict';

  // --- Navbar scroll ---
  const navbar = document.getElementById('navbar');
  if (navbar) {
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 80) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      lastScroll = currentScroll;
    }, { passive: true });
  }

  // --- Mobile menu ---
  const menuToggle = document.getElementById('menu-toggle');
  const menuClose = document.getElementById('menu-close');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function() {
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  if (menuClose && mobileMenu) {
    menuClose.addEventListener('click', function() {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  // Close mobile menu on link click
  if (mobileMenu) {
    const links = mobileMenu.querySelectorAll('.mobile-menu__link');
    links.forEach(function(link) {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Filter tabs (for projects page) ---
  const filterTabs = document.querySelectorAll('.filter-tab');
  if (filterTabs.length > 0) {
    filterTabs.forEach(function(tab) {
      tab.addEventListener('click', function() {
        const filter = this.getAttribute('data-filter');

        // Update active tab
        filterTabs.forEach(function(t) { t.classList.remove('active'); });
        this.classList.add('active');

        // Filter items
        const items = document.querySelectorAll('[data-type]');
        items.forEach(function(item) {
          if (filter === 'all' || item.getAttribute('data-type') === filter) {
            item.classList.remove('hidden');
          } else {
            item.classList.add('hidden');
          }
        });
      });
    });
  }
})();
