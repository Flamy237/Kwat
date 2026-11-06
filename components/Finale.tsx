"use client";

import { features, site } from "@/lib/content";
import { MOBILE, MOTION, gsap, useAnim } from "@/lib/gsap";
import { TLink } from "./PageTransition";
import Logo from "./Logo";

const GROUPS = [
  { title: "Le quartier", slugs: ["fil", "palabre", "alertes", "carte"] },
  { title: "Au quotidien", slugs: ["marche", "adresses", "agenda", "messagerie"] },
  { title: "Le projet", slugs: ["a-propos", "charte", "partenaires", "contact"] },
];

export default function Finale() {
  const ref = useAnim<HTMLElement>((mm, root) => {
    mm.add(MOTION, () => {
      gsap.from(".finale__title span > span", {
        yPercent: 112,
        duration: 1.25,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: { trigger: ".finale__title", start: "top 85%" },
      });
      gsap.from(".finale__cta", {
        y: 26,
        autoAlpha: 0,
        duration: 0.9,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: { trigger: ".finale__title", start: "top 85%" },
      });
      gsap.fromTo(
        ".finale__band",
        { backgroundPositionX: "0px" },
        { backgroundPositionX: "-480px", ease: "none", scrollTrigger: { trigger: root, scrub: true } },
      );
    });

    // Mobile : les deux lignes du titre glissent l'une vers l'autre.
    mm.add(MOBILE, () => {
      const scrub = { trigger: ".finale__title", start: "top bottom", end: "top 35%", scrub: 0.35 };
      gsap.fromTo(".finale__title > span:first-child", { xPercent: -16 }, { xPercent: 0, ease: "none", scrollTrigger: scrub });
      gsap.fromTo(".finale__title > span:last-child", { xPercent: 16 }, { xPercent: 0, ease: "none", scrollTrigger: scrub });
    });
  });

  return (
    <section ref={ref} className="finale">
      <div className="finale__band" aria-hidden="true" />
      <div className="wrap finale__body">
        <h2 className="finale__title">
          <span>
            <span>On se voit</span>
          </span>
          <span>
            <span>au kwat.</span>
          </span>
        </h2>
        <div className="finale__cta">
          <p>Les premiers blocs de Bonamoussadi ouvriront en priorité.</p>
          <TLink href="/demo/inscription" className="btn btn--ink">
            Rejoindre mon kwat
          </TLink>
        </div>
      </div>

      <footer className="footer">
        <div className="wrap footer__grid">
          <div className="footer__brand">
            <Logo />
            <p>
              {site.tagline}. {site.quartier}, {site.ville}.
            </p>
          </div>
          {GROUPS.map((g) => (
            <nav key={g.title} aria-label={g.title}>
              <h3>{g.title}</h3>
              {g.slugs.map((s) => {
                const f = features.find((x) => x.slug === s)!;
                return (
                  <TLink key={s} href={`/demo/${s}`}>
                    {f.label}
                  </TLink>
                );
              })}
            </nav>
          ))}
        </div>
        <div className="wrap footer__legal">
          <p>Version de démonstration. Personnes, annonces et chiffres présentés sont fictifs.</p>
          <p>
            Carte : ©{" "}
            <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">
              contributeurs OpenStreetMap
            </a>
            . Régions :{" "}
            <a href="https://www.geoboundaries.org" target="_blank" rel="noreferrer">
              geoBoundaries
            </a>{" "}
            (CC BY).
          </p>
        </div>
      </footer>
    </section>
  );
}
