import { SERVICES, CONTACTS } from "../data/products.js";
import { Icon } from "./Icons.jsx";
import { Reveal, spotlight } from "./hooks.jsx";
import SectionHead from "./SectionHead.jsx";

export default function About() {
  return (
    <section id="about" className="section about-section">
      <SectionHead index="04" label="Company" title="About" />

      <div className="about-intro">
        <Reveal>
          <h3 className="about-subtitle">What we do:</h3>
          <p>At Microbot, we provide innovative electronics, robotics, and STEM learning solutions designed for students, hobbyists, makers, educators, and professionals.</p>
          <p>Our mission is to make technology education more accessible through hands-on learning experiences that inspire creativity, problem-solving, and innovation.</p>
        </Reveal>
        <Reveal delay={100}>
          <h3 className="about-subtitle">Our Commitment:</h3>
          <p>We believe that the best way to learn technology is by building it. That's why we focus on products that allow users to assemble, program, test, and understand how modern electronics work from the ground up.</p>
          <p>Whether you're building your first circuit, developing a robotics project, or creating your next innovation, Microbot is here to support your journey.</p>
        </Reveal>
      </div>

      <div className="what-we-do-grid" aria-label="What we do services">
        {SERVICES.map((s, i) => (
          <Reveal as="article" key={s.title} delay={i * 70} className="what-we-do-card" onPointerMove={spotlight}>
            <span className="card-icon"><Icon name={s.icon} size={26} /></span>
            <span className="card-index">0{i + 1}</span>
            <h3 className="what-we-do-title">{s.title}</h3>
            <p className="what-we-do-copy">{s.copy}</p>
          </Reveal>
        ))}
      </div>

      <Reveal className="tagline">
        <h2>Build. <span>Learn.</span> Innovate.</h2>
      </Reveal>

      <div id="contact" className="contact-block">
        <Reveal>
          <h3 className="about-subtitle">Contact us:</h3>
          <p>We'd Love to Hear From You. </p>
          <p>Whether you have questions about our products, need technical support, or are looking for recommendations for your next electronics project, we're here to help</p>
        </Reveal>
        <div className="what-we-do-grid contact-grid" aria-label="Contact options">
          {CONTACTS.map((c, i) => (
            <Reveal as="a" key={c.title} delay={i * 70} href={c.href} className="what-we-do-card contact-card" target="_blank" rel="noopener" onPointerMove={spotlight}>
              <span className="card-icon"><Icon name={c.icon} size={26} /></span>
              <span className="card-arrow"><Icon name="arrow-ur" size={20} /></span>
              <h3 className="what-we-do-title">{c.title}</h3>
              <p className="what-we-do-copy">{c.copy}</p>
              <span className="handle">{c.handle}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
