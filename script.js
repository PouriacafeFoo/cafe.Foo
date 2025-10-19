// دکمه حالت روز/شب
const toggleBtn = document.getElementById('toggle-theme');
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  toggleBtn.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// بارگذاری تم ذخیره‌شده
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    toggleBtn.textContent = '☀️';
  }
});

// انیمیشن اسکرول برای آیتم‌ها
const items = document.querySelectorAll('.menu-item');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, {
  threshold: 0.2
});

items.forEach(item => {
  item.style.opacity = '0';
  item.style.transform = 'translateY(40px)';
  observer.observe(item);
});
fetch('menu.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('menu-container');
    const categories = [...new Set(data.map(item => item.category))];

    categories.forEach(cat => {
      const section = document.createElement('section');
      section.className = 'menu-section';
      section.id = cat;

      const title = document.createElement('h2');
      title.textContent = getCategoryTitle(cat);
      section.appendChild(title);

      data.filter(item => item.category === cat).forEach(item => {
        const card = document.createElement('div');
        card.className = 'menu-item';

        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.name;
        img.className = 'item-image';

        const info = document.createElement('div');
        info.className = 'item-info';

        info.innerHTML = `
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <span class="price">${item.price}</span>
        `;

        card.appendChild(img);
        card.appendChild(info);
        section.appendChild(card);
      });

      container.appendChild(section);
    });
  });

function getCategoryTitle(key) {
  const titles = {
    "breakfasts": "🍳 صبحانه",
    "hot-drinks": "☕ نوشیدنی گرم",
    "cold-drinks": "🧊 نوشیدنی سرد",
    "desserts": "🍰 دسرها"
  };
  return titles[key] || "دسته‌بندی";
}
