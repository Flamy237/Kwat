"use client";

import Image from "next/image";
import { DESKTOP, MOBILE, MOTION, gsap, useAnim } from "@/lib/gsap";
import { TLink } from "./PageTransition";

export default function Reperes() {
  const ref = useAnim<HTMLElement>((mm, root) => {
    mm.add(MOTION, () => {
      gsap.from(".reperes__head > *", {
        y: 40,
        autoAlpha: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".reperes__head", start: "top 82%" },
      });
    });

    mm.add(DESKTOP, () => {
      gsap.utils.toArray<HTMLElement>(".lieu").forEach((frame) => {
        gsap
          .timeline({ scrollTrigger: { trigger: frame, start: "top 86%" } })
          .fromTo(
            frame,
            { clipPath: "inset(100% 0% 0% 0% round 22px)" },
            { clipPath: "inset(0% 0% 0% 0% round 22px)", duration: 1.25, ease: "power4.inOut" },
          )
          .from(frame.querySelector("img"), { scale: 1.16, duration: 1.7, ease: "power3.out" }, 0);
      });
    });

    // Les deux colonnes glissent à des vitesses différentes au défilement.
    mm.add(DESKTOP, () => {
      gsap.fromTo(
        ".reperes__col--b",
        { y: 90 },
        { y: -50, ease: "none", scrollTrigger: { trigger: ".reperes__grid", scrub: 0.7 } },
      );
    });

    // Mobile : les lieux défilent à l'horizontale, celui du centre passe au premier plan.
    mm.add(MOBILE, () => {
      const frames = gsap.utils.toArray<HTMLElement>(".lieu");
      const items = gsap.utils.toArray<HTMLElement>(".lieu, .reperes__note");
      const last = items[items.length - 1];

      const emphasize = () => {
        const x = Number(gsap.getProperty(items[0], "x"));
        const mid = window.innerWidth / 2;
        frames.forEach((f) => {
          const off = Math.abs(f.offsetLeft + f.offsetWidth / 2 + x - mid) / window.innerWidth;
          gsap.set(f, { scale: 1 - Math.min(off, 1) * 0.14 });
        });
      };

      gsap.to(items, {
        x: () => -(last.offsetLeft + last.offsetWidth + 20 - window.innerWidth),
        ease: "none",
        onUpdate: emphasize,
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.35,
          invalidateOnRefresh: true,
        },
      });
      emphasize();
    });
  });

  return (
    <section ref={ref} className="reperes" aria-labelledby="reperes-title">
      <div className="wrap">
        <div className="reperes__grid">
          <div className="reperes__col">
            <div className="reperes__head">
              <p className="eyebrow eyebrow--ink">Nos repères</p>
              <h2 id="reperes-title">Ici, on se donne rendez-vous au rond-point.</h2>
              <p>
                Maetur, Denver, Santa Barbara : le quartier se raconte par ses carrefours. Kwat parle le même langage que
                vous.
              </p>
            </div>
            <figure className="lieu lieu--tall">
              <Image
                src="/lieux/rond-point-marche-denver.webp"
                alt="Rond-point du Marché, à l'entrée de Denver : commerçants sous des parasols et motos sur une route abîmée, au coucher du soleil."
                width={1199}
                height={1312}
                sizes="(max-width: 899px) 100vw, 44vw"
              />
            </figure>
          </div>

          <div className="reperes__col reperes__col--b">
            <figure className="lieu">
              <Image
                src="/lieux/rond-point-maetur.webp"
                alt="Rond-point Maetur, à l'entrée de Bonamoussadi : piétons et voitures autour du carrefour, grands panneaux publicitaires."
                width={1280}
                height={720}
                sizes="(max-width: 899px) 100vw, 50vw"
              />
            </figure>
            <figure className="lieu">
              <Image
                src="/lieux/entree-santa-barbara.webp"
                alt="Entrée de Santa Barbara : motos et voitures au carrefour, palmiers et immeubles en arrière-plan."
                width={1280}
                height={720}
                sizes="(max-width: 899px) 100vw, 50vw"
              />
            </figure>
          </div>
        </div>

        <div className="reperes__end">
          <figure className="lieu">
            <Image
              src="/lieux/terrain-basket.webp"
              alt="Terrain de basket de la Gendarmerie : panier, moto et tricycle bleu garés sur le terrain, au crépuscule."
              width={1280}
              height={720}
              sizes="(max-width: 899px) 100vw, 50vw"
            />
          </figure>
          <div className="reperes__note">
            <h3>Et les petits coins que seuls les voisins connaissent.</h3>
            <TLink href="/demo/carte" className="textlink">
              Voir la carte du quartier
            </TLink>
          </div>
        </div>
      </div>
    </section>
  );
}
