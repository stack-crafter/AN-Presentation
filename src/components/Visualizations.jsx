import { useState, useEffect, useRef } from "react";
import { Reveal, B, useInView } from "./Common";
import { Activity, Cpu, ShieldCheck, Zap, Server, ChevronRight, AlertTriangle, Shield, RefreshCw, Clock } from "lucide-react";

/* ─── Infinite Loop Backdrop Particle Matrix ─── */
export function NetworkCanvas({ height = 250, isDark = true }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const setSize = () => {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    setSize();
    const W = canvas.offsetWidth;
    const H = height;

    const count = Math.min(Math.floor(W / 15), 65);
    const pts = Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      r: Math.random() * 1.5 + 1.2
    }));

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Update coords
      pts.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      });

      // Draw links
      const connectionDist = 110;
      pts.forEach((a, i) => {
        pts.forEach((b, j) => {
          if (j <= i) return;
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < connectionDist) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            const opacity = (1 - d / connectionDist) * 0.08;
            ctx.strokeStyle = isDark ? `rgba(0, 255, 135, ${opacity})` : `rgba(16, 185, 129, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        });
      });

      // Draw nodes
      pts.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? `rgba(0, 255, 135, 0.45)` : `rgba(16, 185, 129, 0.45)`;
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
  }, [height, isDark]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: "block",
        width: "100%",
        height,
        borderRadius: 24,
        background: "var(--bg-secondary)",
        border: "1px solid var(--border-subtle)",
        boxShadow: "var(--shadow-premium)"
      }}
    />
  );
}

/* ─── Sequential Telemetry Flow ─── */
export function TrafficFlowchart() {
  const [ref, vis] = useInView(0.2);
  const steps = [
    { icon: <Activity style={{ color: "#3b82f6" }} />, label: "Network Sensors", sub: "Collect live telemetry streams", color: "var(--bg-tertiary)" },
    { icon: <Cpu style={{ color: "#a855f7" }} />, label: "AI Model (LSTM)", sub: "Forecast prospective traffic spikes", color: "var(--bg-tertiary)" },
    { icon: <Zap style={{ color: "#eab308" }} />, label: "Route Optimizer", sub: "Compile shortest delay pathways", color: "var(--bg-tertiary)" },
    { icon: <Server style={{ color: "#ef4444" }} />, label: "SDN Controller", sub: "Inject telemetry routing adjustments", color: "var(--bg-tertiary)" },
    { icon: <ShieldCheck style={{ color: "#10b981" }} />, label: "Optimized Node", sub: "Mitigate dynamic bottlenecking", color: "var(--bg-tertiary)" },
  ];

  return (
    <div ref={ref} style={{ margin: "48px 0" }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 24 }}>
        Predictive Traffic Engineering Pipeline
      </div>
      <div style={{ display: "flex", alignItems: "stretch", gap: 16, overflowX: "auto", paddingBottom: 16, width: "100%" }}>
        {steps.map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", flex: 1, minWidth: 200 }}>
            <div className="glassmorphism card-hover" style={{
              flex: 1, padding: "24px 20px", borderRadius: 20, background: "var(--bg-card)",
              border: "1px solid var(--border-subtle)", textAlign: "center",
              opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(24px)",
              transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.12}s`,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"
            }}>
              <div style={{
                width: 54, height: 54, borderRadius: 14, background: "var(--bg-tertiary)",
                display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14,
                border: "1px solid var(--border-subtle)"
              }}>{s.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.3, marginBottom: 6 }}>{s.label}</div>
              <div style={{ fontSize: 11.5, color: "var(--text-secondary)", lineHeight: 1.5 }}>{s.sub}</div>
            </div>
            {i < steps.length - 1 && (
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "center", padding: "0 8px",
                opacity: vis ? 1 : 0, transition: `opacity 0.4s ease ${i * 0.12 + 0.3}s`
              }}>
                <ChevronRight size={20} style={{ color: "var(--text-muted)" }} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── IDS Detection Pipeline ─── */
