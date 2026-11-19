import { useEffect, useRef, useState } from "react";
import { Icon } from "../components/Icons.jsx";
import { cart, shopUI, useCartItems, useShopUI, detailed, totalOf, countOf, peso, ORDER_EMAIL, SERVICE_AREAS } from "./store.js";

export function CartButton() {
  const n = countOf(useCartItems());
  return (
    <button type="button" className="cart-btn" aria-label={`Open cart, ${n} item${n === 1 ? "" : "s"}`} onClick={(e) => { e.stopPropagation(); shopUI.open("cart"); }}>
      <Icon name="cart" size={20} />
      {n > 0 && <span className="cart-badge">{n}</span>}
    </button>
  );
}

const orderId = () => {
  const d = new Date();
  const p = (x) => String(x).padStart(2, "0");
  return `MB-${String(d.getFullYear()).slice(2)}${p(d.getMonth() + 1)}${p(d.getDate())}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
};

function CartView({ rows, total }) {
  if (!rows.length) {
    return (
      <div className="shop-empty">
        <Icon name="cart" size={34} />
        <p>Your cart is empty.</p>
        <a className="btn btn-outline" href="index.html#products" onClick={() => shopUI.close()}><span>Browse Products</span></a>
      </div>
    );
  }
  return (
    <>
      <ul className="shop-lines">
        {rows.map(({ product, qty, line, unit }) => (
          <li key={product.id} className="shop-line">
            <img src={product.images[0]} alt="" />
            <div className="shop-line-info">
              <b>{product.name}</b>
              <small>{peso(unit)} each</small>
              <div className="qty">
                <button type="button" aria-label="Decrease quantity" onClick={() => cart.setQty(product.id, qty - 1)}>−</button>
                <span>{qty}</span>
                <button type="button" aria-label="Increase quantity" onClick={() => cart.setQty(product.id, qty + 1)}>+</button>
              </div>
            </div>
            <div className="shop-line-end">
              <b>{peso(line)}</b>
              <button type="button" className="link-btn" onClick={() => cart.remove(product.id)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="shop-foot">
        <div className="shop-total"><span>Subtotal</span><b>{peso(total)}</b></div>
        <p className="shop-note">Delivery or meet-up fee (if any) is confirmed by Microbot after you order.</p>
        <button type="button" className="btn btn-primary" onClick={() => shopUI.view("checkout")}><span>Checkout</span><Icon name="arrow" size={16} /></button>
      </div>
    </>
  );
}

function CheckoutView({ rows, total, onDone }) {
  const [f, setF] = useState({ name: "", phone: "", email: "", city: SERVICE_AREAS[0], address: "", method: "Delivery", payment: "Cash on delivery / meet-up", notes: "", _honey: "" });
  const [state, setState] = useState({ busy: false, error: "" });
  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }));

  const summary = rows.map((r) => `${r.qty} x ${r.product.name} @ ${peso(r.unit)} = ${peso(r.line)}`).join("\n");

  const submit = async (e) => {
    e.preventDefault();
    if (f._honey) return;
    if (!rows.length) return;
    setState({ busy: true, error: "" });
    const id = orderId();
    const payload = {
      _subject: `New Microbot order ${id} - ${f.name}`,
      _template: "table",
      _captcha: "false",
      ...(f.email ? { _replyto: f.email, email: f.email } : {}),
      "Order No.": id,
      Items: summary,
      Total: peso(total),
      Name: f.name,
      Phone: f.phone,
      City: f.city,
      Address: f.address,
      "Delivery / Meet-up": f.method,
      Payment: f.payment,
      Notes: f.notes || "-",
    };
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${ORDER_EMAIL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.success === "false" || data.success === false) throw new Error(data.message || "send failed");
      cart.clear();
      onDone({ id, total, email: f.email });
    } catch {
      setState({ busy: false, error: "We couldn't send your order automatically. Please try again, or send it by email instead." });
    }
  };

  const mailFallback = () => {
    const body = `Name: ${f.name}\nPhone: ${f.phone}\nCity: ${f.city}\nAddress: ${f.address}\n${f.method} / ${f.payment}\n\n${summary}\nTotal: ${peso(total)}\n\nNotes: ${f.notes || "-"}`;
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${ORDER_EMAIL}&su=${encodeURIComponent("Microbot order")}&body=${encodeURIComponent(body)}`, "_blank", "noopener");
  };

  if (!rows.length) return <CartView rows={rows} total={total} />;

  return (
    <form className="shop-form" onSubmit={submit}>
      <button type="button" className="link-btn back" onClick={() => shopUI.view("cart")}>← Back to cart</button>
      <p className="shop-area">Local orders only: <b>Baguio City</b> and <b>La Trinidad, Benguet</b>.</p>

      <label>Full name<input required value={f.name} onChange={set("name")} autoComplete="name" /></label>
      <div className="two">
        <label>Mobile number<input required type="tel" inputMode="tel" pattern="[0-9+()\s-]{10,16}" title="e.g. 09171234567" value={f.phone} onChange={set("phone")} autoComplete="tel" /></label>
        <label>Email (optional)<input type="email" value={f.email} onChange={set("email")} autoComplete="email" /></label>
      </div>
      <div className="two">
        <label>City
          <select value={f.city} onChange={set("city")}>{SERVICE_AREAS.map((c) => <option key={c}>{c}</option>)}</select>
        </label>
        <label>Get it by
          <select value={f.method} onChange={set("method")}><option>Delivery</option><option>Meet-up</option></select>
        </label>
      </div>
      <label>{f.method === "Delivery" ? "Delivery address (street, barangay, landmark)" : "Preferred meet-up place and time"}
        <textarea required rows={2} value={f.address} onChange={set("address")} />
      </label>
      <label>Payment
        <select value={f.payment} onChange={set("payment")}><option>Cash on delivery / meet-up</option><option>GCash (we'll send details)</option></select>
      </label>
      <label>Notes (optional)<textarea rows={2} value={f.notes} onChange={set("notes")} /></label>
      <input type="text" name="_honey" value={f._honey} onChange={set("_honey")} tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />

      <div className="shop-total"><span>Total ({countOf(rows)} item{countOf(rows) === 1 ? "" : "s"})</span><b>{peso(total)}</b></div>
      {state.error && (
        <div className="shop-error" role="alert">{state.error} <button type="button" className="link-btn" onClick={mailFallback}>Email order via Gmail</button></div>
      )}
      <button className="btn btn-primary" type="submit" disabled={state.busy}><span>{state.busy ? "Sending…" : "Place Order"}</span><Icon name="arrow" size={16} /></button>
    </form>
  );
}

