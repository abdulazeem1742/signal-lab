export type CanvasMode =
  | "hero"
  | "manifesto"
  | "capabilities"
  | "work"
  | "process"
  | "about"
  | "contact";

export interface NavLink {
  label: string;
  href: string;
}

export interface Project {
  slug: string;
  number: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  year: string;
  accent: string;
}

export interface Capability {
  id: string;
  title: string;
  description: string;
  tags: string[];
}

export interface ProcessStep {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";
