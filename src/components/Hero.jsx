import { useEffect, useState } from "react";
import { HERO_BANNERS, HERO_QUOTES, LINKS } from "../data/products.js";
import { Icon } from "./Icons.jsx";
import { prefersReducedMotion, useInterval } from "./hooks.jsx";

function TypedCopy() {
  const [text, setText] = useState(prefersReducedMotion() ? HERO_QUOTES[0] : "");
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let q = 0, c = 0, del = false, t;
    const tick = () => {
      const cur = HERO_QUOTES[q];
      setText(cur.slice(0, c));
      if (!del && c < cur.length) { c++; t = setTimeout(tick, 36); return; }
      if (!del && c === cur.length) { del = true; t = setTimeout(tick, 1700); return; }
      if (del && c > 0) { c--; t = setTimeout(tick, 24); return; }
      del = false; q = (q + 1) % HERO_QUOTES.length; t = setTimeout(tick, 420);
    };
    tick();
    return () => clearTimeout(t);
  }, []);
  return (
    <p className="hero-copy is-typing" aria-label={HERO_QUOTES[0]}>
      <span aria-hidden="true">{text}</span>
    </p>
  );
}

export default function Hero() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = prefersReducedMotion();
  useInterval(() => setI((n) => (n + 1) % HERO_BANNERS.length), 5200, !paused && !reduced);

  return (
    <section id="home" className="hero-section"
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)} onTouchEnd={() => setPaused(false)}>
      <div className="hero-bg-carousel" aria-hidden="true">
        {HERO_BANNERS.map((b, n) => (
          <div key={b.src} className={`hero-bg-slide ${n === i ? "is-active" : ""}`} style={{ backgroundImage: `url('${b.src}')`, "--pos": b.pos }} />
        ))}
      </div>
      <div className="hero-vignette" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-scan" aria-hidden="true" />

      <div className="hero-content">
        <p className="hero-eyebrow"><i className="status-dot" /> Microbot <b>//</b> Open-source electronics</p>
        <h1 className="hero-title">
          Future Robotics.<br />
          <span className="grad">Built for Real-World Use.</span>
        </h1>
        <TypedCopy />
        <div className="hero-actions">
          <a className="btn btn-primary" href="#products"><span>Explore Products</span><Icon name="arrow" size={18} /></a>
          <a className="btn btn-ghost" href={LINKS.shopee} target="_blank" rel="noopener"><Icon name="bag" size={18} /><span>Shop on Shopee</span></a>
        </div>
      </div>

      <div className="hero-hud" aria-hidden="true">
        <div className="hero-progress">
          {HERO_BANNERS.map((_, n) => (
            <button key={n} type="button" tabIndex={-1} className={n === i ? "is-active" : ""} onClick={() => setI(n)} />
          ))}
        </div>
        <span className="hero-index">0{i + 1} / 0{HERO_BANNERS.length}</span>
      </div>
      <a href="#news" className="scroll-cue" aria-label="Scroll to news"><span /></a>
    </section>
  );
}
