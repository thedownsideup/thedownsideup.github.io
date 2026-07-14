const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const toggleSwitch = document.querySelector(
    '.theme-switch input[type="checkbox"]'
);
const dateElement = document.querySelector("#datee");
const experienceGrid = document.querySelector("#experience-grid");

/* Mobile navigation */
function toggleMobileMenu() {
  hamburger?.classList.toggle("active");
  navMenu?.classList.toggle("active");
}

function closeMobileMenu() {
  hamburger?.classList.remove("active");
  navMenu?.classList.remove("active");
}

hamburger?.addEventListener("click", toggleMobileMenu);

navLinks.forEach((navLink) => {
  navLink.addEventListener("click", closeMobileMenu);
});

/* Theme switching */
function switchTheme(event) {
  const theme = event.target.checked ? "dark" : "light";

  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  document.documentElement.setAttribute("data-theme", savedTheme);

  if (toggleSwitch) {
    toggleSwitch.checked = savedTheme === "dark";
  }
}

toggleSwitch?.addEventListener("change", switchTheme);

/* Work experience data */
const experienceData = [
  {
    dates: "Jan 2026 – Present",
    title: "Game Developer / Software Engineer",
    company: "Swordmonkey Studios Inc.",
    website: "https://www.swordmonkey.com/",
    logo: "assets/company/swordmonkey-logo.jpg",
    logoAlt: "Swordmonkey Studios Inc. logo",
    initials: "SM",
  },
  {
    dates: "Sept 2024 – Oct 2025",
    title: "Game Developer / Software Engineer",
    company: "Muslim Kids TV",
    website: "https://www.muslimkids.tv/",
    logo: "assets/company/mktv-logo.png",
    logoAlt: "Muslim Kids TV logo",
    initials: "MKTV",
  },
  {
    dates: "May 2024 – Aug 2024",
    title: "Unreal Engine Programmer Intern",
    company: "Byzantian Interactive, Inc.",
    website: "https://www.byzantian.net/",
    logo: "assets/company/byzantian-interactive-logo.jpg",
    logoAlt: "Byzantian Interactive logo",
    initials: "BI",
  },
  {
    dates: "June 2021 – Aug 2023",
    title: "Senior Software Engineer",
    company: "Medrick Game Studio",
    website: "https://medrickfze.com/",
    logo: "assets/company/medrick-logo.png",
    logoAlt: "Medrick Game Studio logo",
    initials: "MG",
  },
  {
    dates: "Aug 2020 – June 2021",
    title: "Software Engineer",
    company: "Medrick Game Studio",
    website: "https://medrickfze.com/",
    logo: "assets/company/medrick-logo.png",
    logoAlt: "Medrick Game Studio logo",
    initials: "MG",
  },
];

function createCompanyName(experience) {
  if (!experience.website) {
    return `
      <p class="experience-company">
        ${experience.company}
      </p>
    `;
  }

  return `
    <p class="experience-company">
      <a
        class="experience-company-link"
        href="${experience.website}"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit ${experience.company} website"
      >
        ${experience.company}
        <span aria-hidden="true">↗</span>
      </a>
    </p>
  `;
}

function createExperienceCard(experience) {
  return `
    <article class="experience-card">
      <div class="experience-logo">
        <img
          src="${experience.logo}"
          alt="${experience.logoAlt}"
        />

        <span class="experience-logo-fallback" hidden>
          ${experience.initials}
        </span>
      </div>

      <p class="experience-date">${experience.dates}</p>

      <h3>${experience.title}</h3>

      ${createCompanyName(experience)}
    </article>
  `;
}

function renderExperienceCards() {
  if (!experienceGrid) {
    return;
  }

  experienceGrid.innerHTML = experienceData
      .map((experience) => createExperienceCard(experience))
      .join("");

  const companyLogos = experienceGrid.querySelectorAll(
      ".experience-logo img"
  );

  companyLogos.forEach((logo) => {
    logo.addEventListener("error", () => {
      logo.hidden = true;

      const fallback = logo.nextElementSibling;

      if (fallback) {
        fallback.hidden = false;
      }
    });
  });
}

renderExperienceCards();

/* Footer year */
if (dateElement) {
  dateElement.textContent = new Date().getFullYear();
}