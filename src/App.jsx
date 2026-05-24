import { useState, useEffect } from "react";
import Header from "./components/Header";
import SplashScreen from "./components/SplashScreen";
import {
  ProgressBar,
  Section,
  ChapterLabel,
  Quote,
  StatCard,
  InfoCard,
  Callout,
  P,
  B,
  Reveal
} from "./components/Common";
import {
  NetworkCanvas,
  TrafficFlowchart,
  IDSFlowchart,
  HealingLoop,
  AttackDiagram,
  BarChart,
  StudentBadge
} from "./components/Visualizations";
import {
  Activity,
  Cpu,
  ShieldCheck,
  TrendingUp,
  Skull,
  Terminal,
  Fingerprint,
  ShieldAlert,
  Sliders,
  Eye,
  Lock,
  Database,
  BookOpen,
  ChevronsUp,
  RefreshCw
} from "lucide-react";

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [showSplash, setShowSplash] = useState(true);

  // Set the CSS theme parameter on mount and changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(t => (t === "dark" ? "light" : "dark"));
  };

  if (showSplash) {
    return <SplashScreen theme={theme} onStart={() => setShowSplash(false)} />;
  }

  return (
    <div style={{
      background: "var(--bg-primary)",
      color: "var(--text-primary)",
      minHeight: "100vh",
      fontFamily: "var(--font-sans)",
      transition: "background-color 0.4s ease, color 0.4s ease"
    }}>
      {/* Visual top bar tracking presentation scroll progression */}
      <ProgressBar accent="var(--accent-primary)" />

      {/* sticky navigation header */}
      <Header theme={theme} toggleTheme={toggleTheme} />

      {/* ═══════════════════════════ HERO / HOME ═══════════════════════════ */}
      <div id="hero" style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "120px 24px 80px", textAlign: "center",
        background: "var(--bg-primary)", position: "relative", overflow: "hidden",
        borderBottom: "1px solid var(--border-subtle)"
      }}>
        {/* Subtle Background Neural Particle Matrix */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.35, zIndex: 0 }}>
          <NetworkCanvas height={600} isDark={theme === "dark"} />
        </div>

        {/* Decorative Grid BG Overlay */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "linear-gradient(rgba(0, 255, 135, 0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 135, 0.015) 1px, transparent 1px)",
          backgroundSize: "48px 48px", opacity: 0.6, zIndex: 1
        }} />

        <div style={{ position: "relative", zIndex: 10, maxWidth: 880 }}>
          <Reveal>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(0, 255, 135, 0.05)", border: "1px solid rgba(0, 255, 135, 0.25)", borderRadius: 100,
              padding: "8px 20px", fontSize: 11, fontWeight: 700, letterSpacing: 1.5,
              textTransform: "uppercase", color: "var(--accent-primary)", marginBottom: 32,
              boxShadow: "0 0 15px rgba(0, 255, 135, 0.1)"
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00ff87", display: "inline-block", animation: "pulse-ring 1.5s infinite" }} />
              Research Presentation · Software Engineering Department · 2026
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <h1 style={{
              fontSize: "clamp(38px, 6.5vw, 68px)", fontWeight: 900,
              letterSpacing: "-0.04em", lineHeight: 1.05, color: "var(--text-primary)",
              margin: "0 0 24px"
            }}>
              Artificial Intelligence<br />
              <span className="gradient-text-emerald">
                in Computer Networks
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.25}>
            <p style={{
              fontSize: "1.15rem", color: "var(--text-secondary)", lineHeight: 1.8, maxWidth: 660, margin: "0 auto 48px"
            }}>
              A comprehensive survey of telemetry-driven congestion prediction, autonomic self-healing frameworks, predictive scaling, and the rising horizon of adversarial threat models in network architectures.
            </p>
          </Reveal>

          {/* 4 Presenter badging capsules */}
          <Reveal delay={0.35}>
            <div style={{
              display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 60
            }}>
              {[
                { n: 1, name: "Muhammad Moiz", t: "Traffic Routing", c: "var(--accent-member-1)" },
                { n: 2, name: "Muhammad Ahtisham", t: "IDS Pipeline", c: "var(--accent-member-2)" },
                { n: 3, name: "Ahmad Bin Javed", t: "Self-Healing & SON", c: "var(--accent-member-3)" },
                { n: 4, name: "Eman Shahid", t: "Self-Scaling CDN", c: "var(--accent-member-4)" },
              ].map(s => (
                <div key={s.n} className="glassmorphism card-hover" style={{
                  display: "flex", alignItems: "center", gap: 10,
                  background: "var(--bg-card)", border: "1.5px solid var(--border-subtle)", borderRadius: 100,
                  padding: "10px 20px", boxShadow: "var(--shadow-premium)"
                }}>
                  <div style={{
                    width: 26, height: 26, borderRadius: "50%", background: s.c,
                    color: "#02050a", fontSize: 11, fontWeight: 900,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    border: "1px solid rgba(255,255,255,0.2)"
                  }}>S{s.n}</div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}>{s.name}</span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Premium Home Stat Row */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 2,
            background: "var(--border-subtle)", border: "1px solid var(--border-subtle)", borderRadius: 24,
            overflow: "hidden", boxShadow: "var(--shadow-premium)", animation: "reveal-up 1.2s ease"
          }}>
            {[
              { v: 94, s: "%", l: "Traffic Prediction Accuracy" },
              { v: 197, s: "d", l: "Avg Traditional Breach Detection" },
              { v: 40, s: "%", l: "Fewer Network Outages with AI" },
              { v: 7, s: "/9", l: "Active AI Systems Bypassed" },
            ].map((st, i) => (
              <div key={i} style={{ background: "var(--bg-card)", padding: "28px 20px", textAlign: "center" }}>
                <div style={{ fontSize: 34, fontWeight: 800, color: "var(--accent-primary)", letterSpacing: -1, lineHeight: 1 }}>
                  <StatCard value={st.v} suffix={st.s} label={st.l} accent="var(--text-primary)" delay={i * 0.1} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 32, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, color: "var(--text-muted)", fontSize: 11, letterSpacing: 1.5, fontWeight: 800 }}>
          <div>SCROLL TO BEGIN</div>
          <div style={{ width: 2, height: 36, background: "linear-gradient(to bottom, var(--text-muted), transparent)", animation: "pulse-ring 1.5s ease-in-out infinite" }} />
        </div>
      </div>

      {/* ═══════════════════════════ MEMBER 1 — TRAFFIC ═══════════════════════════ */}
      <Section id="traffic">
        <StudentBadge num={1} name="Muhammad Moiz" topic="AI Traffic Prediction & Congestion Telemetry" colorClass="gradient-text-emerald" accent="var(--accent-member-1)" />

        <ChapterLabel num="01" title="AI Traffic Prediction" sub="How AI maps the future of network packets" colorClass="gradient-text-emerald" />
        <P delay={0.1}>
          Modern computer networks carry massive amounts of data in the form of <b>network packets</b>. Each packet travels through <b>routers</b> and <b>switches</b> to reach its destination, similar to vehicles moving through roads.

          However, traditional networks react only when problems like <b>congestion</b> or <b>delay</b> occur. This is where <b>AI Traffic Prediction</b> changes the system.

          AI analyzes real-time and historical network data such as <b>packet flow</b>, <b>bandwidth usage</b>, <b>latency</b>, and <b>routing patterns</b>. Using <b>machine learning</b> and <b>time-series models</b>, it can predict future network congestion and traffic behavior before it happens.

          This allows the network to behave like it has a “<b>future map</b>” of data flow. Instead of waiting for traffic jams, AI can forecast where congestion will occur and adjust routing paths in advance—just like a GPS that predicts traffic and suggests better routes.

          In practice, this leads to:

          <ul>
            <li><b>Faster and more stable internet performance</b></li>
            <li><b>Reduced packet loss and latency</b></li>
            <li><b>Smarter load balancing across networks</b></li>
            <li><b>Improved efficiency in large systems like cloud services and data centers</b></li>
          </ul>
        </P>

        <TrafficFlowchart />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, margin: "40px 0" }}>
          <StatCard value={94} suffix="%" label="Accuracy rate of LSTM forecast modeling 24 hours in advance" delay={0} accent="var(--accent-member-1)" />
          <StatCard value={95} suffix="%" label="Bandwidth utilization achieved by Google B4 AI SDN vs. 30% baseline" delay={0.1} accent="var(--accent-member-1)" />
          <StatCard value={5} suffix="ms" label="Predictive route compute duration (manual changes take minutes)" accent="var(--accent-member-1)" delay={0.2} />
        </div>
        <Callout
          label="Google B4 Architecture"
          text="B4 is Google’s smart network system that automatically finds the best paths to transfer data between data centers efficiently and quickly."
        />
        <Callout
          label="SaaS Case Study — Google B4 Architecture"
          text="Google runs a massive global network called B4 connecting all international data facilities. Historically, links stayed at 30-40% operational thresholds to absorb spikes (highly inefficient). Deploying real-time traffic forecasting raised fiber utility to 95%+, saving billions in unneeded physical capital outlays."
        />
        <div className="b4-image-wrapper">
          <img src="src/assets/b4.png" alt="Google B4 Architecture" />
        </div>

        <Quote
          text="The Internet was not designed to scale to the traffic magnitudes it now bears. Machine learning is the computational layer that makes global routing survivable."
          author="Vint Cerf"
          role="Co-designer of the TCP/IP Protocol · Turing Award Laureate"
          accent="var(--accent-member-1)"
        />
      </Section>

      {/* ═══════════════════════════ MEMBER 2 — IDS ═══════════════════════════ */}
      <Section id="intrusion">
        <StudentBadge num={2} name="Muhammad Ahtisham" topic="Intrusion Detection Systems (IDS)" colorClass="gradient-text-cyan" accent="var(--accent-member-2)" />

        <ChapterLabel num="02" title="Intrusion Detection (IDS)" sub="Catching cyber attacks before damage happens" colorClass="gradient-text-cyan" />

        <P>
          An <B>Intrusion Detection System (IDS)</B> works like a smart security guard for a computer network.
          Traditional systems only detect attacks they already know about. If hackers create a new attack or slightly change old malware, older systems may completely miss it.
          AI-based IDS is much smarter — it learns normal network behavior and quickly notices anything unusual or suspicious.
        </P>

        <P delay={0.1}>
          Machine learning helps IDS identify threats in real-time by analyzing traffic patterns, login activity, and data movement.
          Instead of waiting for damage to happen, the system predicts dangerous behavior early and alerts security teams immediately.
        </P>

        <IDSFlowchart />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20, margin: "40px 0" }}>

          <InfoCard
            icon={<Sliders style={{ color: "var(--accent-member-2)" }} />}
            title="Behavior Monitoring"
            delay={0}
            accent="var(--accent-member-2)"
            text="The AI learns how normal users and devices behave. Strange activity such as unusual logins or heavy traffic is instantly detected."
          />

          <InfoCard
            icon={<Cpu style={{ color: "var(--accent-member-2)" }} />}
            title="Machine Learning Analysis"
            delay={0.1}
            accent="var(--accent-member-2)"
            text="Machine learning models study network data continuously and help identify hidden cyber threats faster than manual monitoring."
          />

          <InfoCard
            icon={<Activity style={{ color: "var(--accent-member-2)" }} />}
            title="Real-Time Alerts"
            delay={0.2}
            accent="var(--accent-member-2)"
            text="When suspicious activity appears, the IDS immediately sends alerts so administrators can respond before major damage occurs."
          />

          <InfoCard
            icon={<ShieldCheck style={{ color: "var(--accent-member-2)" }} />}
            title="Improved Security"
            delay={0.3}
            accent="var(--accent-member-2)"
            text="AI-powered IDS reduces attack risks, improves response speed, and protects sensitive data from modern cyber threats."
          />
        </div>

        <BarChart
          title="Intrusion Detection Accuracy Comparison"
          bars={[
            { label: "Traditional\nDetection", label2: "65%", value: 65, color: "var(--text-muted)" },
            { label: "Basic Machine\nLearning", label2: "88%", value: 88, color: "var(--accent-primary)" },
            { label: "Deep Learning\nIDS", label2: "98%", value: 98, color: "var(--accent-member-2)" },
            { label: "AI-Based\nReal-Time IDS", label2: "99%", value: 99, color: "#a855f7" },
          ]}
          height={200}
        />
        <div className="b4-image-wrapper">
          <img src="src/assets/ids.png" alt="Google B4 Architecture" />
        </div>

        <Callout
          label="Real-World Importance"
          text="Modern companies and cloud platforms use AI-powered IDS to detect cyber attacks in seconds. This helps prevent data theft, ransomware attacks, and unauthorized access before systems are seriously affected."
        />

        <Quote
          text="Cybersecurity is no longer only about blocking attacks — it is about detecting threats early and responding intelligently."
          author="Bruce Schneier"
          role="Cybersecurity Expert & Cryptographer"
          accent="var(--accent-member-2)"
        />
      </Section>

      {/* ═══════════════════════════ MEMBER 3 — HEALING & SON ═══════════════════════════ */}
      <Section id="healing">
        <StudentBadge
          num={3}
          name="Ahmad Bin Javed"
          topic="Autonomic Self-Healing & Self-Organizing Networks"
          colorClass="gradient-text-emerald"
          accent="var(--accent-member-3)"
        />

        <ChapterLabel
          num="03"
          title="Self-Healing Networks"
          sub="Networks that automatically detect and fix problems"
          colorClass="gradient-text-emerald"
        />

        <P>
          In traditional networks, when a router or server fails, engineers must manually find the issue and repair it.
          This process can take hours and may cause service interruptions.
          In a <B>Self-Healing Network</B>, AI systems automatically detect failures, identify the problem, and fix the network within seconds.
        </P>

        <P delay={0.1}>
          These networks use smart monitoring systems that continuously check network health in real-time.
          If a problem appears, the AI quickly selects the best solution and restores normal operation without human intervention.
        </P>

        <HealingLoop />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20,
            margin: "40px 0",
          }}
        >
          <StatCard
            value={40}
            suffix="%"
            label="Reduction in network outages using AI monitoring systems"
            delay={0}
            accent="var(--accent-member-3)"
          />

          <StatCard
            value={60}
            suffix="s"
            label="Average repair time in AI-powered network systems"
            delay={0.1}
            accent="var(--accent-member-3)"
          />

          <StatCard
            value={78}
            suffix="%"
            label="Problems solved automatically without human support"
            delay={0.2}
            accent="var(--accent-member-3)"
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 20,
            margin: "40px 0",
          }}
        >
          <InfoCard
            icon={<Activity style={{ color: "var(--accent-member-3)" }} />}
            title="Problem Detection"
            delay={0}
            accent="var(--accent-member-3)"
            text="AI continuously monitors the network and quickly detects unusual behavior, failures, or performance drops."
          />

          <InfoCard
            icon={<Cpu style={{ color: "var(--accent-member-3)" }} />}
            title="Automatic Repair"
            delay={0.1}
            accent="var(--accent-member-3)"
            text="The system automatically selects the best recovery method and restores the network without waiting for engineers."
          />

          <InfoCard
            icon={<Sliders style={{ color: "var(--accent-member-3)" }} />}
            title="Performance Monitoring"
            delay={0.2}
            accent="var(--accent-member-3)"
            text="AI checks network speed, temperature, and traffic load to predict failures before they happen."
          />

          <InfoCard
            icon={<Terminal style={{ color: "var(--accent-member-3)" }} />}
            title="Continuous Learning"
            delay={0.3}
            accent="var(--accent-member-3)"
            text="The network learns from past failures and becomes smarter and faster at solving future problems."
          />
        </div>

        <div className="b4-image-wrapper">
          <img src="src/assets/self_healing.png" alt="Google B4 Architecture" />
        </div>

        <Quote
          text="Smart networks are not only built to work — they are built to recover automatically when problems occur."
          author="Henning Schulzrinne"
          role="Network Researcher & Former FCC CTO"
          accent="var(--accent-member-3)"
        />

        <div style={{ height: 60 }} />

        <ChapterLabel
          num="04"
          title="Self-Organizing Networks (SON)"
          sub="Networks that configure and balance themselves"
          colorClass="gradient-text-emerald"
        />

        <P>
          Managing modern 5G and wireless networks manually is very difficult because thousands of devices and base stations must work together.
          <B>Self-Organizing Networks (SON)</B> solve this problem by allowing the network to automatically configure and optimize itself.
        </P>

        <P delay={0.1}>
          SON systems automatically balance traffic load, improve signal quality, and reduce congestion.
          This helps networks become faster, more stable, and more energy efficient without constant human management.
        </P>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20,
            margin: "40px 0",
          }}
        >
          <StatCard
            value={35}
            suffix="%"
            label="Energy savings achieved using smart network optimization"
            delay={0}
            accent="var(--accent-member-3)"
          />

          <StatCard
            value={200}
            suffix="M"
            label="Annual cost savings for telecom companies using SON"
            delay={0.1}
            accent="var(--accent-member-3)"
          />

          <StatCard
            value={70}
            suffix="%"
            label="Reduction in manual network maintenance work"
            delay={0.2}
            accent="var(--accent-member-3)"
          />
        </div>
      </Section>

      {/* ═══════════════════════════ MEMBER 4 — SCALING ═══════════════════════════ */}
      <Section id="scaling">
        <StudentBadge
          num={4}
          name="Eman Shahid"
          topic="Predictive Auto-Scaling & Smart Networks"
          colorClass="gradient-text-purple"
          accent="var(--accent-member-4)"
        />

        <ChapterLabel
          num="05"
          title="Self-Scaling Networks"
          sub="Networks that automatically adjust to user demand"
          colorClass="gradient-text-purple"
        />

        <P>
          Modern networks face huge traffic changes every day.
          For example, during live sports events or viral streams, millions of users suddenly join at the same time.
          <B>Self-Scaling Networks</B> use AI to automatically increase network resources before congestion or slowdowns happen.
        </P>

        <P delay={0.1}>
          These systems predict future traffic using machine learning and automatically add servers, bandwidth, and cloud resources when demand increases.
          When traffic becomes normal again, extra resources are removed to save energy and cost.
        </P>

        {/* CDN Timeline */}
        <div style={{ margin: "48px 0" }}>
          <Reveal>
            <div
              className="glassmorphism"
              style={{
                padding: "36px",
                borderRadius: 24,
                border: "1px solid var(--border-subtle)",
                background: "var(--bg-card)",
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 800,
                  color: "var(--text-primary)",
                  marginBottom: 28,
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                }}
              >
                Self-Scaling Process During a Global Live Stream
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {[
                  {
                    time: "48 hrs before",
                    event: "AI predicts a large increase in user traffic",
                    themeColor: "var(--accent-member-1)",
                  },
                  {
                    time: "24 hrs before",
                    event: "Cloud servers prepare additional resources",
                    themeColor: "var(--accent-member-2)",
                  },
                  {
                    time: "2 hrs before",
                    event: "Extra bandwidth and caching systems become active",
                    themeColor: "var(--accent-member-3)",
                  },
                  {
                    time: "Live Event",
                    event: "Millions of users stream smoothly without buffering",
                    themeColor: "var(--accent-member-4)",
                  },
                  {
                    time: "After Event",
                    event: "Unused servers are removed to reduce costs",
                    themeColor: "var(--accent-member-1)",
                  },
                ].map((item, i) => (
                  <Reveal key={i} delay={i * 0.08}>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        borderBottom:
                          i < 4 ? "1px solid var(--border-subtle)" : "none",
                        padding: "16px 0",
                      }}
                    >
                      <div
                        style={{
                          minWidth: 150,
                          fontSize: 13,
                          fontWeight: 800,
                          color: item.themeColor,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {item.time}
                      </div>

                      <div
                        style={{
                          flex: 1,
                          fontSize: 14,
                          color: "var(--text-secondary)",
                          fontWeight: 500,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {item.event}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 20,
            margin: "40px 0",
          }}
        >
          <InfoCard
            icon={<TrendingUp style={{ color: "var(--accent-member-4)" }} />}
            title="Traffic Prediction"
            delay={0}
            accent="var(--accent-member-4)"
            text="AI studies user activity patterns and predicts future traffic spikes before they happen."
          />

          <InfoCard
            icon={<Cpu style={{ color: "var(--accent-member-4)" }} />}
            title="Automatic Scaling"
            delay={0.1}
            accent="var(--accent-member-4)"
            text="The network automatically adds servers and resources during heavy traffic periods."
          />

          <InfoCard
            icon={<Sliders style={{ color: "var(--accent-member-4)" }} />}
            title="Smart Load Balancing"
            delay={0.2}
            accent="var(--accent-member-4)"
            text="Traffic is distributed evenly across the network to prevent overload and maintain speed."
          />

          <InfoCard
            icon={<Database style={{ color: "var(--accent-member-4)" }} />}
            title="Cost Efficiency"
            delay={0.3}
            accent="var(--accent-member-4)"
            text="Unused resources are automatically removed when traffic decreases, reducing operational costs."
          />
        </div>

        <BarChart
          title="Benefits of AI-Based Self-Scaling Networks"
          bars={[
            {
              label: "Reduced\nResource Waste",
              label2: "42%",
              value: 42,
              color: "var(--accent-member-3)",
              unit: "%",
            },
            {
              label: "Faster\nScaling Speed",
              label2: "5x Faster",
              value: 90,
              color: "var(--accent-member-4)",
              unit: "%",
            },
            {
              label: "Network\nUptime",
              label2: "99.99%",
              value: 99.9,
              color: "var(--accent-member-2)",
              unit: "%",
            },
            {
              label: "Less Manual\nManagement",
              label2: "80%",
              value: 80,
              color: "var(--accent-member-5)",
              unit: "%",
            },
          ]}
          height={200}
        />

        <div className="b4-image-wrapper">
          <img src="src/assets/self_scaling.png" alt="Google B4 Architecture" />
        </div>

        <Callout
          label="Key Concept"
          text="Self-Scaling Networks automatically increase or decrease resources based on user demand. This helps networks stay fast, reliable, and cost-efficient even during heavy traffic."
        />

        <Quote
          text="AI allows modern networks to grow, adapt, and handle millions of users without slowing down."
          author="Werner Vogels"
          role="CTO · Amazon Web Services"
          accent="var(--accent-member-4)"
        />
      </Section>



      {/* ═══════════════════════════ CONCLUSION ═══════════════════════════ */}
      <div
        style={{
          background: "var(--bg-secondary)",
          borderTop: "1px solid var(--border-subtle)",
          borderBottom: "1px solid var(--border-subtle)",
          padding: "120px 0",
        }}
      >
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 24px" }}>

          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  marginBottom: 16,
                }}
              >
                Presentation Summary
              </div>

              <h2
                style={{
                  fontSize: "clamp(28px, 4.5vw, 42px)",
                  fontWeight: 900,
                  letterSpacing: "-0.03em",
                  color: "var(--text-primary)",
                  marginBottom: 20,
                }}
              >
                Autonomous Networks: What We Learned
              </h2>

              <p
                style={{
                  fontSize: "1.08rem",
                  color: "var(--text-secondary)",
                  maxWidth: 700,
                  margin: "0 auto",
                  lineHeight: 1.8,
                }}
              >
                Artificial Intelligence is making computer networks smarter, faster,
                safer, and more reliable. Modern networks can now predict problems,
                stop cyber attacks, repair failures, and automatically adjust to user demand.
              </p>
            </div>
          </Reveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 20,
              marginBottom: 60,
            }}
          >
            {[
              {
                icon: <Activity style={{ color: "var(--accent-member-1)" }} />,
                title: "AI Traffic Prediction",
                summary:
                  "Just like Google Maps predicts road traffic, AI networks predict internet congestion and choose faster routes before delays happen.",
                accent: "var(--accent-member-1)",
              },

              {
                icon: <ShieldAlert style={{ color: "var(--accent-member-2)" }} />,
                title: "Smart Cybersecurity",
                summary:
                  "AI-based Intrusion Detection Systems monitor network activity like a security guard and quickly detect suspicious behavior or cyber attacks.",
                accent: "var(--accent-member-2)",
              },

              {
                icon: <RefreshCw style={{ color: "var(--accent-member-3)" }} />,
                title: "Self-Healing Networks",
                summary:
                  "Similar to how a smartphone restarts apps after a crash, self-healing networks automatically detect and fix failures without human help.",
                accent: "var(--accent-member-3)",
              },

              {
                icon: <TrendingUp style={{ color: "var(--accent-member-4)" }} />,
                title: "Self-Scaling Networks",
                summary:
                  "Like opening more checkout counters during rush hours in a supermarket, AI networks automatically add more resources when millions of users connect.",
                accent: "var(--accent-member-4)",
              },

              {
                icon: <Cpu style={{ color: "var(--accent-primary)" }} />,
                title: "Future of Networking",
                summary:
                  "Future AI networks will become even smarter, faster, and more automated, helping support technologies like 6G, smart cities, and autonomous vehicles.",
                accent: "var(--accent-primary)",
              },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div
                  className="glassmorphism card-hover"
                  style={{
                    padding: "28px",
                    background: "var(--bg-card)",
                    borderRadius: 20,
                    border: "1px solid var(--border-subtle)",
                    display: "flex",
                    gap: 16,
                  }}
                >
                  <div
                    style={{
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {item.icon}
                  </div>

                  <div>
                    <div
                      style={{
                        fontSize: 15,
                        fontWeight: 800,
                        color: item.accent,
                        marginBottom: 8,
                      }}
                    >
                      {item.title}
                    </div>

                    <div
                      style={{
                        fontSize: 13,
                        color: "var(--text-secondary)",
                        lineHeight: 1.65,
                      }}
                    >
                      {item.summary}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Quote
            text="The future of networking is not only about faster internet — it is about intelligent systems that can think, learn, protect, and adapt automatically."
            author="Sir Tim Berners-Lee"
            role="Inventor of the World Wide Web"
            accent="var(--accent-primary)"
          />
        </div>
      </div>

      {/* ═══════════════════════════ REFERENCES ═══════════════════════════ */}
      <Section id="refs">
        <Reveal>
          <div style={{ marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 12 }}>
              Bibliography
            </div>
            <h2 style={{ fontSize: 36, fontWeight: 800, letterSpacing: "-0.03em", color: "var(--text-primary)", margin: 0 }}>
              References
            </h2>
          </div>
        </Reveal>

        {[
          { n: 1, star: true, text: "Buczak, A. L., & Guven, E. (2016). A survey of data mining and ML methods for cyber security intrusion detection.", journal: "IEEE Communications Surveys & Tutorials, 18(2), 1153–1176." },
          { n: 2, star: true, text: "Apruzzese, G. et al. (2022). The role of machine learning in cybersecurity.", journal: "Digital Threats: Research and Practice, ACM, 3(3)." },
          { n: 3, text: "Jain, S. et al. (2013). B4: Experience with a globally-deployed software defined WAN.", journal: "ACM SIGCOMM CCR, 43(4), 3–14." },
          { n: 4, text: "Mestres, A. et al. (2017). Knowledge-defined networking.", journal: "ACM SIGCOMM Computer Communication Review, 47(3)." },
          { n: 5, text: "Aliu, O. G. et al. (2013). A survey of self organisation in future cellular networks.", journal: "IEEE Communications Surveys & Tutorials, 15(1), 336–361." },
          { n: 6, text: "Mijumbi, R. et al. (2016). Network function virtualization: State of the art.", journal: "IEEE Communications Surveys & Tutorials, 18(1)." },
          { n: 7, star: true, text: "Greshake, K. et al. (2023). Not what you've signed up for: Compromising LLM-integrated apps with indirect prompt injections.", journal: "ACM AISec Workshop, CCS 2023." },
          { n: 8, star: true, text: "Wei, A. et al. (2023). Jailbroken: How does LLM safety training fail?", journal: "NeurIPS 2023, 36." },
          { n: 9, text: "Biggio, B., & Roli, F. (2018). Wild patterns: Ten years after adversarial machine learning.", journal: "Pattern Recognition, 84, 317–331." },
          { n: 10, text: "OWASP (2024). Top 10 for Large Language Model Applications.", journal: "Open Web Application Security Project Foundation." },
          { n: 11, text: "IBM Security (2023). Cost of a Data Breach Report 2023.", journal: "IBM Corporation & Ponemon Institute." },
          { n: 12, text: "3GPP TS 36.300 V17.0.0. E-UTRA Self-Organizing Networks Specification.", journal: "3rd Generation Partnership Project." },
        ].map((r, i) => (
          <Reveal key={i} delay={i * 0.04}>
            <div style={{
              display: "grid", gridTemplateColumns: "48px 1fr",
              padding: "20px 0", borderBottom: "1px solid var(--border-subtle)",
              transition: "padding-left 0.2s ease"
            }}
              onMouseEnter={e => e.currentTarget.style.paddingLeft = "8px"}
              onMouseLeave={e => e.currentTarget.style.paddingLeft = "0px"}
            >
              <div style={{ fontSize: 12, fontWeight: 800, color: r.star ? "var(--accent-member-1)" : "var(--text-muted)", paddingTop: 2 }}>
                [{r.n}]{r.star ? "★" : ""}
              </div>
              <div>
                <span style={{ fontSize: 14, color: "var(--text-primary)", lineHeight: 1.7, fontWeight: 500 }}>{r.text} </span>
                <span style={{ fontSize: 13, color: "var(--text-muted)", fontStyle: "italic" }}>{r.journal}</span>
              </div>
            </div>
          </Reveal>
        ))}
      </Section>

      {/* ═══════════════════════════ FOOTER ═══════════════════════════ */}
      <footer style={{
        background: "var(--bg-secondary)", color: "var(--text-muted)",
        padding: "80px 48px", borderTop: "1px solid var(--border-subtle)",
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 40, alignItems: "end"
      }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 900, color: "var(--text-primary)", marginBottom: 12, letterSpacing: -0.5 }}>
            AI in Computer Networks
          </div>
          <div style={{ fontSize: 13, lineHeight: 1.8, fontWeight: 500 }}>
            Research Seminar Paper · Computer Science Department · 2025<br />
            Muhammad Moiz · Muhammad Ahtisham · Ahmad Bin Javed · Eman Shahid
          </div>
        </div>
        <div style={{ textAlign: "right", fontSize: 12, lineHeight: 1.8, fontWeight: 500 }}>
          ★ = Primary survey paper reference<br />
          All computational modules calibrated to research benchmarks.
        </div>
      </footer>
    </div>
  );
}
