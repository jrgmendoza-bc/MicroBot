import { useEffect, useRef } from "react";
import { PRODUCTS } from "../data/products.js";
import { Icon } from "./Icons.jsx";
import { Reveal, spotlight, prefersReducedMotion } from "./hooks.jsx";
import SectionHead from "./SectionHead.jsx";

function ProductCard({ product, index }) {
  const url = `product-detail.html?id=${product.id}`;
  return (
    <article className="product-card" id={product.id} role="link" tabIndex={0} aria-label={`View ${product.name}`}
      onPointerMove={spotlight}
      onClick={(e) => { if (e.target.closest("a, button")) return; window.location.href = url; }}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); window.location.href = url; } }}>
      <i className="corner tl" /><i className="corner tr" /><i className="corner bl" /><i className="corner br" />
      <div className="product-image">
        <span className="product-tag">MB-0{index + 1}</span>
        <img src={product.images[0]} alt={`${product.name} product image`} loading="lazy" draggable="false" />
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-desc">{product.shortDescription}</p>
        <div className="product-foot">
          <div className="product-price"><small>Price</small>{product.priceText}</div>
          <div className="product-button-wrap">
            <a className="btn btn-primary product-button" href={url}><span>View Product</span><Icon name="arrow" size={16} /></a>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Products() {
  const carousel = useRef(null);

  useEffect(() => {
    const el = carousel.current;
    if (!el) return;
    const step = () => {
      const card = el.querySelector(".product-card");
      return card ? card.offsetWidth + 20 : 320;
    };
    let drag = false, moved = false, sx = 0, sl = 0, timer = null, hovering = false;

    const down = (e) => { if (e.pointerType !== "mouse") return; drag = true; moved = false; sx = e.pageX; sl = el.scrollLeft; };
    const move = (e) => {
      if (!drag) return;
      const walk = (e.pageX - sx) * 1.4;
      if (Math.abs(walk) > 4) { moved = true; el.classList.add("is-dragging"); }
      if (moved) el.scrollLeft = sl - walk;
    };
    const up = () => { drag = false; el.classList.remove("is-dragging"); };
    const click = (e) => { if (moved) { e.stopPropagation(); e.preventDefault(); moved = false; } };

    const auto = () => {
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 4) return;
      if (el.scrollLeft >= max - 4) el.scrollTo({ left: 0, behavior: "smooth" });
      else el.scrollBy({ left: step(), behavior: "smooth" });
    };
    const start = () => { stop(); if (!prefersReducedMotion()) timer = setInterval(auto, 3800); };
    const stop = () => { if (timer) clearInterval(timer); timer = null; };
    const enter = () => { hovering = true; stop(); };
    const leave = () => { hovering = false; up(); start(); };

    el.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    el.addEventListener("click", click, true);
    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);
    el.addEventListener("touchstart", stop, { passive: true });
    start();
    return () => {
      stop();
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      el.removeEventListener("click", click, true);
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mouseleave", leave);
      el.removeEventListener("touchstart", stop);
    };
  }, []);

  const scrollBy = (dir) => {
    const el = carousel.current;
    const card = el.querySelector(".product-card");
    el.scrollBy({ left: dir * ((card ? card.offsetWidth : 300) + 20), behavior: "smooth" });
  };

  return (
    <section id="products" className="section">
      <SectionHead index="02" label="Catalog" title="Products" />
      <Reveal className="carousel-wrapper">
        <button className="carousel-btn carousel-prev" type="button" aria-label="Previous products" onClick={() => scrollBy(-1)}><Icon name="left" size={20} /></button>
        <div className="featured-carousel" ref={carousel}>
          <div id="featuredGrid" className="carousel-track">
            {PRODUCTS.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
        <button className="carousel-btn carousel-next" type="button" aria-label="Next products" onClick={() => scrollBy(1)}><Icon name="right" size={20} /></button>
      </Reveal>
    </section>
  );
}
