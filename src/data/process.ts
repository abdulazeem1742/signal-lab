import type { ProcessStep } from "@/types";

export const processSteps: ProcessStep[] = [
  {
    id: "think",
    number: "01",
    title: "Think",
    description:
      "We clarify the problem, audience, and constraints before a single pixel moves.",
  },
  {
    id: "design",
    number: "02",
    title: "Design",
    description:
      "Typography, hierarchy, and interaction models that make the idea legible and memorable.",
  },
  {
    id: "build",
    number: "03",
    title: "Build",
    description:
      "Engineered interfaces — performant, accessible, and ready for real users under real conditions.",
  },
  {
    id: "launch",
    number: "04",
    title: "Launch",
    description:
      "Careful rollout with instrumentation, so the experience ships clean and stays measurable.",
  },
  {
    id: "scale",
    number: "05",
    title: "Scale",
    description:
      "Systems, not one-offs — designed to grow with your product, brand, and ambition.",
  },
];
