// ===========================================================
// KAPSUL YAZGİT PRUVA — Main Script
// ===========================================================

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => nav.classList.toggle("open"));
  }

  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".main-nav a").forEach(a => {
    if (a.getAttribute("href") === current) a.classList.add("active");
  });

  const newsList = document.getElementById("news-list");
  if (newsList) loadNews(newsList);
});

async function loadNews(container) {
  try {
    const res = await fetch("assets/data/news.json");
    const items = await res.json();
    
    if (!items.length) {
      // İngilizceye çevrildi
      container.innerHTML = `<p class="empty-state">No updates published yet. Coming soon.</p>`;
      return;
    }
    
    items
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .forEach(item => {
        const el = document.createElement("article");
        el.className = "news-item";
        el.innerHTML = `
          ${item.image ? `
            <div class="news-image">
              <img src="${item.image}" class="main-img" alt="${item.title}">
            </div>` : ""}
            
          <div class="news-content">
            ${item.image ? `<img src="${item.image}" class="row-bg-blur" aria-hidden="true">` : ""}
            
            <time datetime="${item.date}">${item.date}</time>
            <h3>${item.title}</h3>
            <p>${item.summary}</p>
            ${item.tag ? `<span class="badge">${item.tag}</span>` : ""}
          </div>
        `;
        
        container.appendChild(el);
      });
  } catch (err) {
    // İngilizceye çevrildi
    container.innerHTML = `<p class="empty-state">Failed to load updates.</p>`;
    console.error(err);
  }
}