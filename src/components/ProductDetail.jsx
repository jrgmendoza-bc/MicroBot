import { useEffect, useState } from "react";
import { getProductById } from "../data/products.js";
import { Icon } from "./Icons.jsx";

/** "Dual Motor Power - Drive two DC motors…" → { lead, rest } */
function splitFeature(text) {
  const m = text.match(/^(.{3,40}?)\s[-–]\s(.+)$/);
  return m ? { lead: m[1], rest: m[2] } : { lead: null, rest: text };
}

export default function ProductDetail() {
  const id = new URLSearchParams(window.location.search).get("id");
  const product = getProductById(id);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (product) document.title = `MICROBOT | ${product.name}`;
  }, [product]);

  if (!product) {
    return (
      <article className="detail-card not-found">
        <p className="detail-label">ERROR // 404</p>
        <h1 className="section-title">Product Not Found</h1>
        <p className="section-copy">The selected product could not be found. Return to the store and choose another product.</p>
        <a className="btn btn-primary" href="index.html#products"><Icon name="left" size={18} /><span>Back to Products</span></a>
      </article>
    );
  }

  const n = product.images.length;
  const set = (i) => setIdx((i + n) % n);

  return (
    <>
      <nav className="crumbs" aria-label="Breadcrumb">
        <a href="index.html#home">Home</a><i>/</i>
        <a href="index.html#products">Products</a><i>/</i>
        <span aria-current="page">{product.name}</span>
      </nav>

      <article className="detail-card">
        <div className="detail-layout">
          <div className="detail-media">
            <div className="detail-main-image-wrap">
              <i className="corner tl" /><i className="corner tr" /><i className="corner bl" /><i className="corner br" />
              <button className="gallery-nav gallery-prev" type="button" aria-label="Previous image" onClick={() => set(idx - 1)}><Icon name="left" size={20} /></button>
              <img key={idx} id="detailMainImage" className="detail-main-image" src={product.images[idx]} alt={`${product.name} image ${idx + 1}`} />
              <button className="gallery-nav gallery-next" type="button" aria-label="Next image" onClick={() => set(idx + 1)}><Icon name="right" size={20} /></button>
              <span className="gallery-count">{String(idx + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</span>
            </div>
            <div className="detail-thumbs" id="detailThumbs">
              {product.images.map((src, i) => (
                <button key={src} type="button" className={`detail-thumb ${i === idx ? "is-active" : ""}`} aria-label={`Show image ${i + 1}`} onClick={() => set(i)}>
                  <img src={src} alt={`${product.name} thumbnail ${i + 1}`} loading="lazy" />
                </button>
              ))}
            </div>
          </div>

          <div className="detail-content">
            <p className="detail-label"><i className="status-dot" /> MICROBOT PRODUCT</p>
            <h1 className="detail-title">{product.name}</h1>
            <p className="detail-price">{product.priceText}</p>
            <p className="detail-description" dangerouslySetInnerHTML={{ __html: product.fullDescription }} />

            <div className="detail-list-wrap">
              <h2 className="detail-list-title"><span>//</span> Key Features</h2>
              <ul id="featureList" className="detail-list features">
                {product.keyFeatures.map((f) => {
                  const { lead, rest } = splitFeature(f);
                  return (
                    <li key={f}>
                      <span className="tick"><Icon name="check" size={14} /></span>
                      <span>{lead && <strong>{lead}</strong>}{lead ? " " : ""}{rest}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="detail-list-wrap">
              <h2 className="detail-list-title"><span>//</span> Applications</h2>
              <ul id="applicationList" className="detail-list chips">
                {product.applications.map((a) => <li key={a}>{a}</li>)}
              </ul>
            </div>

            <div className="detail-actions">
              <a className="btn btn-primary detail-buy" href={product.buyLink || product.shopeeLink || "https://shopee.ph/"} target="_blank" rel="noopener"><Icon name="cart" size={18} /><span>Buy Now</span></a>
              <a href={product.documentation || "#"} className="btn btn-outline doc-btn" target="_blank" rel="noopener"><Icon name="doc" size={18} /><span>Product Documentation</span></a>
              <a className="btn btn-ghost section-link" href="index.html#products"><Icon name="left" size={18} /><span>Back to Products</span></a>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
