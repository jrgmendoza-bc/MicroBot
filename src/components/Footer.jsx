import { PRODUCTS, LINKS } from "../data/products.js";

export default function Footer({ home = true }) {
  const h = (id) => (home ? `#${id}` : `index.html#${id}`);
  return (
    <footer className="site-footer">
      <div className="footer-glow" aria-hidden="true" />
      <div className="footer-grid">
        <div className="footer-brand">
          <a className="shell-brand" href={h("home")}>
            <img src="assets/images/Logo/logo.png" alt="MICROBOT logo" />
            <span>MICROBOT</span>
          </a>
          <p>Future-ready robotics systems built for practical innovation and real-world use.</p>
          <span className="hud-tag"><i className="status-dot" /> Open-source electronics · Designed in the Philippines</span>
        </div>

        <div className="footer-col">
          <h3>Quick Links</h3>
          <a href={h("home")}>Home</a>
          <a href={h("news")}>News</a>
          <a href={h("products")}>Products</a>
          <a href={h("about")}>About</a>
        </div>

        <div className="footer-col">
          <h3>Products</h3>
          <a href="product-detail.html?id=byou">BYOU / Build Your Own UNO</a>
          <a href="product-detail.html?id=nano-expansion">Nano Expansion Board</a>
          <a href="product-detail.html?id=rover-module">Rover Robotics Module</a>
        </div>

        <div className="footer-col">
          <h3>Connect</h3>
          <a href={LINKS.mailto}>Email Us</a>
          <a href={LINKS.facebook} target="_blank" rel="noopener">Facebook</a>
          <a href={LINKS.shopee} target="_blank" rel="noopener">Shopee</a>
        </div>
      </div>
      <div className="footer-wordmark" aria-hidden="true">MICROBOT</div>
      <p className="copyright">&copy; 2026 MICROBOT. All rights reserved.</p>
    </footer>
  );
}
