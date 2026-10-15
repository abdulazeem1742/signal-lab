"use client";

import type { CanvasMode } from "@/types";

export interface SectionState {
  mode: CanvasMode;
  progress: number;
}

type Listener = (state: SectionState) => void;

const DEFAULT_STATE: SectionState = { mode: "hero", progress: 0 };

let current: SectionState = DEFAULT_STATE;
const listeners = new Set<Listener>();

export function getSectionState(): SectionState {
  return current;
}

export function setSectionState(next: Partial<SectionState>) {
  current = { ...current, ...next };
  listeners.forEach((listener) => listener(current));
}

export function subscribeSectionState(listener: Listener): () => void {
  listeners.add(listener);
  listener(current);
  return () => {
    listeners.delete(listener);
  };
}

export type FieldShape =
  | "flow"
  | "orbit"
  | "lattice"
  | "wave"
  | "path"
  | "constellation"
  | "calm";

export interface ModePreset {
  speed: number;
  connect: boolean;
  connectDistance: number;
  organization: number;
  opacity: number;
  mouseForce: number;
  trail: number;
  glow: number;
  shape: FieldShape;
}

/** Mode presets — each section has a distinct field personality. */
export const MODE_PRESETS: Record<CanvasMode, ModePreset> = {
  hero: {
    speed: 0.9,
    connect: true,
    connectDistance: 130,
    organization: 0.05,
    opacity: 0.75,
    mouseForce: 1.35,
    trail: 0.18,
    glow: 1,
    shape: "flow",
  },
  manifesto: {
    speed: 0.35,
    connect: false,
    connectDistance: 0,
    organization: 0.85,
    opacity: 0.55,
    mouseForce: 0.4,
    trail: 0.28,
    glow: 0.7,
    shape: "orbit",
  },
  capabilities: {
    speed: 0.45,
    connect: true,
    connectDistance: 150,
    organization: 0.35,
    opacity: 0.7,
    mouseForce: 0.7,
    trail: 0.22,
    glow: 0.9,
    shape: "lattice",
  },
  work: {
    speed: 0.7,
    connect: true,
    connectDistance: 100,
    organization: 0.15,
    opacity: 0.65,
    mouseForce: 0.95,
    trail: 0.2,
    glow: 0.85,
    shape: "wave",
  },
  process: {
    speed: 0.55,
    connect: true,
    connectDistance: 120,
    organization: 0.5,
    opacity: 0.6,
    mouseForce: 0.55,
    trail: 0.24,
    glow: 0.75,
    shape: "path",
  },
  about: {
    speed: 0.3,
    connect: true,
    connectDistance: 140,
    organization: 0.4,
    opacity: 0.5,
    mouseForce: 0.35,
    trail: 0.3,
    glow: 0.6,
    shape: "constellation",
  },
  contact: {
    speed: 0.18,
    connect: false,
    connectDistance: 0,
    organization: 0.9,
    opacity: 0.4,
    mouseForce: 0.2,
    trail: 0.38,
    glow: 0.45,
    shape: "calm",
  },
};
