import type { NavLink, SocialLink } from "@/types";
import { SECTION_IDS } from "@/lib/constants";

export const mainNav: NavLink[] = [
  { label: "Work", href: `/#${SECTION_IDS.work}` },
  { label: "Capabilities", href: `/#${SECTION_IDS.capabilities}` },
  { label: "Process", href: `/#${SECTION_IDS.process}` },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: NavLink[] = [
  { label: "Selected Work", href: `/#${SECTION_IDS.work}` },
  { label: "Capabilities", href: `/#${SECTION_IDS.capabilities}` },
  { label: "Process", href: `/#${SECTION_IDS.process}` },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const socialLinks: SocialLink[] = [
  { label: "Twitter", href: "https://twitter.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Dribbble", href: "https://dribbble.com" },
  { label: "GitHub", href: "https://github.com" },
];
