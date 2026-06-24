document.getElementById('year').textContent = new Date().getFullYear();

const filters = document.querySelectorAll('[data-filter]');
const projects = document.querySelectorAll('[data-category]');

filters.forEach(button => button.addEventListener('click', () => {
  const category = button.dataset.filter;

  filters.forEach(item => {
    const active = item === button;
    item.classList.toggle('active', active);
    item.setAttribute('aria-pressed', active);
  });

  projects.forEach(project => {
    const categories = project.dataset.category.split(' ');
    project.hidden = category !== 'all' && !categories.includes(category);
  });
}));

document.querySelectorAll('[data-slideshow]').forEach(slideshow => {
  const track = slideshow.querySelector('.slide-track');
  const slides = slideshow.querySelectorAll('figure');
  const prev = slideshow.querySelector('[data-slide="prev"]');
  const next = slideshow.querySelector('[data-slide="next"]');
  if (!track || !slides.length || !prev || !next) return;

  let index = 0;
  const visible = 3;
  const max = Math.max(0, slides.length - visible);

  const render = () => {
    const width = slides[0].getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    track.style.transform = `translateX(${-index * (width + gap)}px)`;
  };

  prev.addEventListener('click', () => {
    index = index <= 0 ? max : index - 1;
    render();
  });

  next.addEventListener('click', () => {
    index = index >= max ? 0 : index + 1;
    render();
  });

  window.addEventListener('resize', render);
});

const sectionLinks = document.querySelectorAll('[data-section-link]');
const workSections = [...sectionLinks]
  .map(link => document.getElementById(link.dataset.sectionLink))
  .filter(Boolean);

if (sectionLinks.length && workSections.length) {
  const setActiveSection = id => {
    sectionLinks.forEach(link => {
      const active = link.dataset.sectionLink === id;
      link.classList.toggle('active', active);
      if (active) {
        link.setAttribute('aria-current', 'true');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  const initialId = location.hash ? location.hash.slice(1) : workSections[0].id;
  if (workSections.some(section => section.id === initialId)) {
    setActiveSection(initialId);
  } else {
    setActiveSection(workSections[0].id);
  }

  const sectionObserver = new IntersectionObserver(entries => {
    const visible = entries
      .filter(entry => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (visible) setActiveSection(visible.target.id);
  }, {
    rootMargin: '-35% 0px -45% 0px',
    threshold: [0.1, 0.25, 0.5, 0.75]
  });

  workSections.forEach(section => sectionObserver.observe(section));
}
