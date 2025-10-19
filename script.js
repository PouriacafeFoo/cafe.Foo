const toggleBtn = document.getElementById('toggle-theme');
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  toggleBtn.textContent = isDark ? '☀️' : '🌙';
});

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode');
  toggleBtn.textContent = '☀️';
}
