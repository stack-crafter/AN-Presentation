import { useState, useEffect } from "react";
import { Sun, Moon, ShieldCheck } from "lucide-react";

export default function Header({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Scrollspy & border shadow adjustments
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Section check offset for scrolling highlight
      const sections = ["traffic", "intrusion", "healing", "scaling", "threats"];
      const scrollPos = window.scrollY + 250; 

      for (let i = 0; i < sections.length; i++) {
        const id = sections[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            return;
          }
        }
      }
      
      // Fallback
      if (window.scrollY < 300) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { id: "traffic", label: "M1: Traffic" },
    { id: "intrusion", label: "M2: Intrusion" },
    { id: "healing", label: "M3: Healing" },
    { id: "scaling", label: "M4: Scaling" },
  ];

  const handleSmoothScroll = (e, id) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      const offset = 80; // height of the sticky nav
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = target.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <header className={`main-header${scrolled ? " scrolled" : ""}`}>
      {/* Branding */}
      <a href="#hero" onClick={(e) => handleSmoothScroll(e, "hero")} className="header-logo">
        <div style={{
          width: 38,
          height: 38,
          borderRadius: 10,
          background: "linear-gradient(135deg, var(--accent-member-1), var(--accent-member-4))",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          boxShadow: "0 4px 12px var(--shadow-glow)",
          flexShrink: 0
        }}>
          <ShieldCheck size={20} />
        </div>
        <span className="header-logo-text">AI Networks</span>
      </a>

      {/* Glass Navigation Items */}
      <nav
        className="nav-container"
        style={{
          background: scrolled
            ? "rgba(var(--accent-primary-rgb), 0.03)"
            : "rgba(255, 255, 255, 0.05)"
        }}
      >
        {links.map((link) => {
          const isActive = activeSection === link.id;
          return (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleSmoothScroll(e, link.id)}
              style={{
                fontSize: 12.5,
                fontWeight: isActive ? 700 : 500,
                color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                textDecoration: "none",
                padding: "8px 16px",
                borderRadius: 10,
                whiteSpace: "nowrap",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                background: isActive ? "var(--bg-primary)" : "transparent",
                border: `1px solid ${isActive ? "var(--border-subtle)" : "transparent"}`,
                boxShadow: isActive ? "var(--shadow-premium)" : "none"
              }}
            >
              {link.label}
            </a>
          );
        })}
      </nav>

      {/* Theme Control Trigger */}
      <button
        onClick={toggleTheme}
        aria-label="Toggle visual theme"
        style={{
          width: 42,
          height: 42,
          borderRadius: 12,
          border: "1px solid var(--border-subtle)",
          background: "var(--bg-card)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "var(--text-primary)",
          boxShadow: "var(--shadow-premium)",
          flexShrink: 0,
          transition: "transform 0.4s ease, border-color 0.3s ease"
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = "var(--border-active)";
          e.currentTarget.style.transform = "rotate(30deg) scale(1.05)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = "var(--border-subtle)";
          e.currentTarget.style.transform = "rotate(0deg) scale(1)";
        }}
      >
        {theme === "dark" ? (
          <Sun size={18} style={{ color: "#f59e0b", fill: "#f59e0b" }} />
        ) : (
          <Moon size={18} style={{ color: "#4f46e5" }} />
        )}
      </button>
    </header>
  );
}
