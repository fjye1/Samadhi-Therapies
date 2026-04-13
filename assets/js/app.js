function loadPage(page) {
  fetch("/pages/" + page)
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("content").innerHTML = html;
    });
}

function handleRoute() {
  let page = window.location.hash.replace("#", "");

  if (page === "") {
    page = "home.html"; // default page
  }

  loadPage(page);
}

// first load
window.addEventListener("load", handleRoute);

// when user clicks links (hash changes)
window.addEventListener("hashchange", handleRoute);

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

window.addEventListener("load", () => {
  loadComponent("header", "/components/_header.html", "/assets/css/header.css");
  loadComponent("footer", "/components/_footer.html", "/assets/css/footer.css");

  handleRoute(); // your page loader
});
