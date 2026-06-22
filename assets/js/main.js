document.getElementById('year').textContent = new Date().getFullYear();
const navLinks = document.querySelectorAll('.nav-glass a');
const legacyHash = { '#capabilities': '#expertise', '#workflow': '#expertise' }[window.location.hash];

if (legacyHash) {
  history.replaceState(null, '', legacyHash);
  requestAnimationFrame(() => document.querySelector(legacyHash)?.scrollIntoView());
}

const navTargets = [...navLinks]
  .map(link => {
    const href = link.getAttribute('href');
    return href.startsWith('#') ? document.querySelector(href) : null;
  })
  .filter(Boolean);

const setActiveNav = id => {
  navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${id}`));
};

navLinks.forEach(link => link.addEventListener('click', () => {
  const href = link.getAttribute('href');
  if (href.startsWith('#')) setActiveNav(href.slice(1));
}));

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    const visible = entries
      .filter(entry => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible) setActiveNav(visible.target.id);
  }, { rootMargin: '-18% 0px -56% 0px', threshold: [0, .15, .35] });

  navTargets.forEach(section => observer.observe(section));
}
