
export const portfolio = {
  name: "Isaac Busee",
  title: "Software Engineer",

  summary:
    "Software engineer with experience building web applications " +
    "using JavaScript, TypeScript, Python, Java, and modern web technologies.",

  skills: {
    languages: [
      "JavaScript",
      "TypeScript",
      "Python",
      "Java",
    ],
    frontend: [
      "React",
      "AngularJS",
      "HTML",
      "CSS",
      "Tailwind CSS",
    ],
    backend: [
      "Node.js",
      "Express.js",
      "Spring Boot",
      "Django",
      "Flask",
      "REST APIs",
    ],
    databases: [
      "MongoDB",
      "MySQL",
      "PostgreSQL",
      "Oracle SQL",
    ],
    cloudAndTools: [
      "AWS",
      "AWS Lambda",
      "GitHub",
      "Postman",
      "Firebase",
    ],
  },

  projects: [
    {
      name: "Memories Project",
      technologies: [
        "MongoDB",
        "Express.js",
        "React",
        "Node.js",
        "JWT",
      ],
      description:
        "A full-stack MERN application with MongoDB Atlas, " +
        "data schemas, and JWT-based user authentication.",
    },
    {
      name: "Trip Planner",
      technologies: [
        "Python",
        "Django",
        "HTML",
        "CSS",
      ],
      description:
        "A trip planning website with relational data storage, " +
        "user trip management, and authentication.",
    },
  ],

  additionalExperience: [
    "Deploying applications on AWS Lambda through CI/CD pipelines",
    "Building React interfaces and integrating REST APIs",
    "Developing full-stack web applications",
  ],

  links: {
    portfolio: "https://isaacbusee.com",
    linkedin: "https://linkedin.com/in/isaac-busee",
    github: "https://github.com/isakabusee",
  },
} as const;
