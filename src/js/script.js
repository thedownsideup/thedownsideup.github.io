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
    duration: "Current",
    title: "Game Developer / Software Engineer",
    company: "Swordmonkey Inc.",
    logo: "assets/company/swordmonkey-logo.jpg",
    logoAlt: "Swordmonkey Inc. logo",
    initials: "SM",
    links: [],
  },
  {
    dates: "Sept 2024 – Oct 2025",
    duration: "1 yr 1 mo",
    title: "Game Developer / Software Engineer",
    company: "Muslim Kids TV",
    logo: "assets/company/mktv-logo.png",
    logoAlt: "Muslim Kids TV logo",
    initials: "MKTV",
    links: [
      {
        label: "Muslim Kids TV",
        platform: "Google Play",
        url: "https://play.google.com/store/apps/details?id=com.mktv.steelkiwi.muslimkidstv",
      },
      {
        label: "Muslim Kids TV",
        platform: "App Store",
        url: "https://apps.apple.com/ca/app/muslim-kids-tv/id1189900377",
      },
    ],
  },
  {
    dates: "May 2024 – Aug 2024",
    duration: "4 mos",
    title: "Unreal Engine Programmer Intern",
    company: "Byzantian Interactive, Inc.",
    logo: "assets/company/byzantian-interactive-logo.jpg",
    logoAlt: "Byzantian Interactive logo",
    initials: "BI",
    links: [
      {
        label: "Game Programming Team",
        platform: "",
        url: "",
      },
    ],
  },
  {
    dates: "June 2021 – Aug 2023",
    duration: "2 yrs 3 mos",
    title: "Senior Software Engineer",
    company: "Medrick Game Studio",
    logo: "assets/company/medrick-logo.png",
    logoAlt: "Medrick Game Studio logo",
    initials: "MG",
    links: [
      {
        label: "Golmorad",
        platform: "Google Play",
        url: "",
      },
      {
        label: "Dream Home",
        platform: "Google Play",
        url: "",
      },
    ],
  },
  {
    dates: "Aug 2020 – June 2021",
    duration: "11 mos",
    title: "Software Engineer",
    company: "Medrick Game Studio",
    logo: "assets/company/medrick-logo.png",
    logoAlt: "Medrick Game Studio logo",
    initials: "MG",
    links: [
      {
        label: "Golmorad",
        platform: "Google Play",
        url: "",
      },
      {
        label: "Dream Home",
        platform: "Google Play",
        url: "",
      },
    ],
  },
];

function createExperienceLink(link) {
  const platform = link.platform
      ? `<span class="experience-link-platform">${link.platform}</span>`
      : "";

  const contents = `
    <span class="experience-link-label">${link.label}</span>
    ${platform}
  `;

  if (!link.url) {
    return `
      <span class="experience-link experience-link-static">
        ${contents}
      </span>
    `;
  }

  return `
    <a
      class="experience-link"
      href="${link.url}"
      target="_blank"
      rel="noopener noreferrer"
    >
      ${contents}
    </a>
  `;
}

function createExperienceCard(experience) {
  const dateText = experience.duration
      ? `${experience.dates} · ${experience.duration}`
      : experience.dates;

  const links = experience.links
      .map((link) => createExperienceLink(link))
      .join("");

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

      <p class="experience-date">${dateText}</p>

      <h3>${experience.title}</h3>

      <p class="experience-company">${experience.company}</p>

      <div class="experience-links">
        ${links}
      </div>
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