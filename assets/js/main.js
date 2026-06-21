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
      container.innerHTML = `<p class="empty-state">Henüz yayınlanmış bir gelişme yok. Yakında burada olacak.</p>`;
      return;
    }
    items
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .forEach(item => {
        const el = document.createElement("article");
        el.className = "news-item";
        el.innerHTML = `
          <time datetime="${item.date}">${item.date}</time>
          <div>
            <h3>${item.title}</h3>
            <p>${item.summary}</p>
            ${item.tag ? `<span class="badge">${item.tag}</span>` : ""}
          </div>`;
        container.appendChild(el);
      });
  } catch (err) {
    container.innerHTML = `<p class="empty-state">Gelişmeler yüklenemedi.</p>`;
    console.error(err);
  }
}