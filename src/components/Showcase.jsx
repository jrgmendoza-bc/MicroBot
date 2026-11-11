import { SHOWCASE } from "../data/products.js";
import { Reveal } from "./hooks.jsx";
import SectionHead from "./SectionHead.jsx";

export default function Showcase() {
  return (
    <section id="showcase" className="section">
      <SectionHead index="03" label="In the field" title="Built with Microbot" />
      <div className="showcase-grid">
        {SHOWCASE.map((s, i) => (
          <Reveal key={s.src} delay={i * 80} className={`showcase-tile ${s.span}`}>
            <img src={s.src} alt={s.alt} loading="lazy" />
            <span className="showcase-label">{s.label}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
