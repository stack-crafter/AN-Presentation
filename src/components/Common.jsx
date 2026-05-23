import { useState, useEffect, useRef } from "react";

/* ─── useInView hook ─── */
export function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ─── Reveal Animations ─── */
export function Reveal({ children, delay = 0, direction = "up", className = "" }) {
  const [ref, vis] = useInView();
  const getTransform = () => {
    if (direction === "up") return "translateY(32px)";
    if (direction === "left") return "translateX(-24px)";
    if (direction === "right") return "translateX(24px)";
    return "none";
  };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : getTransform(),
        transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Smooth Count-Up Ticker ─── */
export function CountUp({ to, suffix = "", duration = 2.0 }) {
  const [val, setVal] = useState(0);
  const [ref, vis] = useInView();
  useEffect(() => {
    if (!vis) return;
    let start = null;
    const isFloat = String(to).includes(".");
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / (duration * 1000), 1);
      // Cubic-out easing
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(isFloat ? (eased * to).toFixed(1) : Math.round(eased * to));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [vis, to, duration]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ─── Scroll Progress Bar ─── */
export function ProgressBar({ accent = "var(--accent-primary)" }) {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setPct(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 4, zIndex: 9999, background: "var(--border-subtle)" }}>
      <div style={{ height: "100%", width: `${pct}%`, background: accent, transition: "width 0.1s linear, background-color 0.4s ease" }} />
    </div>
  );
}

/* ─── Section Wrap ─── */
export function Section({ id, children, style = {} }) {
  return (
    <section id={id} style={{
      maxWidth: 1200, margin: "0 auto", padding: "120px 24px",
      borderTop: "1px solid var(--border-subtle)", position: "relative", ...style
    }}>
      {children}
    </section>
  );
}

/* ─── Section Chapter Title Header ─── */
export function ChapterLabel({ num, title, sub, colorClass = "gradient-text-indigo" }) {
  return (
    <Reveal>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 20, marginBottom: 48 }}>
        <div style={{
          width: 48, height: 48, borderRadius: 14, background: "var(--border-subtle)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "var(--text-primary)", fontSize: 16, fontWeight: 800, flexShrink: 0,
          border: "1px solid var(--border-active)"
        }}>{String(num).padStart(2, "0")}</div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 8 }}>
            {sub}
          </div>
          <h2 className={colorClass} style={{ fontSize: "clamp(26px, 4vw, 36px)", fontWeight: 800, letterSpacing: "-0.03em", margin: 0, lineHeight: 1.2 }}>
            {title}
          </h2>
        </div>
      </div>
    </Reveal>
  );
}

/* ─── Visual Quote Display ─── */
export function Quote({ text, author, role, accent = "var(--accent-primary)" }) {
  const [ref, vis] = useInView();
  return (
    <div ref={ref} style={{
      margin: "56px 0", padding: "36px 44px",
      borderLeft: `4px solid ${accent}`,
      background: "var(--bg-secondary)", borderRadius: "0 16px 16px 0",
      opacity: vis ? 1 : 0, transform: vis ? "none" : "translateX(-20px)",
      transition: "opacity 0.8s ease, transform 0.8s ease",
      borderTop: "1px solid var(--border-subtle)",
      borderRight: "1px solid var(--border-subtle)",
      borderBottom: "1px solid var(--border-subtle)",
      boxShadow: "var(--shadow-premium)"
    }}>
      <div style={{ fontSize: 44, color: "var(--text-muted)", fontFamily: "Georgia, serif", lineHeight: 0.1, marginTop: 12 }}>“</div>
      <p style={{ fontSize: "1.1rem", fontWeight: 500, fontStyle: "italic", color: "var(--text-primary)", lineHeight: 1.8, margin: "0 0 20px" }}>
        {text}
      </p>
      <div style={{ fontSize: 13, fontWeight: 700, color: accent, textTransform: "uppercase", letterSpacing: 1.5 }}>
        — {author}
      </div>
      <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4, fontWeight: 500 }}>{role}</div>
    </div>
  );
}

/* ─── Metric Stat Cards ─── */
export function StatCard({ value, suffix, label, accent = "var(--accent-primary)", delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <div className="glassmorphism card-hover" style={{
        padding: "32px 28px", borderRadius: 20,
        background: "var(--bg-card)", textAlign: "center",
        boxShadow: "var(--shadow-premium)",
        border: "1px solid var(--border-subtle)"
      }}>
        <div style={{ fontSize: 44, fontWeight: 800, color: accent, letterSpacing: -1.5, lineHeight: 1, marginBottom: 10 }}>
          <CountUp to={value} suffix={suffix} />
        </div>
        <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6, fontWeight: 500 }}>{label}</div>
      </div>
    </Reveal>
  );
}

/* ─── Detailed Info Cards with Hover ─── */
export function InfoCard({ icon, title, text, accent = "var(--accent-primary)", delay = 0 }) {
  const [hov, setHov] = useState(false);
  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        className="glassmorphism card-hover"
        style={{
          padding: "32px 28px", borderRadius: 20,
          background: hov ? "var(--bg-secondary)" : "var(--bg-card)",
          boxShadow: hov ? "var(--shadow-premium), 0 0 20px var(--shadow-glow)" : "var(--shadow-premium)",
          transform: hov ? "translateY(-6px)" : "none",
          border: `1.5px solid ${hov ? accent : "var(--border-subtle)"}`,
          cursor: "default"
        }}
      >
        <div style={{
          fontSize: 32, marginBottom: 18, width: 64, height: 64,
          borderRadius: 16, background: "var(--bg-tertiary)",
          display: "flex", alignItems: "center", justifyContent: "center",
          border: "1px solid var(--border-subtle)"
        }}>{icon}</div>
        <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 12, letterSpacing: -0.2 }}>{title}</div>
        <div style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.75 }}>{text}</div>
      </div>
    </Reveal>
  );
}

/* ─── Highlighting Accent Callouts ─── */
export function Callout({ label, text, accent = "var(--accent-primary)" }) {
  return (
    <Reveal>
      <div style={{
        margin: "40px 0", padding: "26px 32px",
        borderLeft: `4px solid ${accent}`,
        background: "var(--bg-secondary)", borderRadius: "0 16px 16px 0",
        borderTop: "1px solid var(--border-subtle)",
        borderRight: "1px solid var(--border-subtle)",
        borderBottom: "1px solid var(--border-subtle)"
      }}>
        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: accent, marginBottom: 10 }}>
          {label}
        </div>
        <div style={{ fontSize: "0.98rem", color: "var(--text-secondary)", lineHeight: 1.8 }}>{text}</div>
      </div>
    </Reveal>
  );
}

/* ─── Typography Paragraph Helper ─── */
export function P({ children, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <p style={{ fontSize: "1.08rem", color: "var(--text-secondary)", lineHeight: 1.85, marginBottom: 24, fontWeight: 400 }}>
        {children}
      </p>
    </Reveal>
  );
}

/* ─── Bold Text Helper ─── */
export function B({ children }) {
  return <strong style={{ color: "var(--text-primary)", fontWeight: 700 }}>{children}</strong>;
}
