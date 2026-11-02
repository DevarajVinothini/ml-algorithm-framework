// ── Filter Logic ──
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.algo-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    cards.forEach((card, i) => {
      const type = card.dataset.type;        // "supervised" | "unsupervised"
      const domains = card.dataset.domains;  // e.g. "cv genai"

      let visible = false;
      if (filter === 'all') {
        visible = true;
      } else if (filter === 'supervised' || filter === 'unsupervised') {
        visible = type === filter;
      } else {
        visible = domains.includes(filter);
      }

      if (visible) {
        card.classList.remove('hidden');
        card.style.animationDelay = `${i * 0.05}s`;
        card.style.animation = 'none';
        // Force reflow then re-trigger animation
        void card.offsetHeight;
        card.style.animation = '';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ── Intersection Observer for scroll animations ──
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.tax-item, .domain-box').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// ── Table row glow on hover ──
document.querySelectorAll('.algo-table tbody tr').forEach(row => {
  row.addEventListener('mouseenter', () => {
    row.style.boxShadow = 'inset 0 0 0 1px rgba(99,102,241,0.2)';
  });
  row.addEventListener('mouseleave', () => {
    row.style.boxShadow = '';
  });
});

// ── Stagger cards on initial load ──
cards.forEach((card, i) => {
  card.style.animationDelay = `${i * 0.06}s`;
});

console.log('✅ ML Algorithm Framework loaded — 12 algorithms across 4 domains');
