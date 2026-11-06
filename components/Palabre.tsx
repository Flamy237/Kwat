"use client";

import { cercles } from "@/lib/content";
import { DESKTOP, MOBILE, MOTION, gsap, useAnim } from "@/lib/gsap";
import { TLink } from "./PageTransition";

const STEPS = [
  {
    n: "1",
    title: "On en parle",
    text: "Chaque sujet a son cercle et chaque discussion reste à sa place. Celui qui arrive demain retrouve tout le fil, sans avoir à remonter trois cents messages.",
  },
  {
    n: "2",
    title: "On tranche",
    text: "Quand le débat a assez duré, un sondage. Un voisin, une voix. La décision reste écrite, visible de tous.",
  },
  {
    n: "3",
    title: "On agit",
    text: "La décision devient un plan : une date, des volontaires, une cotisation suivie au franc près, et un compte rendu pour la commune.",
  },
];

const MESSAGES = [
  { who: "CN", name: "Clarisse N.", where: "Bloc C", text: "Encore 30 cm d'eau devant chez moi hier soir. Le drain est bouché depuis la dernière pluie." },
  { who: "IM", name: "Ibrahim M.", where: "Yoro Joss", text: "Ce sont les ordures au niveau du petit pont. J'ai des photos." },
  { who: "ME", name: "Mme Ekwalla", where: "Référente du bloc", text: "Si chacun attend, ça déborde encore en octobre. Je propose qu'on décide cette semaine.", ref: true },
];

const POLL = [
  { label: "Curage collectif samedi", pct: 62, win: true },
  { label: "Saisir d'abord la commune", pct: 27, win: false },
  { label: "Attendre les travaux", pct: 11, win: false },
];

type ScrollTriggerVars = NonNullable<gsap.TimelineVars["scrollTrigger"]> & object;

