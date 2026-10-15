"use client";

import { useEffect } from "react";
import { ScrollTrigger, registerGsapPlugins } from "@/lib/gsap";
import { setSectionState } from "@/components/canvas/SectionState";
import type { CanvasMode } from "@/types";

const MODE_ORDER: CanvasMode[] = [
  "hero",
  "manifesto",
  "capabilities",
  "work",
  "process",
  "about",
  "contact",
];

/**
 * Observes sections via ScrollTrigger and updates canvas mode.
 * No React state — canvas subscribes to a tiny event bus.
 */
export function SectionObserver() {
  useEffect(() => {
    registerGsapPlugins();

    const triggers = MODE_ORDER.map((mode) => {
      const element = document.querySelector(`[data-canvas-mode="${mode}"]`);
      if (!element) return null;

      return ScrollTrigger.create({
        trigger: element,
        start: "top center",
        end: "bottom center",
        onEnter: () => setSectionState({ mode, progress: 0 }),
        onEnterBack: () => setSectionState({ mode, progress: 0 }),
        onUpdate: (self) => {
          setSectionState({ mode, progress: self.progress });
        },
      });
    }).filter(Boolean);

    return () => {
      triggers.forEach((trigger) => trigger?.kill());
    };
  }, []);

  return null;
}
