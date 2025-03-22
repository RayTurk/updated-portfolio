import IconCloud from "./ui/icon-cloud";

// Enhanced list of icon slugs matching your experience and related technologies
const slugs = [
  // Core Technologies
  "wordpress",
  "shopify",
  "react",
  "sass",
  "typescript",
  "javascript",
  "jquery",
  "tailwindcss",
  "bootstrap",
  "html5",
  "css3",

  // Backend & Databases
  "php",
  "mysql",
  "nodedotjs",
  "python",
  "postgresql",
  "mongodb",

  // CMS & E-commerce
  "woocommerce",
  "elementor",
  "gutenberg",
  "drupal",
  "stripe",
  "paypal",

  // UI/UX
  "figma",
  "adobexd",
  "sketch",

  // DevOps & Deployment
  "git",
  "github",
  "gitlab",
  "linux",
  "nginx",
  "apache",
  "docker",
  "amazonaws",

  // Tools & Optimization
  "visualstudiocode",
  "webpack",
  "vercel",
  "vite",
  "npm",
  "yarn",
  "composer",
  "lighthouse",
  "googleanalytics",

  // API & Integration
  "postman",
  "rest",
  "zapier",

  // Mobile
  "pwa",
  "responsivedesign"
];

function IconCloudDemo() {
  return (
    <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden rounded-lg px-20 pb-20 pt-8 bg-transparent">
      <IconCloud iconSlugs={slugs} />
    </div>
  );
}

export default IconCloudDemo;