export function IDSFlowchart() {
  const [ref, vis] = useInView(0.2);
  const rows = [
    {
      label: "Signature-Based IDS",
      items: [
        {
          label: "Known Attack Detection",
          desc: "Detects attacks by matching known signatures or patterns."
        },
        {
          label: "Fast & Accurate",
          desc: "Works very efficiently against previously identified threats."
        },
        {
          label: "Limitation",
          desc: "Cannot detect new or unknown attacks."
        }
      ],
      badgeColor: "var(--accent-member-2)",
    },

    {
      label: "Anomaly-Based IDS",
      items: [
        {
          label: "Learns Normal Behavior",
          desc: "Studies regular network activity and user behavior."
        },
        {
          label: "Detects Unusual Activity",
          desc: "Flags traffic that differs from normal patterns."
        },
        {
          label: "Finds New Attacks",
          desc: "Can identify zero-day and previously unseen threats."
        }
      ],
      badgeColor: "#a855f7",
    },

    {
      label: "Hybrid IDS",
      items: [
        {
          label: "Combines Both Methods",
          desc: "Uses signature and anomaly detection together."
        },
        {
          label: "Higher Accuracy",
          desc: "Detects both known and unknown cyber attacks."
        },
        {
          label: "Better Security",
          desc: "Provides stronger protection with fewer missed threats."
        }
      ],
      badgeColor: "var(--accent-member-5)",
    },
  ];

  return (
    <div ref={ref} style={{ margin: "48px 0" }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 24 }}>
        Types of Intrusion Detection Systems (IDS)
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {rows.map((row, ri) => (
          <div key={ri} className="ids-row">
            <div style={{
              width: 180, padding: "20px 24px", background: "var(--bg-tertiary)", borderRadius: 16,
              display: "flex", alignItems: "center", justifyContent: "center",
              border: "1px solid var(--border-subtle)",
              opacity: vis ? 1 : 0, transform: vis ? "none" : "translateX(-20px)",
              transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${ri * 0.15}s`,
            }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: "var(--text-primary)", letterSpacing: 0.5, textAlign: "center" }}>{row.label}</span>
            </div>
            <div className="ids-items-container">
              {row.items.map((item, ii) => (
                <div key={ii} className="glassmorphism card-hover" style={{
                  flex: 1, padding: "18px 20px", background: "var(--bg-card)",
                  borderRadius: 16, border: "1px solid var(--border-subtle)",
                  display: "flex", flexDirection: "column", justifyContent: "center",
                  opacity: vis ? 1 : 0, transform: vis ? "none" : "translateX(20px)",
                  transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${ri * 0.15 + ii * 0.08}s`,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: row.badgeColor }} />
                    <span style={{ fontSize: 13.5, color: "var(--text-primary)", fontWeight: 700 }}>{item.label}</span>
                  </div>
                  <span style={{ fontSize: 11.5, color: "var(--text-secondary)", lineHeight: 1.4 }}>{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Self-Healing State Cycle ─── */
export function HealingLoop() {
  const [ref, vis] = useInView(0.2);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (!vis) return;
    const t = setInterval(() => setActiveStep(s => (s + 1) % 4), 2200);
    return () => clearInterval(t);
  }, [vis]);

  const steps = [
    { label: "01. MONITOR & DETECT", icon: <Activity size={24} />, desc: "AI localizes anomalous node drops", activeColor: "var(--accent-member-1)" },
    { label: "02. LOCAL DIAGNOSTICS", icon: <Cpu size={24} />, desc: "Digital twin isolates root vectors", activeColor: "var(--accent-member-2)" },
    { label: "03. ADAPTIVE HEALING", icon: <RefreshCw size={24} />, desc: "Injects dynamic configuration fix", activeColor: "var(--accent-member-3)" },
    { label: "04. VERIFY METRICS", icon: <ShieldCheck size={24} />, desc: "Confirms automated operational health", activeColor: "var(--accent-member-4)" },
  ];

  return (
    <div ref={ref} style={{ margin: "56px 0" }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 28 }}>
        Autonomic Closed-Loop Healing Cycle
      </div>
      <div className="healing-container">
        {steps.map((s, i) => {
          const isActive = activeStep === i;
          return (
            <div key={i} className="healing-card-wrapper">
              <div className="glassmorphism" style={{
                width: 220, padding: "28px 20px", borderRadius: 20, textAlign: "center",
                background: isActive ? s.activeColor : "var(--bg-card)",
                border: `1.5px solid ${isActive ? s.activeColor : "var(--border-subtle)"}`,
                transform: isActive ? "scale(1.04) translateY(-4px)" : "scale(1)",
                boxShadow: isActive ? `0 12px 30px ${s.activeColor}33` : "var(--shadow-premium)",
                transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                opacity: vis ? 1 : 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}>
                <div style={{
                  width: 50, height: 50, borderRadius: 14,
                  background: isActive ? "rgba(255,255,255,0.2)" : "var(--bg-tertiary)",
                  color: isActive ? "#fff" : "var(--text-primary)",
                  display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14,
                  border: "1px solid var(--border-subtle)"
                }}>{s.icon}</div>
                <div style={{ fontSize: 11.5, fontWeight: 800, color: isActive ? "#fff" : "var(--text-primary)", letterSpacing: 1, marginBottom: 6 }}>
                  {s.label}
                </div>
                <div style={{ fontSize: 11, color: isActive ? "rgba(255,255,255,0.9)" : "var(--text-secondary)", lineHeight: 1.4 }}>
                  {s.desc}
                </div>
              </div>
              {i < steps.length - 1 && (
                <div
                  className="healing-arrow"
                  style={{ color: isActive ? "var(--text-primary)" : "var(--text-muted)" }}
                >→</div>
              )}
            </div>
          );
        })}
      </div>
      <div style={{ textAlign: "center", marginTop: 24, fontSize: 13, color: "var(--text-muted)", fontStyle: "italic", fontWeight: 500 }}>
        ⚡ Loops recursively on microsecond intervals to establish true autonomic reliability.
      </div>
    </div>
  );
}

/* ─── Multi-Tier Attack Vectors ─── */
export function AttackDiagram() {
  const [ref, vis] = useInView(0.15);
  const attacks = [
    {
      name: "Data Poisoning",
      icon: <AlertTriangle style={{ color: "var(--accent-member-5)" }} />,
      what: "Infect ML training samples with toxic profiles",
      result: "AI accepts adversarial samples as verified network operations",
      themeColor: "var(--accent-member-5)"
    },
    {
      name: "Prompt Injection",
      icon: <AlertTriangle style={{ color: "#f59e0b" }} />,
      what: "Conceal control scripts inside trusted network telemetry fields",
      result: "Assistant executes unauthorized node configuration changes",
      themeColor: "#f59e0b"
    },
    {
      name: "System Jailbreaking",
      icon: <AlertTriangle style={{ color: "#a855f7" }} />,
      what: "Bypass verification controls using semantic tricks",
      result: "Policy layer leaks routing coordinates & keys",
      themeColor: "#a855f7"
    },
    {
      name: "Adversarial Packets",
      icon: <AlertTriangle style={{ color: "#3b82f6" }} />,
      what: "Obfuscate telemetry logs (< 1% signature shift)",
      result: "Active firewall fails to isolate malicious operations",
      themeColor: "#3b82f6"
    },
  ];

  return (
    <div ref={ref} style={{ margin: "48px 0" }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 24 }}>
        Vulnerabilities In Autonomous Systems
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20 }}>
        {attacks.map((a, i) => (
          <div key={i} className="glassmorphism card-hover" style={{
            padding: "28px", borderRadius: 20, background: "var(--bg-card)",
            border: `1.5px solid var(--border-subtle)`,
            opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(24px)",
            transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.1}s`,
            display: "flex", flexDirection: "column", justifyContent: "space-between"
          }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 10, background: `${a.themeColor}15`,
                  display: "flex", alignItems: "center", justifyContent: "center"
                }}>{a.icon}</div>
                <span style={{ fontSize: 15, fontWeight: 800, color: "var(--text-primary)" }}>{a.name}</span>
              </div>
              <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 14 }}>
                <B>Modality:</B> {a.what}
              </div>
            </div>
            <div style={{
              fontSize: 12.5, color: "#fff", background: a.themeColor,
              padding: "10px 14px", borderRadius: 12, lineHeight: 1.5,
              fontWeight: 600, border: `1px solid rgba(255,255,255,0.15)`
            }}>
              🚨 Outcome: {a.result}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Animated Vertical Bar Charts ─── */
export function BarChart({ title, bars, height = 220 }) {
  const [ref, vis] = useInView(0.2);
  const max = Math.max(...bars.map(b => b.value));

  return (
    <div ref={ref} style={{ margin: "48px 0" }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)", marginBottom: 28, letterSpacing: -0.2 }}>{title}</div>
      <div className="bar-chart-container" style={{ height }}>
        {bars.map((b, i) => (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", height: "100%" }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: b.color || "var(--accent-primary)", marginBottom: 8 }}>
              {b.label2 || ""}
            </div>
            <div style={{ flex: 1, width: "100%", display: "flex", alignItems: "flex-end" }}>
              <div style={{
                width: "100%",
                height: vis ? `${(b.value / max) * 100}%` : "0%",
                background: b.color || "var(--accent-primary)",
                borderRadius: "10px 10px 0 0",
                transition: `height 1.1s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.12}s`,
                display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: 10,
                boxShadow: `0 4px 15px ${b.color}20`
              }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: "#fff" }}>{b.value}{b.unit || "%"}</span>
              </div>
            </div>
            <div style={{ fontSize: 11.5, fontWeight: 600, color: "var(--text-secondary)", marginTop: 12, textAlign: "center", lineHeight: 1.4, whiteSpace: "pre-line" }}>{b.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Presenter Introductory Banner ─── */
export function StudentBadge({ num, name, topic, colorClass = "gradient-text-indigo", accent = "var(--accent-member-1)" }) {
  return (
    <Reveal>
      <div className="glassmorphism animate-float student-badge">
        <div style={{
          width: 56, height: 56, borderRadius: "50%", background: accent,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#fff", fontSize: 18, fontWeight: 800, flexShrink: 0,
          border: "2px solid rgba(255,255,255,0.25)"
        }}>S{num}</div>
        <div>
          <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 4 }}>
            Presenter {num} · Core Topic
          </div>
          <div style={{ fontSize: 18, fontWeight: 800, color: "var(--text-primary)" }}>{name}</div>
          <div style={{ fontSize: 13.5, color: "var(--text-secondary)", marginTop: 2, fontWeight: 500 }}>
            Session Scope: <span className={colorClass} style={{ fontWeight: 700 }}>{topic}</span>
          </div>
        </div>
        <div className="student-badge-time">
          <Clock size={12} style={{ color: "var(--accent-primary)" }} />
          <span>Est: 4-5 min</span>
        </div>
      </div>
    </Reveal>
  );
}
