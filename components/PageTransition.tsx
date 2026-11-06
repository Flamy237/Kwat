"use client";

import { createContext, useCallback, useContext, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import Logo from "./Logo";

const NavContext = createContext<(href: string) => void>(() => {});

/** Rideau ndop qui couvre la page pendant la navigation, puis se lève. */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const curtain = useRef<HTMLDivElement>(null);
  const covered = useRef(true);
  const pendingHref = useRef<string | null>(null);

  useEffect(() => {
    const el = curtain.current;
    if (!el || !covered.current) return;
    if (pendingHref.current && pendingHref.current !== pathname) return;

    pendingHref.current = null;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tween = gsap.to(el, {
      yPercent: -100,
      duration: reduce ? 0 : 0.95,
      delay: reduce ? 0 : 0.12,
      ease: "power4.inOut",
      onComplete: () => {
        covered.current = false;
        gsap.set(el, { yPercent: 100, visibility: "hidden" });
      },
    });
    return () => {
      tween.kill();
    };
  }, [pathname]);

  const navigate = useCallback(
    (href: string) => {
      const el = curtain.current;
      if (!el || href === pathname) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      gsap.set(el, { visibility: "visible" });
      gsap.fromTo(
        el,
        { yPercent: 100 },
        {
          yPercent: 0,
          duration: reduce ? 0 : 0.65,
          ease: "power4.inOut",
          onComplete: () => {
            covered.current = true;
            pendingHref.current = href;
            router.push(href);
          },
        },
      );
    },
    [pathname, router],
  );

  return (
    <NavContext.Provider value={navigate}>
      {children}
      <div ref={curtain} className="curtain" aria-hidden="true">
        <div className="curtain__mark">
          <Logo />
        </div>
      </div>
    </NavContext.Provider>
  );
}

type TLinkProps = React.ComponentProps<typeof Link> & { href: string };

/** Lien interne qui passe par le rideau de transition. */
export function TLink({ href, onClick, ...props }: TLinkProps) {
  const navigate = useContext(NavContext);
  return (
    <Link
      href={href}
      {...props}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey) return;
        e.preventDefault();
        navigate(href);
      }}
    />
  );
}
