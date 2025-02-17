import emoji from "react-easy-emoji";

const illustration = {
  animated: true // Set to false to use static SVG
};

// Greetings

const greeting = {
  username: "Mahsa Eskandari",
  title: "Hello",
    "I'm <b>Mahsa Eskandari</b>, a passionate Game Developer dedicated to crafting immersive, high-performance experiences."
  ),
  resumeLink:
    "resume/MahsaEskandari_Resume.pdf", // Set to empty to hide the button
  display: true
};

// Contact Info

const contactInfo = {
  subtitle:
    "Got an interesting project? Feel free to drop me an email.",
  email_address: "mahsa.eskandari1998@gmail.com",
    display: true
};

// Social Media Links

const socialMediaLinks = {
  linkedin: "https://www.linkedin.com/in/mahsa-esk/",
  email: "mahsa.eskandari1998@gmail.com",
  display: true
};

// Skills Section

const skillsSection = {
  title: "Skills",
  skills: [
    emoji("⚡ Programming Languages: C#, C++, Python, JavaScript, HTML5, CSS"),
    emoji("⚡ Software Design: SOLID, Clean Code, Game Design Patterns, Software Architecture"),
	emoji("⚡ Game Engines: Unity, Unreal Engine 5"),
    emoji("⚡ Fields: Gameplay, Tools, User Interface, Shaders"),
    emoji("⚡ Tools: Git, Fork, SourceTree, Trello, Jira")
  ],

  /* Make Sure to include correct Font Awesome Classname to view your icon
https://fontawesome.com/icons?d=gallery */
  softwareSkills: [
    {
      skillName: "C#",
      fontAwesomeClassname: "fas fa-laptop-code"
    },
    {
      skillName: "Unity",
      fontAwesomeClassname: "fab fa-unity"
    },
    {
      skillName: "C++",
      fontAwesomeClassname: "fas fa-laptop-code"
    },
    {
      skillName: "Unreal 5",
      fontAwesomeClassname: "fa fa-gamepad"
    },
    {
      skillName: "Python",
      fontAwesomeClassname: "fab fa-python"
    },
    {
      skillName: "Git",
      fontAwesomeClassname: "fab fa-git"
    }
  ],
  display: true
};

// Background Section

// talk about education and such


// TechStack

const techStack = {
  viewSkillBars: true,
  experience: [
    {
      Stack: "Game Software Design",
      progressPercentage: "100%"
    },
	{
      Stack: "C#",
      progressPercentage: "100%"
    },
	{
      Stack: "Unity",
      progressPercentage: "100%"
    },
    {
      Stack: "C++",
      progressPercentage: "50%"
    },
	{
      Stack: "Unreal Engine",
      progressPercentage: "70%"
    },
    {
      Stack: "Teaching",
      progressPercentage: "100%"
    }
  ],
  displayCodersrank: false
};

//

const openSource = {
  showGithubProfile: "true",
  displayonlyopensource: false,
  display: true
};

// Featured Projects

const featuredProjects = {
  title: "Featured Projects",
  projects: [
    {
       image: require("./assets/images/DreamHome.png"),
      projectName: "Dream Home",
      projectDesc: "A recently released story-driven mobile game with a mix of various mini-games and an enchanting gamification system to keep things engaging.",
      footerLink: [
        {
          name: "Check out",
          url: "https://play.google.com/store/apps/details?id=com.relicbit.mansion&hl=en&gl=US"
        }
        //  you can add extra buttons here.
      ]
    },
	{
       image: require("./assets/images/Golmorad.png"),
      projectName: "Golmorad",
      projectDesc: "A popular match-3 game with a captivating storyline and various dynamic live-ops, enjoyed by millions of users.",
      footerLink: [
        {
          name: "Check out",
          url: "https://play.google.com/store/apps/details?id=com.medrick.match3&hl=en&gl=US"
        }
        //  you can add extra buttons here.
      ]
    },
	{
       image: require("./assets/images/NeuroCare.png"),
      projectName: "NEUROCARE",
      projectDesc: " Thesis Project: Design and implementation of a set of cognitive games to evaluate the possibility of M.C.I. (Mild Cognitive Impairment) in the elderly - Supervisor: Prof. Hadi(Manouchehr) Moradi",
      footerLink: [
        {
          name: "Check out",
          url: "https://drive.google.com/file/d/1ndmI9Hv6p0tSnXuJqL4gJfQ4GwcQE1M2/view?usp=sharing"
        }
        //  you can add extra buttons here.
      ]
    },
    {
       image: require("./assets/images/GalaxyShooter.png"),
      projectName: "2D Galaxy Shooter",
      projectDesc: "A Unity game project I crafted, inspired by the course: Ultimate Guide to Game Development with Unity.",
      footerLink: [
        {
          name: "Check out",
          url: "https://drive.google.com/drive/folders/1V_s9TcnBLb1CGZymCDV1Ems_1t1F4geB?usp=sharing"
        }
      ]
    },
    {
       image: require("./assets/images/MyPixelArts.png"),
      projectName: "My Pixel Arts",
      projectDesc: "As a hobby, I create pixel art from time to time.",
      footerLink: [
        {
          name: "Check out",
          url: "https://drive.google.com/drive/folders/12P0aSPDsKrXORsNgC3DDyM84lRSyU9Tz?usp=sharing"
        }
      ]
    }
  ],
  display: true
};

// Achievement Section
// Include certificates, talks etc

const achievementSection = {
  title: emoji("Certifications"),
  achievementsCards: [
    {
      title: "Unreal Engine 5 C++ The Ultimate Game Developer Course",
      image: require("./assets/images/cert1.png"),
      footerLink: [
        {
          name: "Certification",
          url: "/certificates/UC-a180698e-2930-453b-850f-a02bfa4fee0a.jpg"
        }
      ]
    },
    {
	  title: "Turn Based Puzzle Game in Unreal With Blueprints & C++",
      image: require("./assets/images/cert3.png"),
      footerLink: [
        {
          name: "Certification",
          url: "/certificates/UC-bbfeea15-a057-4a79-850a-d41adc2df778.jpg"
        }
      ]
    },

    {
      title: "Unreal Engine 5 Action Adventure Game Development Course",
//      subtitle: "Completed Certifcation from Udemy",
      image: require("./assets/images/cert2.png"),
      footerLink: [
        {name: "Certification", url: "/certificates/UC-0a0f62fc-5aa8-4296-b48d-8603e18e1162.jpg"}
      ]
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

export {
  illustration,
  greeting,
  socialMediaLinks,
  skillsSection,
  educationInfo,
  techStack,
  openSource,
  featuredProjects,
  achievementSection,
  contactInfo,
};
