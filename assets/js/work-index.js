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
