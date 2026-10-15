"use client";

import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { Capabilities } from "@/components/sections/Capabilities";
import { Work } from "@/components/sections/Work";
import { Process } from "@/components/sections/Process";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Marquee } from "@/components/ui/Marquee";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { PageTransition } from "@/components/ui/PageTransition";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { SectionObserver } from "@/components/canvas/SectionObserver";

const BackgroundCanvas = dynamic(
  () =>
    import("@/components/canvas/BackgroundCanvas").then(
      (mod) => mod.BackgroundCanvas,
    ),
  { ssr: false },
);

const marqueeItems = [
  "Digital Experience",
  "Interaction Design",
  "Brand Systems",
  "Front-End Engineering",
  "Motion with Purpose",
];

/**
 * Client shell for home experience — owns canvas, smooth scroll, and motion.
 * Keeps heavy visual systems out of the server page entry.
 */
export function HomeExperience() {
  return (
    <SmoothScrollProvider>
      <BackgroundCanvas />
      <SectionObserver />
      <ScrollProgress />
      <Navbar />
      <PageTransition>
        <main id="main" className="page-content">
          <Hero />
          <Manifesto />
          <Marquee items={marqueeItems} speed="slow" />
          <Capabilities />
          <Work />
          <Process />
          <About />
          <Contact />
        </main>
        <Footer />
      </PageTransition>
    </SmoothScrollProvider>
  );
}
