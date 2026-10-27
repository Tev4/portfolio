// src/projects.ts
export interface Project {
  id: string;
  title: string;
  homeTitle: boolean;
  subtitle_fr?: string;
  subtitle_en?: string;

  techStack: string[];
  description_fr: string;
  description_en: string;
  directLink?: string;
  githubLink?: string;
  itchioLink?: string;
}

export const projects: Project[] = [
  {
    id: "simple_reminders",
    title: "Simple Reminders",
    homeTitle: true,
    subtitle_fr: "Application de rappels pour Windows",
    subtitle_en: "Reminder application for Windows",
    techStack: ["C#", ".NET", "Agentic Coding"],
    description_fr:
      "Application windows permettant de créer des rappels, produisant des notifications quand ils se déclenchent",
    description_en:
      "Windows application that allows you to create reminders, producing notifications when they are triggered.",
    githubLink: "https://github.com/Tev4/SimpleReminders",
  },
  {
    id: "gpa_informatique",
    title: "GPA Informatique",
    homeTitle: true,
    subtitle_fr:
      "Alternance - Développement de plusieurs modules de l'application",
    subtitle_en:
      "Internship - Development of several modules of the application",
    techStack: ["Codeigniter v3", "PHP", "JS", "HTML", "CSS"],
    description_fr:
      "J'ai participé au développement de cette application lors de mon alternance pendant mon Bachelor Développeur Web, j'ai créé tout ce que vous pouvez voir dans les captures d'écran (sauf les autres parties de la sidebar et les header/footer). Si vous voulez en savoir plus sur certaines images, vous pouvez me demander directement.",
    description_en:
      "I participated in the development of this application during my internship while pursuing my professional training in Applied Sciences. I created everything you see in the screenshots (except the other menus on the sidebar and the header/footer). If you'd like to know more about any specific image, feel free to ask me directly.",
  },
  {
    id: "scuffedify",
    title: "Scuffedify",
    homeTitle: true,
    subtitle_fr: "Copie des fonctionnalités de Spotify",
    subtitle_en: "Spotify features clone",
    techStack: ["React", "TypeScript", "Bootstrap", "HTML", "CSS"],
    description_fr:
      "Application web développée dans le cadre de mon Bachelor Développeur Web, en utilisant React avec Redux, celle-ci est directement liée à l'API officielle de Spotify. Il faut posséder un compte Spotify premium pour avoir accès aux fonctionnalités.",
    description_en:
      "Web application developed as part of my professional training in Applied Sciences, using React with Redux. It connects directly to the official Spotify API. A Spotify Premium account is required to access the features.",
    directLink: "https://tev4.github.io/scuffedify/",
    githubLink: "https://github.com/Tev4/scuffedify",
  },

  {
    id: "cigecfrais_web",
    title: "Cigecfrais: Web",
    homeTitle: true,
    subtitle_fr: "Interface Web de gestion de frais",
    subtitle_en: "Expense management web interface",
    techStack: ["PHP", "Bootstrap", "HTML", "CSS"],
    description_fr:
      "Cette interface web était le projet de fin d'études pour mon BTS, j'ai créé celle-ci pour numériser la gestion des frais de l'entreprise CIGEC et les aider à transitionner vers le numérique.",
    description_en:
      "This web interface was my final project for my two-year College Diploma in Technical Training in Computer Science. I developed it to digitize expense management for the company CIGEC and assist with their transition to digital tools.",
    githubLink: "https://github.com/Tev4/ServeurCigec",
  },
  {
    id: "cigecfrais_mobile",
    title: "Cigecfrais: Mobile",
    homeTitle: true,
    subtitle_fr: "Application mobile de gestion de frais",
    subtitle_en: "Expense management mobile app",
    techStack: ["React Native", "TypeScript", "Expo"],
    description_fr:
      "Application android, c'était la partie du travail pour CIGEC que j'ai réalisé pendant mon stage en deuxième année de BTS, cette application mobile permet aux employés de CIGEC d'envoyer leurs notes de frais à l'entreprise avec des photos pour prouver la validité des données.",
    description_en:
      "This Android application was the part of the work I completed for CIGEC during my internship in the second year of my two-year College Diploma in Technical Training in Computer Science. This mobile app allows CIGEC employees to submit their expense reports to the company, including photos to verify the accuracy of the information.",
  },
  {
    id: "wizard_defender",
    title: "Wizard Defender",
    homeTitle: true,
    subtitle_fr: "Jeu-vidéo d'arcade",
    subtitle_en: "Arcade video game",
    techStack: ["Processing", "Java"],
    description_fr:
      "Jeu vidéo dans lequel vous incarnez un sorcier qui doit défendre son château, la vitesse du jeu augmente avec le temps, ce qui rend très difficile pour les joueurs de rester en vie en pendant longtemps les fichiers sont disponibles sur le dépôt Github ainsi qu'un site web qui explique les controles du jeu.",
    description_en:
      "A video game where you play as a wizard defending your castle. The game speed increases over time, making it very challenging for players to survive for long. The files are available on the GitHub repository, along with a website explaining the game controls.",
    directLink: "https://tev4.github.io/Wizard_Defender_Website/",
    githubLink: "https://github.com/Tev4/Wizard_Defender",
  },
  {
    id: "encrypTed",
    title: "encrypTed",
    homeTitle: false,
    subtitle_fr: "Script sécurisé de chiffrement de messages",
    subtitle_en: "Secure message encryption script",
    techStack: ["Python"],
    description_fr:
      "Ce script permet de chiffrer n'importe quel message pour qu'il soit complètement illisible, tout en gardant la ponctuation et les symboles parce que je trouvais ça drôle, tout les détails du fonctionnement sont disponibles sur le dépôt Github.",
    description_en:
      "This script encrypts any message to make it completely unreadable while keeping punctuation and symbols intact because I thought it was funny. All the details about how it works are available on the GitHub repository.",
    githubLink: "https://github.com/Tev4/encrypTed",
  },
  {
    id: "coureur_gps",
    title: "Coureur GPS",
    homeTitle: true,
    subtitle_fr: "Application de tracking en direct pour coureurs de marathon",
    subtitle_en: "Real-time tracking app for marathon runners",
    techStack: ["Qt", "C++"],
    description_fr:
      "Cette application Windows a été réalisée avec l'outil Qt. Celle ci reçoit des trames provenant d'un serveur Python pour simuler la course (Vous pouvez les voir en bas à droite). Ensuite les données sont lues et interprêtées pour mettre à jour tout les champs en temps réel et tracer le parcours du coureur.",
    description_en:
      "This Windows application was developed using the Qt framework. It receives data frames from a Python server to simulate the race (visible at the bottom right). The data is then read and interpreted to update all fields in real time and to plot the runner’s path.",
    githubLink: "https://github.com/Tev4/ExempleRealisationQt",
  },
];
