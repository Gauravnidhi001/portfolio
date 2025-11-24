import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./App.css";
import { Github, Linkedin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { label: "Home", to: "#home" },
  { label: "Projects", to: "#projects" },
  { label: "Favoured Literature", to: "#favoured-literature" },
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

const favouredLiterature = [
  {
    title: "The Little Prince",
    author: "Antoine de Saint-Exupéry",
    quote: "On ne voit bien qu'avec le cœur. L'essentiel est invisible pour les yeux.",
    review:
      "A concise, poetic meditation on childhood, imagination, and the small truths that anchor us. Its simplicity hides deep emotional clarity — a book I return to when I want perspective.",
  },
  {
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    quote: "Nothing in life is as important as you think it is, while you are thinking about it.",
    review:
      "An essential read on cognition and bias. It changed how I design interactions by making me question assumptions about user rationality and attention.",
  },
  {
    title: "On Minimalism",
    author: "Joshua Fields Millburn & Ryan Nicodemus",
    quote: "Minimalism is the intentional promotion of the things we most value and the removal of anything that distracts us from it.",
    review:
      "Practical and humane, this collection of essays helped shape my approach to design: remove noise, emphasize intent, and respect negative space.",
  },
];

function App() {
  const [theme, setTheme] = useState("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const sectionsRef = useRef([]);
  const nameRef = useRef(null);
  const formRef = useRef(null);
  const [formStatus, setFormStatus] = useState(null); // null | 'sending' | 'success' | 'error'

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
          <p className="nav-sub">Front-end developer • React • Next.js</p>
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
          <button
            type="button"
            className="menu-toggle"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
          >
            {menuOpen ? "Close" : "Menu"}
            <span />
          </button>
          <nav className={`menu-links ${menuOpen ? "open" : ""}`}>
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.to}
                onClick={() => setMenuOpen(false)}
              >
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
           
            <h1>Gaurav Nidhi — Veni. Vidi. Vici.</h1>
            <p className="lede">
              I&apos;m a Frontend Developer, Full-Stack in Progress.
              I build clean,responsive websites and I&apos;m currently mastering backend to become a complete full-stack developer.
            </p>
            <div className="hero-meta">
              <p>Always trying to learn something new</p>
              <p>React • Next.js • JavaScript • Always learning</p>
            </div>
          </section>

          <section className="section stories" id="stories" ref={addSectionRef}>
            <div className="section-heading">
              
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

          <section className="section literature" id="favoured-literature" ref={addSectionRef}>
            <div className="section-heading">
              <p>Favoured Literature</p>
              <h2>Books, quotes, and short reviews.</h2>
              <p className="section-note">A small library of works that shapes my thinking and craft.</p>
            </div>
            <div className="literature-grid">
              {favouredLiterature.map((book) => (
                <article key={book.title} className="book-card">
                  <div>
                    <h3>{book.title}</h3>
                    <p className="book-author">{book.author}</p>
                  </div>
                  <blockquote className="book-quote">“{book.quote}”</blockquote>
                  <p className="book-review">{book.review}</p>
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
            <form
              className="contact-form"
              ref={formRef}
              onSubmit={async (e) => {
                e.preventDefault();
                setFormStatus("sending");
                const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
                const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
                const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

                if (!serviceId || !templateId || !publicKey) {
                  setFormStatus("error");
                  console.error("EmailJS environment variables are not set.");
                  return;
                }

                try {
                  await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey);
                  setFormStatus("success");
                  formRef.current.reset();
                } catch (err) {
                  console.error("EmailJS send error:", err);
                  setFormStatus("error");
                }
              }}
            >
              <label>
                <span>Name</span>
                <input name="user_name" type="text" placeholder="Your name" required />
              </label>
              <label>
                <span>Email</span>
                <input name="user_email" type="email" placeholder="you@example.com" required />
              </label>
              <label>
                <span>Message</span>
                <textarea name="message" placeholder="How can we collaborate?" rows={4} required />
              </label>
              <button type="submit">Send</button>

              {formStatus === "sending" && <p className="form-message">Sending…</p>}
              {formStatus === "success" && <p className="form-message success">Message sent — thank you!</p>}
              {formStatus === "error" && <p className="form-message error">Failed to send. Please try again later.</p>}
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
