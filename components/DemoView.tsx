"use client";

import { features, type Feature } from "@/lib/content";
import { MOTION, gsap, useAnim } from "@/lib/gsap";
import { TLink } from "./PageTransition";
import MapLayers from "./MapLayers";
import Nav from "./Nav";

export default function DemoView({ feature }: { feature: Feature }) {
  const others = features.filter((f) => f.slug !== feature.slug).slice(0, 8);

  const ref = useAnim<HTMLElement>((mm) => {
    mm.add(MOTION, () => {
      gsap.from(".demo__line > span", { yPercent: 112, duration: 1.1, delay: 0.55, ease: "power4.out" });
      gsap.from("[data-demo]", { y: 26, autoAlpha: 0, stagger: 0.08, duration: 0.9, delay: 0.8, ease: "power3.out" });
      gsap.from(".demo__map", { scale: 1.2, duration: 2.6, ease: "power3.out" });
    });
  });

  return (
    <>
      <Nav />
      <main ref={ref} className="demo">
        <div className="demo__map map" aria-hidden="true">
          <MapLayers />
        </div>
        <div className="demo__shade" />

        <div className="wrap demo__body">
          <p className="demo__badge" data-demo>
            Version de démonstration
          </p>
          <h1 className="demo__title">
            <span className="demo__line">
              <span>{feature.title}</span>
            </span>
          </h1>
          <p className="demo__promise" data-demo>
            {feature.promise}
          </p>

          <div className="demo__notice" data-demo>
            <h2>Cette page n&apos;est pas encore active.</h2>
            <p>
              Vous consultez une maquette de présentation : seule la page d&apos;accueil est réalisée pour le moment.
              Cette fonctionnalité sera développée une fois le contrat validé.
            </p>
          </div>

          <div className="demo__actions" data-demo>
            <TLink href="/" className="btn btn--taxi">
              Revenir à l&apos;accueil
            </TLink>
          </div>

          <div className="demo__planned" data-demo>
            <h2>Ce qui est prévu</h2>
            <ul>
              {feature.planned.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>

          <nav className="demo__more" aria-label="Autres fonctionnalités" data-demo>
            <h2>Voir aussi</h2>
            <div>
              {others.map((f) => (
                <TLink href={`/demo/${f.slug}`} className="chip" key={f.slug}>
                  {f.label}
                </TLink>
              ))}
            </div>
          </nav>
        </div>
      </main>
    </>
  );
}
