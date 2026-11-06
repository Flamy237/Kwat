"use client";

import { heroPins } from "@/lib/content";
import { DESKTOP, MOBILE, MOTION, gsap, useAnim } from "@/lib/gsap";
import MapLayers from "./MapLayers";
import { TLink } from "./PageTransition";

export default function Hero() {
  const ref = useAnim<HTMLElement>((mm, root) => {
    mm.add(MOTION, () => {
      const tl = gsap.timeline({ delay: 0.55, defaults: { ease: "power3.out" } });
      gsap.set(".map__main path", { strokeDasharray: 1, strokeDashoffset: 1 });

      tl.from("[data-layer=water]", { autoAlpha: 0, duration: 1.4 }, 0)
        .to(".map__main path", { strokeDashoffset: 0, duration: 1.9, stagger: 0.008, ease: "power2.inOut" }, 0.1)
        .from("[data-layer=streets]", { autoAlpha: 0, duration: 1.6 }, 0.7)
        .from("[data-layer=buildings]", { autoAlpha: 0, duration: 1.8 }, 1.1)
        .from("[data-layer=drains]", { autoAlpha: 0, duration: 1.4 }, 1.5)
        .from(".hero__line > span", { yPercent: 112, duration: 1.15, stagger: 0.09, ease: "power4.out" }, 0.25)
        .from(".hero__fade", { autoAlpha: 0, y: 22, duration: 0.9, stagger: 0.1 }, 0.95)
        .from(".pin", { scale: 0, autoAlpha: 0, duration: 0.6, stagger: 0.22, ease: "back.out(2.4)" }, 1.5);
    });

    mm.add(DESKTOP, () => {
      gsap
        .timeline({
          scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 0.6 },
        })
        .to(".hero__map", { scale: 1.55, xPercent: -6, yPercent: 7, ease: "none" }, 0)
        .to(".hero__copy", { yPercent: -28, autoAlpha: 0, ease: "none" }, 0)
        .to(".hero__pins .pin__card", { autoAlpha: 0, ease: "none", duration: 0.4 }, 0);
    });

    // Mobile : la carte plonge vers le quartier, puis les notifications arrivent.
    mm.add(MOBILE, () => {
      gsap.set(".notif", { autoAlpha: 0, y: 46, scale: 0.92 });
      gsap.set(".hero__notifs .eyebrow", { autoAlpha: 0, y: 16 });

      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: root, start: "top top", end: "bottom bottom", scrub: 0.35 },
        })
        .to(".hero__map", { scale: 1.75, duration: 1 }, 0)
        .to(".hero__copy", { yPercent: -34, autoAlpha: 0, duration: 0.3 }, 0)
        .to(".hero__veil", { opacity: 0.25, duration: 0.3 }, 0.05)
        .to(".hero__notifs .eyebrow", { autoAlpha: 1, y: 0, duration: 0.1 }, 0.3)
        .to(".notif", { autoAlpha: 1, y: 0, scale: 1, stagger: 0.13, duration: 0.14, ease: "back.out(1.6)" }, 0.34);
    });
  });

  return (
    <section ref={ref} className="hero" id="haut">
      <div className="hero__scene">
      <div className="hero__map map" aria-hidden="true">
        <MapLayers />
        <div className="hero__shade" />
        <div className="hero__pins">
          {heroPins.map((p) => (
            <div
              key={p.place}
              className={`pin pin--${p.tone} pin--${p.side}`}
              style={{ left: `${(p.x / 1600) * 100}%`, top: `${(p.y / 1000) * 100}%` }}
            >
              <span className="pin__dot" />
              <div className="pin__card">
                <span className="pin__tag">
                  {p.tag} · {p.place}
                </span>
                <strong>{p.text}</strong>
                <span className="pin__meta">{p.meta}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="hero__veil" />

      <div className="hero__notifs" aria-hidden="true">
        <p className="eyebrow">En ce moment au quartier</p>
        {heroPins.slice(0, 4).map((p) => (
          <div className={`notif notif--${p.tone}`} key={p.place}>
            <span className="pin__tag">
              {p.tag} · {p.place}
            </span>
            <strong>{p.text}</strong>
            <span className="pin__meta">{p.meta}</span>
          </div>
        ))}
      </div>

      <div className="hero__copy">
        <p className="eyebrow hero__fade">Bonamoussadi · Douala · Littoral</p>
        <h1 className="hero__title">
          <span className="hero__line">
            <span>Bonamoussadi</span>
          </span>
          <span className="hero__line">
            <span>
              a enfin <em>sa place.</em>
            </span>
          </span>
        </h1>
        <p className="hero__lead hero__fade">
          Le réseau privé des voisins : pour s&apos;entraider, s&apos;alerter, vendre, se retrouver, et décider ensemble
          de ce qui compte pour le quartier.
        </p>
        <div className="hero__cta hero__fade">
          <TLink href="/demo/inscription" className="btn btn--taxi">
            Rejoindre mon kwat
          </TLink>
          <TLink href="/demo/palabre" className="btn btn--ghost">
            Découvrir le Palabre
          </TLink>
        </div>
      </div>

      <p className="hero__credit hero__fade">
        Vos vraies rues, vos vrais carrefours. Annonces fictives pour la démonstration.
      </p>
      </div>
    </section>
  );
}
