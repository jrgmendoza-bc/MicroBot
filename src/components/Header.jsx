import { useEffect, useRef, useState } from "react";

const NAV = [
  { id: "home", label: "Home" },
  { id: "news", label: "News" },
  { id: "products", label: "Products" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

/**
 * @param {{ active?: string, onNavigate?: (id:string)=>void, home?: boolean, forceActive?: string }} props
 * On the home page links are in-page anchors; on the detail page they point back to index.html.
 */
export default function Header({ active, onNavigate, home = true }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const wrap = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onDoc = (e) => {
      if (wrap.current && !wrap.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  const hrefFor = (id) => (home ? `#${id}` : `index.html#${id}`);

  return (
    <header className={`site-shell ${scrolled ? "is-scrolled" : ""}`} id="top">
      <div className="shell-bar" role="navigation" aria-label="Primary navigation" ref={wrap}>
        <a className="shell-brand" href={hrefFor("home")} aria-label="MICROBOT home"
          onClick={(e) => {
            if (home) { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); history.replaceState(null, "", "#home"); onNavigate?.("home"); }
            setOpen(false);
          }}>
          <img src="assets/images/Logo/logo.png" alt="MICROBOT logo" />
          <span>MICROBOT</span>
        </a>

        <button className={`nav-toggle ${open ? "is-open" : ""}`} type="button" aria-expanded={open}
          aria-controls="primaryNav" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((o) => !o)}>
          <span /><span /><span />
        </button>

        <nav className={`shell-nav ${open ? "is-open" : ""}`} id="primaryNav" aria-label="Primary">
          {NAV.map((n) => (
            <a key={n.id} href={hrefFor(n.id)} data-nav={n.id}
              className={`shell-link ${active === n.id ? "is-active" : ""}`}
              aria-current={active === n.id ? "page" : undefined}
              onClick={(e) => {
                if (home && n.id === "home") { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); history.replaceState(null, "", "#home"); }
                onNavigate?.(n.id);
                setOpen(false);
              }}>
              {n.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
