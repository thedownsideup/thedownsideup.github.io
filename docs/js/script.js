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
const experienceList = document.querySelector("#experience-list");

const skillsTrack = document.querySelector("#skills-track");

const projectsGrid = document.querySelector("#projects-grid");
const projectsSeeMore = document.querySelector("#projects-see-more");

/* Portfolio data */
if (!window.portfolioData) {
    throw new Error(
        "portfolio-data.js did not load. Make sure it loads before script.js."
    );
}

const experienceData = window.portfolioData.experience || [];
const skillsData = window.portfolioData.skills || [];
const projectsData = window.portfolioData.projects || [];

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

/* Theme */
function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);

    if (toggleSwitch) {
        toggleSwitch.checked = theme === "dark";
    }
}

function getSavedTheme() {
    return localStorage.getItem("theme");
}

function initializeTheme() {
    const savedTheme = getSavedTheme();

    if (savedTheme === "dark" || savedTheme === "light") {
        applyTheme(savedTheme);
        return;
    }

    applyTheme("light");
}

function switchTheme(event) {
    const selectedTheme = event.target.checked
        ? "dark"
        : "light";

    applyTheme(selectedTheme);
    localStorage.setItem("theme", selectedTheme);
}

toggleSwitch?.addEventListener("change", switchTheme);

initializeTheme();

/* Experience logo */
function createExperienceLogo(experience, containerClass) {
    const logo = experience.logo || "";
    const logoAlt =
        experience.logoAlt ||
        `${experience.company} logo`;

    const initials = experience.initials || "";

    return `
        <div class="${containerClass}">
            <img
                src="${logo}"
                alt="${logoAlt}"
                loading="lazy"
                data-experience-logo
            />

            <span
                class="experience-logo-fallback"
                aria-hidden="true"
            >
                ${initials}
            </span>
        </div>
    `;
}

function initializeExperienceLogoFallbacks() {
    const logos = document.querySelectorAll(
        "[data-experience-logo]"
    );

    logos.forEach((logo) => {
        const fallback =
            logo.parentElement?.querySelector(
                ".experience-logo-fallback"
            );

        if (!logo.getAttribute("src")) {
            logo.style.display = "none";

            if (fallback) {
                fallback.style.display = "flex";
            }

            return;
        }

        logo.addEventListener(
            "error",
            () => {
                logo.style.display = "none";

                if (fallback) {
                    fallback.style.display = "flex";
                }
            },
            {
                once: true,
            }
        );
    });
}

/* Vertical experience cards */
/* These functions remain available, but the current page uses the list. */
function createExperienceCard(experience) {
    const website = experience.website || "#";

    return `
        <article class="experience-card portfolio-card">
            ${createExperienceLogo(
        experience,
        "experience-logo"
    )}

            <div class="experience-card-copy">
                <p class="experience-card-dates">
                    ${experience.dates}
                </p>

                <h3>${experience.title}</h3>

                <a
                    href="${website}"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    ${experience.company}
                </a>
            </div>
        </article>
    `;
}

function renderExperienceCards() {
    if (!experienceGrid) {
        return;
    }

    experienceGrid.innerHTML =
        experienceData
            .map(createExperienceCard)
            .join("");

    initializeExperienceLogoFallbacks();
}

/* Horizontal experience list */
function createExperienceListItem(experience) {
    const website = experience.website || "#";

    return `
        <a
            class="portfolio-list-item"
            href="${website}"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit ${experience.company}"
        >
            ${createExperienceLogo(
        experience,
        "portfolio-list-logo"
    )}

            <div class="portfolio-list-copy">
                <p class="portfolio-list-dates">
                    ${experience.dates}
                </p>

                <h3>${experience.title}</h3>

                <p class="portfolio-list-company">
                    ${experience.company}
                </p>
            </div>

            <span
                class="portfolio-list-arrow"
                aria-hidden="true"
            >
                <i class="fas fa-arrow-right"></i>
            </span>
        </a>
    `;
}

function renderExperienceList() {
    if (!experienceList) {
        return;
    }

    experienceList.innerHTML =
        experienceData
            .map(createExperienceListItem)
            .join("");

    initializeExperienceLogoFallbacks();
}

/* Skills */
function createSkillCard(skill) {
    return `
        <article class="skill-card">
            <div
                class="skill-card-abbreviation"
                aria-hidden="true"
            >
                ${skill.abbreviation}
            </div>

            <div class="skill-card-copy">
                <h3>${skill.name}</h3>
                <p>${skill.category}</p>
            </div>
        </article>
    `;
}

function createSkillsGroup(skills, isDuplicate = false) {
    const hiddenAttribute = isDuplicate
        ? 'aria-hidden="true"'
        : "";

    return `
        <div
            class="skills-group"
            ${hiddenAttribute}
        >
            ${skills.map(createSkillCard).join("")}
        </div>
    `;
}

function renderSkills() {
    if (!skillsTrack || skillsData.length === 0) {
        return;
    }

    skillsTrack.innerHTML = `
        ${createSkillsGroup(skillsData)}
        ${createSkillsGroup(skillsData, true)}
    `;
}

/* Projects */
function createProjectLink(
    url,
    iconClass,
    label
) {
    if (
        typeof url !== "string" ||
        !url.trim()
    ) {
        return "";
    }

    return `
        <a
            href="${url.trim()}"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="${label}"
        >
            <i class="${iconClass}"></i>
        </a>
    `;
}

function createMobileProjectLink(project) {
    const youtubeUrl =
        typeof project.youtubeUrl === "string"
            ? project.youtubeUrl.trim()
            : "";

    if (!youtubeUrl) {
        return "";
    }

    return `
        <a
            class="project-card-mobile-link"
            href="${youtubeUrl}"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Watch ${project.title} on YouTube"
        ></a>
    `;
}

function createProjectCard(project) {
    const githubLink = createProjectLink(
        project.githubUrl,
        "fab fa-github",
        `View ${project.title} on GitHub`
    );

    const youtubeLink = createProjectLink(
        project.youtubeUrl,
        "fab fa-youtube",
        `Watch ${project.title} on YouTube`
    );

    const mobileProjectLink =
        createMobileProjectLink(project);

    const hasYoutubeLink =
        typeof project.youtubeUrl === "string" &&
        project.youtubeUrl.trim();

    const youtubeAttribute = hasYoutubeLink
        ? 'data-has-youtube="true"'
        : "";

    return `
        <article
            class="card project-card"
            style="background-image: url('${project.image}');"
            aria-label="${project.title} project"
            ${youtubeAttribute}
        >
            ${mobileProjectLink}

            <div class="project-info">
                <div class="project-bio">
                    <h3>${project.title}</h3>

                    <p>
                        ${project.technologies}
                    </p>
                </div>

                <div class="project-link">
                    ${githubLink}
                    ${youtubeLink}
                </div>
            </div>
        </article>
    `;
}

function renderProjects() {
    if (!projectsGrid) {
        return;
    }

    projectsGrid.innerHTML =
        projectsData
            .map(createProjectCard)
            .join("");

    const projectsMoreUrl =
        window.portfolioData.projectsMoreUrl;

    if (
        projectsSeeMore &&
        typeof projectsMoreUrl === "string" &&
        projectsMoreUrl.trim()
    ) {
        projectsSeeMore.href =
            projectsMoreUrl.trim();
    }
}

/* Footer year */
function renderCurrentYear() {
    if (!dateElement) {
        return;
    }

    dateElement.textContent =
        new Date().getFullYear();
}

/* Initial render */
renderExperienceList();
renderSkills();
renderProjects();
renderCurrentYear();