function DoneView({ done }) {
  return (
    <div className="shop-empty">
      <Icon name="check" size={38} />
      <h3>Order sent!</h3>
      <p>Order <b>{done.id}</b> · {peso(done.total)}</p>
      <p className="shop-note">Microbot will contact you by phone or text to confirm delivery/meet-up details. Keep your order number handy.</p>
      <button type="button" className="btn btn-outline" onClick={() => { shopUI.close(); shopUI.view("cart"); }}><span>Close</span></button>
    </div>
  );
}

export default function Shop() {
  const items = useCartItems();
  const { open, view } = useShopUI();
  const [done, setDone] = useState(null);
  const panel = useRef(null);
  const rows = detailed(items);
  const total = totalOf(items);

  useEffect(() => {
    if (!open) return;
    const k = (e) => { if (e.key === "Escape") shopUI.close(); };
    document.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    panel.current?.focus();
    return () => { document.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [open]);

  const title = view === "checkout" ? "Checkout" : view === "done" ? "Thank you" : "Your Cart";
  return (
    <div className={`shop-root ${open ? "is-open" : ""}`} aria-hidden={!open}>
      <div className="shop-scrim" onClick={() => shopUI.close()} />
      <aside className="shop-panel" role="dialog" aria-modal="true" aria-label={title} tabIndex={-1} ref={panel}>
        <header className="shop-head">
          <h2>{title}</h2>
          <button type="button" className="shop-x" aria-label="Close" onClick={() => shopUI.close()}>×</button>
        </header>
        <div className="shop-body">
          {view === "done" && done ? <DoneView done={done} />
            : view === "checkout" ? <CheckoutView rows={rows} total={total} onDone={(d) => { setDone(d); shopUI.view("done"); }} />
            : <CartView rows={rows} total={total} />}
        </div>
      </aside>
    </div>
  );
}
