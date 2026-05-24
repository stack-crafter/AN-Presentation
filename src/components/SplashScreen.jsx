import { useEffect, useRef, useState } from "react";
import { Play, Users, Cpu } from "lucide-react";

export default function SplashScreen({ onStart, theme }) {
  const canvasRef = useRef(null);
  const [exiting, setExiting] = useState(false);

  // Floating background particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Mutable dimensions updated on every resize
    let W = window.innerWidth;
    let H = window.innerHeight;

    const setSize = () => {
      if (!canvas) return;
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0); // reset before re-scaling
      ctx.scale(dpr, dpr);
    };

    setSize();

    // Scale particle count with width
    const particleCount = Math.min(Math.floor(W / 12), 100);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      r: Math.random() * 2 + 1,
      opacity: Math.random() * 0.6 + 0.4
    }));

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // White Lines connecting particles
      const linkDist = 120;
      particles.forEach((a, i) => {
        particles.forEach((b, j) => {
          if (j <= i) return;
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < linkDist) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            const alpha = (1 - d / linkDist) * 0.08;
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        });
      });

      // Pure White Nodes
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      if (canvas) setSize();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleStart = () => {
    setExiting(true);
    setTimeout(() => {
      onStart();
    }, 850); // Match transition duration
  };

  const members = [
    { n: 1, name: "Muhammad Moiz", topic: "Traffic & Routing", color: "var(--accent-member-1)" },
    { n: 2, name: "Muhammad Ahtisham", topic: "Intrusion Detection", color: "var(--accent-member-2)" },
    { n: 3, name: "Ahmad Bin Javed", topic: "Self-Healing & SON", color: "var(--accent-member-3)" },
    { n: 4, name: "Eman Shahid", topic: "Predictive Scaling", color: "var(--accent-member-4)" },
  ];

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 9999,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",  /* Don't center — let content start at top so it's never clipped */
      background: "linear-gradient(135deg, #02050a 0%, #050d15 100%)",
      overflowY: "auto",             /* Scrollable when content taller than viewport */
      overflowX: "hidden",
      WebkitOverflowScrolling: "touch", /* Smooth momentum scrolling on iOS */
      padding: "60px 16px",          /* Breathing room on all sides */
      transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
      transform: exiting ? "translateY(-100%) scale(0.98)" : "translateY(0) scale(1)",
      opacity: exiting ? 0 : 1
    }}>
      {/* Dynamic Background Network Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0
        }}
      />

      {/* Decorative Grid BG Overlay */}
      <div style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(0, 255, 135, 0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 135, 0.015) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        opacity: 0.8,
        zIndex: 1
      }} />

      {/* Main Content Layout — auto margins center it vertically on tall screens */}
      <div style={{
        position: "relative",
        zIndex: 10,
        maxWidth: 1000,
        width: "100%",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 40,
        margin: "auto 0"  /* Pushes content to vertical center on large screens */
      }}>
        {/* Badge header */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          background: "rgba(0, 255, 135, 0.05)",
          border: "1px solid rgba(0, 255, 135, 0.25)",
          borderRadius: 100,
          padding: "8px 24px",
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: 2,
          textTransform: "uppercase",
          color: "var(--accent-primary)",
          boxShadow: "0 0 15px rgba(0, 255, 135, 0.1)"
        }}>
          <Cpu size={14} style={{ color: "var(--accent-primary)", animation: "pulse-ring 2.5s infinite" }} />
          <span>Advanced Research Seminar</span>
        </div>

        {/* Large Premium Typography Title */}
        <div>
          <h1 style={{
            fontSize: "clamp(34px, 5vw, 64px)",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            lineHeight: 1.15,
            color: "#ffffff",
            marginBottom: 20
          }}>
            Artificial Intelligence <br />
            <span style={{
              background: "linear-gradient(135deg, #00ff87 0%, #00e5ff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block"
            }}>
              in Computer Networks
            </span>
          </h1>
          <p style={{
            fontSize: "clamp(15px, 2vw, 19px)",
            color: "var(--text-secondary)",
            maxWidth: 680,
            margin: "0 auto",
            lineHeight: 1.7
          }}>
            An exhaustive analysis of telemetry-driven congestion mapping, automated self-healing, predictive auto-scaling, and active intelligence security matrices.
          </p>
        </div>

        {/* Interactive Presenters Section Grid */}
        <div style={{ width: "100%", marginTop: 12 }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            color: "var(--text-muted)",
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: 2.5,
            textTransform: "uppercase",
            marginBottom: 20
          }}>
            <Users size={14} style={{ color: "var(--accent-primary)" }} />
            <span>Research Authors</span>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 16,
            width: "100%"
          }}>
            {members.map((m) => (
              <div
                key={m.n}
                className="glassmorphism card-hover"
                style={{
                  padding: "24px 20px",
                  borderRadius: 20,
                  background: "rgba(5, 13, 21, 0.6)",
                  border: "1px solid var(--border-subtle)",
                  textAlign: "center"
                }}
              >
                <div style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  background: m.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#02050a",
                  fontSize: 13,
                  fontWeight: 900,
                  margin: "0 auto 12px",
                  border: "2px solid rgba(255,255,255,0.2)"
                }}>
                  {m.n}
                </div>
                <div style={{
                  fontSize: 14,
                  fontWeight: 800,
                  color: "#ffffff",
                  marginBottom: 4
                }}>
                  {m.name}
                </div>
                <div style={{
                  fontSize: 11,
                  color: "var(--accent-primary)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: 0.5
                }}>
                  {m.topic}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pulsing Neon Action Button */}
        <button
          onClick={handleStart}
          style={{
            marginTop: 24,
            padding: "20px 48px",
            borderRadius: 100,
            border: "1px solid #00ff87",
            background: "linear-gradient(135deg, #00ff87 0%, #10b981 100%)",
            color: "#02050a",
            fontSize: 16,
            fontWeight: 800,
            letterSpacing: 1.5,
            textTransform: "uppercase",
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            cursor: "pointer",
            boxShadow: "0 0 20px rgba(0, 255, 135, 0.45), 0 0 40px rgba(0, 255, 135, 0.2)",
            transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = "scale(1.05) translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 0 35px rgba(0, 255, 135, 0.8), 0 0 60px rgba(0, 255, 135, 0.4)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = "scale(1) translateY(0)";
            e.currentTarget.style.boxShadow = "0 0 20px rgba(0, 255, 135, 0.45), 0 0 40px rgba(0, 255, 135, 0.2)";
          }}
        >
          <Play size={16} fill="#02050a" stroke="none" />
          <span>Launch Presentation</span>
        </button>
      </div>
    </div>
  );
}
