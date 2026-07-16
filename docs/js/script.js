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

/* Theme switching */
function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);

    if (toggleSwitch) {
        toggleSwitch.checked = theme === "dark";
    }
}

function switchTheme(event) {
    const selectedTheme = event.target.checked
        ? "dark"
        : "light";

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

/* Shared experience markup */
function createLogoMarkup(experience, containerClass) {
    return `
        <div class="${containerClass}">
            <img
                data-company-logo
                src="${experience.logo}"
                alt="${experience.logoAlt}"
            />

            <span class="experience-logo-fallback" hidden>
                ${experience.initials}
            </span>
        </div>
    `;
}

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
                <span
                    class="external-link-icon"
                    aria-hidden="true"
                >
                    ↗
                </span>
            </a>
        </p>
    `;
}

/*
 * Vertical experience cards
 *
 * These are kept in the codebase for possible future use.
 * The current page uses the horizontal experience list.
 */
function createExperienceCard(experience) {
    return `
        <article class="portfolio-card experience-card">
            ${createLogoMarkup(
        experience,
        "experience-logo"
    )}

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

function renderExperienceCards() {
    if (!experienceGrid) {
        return;
    }

    experienceGrid.innerHTML = experienceData
        .map((experience) =>
            createExperienceCard(experience)
        )
        .join("");

    addLogoFallbacks(experienceGrid);
}

/* Horizontal experience list */
function createExperienceListContent(experience) {
    const arrowMarkup = experience.website
        ? `
            <span
                class="portfolio-list-arrow"
                aria-hidden="true"
            >
                ↗
            </span>
        `
        : "";

    return `
        ${createLogoMarkup(
        experience,
        "portfolio-list-logo"
    )}

        <div class="portfolio-list-copy">
            <p class="portfolio-list-date">
                ${experience.dates}
            </p>

            <h3>
                ${experience.title}
            </h3>

            <p class="portfolio-list-company">
                ${experience.company}
            </p>
        </div>

        ${arrowMarkup}
    `;
}

function createExperienceListItem(experience) {
    const content =
        createExperienceListContent(experience);

    if (!experience.website) {
        return `
            <article
                class="portfolio-card portfolio-list-item"
            >
                ${content}
            </article>
        `;
    }

    return `
        <a
            class="portfolio-card portfolio-list-item"
            href="${experience.website}"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit the ${experience.company} website"
        >
            ${content}
        </a>
    `;
}

function renderExperienceList() {
    if (!experienceList) {
        return;
    }

    experienceList.innerHTML = experienceData
        .map((experience) =>
            createExperienceListItem(experience)
        )
        .join("");

    addLogoFallbacks(experienceList);
}

/* Company logo fallback */
function showLogoFallback(logo) {
    logo.hidden = true;

    const fallback = logo.nextElementSibling;

    if (fallback) {
        fallback.hidden = false;
    }
}

function addLogoFallbacks(container) {
    const companyLogos = container.querySelectorAll(
        "[data-company-logo]"
    );

    companyLogos.forEach((logo) => {
        logo.addEventListener("error", () => {
            showLogoFallback(logo);
        });

        if (
            logo.complete &&
            logo.naturalWidth === 0
        ) {
            showLogoFallback(logo);
        }
    });
}

/* Skills marquee */
function createSkillCard(skill, isDuplicate) {
    const tabIndex = isDuplicate
        ? "-1"
        : "0";

    return `
        <article
            class="portfolio-card skill-card"
            tabindex="${tabIndex}"
            aria-label="${skill.name}, ${skill.category}"
        >
            <span
                class="skill-card-abbreviation"
                aria-hidden="true"
            >
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
        <div
            class="skills-group"
            ${attributes}
        >
            ${skillsData
        .map((skill) =>
            createSkillCard(
                skill,
                isDuplicate
            )
        )
        .join("")}
        </div>
    `;
}

function renderSkills() {
    if (!skillsTrack) {
        return;
    }

    skillsTrack.innerHTML = `
        ${createSkillsGroup(false)}
        ${createSkillsGroup(true)}
    `;
}

/*
 * Project link
 *
 * Empty URLs render nothing.
 */
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

/* Projects */
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

    const youtubeUrl =
        typeof project.youtubeUrl === "string"
            ? project.youtubeUrl.trim()
            : "";

    const youtubeDataAttribute = youtubeUrl
        ? `data-youtube-url="${youtubeUrl}"`
        : "";

    return `
        <article
            class="card project-card"
            style="background-image: url('${project.image}');"
            aria-label="${project.title} project"
            ${youtubeDataAttribute}
        >
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

    projectsGrid.innerHTML = projectsData
        .map((project) =>
            createProjectCard(project)
        )
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

/*
 * On tablet and mobile, the entire project card opens
 * its YouTube link.
 *
 * This only targets .project-card and does not affect
 * experience cards or shipped-title cards.
 */
const projectCardMediaQuery =
    window.matchMedia("(max-width: 1024px)");

function openProjectVideo(projectCard) {
    const youtubeUrl =
        projectCard.dataset.youtubeUrl;

    if (!youtubeUrl) {
        return;
    }

    window.open(
        youtubeUrl,
        "_blank",
        "noopener,noreferrer"
    );
}

function updateProjectCardAccessibility() {
    const projectCards =
        document.querySelectorAll(
            ".project-card[data-youtube-url]"
        );

    projectCards.forEach((projectCard) => {
        if (projectCardMediaQuery.matches) {
            projectCard.setAttribute(
                "role",
                "link"
            );

            projectCard.setAttribute(
                "tabindex",
                "0"
            );

            projectCard.setAttribute(
                "aria-label",
                `${projectCard.getAttribute("aria-label")}. Open video on YouTube`
            );
        } else {
            projectCard.removeAttribute("role");
            projectCard.removeAttribute("tabindex");

            const ariaLabel =
                projectCard.getAttribute(
                    "aria-label"
                );

            if (ariaLabel) {
                projectCard.setAttribute(
                    "aria-label",
                    ariaLabel.replace(
                        ". Open video on YouTube",
                        ""
                    )
                );
            }
        }
    });
}

function setupProjectCardLinks() {
    if (!projectsGrid) {
        return;
    }

    projectsGrid.addEventListener(
        "click",
        (event) => {
            if (!projectCardMediaQuery.matches) {
                return;
            }

            const projectCard =
                event.target.closest(
                    ".project-card[data-youtube-url]"
                );

            if (
                !projectCard ||
                !projectsGrid.contains(projectCard)
            ) {
                return;
            }

            /*
             * Preserve normal behavior for links inside
             * the project card.
             */
            if (event.target.closest("a")) {
                return;
            }

            openProjectVideo(projectCard);
        }
    );

    projectsGrid.addEventListener(
        "keydown",
        (event) => {
            if (!projectCardMediaQuery.matches) {
                return;
            }

            if (
                event.key !== "Enter" &&
                event.key !== " "
            ) {
                return;
            }

            const projectCard =
                event.target.closest(
                    ".project-card[data-youtube-url]"
                );

            if (
                !projectCard ||
                !projectsGrid.contains(projectCard)
            ) {
                return;
            }

            event.preventDefault();
            openProjectVideo(projectCard);
        }
    );

    projectCardMediaQuery.addEventListener(
        "change",
        updateProjectCardAccessibility
    );

    updateProjectCardAccessibility();
}

/* Footer year */
function renderCurrentYear() {
    if (dateElement) {
        dateElement.textContent =
            new Date().getFullYear();
    }
}

/* Initial rendering */
renderExperienceList();
renderSkills();
renderProjects();
setupProjectCardLinks();
renderCurrentYear();