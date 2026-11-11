import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/main.css";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import News from "./components/News.jsx";
import Products from "./components/Products.jsx";
import Showcase from "./components/Showcase.jsx";
import About from "./components/About.jsx";
import Footer from "./components/Footer.jsx";
import Backdrop from "./components/Backdrop.jsx";
import { useSectionSpy } from "./components/hooks.jsx";

const IDS = ["home", "news", "products", "showcase", "about", "contact"];

function App() {
  const [active, setActive] = useSectionSpy(IDS);
  const navActive = active === "showcase" ? "products" : active;
  return (
    <>
      <Backdrop />
      <Header active={navActive} onNavigate={setActive} />
      <main>
        <Hero />
        <News />
        <Products />
        <Showcase />
        <About />
      </main>
      <Footer />
    </>
  );
}

createRoot(document.getElementById("root")).render(<StrictMode><App /></StrictMode>);
