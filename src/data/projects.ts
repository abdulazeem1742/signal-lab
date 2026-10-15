import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "northline",
    number: "01",
    title: "Northline",
    category: "Brand Platform",
    description:
      "A living brand system and product site for a climate intelligence company — editorial typography meeting real-time data visualization.",
    technologies: ["Next.js", "WebGL", "GSAP", "TypeScript"],
    year: "2025",
    accent: "#E8FF47",
  },
  {
    slug: "atelier-nine",
    number: "02",
    title: "Atelier Nine",
    category: "E-Commerce Experience",
    description:
      "An immersive commerce destination for a contemporary furniture house. Scroll-driven storytelling with tactile product discovery.",
    technologies: ["Next.js", "Shopify", "Three.js", "Lenis"],
    year: "2025",
    accent: "#FF6B4A",
  },
  {
    slug: "vector-health",
    number: "03",
    title: "Vector Health",
    category: "Product Interface",
    description:
      "A clinical operations dashboard redesigned for clarity under pressure — dense data made calm, fast, and human.",
    technologies: ["React", "D3", "Framer Motion", "Node"],
    year: "2024",
    accent: "#4AC8FF",
  },
  {
    slug: "orbit-capital",
    number: "04",
    title: "Orbit Capital",
    category: "Corporate Site",
    description:
      "A restrained digital presence for a growth-stage investment firm. Precision typography, quiet motion, absolute clarity.",
    technologies: ["Next.js", "Sanity", "GSAP"],
    year: "2024",
    accent: "#C4A5FF",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
