const categoryContent = {
  "ui-ux": {
    title: "UI/UX",
    description: "Interface design projects focused on user flow, wireframes, prototypes, and visual systems.",
    projects: ["Mobile App Prototype", "Website Redesign", "Usability Study"]
  },
  "graphic-design": {
    title: "Graphic Design",
    description: "Visual communication projects for posters, branding, layout design, and campaign assets.",
    projects: ["Brand Identity", "Poster Series", "Social Media Campaign"]
  },
  "2d-illustration": {
    title: "2D Illustration",
    description: "Illustration works exploring characters, scenes, editorial visuals, and digital drawing style.",
    projects: ["Character Sheet", "Editorial Illustration", "Digital Poster Art"]
  },
  "web-development": {
    title: "Web Development",
    description: "Front-end projects built with HTML, CSS, JavaScript, and Bootstrap for responsive web experiences.",
    projects: ["Portfolio Website", "Landing Page", "Interactive Web Page"]
  },
  "3d-illustration": {
    title: "3D Illustration",
    description: "3D modeling and rendering projects for product visuals, scenes, objects, and multimedia presentation.",
    projects: ["Product Render", "Low Poly Scene", "3D Object Study"]
  }
};

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") {
      return;
    }

    const target = document.querySelector(targetId);

    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });

    const navCollapse = document.querySelector(".navbar-collapse.show");
    if (navCollapse && window.bootstrap) {
      window.bootstrap.Collapse.getOrCreateInstance(navCollapse).hide();
    }
  });
});

const sections = [...document.querySelectorAll("main section[id], footer[id]")];
const navLinks = [...document.querySelectorAll(".nav-link[href^='#']")];

if (sections.length && navLinks.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: "-38% 0px -56% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
}

function renderCategoryPage() {
  const title = document.querySelector("#categoryTitle");
  const description = document.querySelector("#categoryDescription");
  const grid = document.querySelector("#categoryProjectGrid");

  if (!title || !description || !grid) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const selectedCategory = params.get("category") || "ui-ux";
  const content = categoryContent[selectedCategory] || categoryContent["ui-ux"];

  document.title = `${content.title} | Project Portfolio`;
  title.textContent = content.title;
  description.textContent = content.description;

  grid.innerHTML = content.projects
    .map(
      (projectName) => `
        <div class="col">
          <article class="project-card h-100">
            <div class="project-image"></div>
            <div class="project-body">
              <h3>${projectName}</h3>
              <span class="category-pill">${content.title}</span>
              <p>Replace this placeholder with the project background, tools, process, and result.</p>
            </div>
          </article>
        </div>
      `
    )
    .join("");
}

renderCategoryPage();
