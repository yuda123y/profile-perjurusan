// ==========================================================================
// SMK VOKASI UNGGULAN - UNIFIED INTERACTIVE SCRIPT
// Single Page Architecture matching Figma Design Preview
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initScrollSpy();
  initKatalogFilter();
  initGaleriFilter();
  initMitraFilter();
  initAccordion();
  initModals();
  initMobileMenu();
});

// ScrollSpy: Highlights active nav item while scrolling
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id], main[id], div[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const onScroll = () => {
    let scrollPos = window.scrollY + 120;

    sections.forEach(sec => {
      const id = sec.getAttribute('id');
      if (!id) return;
      const top = sec.offsetTop;
      const height = sec.offsetHeight;

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active-nav', 'text-blue-600');
            link.classList.remove('text-slate-600');
          } else {
            link.classList.remove('active-nav', 'text-blue-600');
            link.classList.add('text-slate-600');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// Katalog Jurusan Search & Category Filter
function initKatalogFilter() {
  const searchInput = document.getElementById('katalog-search');
  const filterPills = document.querySelectorAll('.katalog-pill');
  const cards = document.querySelectorAll('.jurusan-card-item');

  let currentCategory = 'all';
  let searchQuery = '';

  const applyFilters = () => {
    cards.forEach(card => {
      const category = card.dataset.category || '';
      const text = (card.innerText || '').toLowerCase();

      const matchesCat = currentCategory === 'all' || category === currentCategory;
      const matchesSearch = !searchQuery || text.includes(searchQuery);

      if (matchesCat && matchesSearch) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  };

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      applyFilters();
    });
  }

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => {
        p.classList.remove('bg-blue-600', 'text-white', 'shadow-sm');
        p.classList.add('bg-white', 'text-slate-700', 'border-slate-200');
      });

      pill.classList.add('bg-blue-600', 'text-white', 'shadow-sm');
      pill.classList.remove('bg-white', 'text-slate-700', 'border-slate-200');

      currentCategory = pill.dataset.category || 'all';
      applyFilters();
    });
  });
}

// Galeri Karya Category Filter
function initGaleriFilter() {
  const filterBtns = document.querySelectorAll('.galeri-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-card-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.category;

      filterBtns.forEach(b => {
        b.classList.remove('bg-blue-600', 'text-white', 'shadow-md');
        b.classList.add('bg-white', 'text-slate-700', 'border-slate-200');
      });

      btn.classList.add('bg-blue-600', 'text-white', 'shadow-md');
      btn.classList.remove('bg-white', 'text-slate-700', 'border-slate-200');

      galleryItems.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

// Mitra DUDI Sector Filter
function initMitraFilter() {
  const sectorBtns = document.querySelectorAll('.mitra-filter-btn');
  const partnerCards = document.querySelectorAll('.mitra-card-item');

  sectorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const sector = btn.dataset.sector;

      sectorBtns.forEach(b => {
        b.classList.remove('bg-blue-600', 'text-white', 'shadow-sm');
        b.classList.add('bg-white', 'text-slate-700', 'border-slate-200');
      });

      btn.classList.add('bg-blue-600', 'text-white', 'shadow-sm');
      btn.classList.remove('bg-white', 'text-slate-700', 'border-slate-200');

      partnerCards.forEach(card => {
        if (sector === 'all' || card.dataset.sector === sector) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// FAQ Accordion
function initAccordion() {
  const accordionHeaders = document.querySelectorAll('.faq-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const body = header.nextElementSibling;
      const icon = header.querySelector('.faq-icon');
      const isClosed = body.classList.contains('hidden');

      // Close other accordions in the same group
      const parentContainer = header.closest('.faq-container') || document;
      parentContainer.querySelectorAll('.faq-body').forEach(b => b.classList.add('hidden'));
      parentContainer.querySelectorAll('.faq-icon').forEach(i => i.classList.remove('rotate-180'));

      if (isClosed) {
        body.classList.remove('hidden');
        if (icon) icon.classList.add('rotate-180');
      }
    });
  });
}

// Interactive Modals (PPDB, Konsultasi, Kemitraan)
function initModals() {
  const modalTriggers = document.querySelectorAll('[data-modal-target]');
  const modalCloses = document.querySelectorAll('[data-modal-close]');

  modalTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.dataset.modalTarget;
      const modal = document.getElementById(targetId);
      if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = (modal) => {
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      document.body.style.overflow = '';
    }
  };

  modalCloses.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-container');
      closeModal(modal);
    });
  });

  // Close on outside backdrop click
  document.querySelectorAll('.modal-container').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-container:not(.hidden)').forEach(modal => {
        closeModal(modal);
      });
    }
  });
}

// Mobile Hamburger Menu
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-nav-menu');

  if (toggleBtn && menu) {
    toggleBtn.addEventListener('click', () => {
      menu.classList.toggle('hidden');
    });

    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.add('hidden');
      });
    });
  }
}