export default function Palabre() {
  const ref = useAnim<HTMLElement>((mm, root) => {
    mm.add(MOTION, () => {
      gsap.from(".palabre__title span > span", {
        yPercent: 110,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: { trigger: ".palabre__title", start: "top 80%" },
      });
      gsap.fromTo(
        ".palabre__ndop",
        { backgroundPositionY: "0px" },
        { backgroundPositionY: "240px", ease: "none", scrollTrigger: { trigger: root, scrub: true } },
      );
      gsap.to(".cercles__row--a", { xPercent: -14, ease: "none", scrollTrigger: { trigger: ".cercles", scrub: 0.8 } });
      gsap.fromTo(".cercles__row--b", { xPercent: -14 }, { xPercent: 0, ease: "none", scrollTrigger: { trigger: ".cercles", scrub: 0.8 } });
    });

    const scene = (scrollTrigger: ScrollTriggerVars) => {
      const steps = gsap.utils.toArray<HTMLElement>(".pstep");
      const setActive = (i: number) => steps.forEach((s, k) => s.classList.toggle("is-active", k === i));

      gsap.set(".thread__poll, .thread__plan", { autoAlpha: 0, y: 40 });
      gsap.set(".msg", { autoAlpha: 0, y: 30 });
      gsap.set(".poll__fill", { scaleX: 0 });
      gsap.set(".plan__fill", { scaleX: 0 });
      gsap.set(".plan__drains", { opacity: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          ...scrollTrigger,
          onUpdate: (self) => setActive(self.progress < 0.36 ? 0 : self.progress < 0.7 ? 1 : 2),
        },
      });

      tl.to(".msg", { autoAlpha: 1, y: 0, stagger: 0.35, duration: 0.4 });
      tl.to({}, { duration: 0.3 });
      tl.to(".thread__msgs", { autoAlpha: 0, y: -40, duration: 0.4 });
      tl.to(".thread__poll", { autoAlpha: 1, y: 0, duration: 0.4 }, "<0.15");
      tl.to(".poll__fill", { scaleX: 1, stagger: 0.12, duration: 0.6, ease: "power1.inOut" });
      tl.to({}, { duration: 0.3 });
      tl.to(".thread__poll", { autoAlpha: 0, y: -40, duration: 0.4 });
      tl.to(".thread__plan", { autoAlpha: 1, y: 0, duration: 0.4 }, "<0.15");
      tl.to(".plan__fill", { scaleX: 1, duration: 0.7, ease: "power1.inOut" });
      tl.to(".plan__drains", { opacity: 1, duration: 0.5 }, "<");
      tl.to({}, { duration: 0.35 });
    };

    mm.add(DESKTOP, () =>
      scene({ trigger: ".palabre__stage", start: "top top", end: "+=240%", pin: true, scrub: 0.7 }),
    );
    mm.add(MOBILE, () => scene({ trigger: ".palabre__stage", start: "top top", end: "bottom bottom", scrub: 0.35 }));
  });

  return (
    <section ref={ref} className="palabre" id="palabre">
      <div className="palabre__ndop" aria-hidden="true" />

      <div className="wrap palabre__intro">
        <p className="eyebrow">Ce qui nous distingue</p>
        <h2 className="palabre__title">
          <span>
            <span>Sous l&apos;arbre,</span>
          </span>
          <span>
            <span>tout le quartier.</span>
          </span>
        </h2>
        <p className="palabre__lead">
          Le <strong>Palabre</strong>, c&apos;est le forum du quartier. Comme sous l&apos;arbre à palabres, on s&apos;y
          assoit pour discuter longtemps de ce qui concerne tout le monde, et on n&apos;en repart pas sans décision.
        </p>
      </div>

      <div className="palabre__stage">
        <div className="wrap palabre__grid">
          <ol className="psteps">
            {STEPS.map((s, i) => (
              <li key={s.n} className={`pstep ${i === 0 ? "is-active" : ""}`}>
                <span className="pstep__n">{s.n}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="thread">
            <div className="thread__bar">
              <div>
                <span className="thread__circle">Cercle · Drains &amp; inondations</span>
                <strong>Le drain de Yoro Joss déborde à chaque pluie</strong>
              </div>
              <span className="thread__count">38 voisins</span>
            </div>

            <div className="thread__body">
              <div className="thread__msgs">
                {MESSAGES.map((m) => (
                  <div className={`msg ${m.ref ? "msg--ref" : ""}`} key={m.who}>
                    <span className="msg__who">{m.who}</span>
                    <div>
                      <p className="msg__name">
                        {m.name} <span>{m.where}</span>
                      </p>
                      <p>{m.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="thread__poll">
                <p className="thread__label">Sondage · 112 voix</p>
                <h4>Que fait-on pour le drain ?</h4>
                {POLL.map((o) => (
                  <div className={`poll ${o.win ? "poll--win" : ""}`} key={o.label}>
                    <span className="poll__fill" style={{ width: `${o.pct}%` }} />
                    <span className="poll__label">{o.label}</span>
                    <span className="poll__pct">{o.pct} %</span>
                  </div>
                ))}
              </div>

              <div className="thread__plan">
                <div className="plan__map">
                  <div className="plan__streets" />
                  <div className="plan__drains" />
                  <span className="plan__spot" />
                </div>
                <p className="thread__label">Plan d&apos;action · Samedi, 7 h</p>
                <h4>Curage de Yoro Joss à Carrefour KM</h4>
                <dl className="plan__stats">
                  <div>
                    <dt>Volontaires</dt>
                    <dd>23</dd>
                  </div>
                  <div>
                    <dt>Cotisation</dt>
                    <dd>84 000 FCFA</dd>
                  </div>
                </dl>
                <div className="plan__bar">
                  <span className="plan__fill" />
                </div>
                <p className="plan__goal">Objectif : 120 000 FCFA</p>
              </div>
            </div>

            <p className="thread__note">Exemple de discussion : personnes et chiffres fictifs.</p>
          </div>
        </div>
      </div>

      <div className="cercles">
        <p className="wrap cercles__head">Un cercle pour chaque sujet qui vous tient à cœur.</p>
        {(["a", "b"] as const).map((r, k) => (
          <div className={`cercles__row cercles__row--${r}`} key={r}>
            {[...cercles.slice(k * 7, k * 7 + 7), ...cercles.slice(k * 7, k * 7 + 7), ...cercles.slice((1 - k) * 7, (1 - k) * 7 + 3)].map((c, i) => (
              <TLink href="/demo/palabre" className="chip" key={`${c}-${i}`}>
                {c}
              </TLink>
            ))}
          </div>
        ))}
        <div className="wrap cercles__cta">
          <TLink href="/demo/palabre" className="btn btn--taxi">
            Entrer dans le Palabre
          </TLink>
        </div>
      </div>
    </section>
  );
}
