"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, registerGsapPlugins } from "@/lib/gsap";

/**
 * Scoped GSAP context — auto-reverts animations on unmount.
 */
export function useGsapContext<T extends HTMLElement>(
  setup: (ctx: gsap.Context, element: T) => void,
  deps: React.DependencyList = [],
) {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    registerGsapPlugins();
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      setup(ctx, element);
    }, element);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}
