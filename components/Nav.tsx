"use client";

import { useEffect, useState } from "react";
import { navLinks, site } from "@/lib/content";
import { TLink } from "./PageTransition";
import Logo from "./Logo";

export default function Nav({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav nav--${tone} ${scrolled ? "is-scrolled" : ""} ${open ? "is-open" : ""}`}>
      <div className="nav__bar">
        <TLink href="/" className="nav__brand" aria-label={`${site.name}, accueil`}>
          <Logo />
        </TLink>

        <nav className="nav__links" aria-label="Navigation principale">
          {navLinks.map((l) => (
            <TLink key={l.slug} href={`/demo/${l.slug}`}>
              {l.label}
            </TLink>
          ))}
        </nav>

        <div className="nav__actions">
          <TLink href="/demo/connexion" className="nav__login">
            Se connecter
          </TLink>
          <TLink href="/demo/inscription" className="btn btn--taxi btn--sm">
            Rejoindre
          </TLink>
          <button
            type="button"
            className="nav__toggle"
            aria-expanded={open}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      {open && (
        <nav className="nav__sheet" aria-label="Menu mobile">
          {navLinks.map((l) => (
            <TLink key={l.slug} href={`/demo/${l.slug}`} onClick={() => setOpen(false)}>
              {l.label}
            </TLink>
          ))}
          <TLink href="/demo/connexion" onClick={() => setOpen(false)}>
            Se connecter
          </TLink>
        </nav>
      )}
    </header>
  );
}
