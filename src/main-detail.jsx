import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/main.css";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Backdrop from "./components/Backdrop.jsx";
import ProductDetail from "./components/ProductDetail.jsx";

function App() {
  return (
    <>
      <Backdrop />
      <Header home={false} active="products" />
      <main className="detail-main">
        <section className="section detail-section" id="product-detail">
          <ProductDetail />
        </section>
      </main>
      <Footer home={false} />
    </>
  );
}

createRoot(document.getElementById("root")).render(<StrictMode><App /></StrictMode>);
