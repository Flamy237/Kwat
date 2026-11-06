"use client";

import geo from "@/lib/geo.json";
import { stages } from "@/lib/content";
import { DESKTOP, MOBILE, gsap, useAnim } from "@/lib/gsap";
import MapLayers from "./MapLayers";

const { w, h, regions, douala } = geo.country;
const littoral = regions.find((r) => r.name === "Littoral")!;
const [lx0, ly0, lx1, ly1] = littoral.bbox;

const VIEW_DOUALA = `${douala[0] - 30} ${douala[1] - 42} 60 84`;
const pad = 26;
const lh = ly1 - ly0 + pad * 2;
const lw = lh * (w / h);
const VIEW_LITTORAL = `${(lx0 + lx1) / 2 - lw / 2} ${ly0 - pad} ${lw} ${lh}`;
const VIEW_COUNTRY = `-20 -20 ${w + 40} ${h + 40}`;

export default function Extension() {
  const ref = useAnim<HTMLElement>((mm, root) => {
    const scene = (scrollTrigger: NonNullable<gsap.TimelineVars["scrollTrigger"]> & object) => {
      const items = gsap.utils.toArray<HTMLElement>(".stage");
      const setActive = (i: number) => items.forEach((s, k) => s.classList.toggle("is-active", k === i));

      gsap.set(".ext__svg", { attr: { viewBox: VIEW_DOUALA } });
      gsap.set(".ext__region", { fillOpacity: 0.1 });
      gsap.set(".ext__dot", { attr: { r: 1.1 } });

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          ...scrollTrigger,
          onUpdate: (self) => {
            const p = self.progress;
            setActive(p < 0.24 ? 0 : p < 0.52 ? 1 : p < 0.8 ? 2 : 3);
          },
        },
      });

      tl.to({}, { duration: 0.5 })
        .to(".ext__city", { scale: 0.16, autoAlpha: 0, duration: 1 })
        .from(".ext__country", { autoAlpha: 0, duration: 0.5 }, "<0.45")
        .to({}, { duration: 0.35 })
        .to(".ext__svg", { attr: { viewBox: VIEW_LITTORAL }, duration: 1.1 })
        .to(".ext__dot", { attr: { r: 2.6 }, duration: 1.1 }, "<")
        .to(".ext__littoral", { fillOpacity: 1, duration: 0.6 }, "<0.3")
        .to({}, { duration: 0.35 })
        .to(".ext__svg", { attr: { viewBox: VIEW_COUNTRY }, duration: 1.1 })
        .to(".ext__dot", { attr: { r: 7 }, duration: 1.1 }, "<")
        .to(".ext__region:not(.ext__littoral)", { fillOpacity: 0.3, stagger: 0.05, duration: 0.3, ease: "none" }, "<0.5")
        .to({}, { duration: 0.4 });
    };

    mm.add(DESKTOP, () => scene({ trigger: root, start: "top top", end: "+=260%", pin: true, scrub: 0.8 }));
    mm.add(MOBILE, () => scene({ trigger: root, start: "top top", end: "bottom bottom", scrub: 0.35 }));
  });

  return (
    <section ref={ref} className="ext" id="extension">
      <div className="ext__scene">
      <div className="ext__visual" aria-hidden="true">
        <div className="ext__country">
          <svg className="ext__svg" viewBox={VIEW_COUNTRY} preserveAspectRatio="xMidYMid meet">
            {regions.map((r) => (
              <path key={r.name} d={r.d} className={`ext__region ${r.name === "Littoral" ? "ext__littoral" : ""}`} />
            ))}
            <circle cx={douala[0]} cy={douala[1]} r="5" className="ext__dot" />
          </svg>
        </div>
        <div className="ext__city map">
          <MapLayers />
        </div>
        <div className="ext__shade" />
      </div>

      <div className="wrap ext__copy">
        <p className="eyebrow">Et ensuite</p>
        <h2>Un quartier d&apos;abord. Puis tout le pays.</h2>
        <ol className="ext__list">
          {stages.map((s, i) => (
            <li key={s.n} className={`stage ${i === 0 ? "is-active" : ""}`}>
              <span>{s.n}</span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      </div>
    </section>
  );
}
