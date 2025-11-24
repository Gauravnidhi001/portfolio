import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./App.css";
import { Github, Linkedin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { label: "Home", to: "#home" },
  { label: "Projects", to: "#projects" },
  { label: "Contact", to: "#contact" },
];

const storytelling = [
  {
    title: "B.Tech in CS / IT",
    copy: "Studying at Ajeenkya DY Patil University with a focus on crafting interfaces and understanding full-stack systems.",
  },
  {
    title: "Front-end developer",
    copy: "Comfortable building responsive layouts with HTML, CSS, and vanilla JavaScript while experimenting with motion.",
  },
  {
    title: "Road to full stack",
    copy: "Backend practice starts soon; every project is documented so growth from beginner to full-stack dev stays visible.",
  },
];

const projects = [
  {
    title: "Project slots reserved",
    status: "Coming soon",
    summary: "Live case studies will be published here as soon as current builds reach polish.",
  },
  {
    title: "Repository pipeline",
    status: "In progress",
    summary: "Tracking experiments on GitHub (@gauravnidhi001) before turning them into showcase pieces.",
  },
];

const examples = [
  "Architect studios that showcase blueprints with ample negative space.",
  "Fashion houses presenting look-books like museum placards.",
  "Music collectives with editorial spreads, monochrome photography, and slow-scroll reveals.",
];

function App() {
  const [theme, setTheme] = useState("dark");
  const sectionsRef = useRef([]);
  const nameRef = useRef(null);

  const addSectionRef = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".menu a", {
        y: 12,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.05,
      });

      if (nameRef.current) {
        gsap.fromTo(
          nameRef.current,
          { opacity: 0, y: 30, letterSpacing: "0.4em", filter: "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            letterSpacing: "-0.02em",
            filter: "blur(0px)",
            duration: 1.25,
            ease: "power4.out",
          }
        );

        gsap.to(nameRef.current, {
          duration: 2.2,
          textShadow: "0 0 18px rgba(255, 255, 255, 0.35)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("section-visible");
          } else {
            entry.target.classList.remove("section-visible");
          }
        });
      },
      { threshold: 0.35 }
    );

    sectionsRef.current.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="page minimal">
      <header className="top-nav">
        <div>
          <p className="eyebrow">Portfolio</p>
          <h1 className="nav-title">
            <span ref={nameRef} className="name-highlight">
              Gaurav Nidhi
            </span>
          </h1>
          <p className="nav-sub">Front-end developer • HTML • CSS • JavaScript</p>
        </div>
        <div className="nav-actions">
          <a
            href="https://github.com/gauravnidhi001"
            target="_blank"
            rel="noreferrer"
            aria-label="Gaurav Nidhi GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/gaurav-nidhi-013b29381?utm_source=share_via&utm_content=profile&utm_medium=member_android"
            target="_blank"
            rel="noreferrer"
            aria-label="Gaurav Nidhi LinkedIn"
          >
            <Linkedin size={18} />
          </a>
        </div>
      </header>

      <div className="layout">
        <aside className="menu">
          <p className="menu-label">Index</p>
          <nav>
            {navItems.map((item) => (
              <a key={item.label} href={item.to}>
                {item.label}
              </a>
            ))}
          </nav>
          <button
            type="button"
            className="theme-toggle"
            onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
          >
            {theme === "dark" ? "Light Surface" : "Dark Surface"}
          </button>
        </aside>

        <main className="content">
          <section className="section hero" id="home" ref={addSectionRef}>
            <p className="eyebrow">Dark portfolio & minimalist tone</p>
            <h1>Gaurav Nidhi — when less is more.</h1>
            <p className="lede">
              I&apos;m a basic web developer with an obsessive love for HTML, CSS, and
              JavaScript. Minimalist layouts help me ship focused stories: fewer
              elements, more intent, stronger contrast.
            </p>
            <div className="hero-meta">
              <p>10 rules of digital storytelling</p>
              <p>HTML • CSS • JavaScript • Always learning</p>
            </div>
          </section>

          <section className="section stories" id="stories" ref={addSectionRef}>
            <div className="section-heading">
              <p>Music & dance of whitespace</p>
              <h2>Minimalism in practice.</h2>
            </div>
            <div className="story-columns">
              {storytelling.map((item) => (
                <article key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
            <div className="examples">
              <p className="eyebrow">Examples</p>
              <ul>
                {examples.map((example) => (
                  <li key={example}>{example}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className="section projects" id="projects" ref={addSectionRef}>
            <div className="section-heading">
              <p>Projects</p>
              <h2>Case studies under construction.</h2>
              <p className="section-note">
                Build logs are active, but full visual breakdowns will appear here soon.
              </p>
            </div>
            <div className="project-grid">
              {projects.map((project) => (
                <article key={project.title} className="project-card">
                  <div className="project-status">{project.status}</div>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="section contact" id="contact" ref={addSectionRef}>
            <div className="section-heading">
              <p>Director & theater company</p>
              <h2>Available for future scenes.</h2>
            </div>
            <div className="contact-block">
              <div>
                <p className="eyebrow">Mail</p>
                <a href="mailto:gaurav.nidhi.2006@gmail.com">gaurav.nidhi.2006@gmail.com</a>
              </div>
              <div>
                <p className="eyebrow">Phone</p>
                <p>+91 93865 83011</p>
              </div>
              <div>
                <p className="eyebrow">GitHub</p>
                <a href="https://github.com/gauravnidhi001" target="_blank" rel="noreferrer">
                  @gauravnidhi001
                </a>
              </div>
              <div>
                <p className="eyebrow">LinkedIn</p>
                <a
                  href="https://www.linkedin.com/in/gaurav-nidhi-013b29381?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                  target="_blank"
                  rel="noreferrer"
                >
                  Profile
                </a>
              </div>
            </div>
            <form className="contact-form">
              <label>
                <span>Name</span>
                <input type="text" placeholder="Your name" />
              </label>
              <label>
                <span>Email</span>
                <input type="email" placeholder="you@example.com" />
              </label>
              <label>
                <span>Message</span>
                <textarea placeholder="How can we collaborate?" rows={4} />
              </label>
              <button type="submit">Send</button>
            </form>
          </section>
        </main>
      </div>

      <footer className="footer">
        <p>Minimal stage © {new Date().getFullYear()}</p>
        <p>Built with React 19, GSAP, and purposeful whitespace.</p>
      </footer>
    </div>
  );
}

export default App;
