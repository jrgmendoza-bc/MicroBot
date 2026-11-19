import { useSyncExternalStore } from "react";
import { PRODUCTS } from "../data/products.js";

/** Where order emails go (via FormSubmit, no server needed). */
export const ORDER_EMAIL = "microbot.ph@gmail.com";
export const SERVICE_AREAS = ["Baguio City", "La Trinidad, Benguet"];

const KEY = "microbot-cart-v1";
const MAX_QTY = 20;

export const priceOf = (p) => Number(String(p.priceText).replace(/[^\d.]/g, "")) || 0;
export const orderable = (p) => priceOf(p) > 0;
export const peso = (n) => "₱" + n.toLocaleString("en-PH", { minimumFractionDigits: 0, maximumFractionDigits: 2 });

function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY));
    if (!Array.isArray(raw)) return [];
    return raw.filter((i) => PRODUCTS.some((p) => p.id === i.id && orderable(p)) && i.qty > 0).map((i) => ({ id: i.id, qty: Math.min(MAX_QTY, i.qty | 0) }));
  } catch { return []; }
}

let items = load();
let ui = { open: false, view: "cart" }; // view: cart | checkout | done
const subs = new Set();
const emit = () => subs.forEach((f) => f());
const subscribe = (f) => { subs.add(f); return () => subs.delete(f); };
const persist = () => { try { localStorage.setItem(KEY, JSON.stringify(items)); } catch { /* storage blocked */ } emit(); };

export const cart = {
  add(id, qty = 1) {
    const found = items.find((i) => i.id === id);
    items = found
      ? items.map((i) => (i.id === id ? { ...i, qty: Math.min(MAX_QTY, i.qty + qty) } : i))
      : [...items, { id, qty: Math.min(MAX_QTY, qty) }];
    persist();
  },
  setQty(id, qty) {
    items = qty <= 0 ? items.filter((i) => i.id !== id) : items.map((i) => (i.id === id ? { ...i, qty: Math.min(MAX_QTY, qty) } : i));
    persist();
  },
  remove(id) { items = items.filter((i) => i.id !== id); persist(); },
  clear() { items = []; persist(); },
};

export const shopUI = {
  open(view = "cart") { ui = { open: true, view }; emit(); },
  view(view) { ui = { ...ui, view }; emit(); },
  close() { ui = { ...ui, open: false }; emit(); },
};

export const useCartItems = () => useSyncExternalStore(subscribe, () => items);
export const useShopUI = () => useSyncExternalStore(subscribe, () => ui);

export function detailed(list) {
  return list.map((i) => {
    const product = PRODUCTS.find((p) => p.id === i.id);
    return { ...i, product, unit: priceOf(product), line: priceOf(product) * i.qty };
  });
}
export const totalOf = (list) => detailed(list).reduce((s, i) => s + i.line, 0);
export const countOf = (list) => list.reduce((s, i) => s + i.qty, 0);

/** Buy-now = cart containing just this item, opened straight at checkout. */
export function buyNow(id) { cart.clear(); cart.add(id, 1); shopUI.open("checkout"); }
