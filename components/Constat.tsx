"use client";

import { chaosMessages, sortedMessages } from "@/lib/content";
import { DESKTOP, MOBILE, gsap, useAnim } from "@/lib/gsap";

const QUOTE =
  "Au kwat, tout se sait. Sauf ce dont vous avez besoin, au moment où vous en avez besoin.";

export default function Constat() {
  const ref = useAnim<HTMLElement>((mm, root) => {
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(".constat__word", {
        opacity: 0.14,
        stagger: 0.05,
        ease: "none",
        scrollTrigger: { trigger: ".constat__quote", start: "top 82%", end: "bottom 45%", scrub: 0.4 },
      });
    });

    mm.add(DESKTOP, () => {
      const stage = root.querySelector<HTMLElement>(".chaos__stage")!;
      const bubbles = gsap.utils.toArray<HTMLElement>(".chaos__bubble");
      const slots = gsap.utils.toArray<HTMLElement>(".sorted__row");

      const tl = gsap.timeline({
        scrollTrigger: { trigger: ".chaos", start: "top top", end: "+=170%", pin: true, scrub: 0.7 },
      });

      tl.from(bubbles, { autoAlpha: 0, scale: 0.8, y: 50, stagger: 0.07, duration: 0.45, ease: "back.out(1.6)" });
      tl.to({}, { duration: 0.4 });

      const stageBox = stage.getBoundingClientRect();
      bubbles.forEach((b) => {
        const keep = Number(b.dataset.keep);
        if (keep < 0) {
          tl.to(b, { autoAlpha: 0, scale: 0.72, y: "+=70", rotate: "+=8", duration: 0.5, ease: "power2.in" }, "sort");
          return;
        }
        const from = b.getBoundingClientRect();
        const to = slots[keep].getBoundingClientRect();
        tl.to(
          b,
          {
            x: to.left - from.left + (from.left - stageBox.left - b.offsetLeft),
            y: to.top - from.top + (from.top - stageBox.top - b.offsetTop),
            rotate: 0,
            autoAlpha: 0,
            duration: 0.75,
            ease: "power2.inOut",
          },
          "sort",
        );
      });
      tl.from(".sorted", { autoAlpha: 0, scale: 0.94, duration: 0.5, ease: "power2.out" }, "sort+=0.25");
      tl.from(slots, { autoAlpha: 0, y: 18, stagger: 0.09, duration: 0.35 }, "sort+=0.5");
      tl.from(".chaos__after", { autoAlpha: 0, y: 24, duration: 0.4 }, "sort+=0.45");
      tl.to(".chaos__before", { autoAlpha: 0, y: -24, duration: 0.35 }, "sort+=0.3");
      tl.to({}, { duration: 0.5 });
    });

    // Mobile : les bulles s'empilent, sont balayées, et la liste claire prend leur place.
    mm.add(MOBILE, () => {
      const bubbles = gsap.utils.toArray<HTMLElement>(".chaos__bubble");
      const rows = gsap.utils.toArray<HTMLElement>(".sorted__row");

      bubbles.forEach((b, i) =>
        gsap.set(b, {
          maxWidth: "78%",
          top: `${1 + i * 10.5}%`,
          left: i % 2 ? "auto" : 0,
          right: i % 2 ? 0 : "auto",
        }),
      );
      gsap.set(".sorted", { autoAlpha: 0, y: 70, scale: 0.9 });
      gsap.set(rows, { autoAlpha: 0, y: 18 });
      gsap.set(".chaos__after", { autoAlpha: 0, y: 26 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: ".chaos", start: "top top", end: "bottom bottom", scrub: 0.35 },
      });

      tl.from(bubbles, { autoAlpha: 0, scale: 0.7, y: 44, stagger: 0.1, duration: 0.4, ease: "back.out(1.8)" });
      tl.to({}, { duration: 0.35 });
      tl.addLabel("sort");
      bubbles.forEach((b, i) => {
        tl.to(
          b,
          { xPercent: i % 2 ? 150 : -150, rotate: i % 2 ? 16 : -16, autoAlpha: 0, duration: 0.55, ease: "power2.in" },
          `sort+=${i * 0.03}`,
        );
      });
      tl.to(".chaos__before", { autoAlpha: 0, y: -24, duration: 0.3 }, "sort+=0.3");
      tl.to(".chaos__after", { autoAlpha: 1, y: 0, duration: 0.35 }, "sort+=0.5");
      tl.to(".sorted", { autoAlpha: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out" }, "sort+=0.5");
      tl.to(rows, { autoAlpha: 1, y: 0, stagger: 0.12, duration: 0.3 }, "sort+=0.75");
      tl.to({}, { duration: 0.5 });
    });
  });

  return (
    <section ref={ref} className="constat">
      <div className="wrap">
        <p className="constat__quote">
          {QUOTE.split(" ").map((w, i) => (
            <span key={i} className="constat__word">
              {w}{" "}
            </span>
          ))}
        </p>
      </div>

      <div className="chaos">
        <div className="wrap chaos__grid">
          <div className="chaos__text">
            <div className="chaos__before">
              <p className="eyebrow eyebrow--ink">Aujourd&apos;hui</p>
              <h2>Dix groupes WhatsApp. Trois cents messages. Et toujours pas de réponse.</h2>
            </div>
            <div className="chaos__after">
              <p className="eyebrow eyebrow--ink">Avec Kwat</p>
              <h2>Une seule place, où chaque information trouve son voisin.</h2>
            </div>
          </div>

          <div className="chaos__stage">
            {chaosMessages.map((m, i) => (
              <div
                key={i}
                className="chaos__bubble"
                data-keep={m.keep}
                style={{ left: `${m.x}%`, top: `${m.y}%`, rotate: `${m.r}deg` }}
              >
                <span>{m.group}</span>
                {m.text}
              </div>
            ))}
            <div className="sorted">
              <p className="sorted__head">
                <strong>Bonamoussadi</strong>
                <span>Aujourd&apos;hui</span>
              </p>
              {sortedMessages.map((m) => (
                <div className="sorted__row" key={m.tag}>
                  <span className="sorted__tag">{m.tag}</span>
                  <p>{m.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
