"use client";

import { trust } from "@/lib/content";
import { DESKTOP, MOBILE, MOTION, gsap, useAnim } from "@/lib/gsap";
import { TLink } from "./PageTransition";

export default function Confiance() {
  const ref = useAnim<HTMLElement>((mm) => {
    mm.add(MOTION, () => {
      gsap.from(".confiance__head > *", {
        y: 40,
        autoAlpha: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".confiance__head", start: "top 80%" },
      });
    });

    mm.add(DESKTOP, () => {
      gsap.from(".tcard", {
        y: 70,
        autoAlpha: 0,
        stagger: 0.09,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".confiance__grid", start: "top 80%" },
      });
    });

    // Mobile : chaque carte recouvre la précédente, qui recule légèrement.
    mm.add(MOBILE, () => {
      const cards = gsap.utils.toArray<HTMLElement>(".tcard");
      cards.slice(0, -1).forEach((card, i) => {
        gsap.to(card, {
          scale: 0.9,
          ease: "none",
          scrollTrigger: { trigger: cards[i + 1], start: "top 92%", end: "top 26%", scrub: 0.2 },
        });
      });
    });
  });

  return (
    <section ref={ref} className="confiance">
      <div className="wrap">
        <div className="confiance__head">
          <p className="eyebrow eyebrow--ink">Fait pour ici</p>
          <h2>Pas une application importée. Un outil pensé pour nos réalités.</h2>
        </div>
        <div className="confiance__grid">
          {trust.map((t, i) => (
            <article key={t.title} className={`tcard ${t.big ? "tcard--big" : ""} tcard--${i}`}>
              <h3>{t.title}</h3>
              <p>{t.text}</p>
            </article>
          ))}
        </div>
        <TLink href="/demo/charte" className="textlink confiance__link">
          Lire la charte de confiance
        </TLink>
      </div>
    </section>
  );
}
