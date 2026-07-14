"use strict";

/* DOM references */
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

const toggleSwitch = document.querySelector(
    '.theme-switch input[type="checkbox"]'
);

const dateElement = document.querySelector("#datee");
const experienceGrid = document.querySelector("#experience-grid");
const skillsTrack = document.querySelector("#skills-track");

/* Portfolio data */
const experienceData = window.portfolioData?.experience ?? [];
const skillsData = window.portfolioData?.skills ?? [];

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
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);

  if (toggleSwitch) {
    toggleSwitch.checked = theme === "dark";
  }
}

function switchTheme(event) {
  const selectedTheme = event.target.checked ? "dark" : "light";

  applyTheme(selectedTheme);
  localStorage.setItem("theme", selectedTheme);
}

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark" || savedTheme === "light") {
  applyTheme(savedTheme);
} else {
  applyTheme("light");
}

toggleSwitch?.addEventListener("change", switchTheme);

/* Work experience */
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
        aria-label="Visit the ${experience.company} website"
      >
        ${experience.company}
        <span class="external-link-icon" aria-hidden="true">↗</span>
      </a>
    </p>
  `;
}

function createExperienceCard(experience) {
  return `
    <article class="portfolio-card experience-card">
      <div class="experience-logo">
        <img
          src="${experience.logo}"
          alt="${experience.logoAlt}"
        />

        <span class="experience-logo-fallback" hidden>
          ${experience.initials}
        </span>
      </div>

      <p class="experience-date">
        ${experience.dates}
      </p>

      <h3>
        ${experience.title}
      </h3>

      ${createCompanyName(experience)}
    </article>
  `;
}

function addLogoFallbacks() {
  if (!experienceGrid) {
    return;
  }

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

function renderExperienceCards() {
  if (!experienceGrid || experienceData.length === 0) {
    return;
  }

  experienceGrid.innerHTML = experienceData
      .map((experience) => createExperienceCard(experience))
      .join("");

  addLogoFallbacks();
}

/* Skills marquee */
function createSkillCard(skill, isDuplicate) {
  const tabIndex = isDuplicate ? "-1" : "0";

  return `
    <article
      class="portfolio-card skill-card"
      tabindex="${tabIndex}"
      aria-label="${skill.name}, ${skill.category}"
    >
      <span class="skill-card-abbreviation" aria-hidden="true">
        ${skill.abbreviation}
      </span>

      <div class="skill-card-content">
        <h3>${skill.name}</h3>
        <p>${skill.category}</p>
      </div>
    </article>
  `;
}

function createSkillsGroup(isDuplicate = false) {
  const attributes = isDuplicate
      ? 'aria-hidden="true"'
      : 'aria-label="Skills list"';

  return `
    <div class="skills-group" ${attributes}>
      ${skillsData
      .map((skill) => createSkillCard(skill, isDuplicate))
      .join("")}
    </div>
  `;
}

function renderSkills() {
  if (!skillsTrack || skillsData.length === 0) {
    return;
  }

  /*
   * The second group is an identical visual copy.
   * This allows the animation to loop without a visible jump.
   */
  skillsTrack.innerHTML = `
    ${createSkillsGroup(false)}
    ${createSkillsGroup(true)}
  `;
}

/* Footer year */
function renderCurrentYear() {
  if (!dateElement) {
    return;
  }

  dateElement.textContent = new Date().getFullYear();
}

/* Initial rendering */
renderExperienceCards();
renderSkills();
renderCurrentYear();