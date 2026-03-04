export default function Home() {
  return (
    <div style={{ background: "var(--background)", minHeight: "100vh" }}>

      {/* Nav */}
      <nav style={{
        borderBottom: "1px solid var(--border)",
        position: "sticky", top: 0, zIndex: 50,
        backdropFilter: "blur(12px)",
        background: "rgba(8, 12, 20, 0.85)",
      }}>
        <div style={{
          maxWidth: 960, margin: "0 auto", padding: "0 24px",
          height: 56, display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <span style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 16, fontWeight: 700, color: "var(--accent)", letterSpacing: "-0.02em",
          }}>
            what-have-i-signed
          </span>
          <a
            href="https://github.com/Lenguist/what-have-i-signed"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--muted)", textDecoration: "none", fontSize: 14, fontWeight: 500 }}
          >
            GitHub →
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="grid-bg" style={{
        padding: "110px 24px 90px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: 700, height: 400,
          background: "radial-gradient(ellipse, rgba(59, 130, 246, 0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 720, margin: "0 auto", position: "relative" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            fontSize: 12, color: "var(--accent)", fontWeight: 600,
            letterSpacing: "0.08em", marginBottom: 32,
            padding: "5px 14px", border: "1px solid rgba(59, 130, 246, 0.3)",
            borderRadius: 20, background: "rgba(59, 130, 246, 0.07)",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", display: "inline-block" }} />
            CHROME EXTENSION · COMING SOON
          </div>

          <h1 style={{
            fontSize: "clamp(38px, 6vw, 68px)",
            fontWeight: 800, lineHeight: 1.08,
            marginBottom: 24, letterSpacing: "-0.03em",
            color: "var(--foreground)",
          }}>
            You clicked accept.<br />
            <span style={{ color: "var(--accent)" }}>We saved what you agreed to.</span>
          </h1>

          <p style={{
            fontSize: 19, color: "var(--muted)",
            maxWidth: 560, margin: "0 auto 48px",
            lineHeight: 1.7,
          }}>
            A Chrome extension that silently captures every Terms & Conditions
            you accept. Come back anytime and chat with AI to understand exactly
            what you signed.
          </p>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <form
              style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}

            >
              <input
                type="email"
                placeholder="your@email.com"
                style={{
                  padding: "12px 18px",
                  borderRadius: 8,
                  border: "1px solid var(--border)",
                  background: "var(--card)",
                  color: "var(--foreground)",
                  fontSize: 15,
                  outline: "none",
                  width: 260,
                }}
              />
              <button
                type="submit"
                style={{
                  background: "var(--accent)",
                  color: "#fff",
                  padding: "12px 24px",
                  borderRadius: 8,
                  border: "none",
                  fontWeight: 700,
                  fontSize: 15,
                  cursor: "pointer",
                }}
              >
                Get early access
              </button>
            </form>
            <span style={{ fontSize: 13, color: "var(--muted)" }}>
              No spam. Notified when the extension launches.
            </span>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", background: "var(--card)" }}>
        <div style={{
          maxWidth: 960, margin: "0 auto", padding: "0 24px",
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)", textAlign: "center",
        }}>
          {[
            { value: "91%", label: "of people accept T&Cs without reading" },
            { value: "76 days", label: "to read all your annual T&Cs (Carnegie Mellon)" },
            { value: "0", label: "existing tools that remember what you signed" },
          ].map((stat, i) => (
            <div key={i} style={{
              padding: "28px 16px",
              borderRight: i < 2 ? "1px solid var(--border)" : "none",
            }}>
              <div style={{
                fontSize: 28, fontWeight: 800, color: "var(--accent)",
                fontFamily: "var(--font-geist-mono), monospace",
                lineHeight: 1, marginBottom: 8,
              }}>
                {stat.value}
              </div>
              <div style={{ fontSize: 13, color: "var(--muted)", fontWeight: 500, lineHeight: 1.5 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <section style={{ padding: "88px 24px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <h2 style={{
            fontSize: 32, fontWeight: 700,
            marginBottom: 48, letterSpacing: "-0.02em", textAlign: "center",
          }}>
            How it works
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {[
              {
                step: "01",
                title: "Install the extension",
                desc: "Add it to Chrome. It runs silently in the background — no setup, no configuration.",
              },
              {
                step: "02",
                title: "Accept T&Cs as normal",
                desc: 'When you click \u201cI Accept\u201d or \u201cAgree\u201d on any sign-up flow, the extension captures and timestamps the document automatically.',
              },
              {
                step: "03",
                title: "Chat with your archive",
                desc: 'Come back anytime and ask questions in plain English. \u201cWhat data does Spotify collect on me?\u201d \u201cCan they sell my info?\u201d',
              },
            ].map((item) => (
              <div key={item.step} style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                padding: 32,
              }}>
                <div style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: 12, color: "var(--accent)", fontWeight: 700,
                  letterSpacing: "0.1em", marginBottom: 20,
                }}>
                  STEP {item.step}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, letterSpacing: "-0.01em" }}>
                  {item.title}
                </h3>
                <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.7, margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's coming */}
      <section style={{ padding: "88px 24px", borderTop: "1px solid var(--border)", background: "var(--card)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <div style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 12, color: "var(--accent)", fontWeight: 700,
            letterSpacing: "0.1em", marginBottom: 20,
          }}>
            ROADMAP
          </div>
          <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 16, letterSpacing: "-0.02em" }}>
            Starting simple. Getting powerful.
          </h2>
          <p style={{ color: "var(--muted)", marginBottom: 48, fontSize: 16, lineHeight: 1.7 }}>
            The MVP is capture + chat. Everything else follows.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 12, textAlign: "left" }}>
            {[
              { phase: "Now", label: "Auto-capture T&Cs at the moment of acceptance", active: true },
              { phase: "Now", label: "Personal archive — every agreement, timestamped", active: true },
              { phase: "Now", label: "AI chat — ask anything about any document you signed", active: true },
              { phase: "Next", label: "Flag suspicious clauses before you click accept", active: false },
              { phase: "Later", label: "Change alerts — know when a company updates terms you agreed to", active: false },
              { phase: "Later", label: "Draft withdrawal-of-consent emails", active: false },
            ].map((item, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 16,
                padding: "14px 20px",
                background: item.active ? "rgba(59, 130, 246, 0.06)" : "var(--background)",
                border: `1px solid ${item.active ? "rgba(59, 130, 246, 0.2)" : "var(--border)"}`,
                borderRadius: 8,
              }}>
                <span style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: 11, fontWeight: 700,
                  color: item.active ? "var(--accent)" : "var(--muted)",
                  minWidth: 44,
                }}>
                  {item.phase}
                </span>
                <span style={{
                  fontSize: 14,
                  color: item.active ? "var(--foreground)" : "var(--muted)",
                }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "88px 24px", borderTop: "1px solid var(--border)", textAlign: "center" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 16, letterSpacing: "-0.02em" }}>
            Know what you&apos;re agreeing to.
          </h2>
          <p style={{ color: "var(--muted)", marginBottom: 40, fontSize: 16, lineHeight: 1.7 }}>
            Adobe, LinkedIn, Zoom — millions of people discovered too late they'd agreed to something they hated.
            Don't be next.
          </p>
          <form
            style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}
          >
            <input
              type="email"
              placeholder="your@email.com"
              style={{
                padding: "12px 18px", borderRadius: 8,
                border: "1px solid var(--border)",
                background: "var(--card)",
                color: "var(--foreground)",
                fontSize: 15, outline: "none", width: 260,
              }}
            />
            <button
              type="submit"
              style={{
                background: "var(--accent)", color: "#fff",
                padding: "12px 24px", borderRadius: 8,
                border: "none", fontWeight: 700, fontSize: 15, cursor: "pointer",
              }}
            >
              Get early access
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid var(--border)", padding: "28px 24px" }}>
        <div style={{
          maxWidth: 960, margin: "0 auto",
          display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12,
        }}>
          <span style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontWeight: 700, color: "var(--accent)", fontSize: 13,
          }}>
            what-have-i-signed
          </span>
          <div style={{ display: "flex", gap: 24, fontSize: 13, color: "var(--muted)" }}>
            <span>2026</span>
            <a
              href="https://github.com/Lenguist/what-have-i-signed"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--muted)", textDecoration: "none" }}
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
