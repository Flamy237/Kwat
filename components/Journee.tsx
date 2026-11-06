"use client";

import { dayPanels } from "@/lib/content";
import { DESKTOP, MOBILE, gsap, useAnim } from "@/lib/gsap";
import { TLink } from "./PageTransition";

// Le ciel de Douala, de l'aube à la nuit : un panneau, une couleur.
const SKY = [
  { bg: "#F7E6CC", fg: "#10143A" },
  { bg: "#FBF1DC", fg: "#10143A" },
  { bg: "#FFC81F", fg: "#10143A" },
  { bg: "#EE8A4C", fg: "#10143A" },
  { bg: "#3B2C78", fg: "#F7F4EC" },
  { bg: "#0D1130", fg: "#F7F4EC" },
];

const minutes = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

export default function Journee() {
  const ref = useAnim<HTMLElement>((mm, root) => {
    mm.add(DESKTOP, () => {
      const track = root.querySelector<HTMLElement>(".journee__track")!;
      const panels = gsap.utils.toArray<HTMLElement>(".day");
      const clock = root.querySelector<HTMLElement>(".journee__clock")!;
      const steps = panels.length - 1;
      const stamps = dayPanels.map((p) => minutes(p.time));

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth + window.innerHeight * 0.6}`,
          pin: true,
          scrub: 0.7,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = Math.min(self.progress * steps, steps - 0.0001);
            const i = Math.floor(p);
            const m = Math.round(stamps[i] + (stamps[i + 1] - stamps[i]) * (p - i));
            clock.textContent = `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
          },
        },
      });

      const slide = tl.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        duration: steps,
      }, 0);

      SKY.slice(1).forEach((s, i) => {
        tl.to(root, { "--sky": s.bg, duration: 1 }, i);
        tl.to(root, { "--ink": s.fg, duration: 0.3 }, i + 0.45);
      });
      tl.to(".journee__sun", { left: "100%", duration: steps }, 0);

      panels.forEach((panel, i) => {
        gsap.from(panel.querySelectorAll("[data-day]"), {
          y: 60,
          autoAlpha: 0,
          stagger: 0.06,
          duration: 0.9,
          ease: "power3.out",
          // Le premier panneau est déjà à l'écran : il se révèle à l'arrivée de la section.
          scrollTrigger:
            i === 0
              ? { trigger: root, start: "top 55%", toggleActions: "play none none reverse" }
              : {
                  trigger: panel,
                  containerAnimation: slide,
                  start: "left 70%",
                  toggleActions: "play none none reverse",
                },
        });
        gsap.fromTo(
          panel.querySelector(".day__card"),
          { rotate: 5, yPercent: 8 },
          {
            rotate: -3,
            yPercent: -8,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: slide,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          },
        );
      });
    });

    // Mobile : un jeu de cartes qu'on balaie, pendant que le ciel avance dans la journée.
    mm.add(MOBILE, () => {
      const days = gsap.utils.toArray<HTMLElement>(".day");
      const clock = root.querySelector<HTMLElement>(".journee__clock")!;
      const copies = days.map((d) => d.querySelectorAll("[data-day]"));
      const cards = days.map((d) => d.querySelector(".day__card"));
      const stamps = dayPanels.map((p) => minutes(p.time));
      const HOLD = 0.5;
      const CHANGE = 1;
      const STEP = HOLD + CHANGE;
      const total = HOLD + STEP * (days.length - 1);

      days.slice(1).forEach((_, k) => {
        gsap.set(copies[k + 1], { autoAlpha: 0, y: 44 });
        gsap.set(cards[k + 1], { xPercent: 125, rotate: 13 });
      });
      gsap.set(cards[0], { rotate: -2 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.35,
          onUpdate: (self) => {
            const t = self.progress * total;
            const i = Math.min(Math.floor(Math.max(t - HOLD, 0) / STEP), days.length - 2);
            const f = Math.min(Math.max((t - HOLD - i * STEP) / CHANGE, 0), 1);
            const m = Math.round(stamps[i] + (stamps[i + 1] - stamps[i]) * f);
            clock.textContent = `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
          },
        },
      });

      tl.to(".journee__sun", { left: "100%", duration: total, ease: "none" }, 0);

      SKY.slice(1).forEach((s, i) => {
        const at = HOLD + i * STEP;
        tl.to(root, { "--sky": s.bg, duration: CHANGE, ease: "none" }, at)
          .to(root, { "--ink": s.fg, duration: 0.3, ease: "none" }, at + 0.35)
          .to(copies[i], { autoAlpha: 0, y: -40, stagger: 0.03, duration: 0.42 }, at)
          .to(cards[i], { xPercent: -125, rotate: -13, duration: 0.7, ease: "power2.in" }, at)
          .to(copies[i + 1], { autoAlpha: 1, y: 0, stagger: 0.04, duration: 0.5, ease: "power2.out" }, at + 0.42)
          .to(cards[i + 1], { xPercent: 0, rotate: i % 2 ? -2 : 2, duration: 0.7, ease: "power3.out" }, at + 0.3);
      });

      tl.to(".journee__rain", { opacity: 1, duration: 0.8, ease: "none" }, total - CHANGE - HOLD + 0.2);
    });
  });

  return (
    <section ref={ref} className="journee" id="journee">
      <div className="journee__scene">
      <div className="journee__rain" aria-hidden="true" />
      <div className="journee__head">
        <p className="eyebrow eyebrow--ink">Une journée à Bonamoussadi</p>
        <div className="journee__rail" aria-hidden="true">
          <span className="journee__sun" />
        </div>
        <p className="journee__clock" aria-hidden="true">
          {dayPanels[0].time}
        </p>
      </div>

      <div className="journee__track">
        {dayPanels.map((p, i) => (
          <article className="day" key={p.time}>
            <div className="day__copy">
              <p className="day__time" data-day>
                {p.time}
              </p>
              <p className="eyebrow eyebrow--ink" data-day>
                {p.kicker}
              </p>
              <h3 data-day>{p.title}</h3>
              <p className="day__text" data-day>
                {p.text}
              </p>
              <TLink href={`/demo/${p.slug}`} className="textlink" data-day>
                En savoir plus
              </TLink>
            </div>

            <TLink href={`/demo/${p.slug}`} className={`day__card ${i >= 4 ? "day__card--night" : ""}`}>
              <span className="day__head">{p.card.head}</span>
              <strong>{p.card.title}</strong>
              {p.card.lines.map((l) => (
                <span className="day__line" key={l}>
                  {l}
                </span>
              ))}
              <span className="day__foot">{p.card.foot}</span>
            </TLink>
          </article>
        ))}
      </div>
      </div>
    </section>
  );
}
