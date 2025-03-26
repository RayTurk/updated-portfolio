import IconCloud from "./ui/icon-cloud";

// Updated list of icon slugs with verified names
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
  "drupal",
  "stripe",
  "paypal",

  // UI/UX
  "figma",
  "sketch",

  // DevOps & Deployment
  "git",
  "github",
  "gitlab",
  "linux",
  "nginx",
  "apache",
  "docker",
  "amazonaws", // This will be changed to "amazon"

  // Tools & Optimization
  "webpack",
  "vercel",
  "vite",
  "npm",
  "yarn",
  "composer",

  // API & Integration
  "postman",
  "zapier",

  // Mobile
  "pwa"
];

// Fix problematic icon names
const fixedSlugs = slugs.map(slug => {
  // Fix known problematic slugs
  if (slug === "amazonaws") return "amazon";
  return slug;
});

function IconCloudDemo() {
  return (
    <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden rounded-lg px-20 pb-20 pt-8 bg-transparent">
      <IconCloud iconSlugs={fixedSlugs} />
    </div>
  );
}

export default IconCloudDemo;