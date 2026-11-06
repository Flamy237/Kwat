"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export const DESKTOP = "(min-width: 900px) and (prefers-reduced-motion: no-preference)";
export const MOBILE = "(max-width: 899px) and (prefers-reduced-motion: no-preference)";
export const MOTION = "(prefers-reduced-motion: no-preference)";

/**
 * Lance des animations GSAP limitées à une section. Toutes les animations et
 * tous les ScrollTrigger créés dans `setup` sont annulés au démontage.
 */
export function useAnim<T extends HTMLElement = HTMLElement>(
  setup: (mm: gsap.MatchMedia, root: T) => void,
) {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;
    const mm = gsap.matchMedia(ref.current);
    setup(mm, ref.current);
    return () => mm.revert();
    // L'animation est décrite une seule fois, au montage de la section.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}
