// ==========================
// CONSTANTS & GLOBALS
// ==========================

SERVICE_LIMIT = 5; // max number of services to show on home page

// ==========================
// ROUTER
// ==========================

function handleRoute() {
  let page = window.location.hash.replace("#", "");

  if (!page) {
    page = "home.html";
  }

  if (!page.endsWith(".html")) {
    page += ".html";
  }

  loadPage(page);
}

function loadPage(page) {
  fetch("pages/" + page)
    .then((res) => res.text())
    .then((html) => {
      const container = document.getElementById("content");
      container.innerHTML = html;

      // IMPORTANT: run AFTER DOM injection
      onPageLoaded(page);
    });
}

function loadPageStyle(path) {
  if (document.querySelector(`link[data-page-style="${path}"]`)) return;

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = path;
  link.dataset.pageStyle = path;

  document.head.appendChild(link);
}

function removePageStyles() {
  document.querySelectorAll("link[data-page-style]").forEach((el) => el.remove());
}

// ==========================
// PAGE INIT CONTROLLER
// ==========================

function onPageLoaded(page) {
  if (page === "home.html") {
    removePageStyles();
    loadPageStyle("assets/css/home.css");
    initHomePage();
  }

  if (page === "services.html") {
    removePageStyles();
    loadPageStyle("assets/css/services.css");
    initServicesPage();
  }
}

// ==========================
// COMPONENT LOADER
// ==========================

function loadComponent(id, htmlPath, cssPath) {
  fetch(htmlPath)
    .then((res) => res.text())
    .then((html) => {
      document.getElementById(id).innerHTML = html;

      if (cssPath && !document.querySelector(`link[href="${cssPath}"]`)) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = cssPath;
        document.head.appendChild(link);
      }
    });
}

// ==========================
// SERVICES PAGE
// ==========================

function initServicesPage() {
  const container = document.getElementById("services-container");
  if (!container) return;

  fetch("assets/data/services.json")
    .then((res) => res.json())
    .then((data) => {
      // .slice(0, 3) takes only the first 3 items from the array
      const limitedServices = data.services.slice(0, SERVICE_LIMIT); 
      renderServices(limitedServices, container);
    });
}


function renderServices(services, container) {
  container.innerHTML = "";

  services.forEach((service) => {
    const col = document.createElement("div");
    col.className = "col";

    col.innerHTML = `
      <div class="service-card card h-100 border-0 shadow-sm">

        <img 
          src="${service.image}" 
          class="card-img-top" 
          alt="${service.name}"
        />

        <div class="card-body">
          <h5>${service.name}</h5>
          <p>${service.description}</p>

          <div class="price-list">
            ${service.prices
              .map(
                (item) => `
                  <div class="price-row">
                    <span>${item.duration}</span>
                    <span>${item.price}</span>
                  </div>
                `
              )
              .join("")}
          </div>
        </div>

        <div class="card-footer bg-transparent border-0">
          <a href="book.html" class="samadhi-btn-standard">
            Book Now
          </a>
        </div>

      </div>
    `;

    container.appendChild(col);
  });
}

// ==========================
// HOME PAGE (placeholder)
// ==========================

function initHomePage() {
  // example: services slider already exists on home
  initServicesPage();
}

// ==========================
// BOOTSTRAP
// ==========================

window.addEventListener("load", () => {
  loadComponent("header", "components/_header.html", "assets/css/header.css");
  loadComponent("footer", "components/_footer.html", "assets/css/footer.css");

  handleRoute();
});

window.addEventListener("hashchange", handleRoute);