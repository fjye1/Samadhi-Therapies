async function loadComponent(id, htmlPath, cssPath = null) {
  try {
    const res = await fetch(htmlPath);
    const html = await res.text();
    document.getElementById(id).innerHTML = html;

    if (cssPath) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = cssPath;
      document.head.appendChild(link);
    }
  } catch (err) {
    console.error(`Failed to load component ${id}:`, err);
  }
}

async function loadLayout() {
  await Promise.all([
    loadComponent(
      "header-container",
      "/components/header.html",
      "/assets/css/pages/header.css",
    ),
    loadComponent(
      "footer-container",
      "/components/footer.html",
      "/assets/css/pages/footer.css",
    ),
  ]);
}

async function loadPageContent() {
  const hash = window.location.hash.replace("#", "") || "home.html";
  const path = `/pages/${hash}`;

  const res = await fetch(path);
  const html = await res.text();
  document.getElementById("content").innerHTML = html;
}

window.addEventListener("hashchange", loadPageContent);

async function init() {
  await loadLayout();
  await loadPageContent();
}

document.addEventListener("DOMContentLoaded", init);
