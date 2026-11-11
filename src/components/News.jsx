import { useRef, useState } from "react";
import { NEWS } from "../data/products.js";
import { Icon } from "./Icons.jsx";
import { Reveal, useInterval, prefersReducedMotion } from "./hooks.jsx";
import SectionHead from "./SectionHead.jsx";

export default function News() {
  const [cur, setCur] = useState(0);
  const [dir, setDir] = useState("next");
  const [paused, setPaused] = useState(false);
  const [tick, setTick] = useState(0); // restarts the progress animation on manual nav
  const n = NEWS.length;
  const touch = useRef(null);

  const go = (idx, d) => { setDir(d); setCur((idx + n) % n); setTick((t) => t + 1); };
  const next = () => go(cur + 1, "next");
  const prev = () => go(cur - 1, "prev");
  useInterval(next, 4800, !paused && !prefersReducedMotion());

  const onKey = (e) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
    if (e.key === "ArrowRight") { e.preventDefault(); next(); }
  };

  return (
    <section id="news" className="section">
      <SectionHead index="01" label="Latest" title="News" />
      <Reveal className="news-shell">
        <div className="fbc" id="featuredBannerCarousel" tabIndex={0} aria-label="Featured news moments" aria-roledescription="carousel"
          onKeyDown={onKey} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
          onTouchStart={(e) => { touch.current = e.touches[0].clientX; setPaused(true); }}
          onTouchEnd={(e) => {
            if (touch.current != null) {
              const dx = e.changedTouches[0].clientX - touch.current;
              if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
            }
            touch.current = null; setPaused(false);
          }}>
          <i className="corner tl" /><i className="corner tr" /><i className="corner bl" /><i className="corner br" />

          <div className="fbc-stage">
            {NEWS.map((s, idx) => (
              <article key={s.title} className={`fbc-slide ${idx === cur ? "is-active" : ""} ${dir === "prev" ? "from-left" : ""}`}
                aria-hidden={idx !== cur} aria-roledescription="slide" aria-label={`${idx + 1} of ${n}`}>
                <div className="fbc-media-main">
                  <img src={s.image} alt={s.alt} loading={idx === 0 ? "eager" : "lazy"} draggable="false" />
                </div>
                <div className="fbc-caption">
                  <span className="fbc-count">{String(idx + 1).padStart(2, "0")} <em>/ {String(n).padStart(2, "0")}</em></span>
                  <h3 className="fbc-caption-title">{s.title}</h3>
                  <p className="fbc-caption-copy">{s.copy}</p>
                </div>
              </article>
            ))}
          </div>

          <button className="fbc-arrow fbc-arrow--prev" type="button" aria-label="Previous slide" onClick={prev}><Icon name="left" size={20} /></button>
          <button className="fbc-arrow fbc-arrow--next" type="button" aria-label="Next slide" onClick={next}><Icon name="right" size={20} /></button>

          <div className="fbc-dots" role="tablist" aria-label="Choose slide">
            {NEWS.map((_, idx) => (
              <button key={idx} type="button" role="tab" aria-selected={idx === cur} aria-label={`Go to slide ${idx + 1}`}
                className={`fbc-dot ${idx === cur ? "is-active" : ""}`} onClick={() => go(idx, idx > cur ? "next" : "prev")}>
                <span key={idx === cur ? tick : "x"} className={paused ? "is-paused" : ""} />
              </button>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
