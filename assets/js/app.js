function loadPage(page) {
  // FIXED: Removed leading slash for root-agnostic fetching
  fetch("pages/" + page)
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

  // Ensure we append .html if the hash doesn't have it
  if (!page.endsWith(".html")) {
    page += ".html";
  }

  loadPage(page);
}

// first load
window.addEventListener("load", handleRoute);

// when user clicks links (hash changes)
window.addEventListener("hashchange", handleRoute);

function loadComponent(id, htmlPath, cssPath) {
  // Path here is determined by how you call the function below
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
  // FIXED: Removed leading slashes from all paths
  loadComponent("header", "components/_header.html", "assets/css/header.css");
  loadComponent("footer", "components/_footer.html", "assets/css/footer.css");

  handleRoute(); 
});