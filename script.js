// فعال‌سازی حالت تاریک
const toggleThemeBtn = document.getElementById('toggle-theme');
toggleThemeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// جستجوی زنده آیتم‌ها
const searchInput = document.getElementById('search');
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  const items = document.querySelectorAll('.menu-item');

  items.forEach(item => {
    const name = item.querySelector('h3').textContent.toLowerCase();
    const desc = item.querySelector('p').textContent.toLowerCase();
    if (name.includes(query) || desc.includes(query)) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
});

// آماده‌سازی برای بارگذاری آیتم‌ها از JSON (در صورت نیاز بعداً)
function loadMenuFromJSON(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      Object.keys(data).forEach(category => {
        const container = document.getElementById(category);
        if (container) {
          data[category].forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'menu-item';

            const img = document.createElement('img');
            img.src = item.image;
            img.alt = item.name;
            img.className = 'item-image';

            const infoDiv = document.createElement('div');
            infoDiv.className = 'item-info';
            const title = document.createElement('h3');
            title.textContent = item.name;

            const desc = document.createElement('p');
            desc.textContent = item.description;

            const price = document.createElement('span');
            price.textContent = item.price;
            price.className = 'item-price';

            infoDiv.appendChild(title);
            infoDiv.appendChild(desc);
            infoDiv.appendChild(price);

            itemDiv.appendChild(img);
            itemDiv.appendChild(infoDiv);

            container.appendChild(itemDiv);
          });
        }
      });
    })
    .catch(error => {
      console.error('خطا در بارگذاری منو:', error);
    });
}

// اگر خواستی فعالش کنی:
// loadMenuFromJSON('menu.json');

// حالت ذخیره‌سازی تم انتخاب‌شده (اختیاری)
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode');
}

toggleThemeBtn.addEventListener('click', () => {
  const isDark = document.body.classList.contains('dark-mode');
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
});

