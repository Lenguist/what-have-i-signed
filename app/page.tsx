// Fake document lines for hero visual
const DOC_LINES = [
  { w: "92%", highlight: false },
  { w: "85%", highlight: false },
  { w: "97%", highlight: false },
  { w: "78%", highlight: true },   // highlighted "suspicious" clause
  { w: "91%", highlight: false },
  { w: "60%", highlight: false },
  { w: "88%", highlight: false },
  { w: "95%", highlight: false },
  { w: "73%", highlight: true },
  { w: "84%", highlight: false },
  { w: "90%", highlight: false },
  { w: "55%", highlight: false },
];

export default function Home() {
  return (
    <div style={{ background: "var(--background)", minHeight: "100vh" }}>

      {/* Nav */}
      <nav style={{
        borderBottom: "1px solid var(--border)",
        position: "sticky", top: 0, zIndex: 50,
        backdropFilter: "blur(12px)",
        background: "rgba(12, 11, 9, 0.9)",
      }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto", padding: "0 32px",
          height: 52, display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <span style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 14, fontWeight: 700, color: "var(--foreground)", letterSpacing: "-0.01em",
          }}>
            what-have-i-signed<span style={{ color: "var(--accent)" }}>.</span>
          </span>
          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            <a
              href="https://github.com/Lenguist/what-have-i-signed"
              target="_blank" rel="noopener noreferrer"
              style={{ color: "var(--muted)", textDecoration: "none", fontSize: 13 }}
            >
              GitHub
            </a>
            <a
              href="/login"
              style={{
                color: "var(--foreground)", textDecoration: "none", fontSize: 13,
                padding: "6px 14px", border: "1px solid var(--border)",
                borderRadius: 6, fontWeight: 500,
              }}
            >
              Sign in
            </a>
          </div>
        </div>
      </nav>

      {/* Hero — split layout */}
      <section style={{
        maxWidth: 1100, margin: "0 auto", padding: "80px 32px 72px",
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64,
        alignItems: "center",
      }}>
        {/* Left */}
        <div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            fontSize: 11, color: "var(--accent)", fontWeight: 700,
            letterSpacing: "0.1em", marginBottom: 28,
            padding: "4px 12px", border: "1px solid rgba(245, 158, 11, 0.3)",
            borderRadius: 4, background: "rgba(245, 158, 11, 0.07)",
          }}>
            CHROME EXTENSION · EARLY ACCESS
          </div>

          <h1 style={{
            fontSize: "clamp(36px, 4vw, 58px)",
            fontWeight: 800, lineHeight: 1.05,
            marginBottom: 20, letterSpacing: "-0.03em",
            color: "var(--foreground)",
          }}>
            You clicked accept.
            <br />
            <span style={{ color: "var(--accent)" }}>
              Do you know what<br />you agreed to?
            </span>
          </h1>

          <p style={{
            fontSize: 17, color: "var(--muted)",
            maxWidth: 460, marginBottom: 36,
            lineHeight: 1.75,
          }}>
            A Chrome extension that captures every Terms & Conditions
            you accept and stores them in a personal archive.
            Ask AI anything about what you signed — months later.
          </p>

          <form style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <input
              type="email"
              placeholder="your@email.com"
              style={{
                padding: "11px 16px", borderRadius: 6,
                border: "1px solid var(--border)",
                background: "var(--card)", color: "var(--foreground)",
                fontSize: 14, outline: "none", width: 240,
              }}
            />
            <button type="submit" style={{
              background: "var(--accent)", color: "#000",
              padding: "11px 22px", borderRadius: 6,
              border: "none", fontWeight: 700, fontSize: 14, cursor: "pointer",
            }}>
              Get early access
            </button>
          </form>
          <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 10 }}>
            No spam. We&apos;ll notify you when it launches.
          </p>
        </div>

        {/* Right — fake document visual */}
        <div style={{
          background: "var(--card2)", border: "1px solid var(--border)",
          borderRadius: 10, padding: 28, position: "relative",
        }}>
          <div style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 10, color: "var(--muted)", letterSpacing: "0.08em",
            marginBottom: 20, textTransform: "uppercase",
          }}>
            Terms of Service — Section 14.3
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {DOC_LINES.map((line, i) => (
              <div key={i} style={{
                height: 10, width: line.w, borderRadius: 3,
                background: line.highlight
                  ? "rgba(245, 158, 11, 0.35)"
                  : "rgba(240, 236, 228, 0.07)",
                position: "relative",
              }}>
                {line.highlight && (
                  <div style={{
                    position: "absolute", right: -8, top: "50%",
                    transform: "translateY(-50%)",
                    width: 6, height: 6, borderRadius: "50%",
                    background: "var(--accent)",
                  }} />
                )}
              </div>
            ))}
          </div>
          <div style={{
            marginTop: 24, padding: "12px 14px",
            background: "rgba(245, 158, 11, 0.08)",
            border: "1px solid rgba(245, 158, 11, 0.25)",
            borderRadius: 6,
          }}>
            <div style={{ fontSize: 11, color: "var(--accent)", fontWeight: 700, marginBottom: 4 }}>
              2 clauses flagged
            </div>
            <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.5 }}>
              Data may be shared with third-party partners for advertising purposes.
            </div>
          </div>
        </div>
      </section>

      {/* Divider with stats */}
      <div style={{ borderTop: "1px solid var(--border)" }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto", padding: "0 32px",
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
        }}>
          {[
            { value: "91%", label: "of people never read what they sign" },
            { value: "76 days", label: "to read all your annual T&Cs" },
            { value: "0", label: "tools that remember what you signed" },
          ].map((stat, i) => (
            <div key={i} style={{
              padding: "32px 24px",
              borderRight: i < 2 ? "1px solid var(--border)" : "none",
            }}>
              <div style={{
                fontSize: 30, fontWeight: 800, color: "var(--accent)",
                fontFamily: "var(--font-geist-mono), monospace",
                marginBottom: 6, lineHeight: 1,
              }}>
                {stat.value}
              </div>
              <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.5 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How it works — vertical list */}
      <section style={{ borderTop: "1px solid var(--border)", padding: "80px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 2fr", gap: 64 }}>
          <div>
            <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              How it works
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              {
                n: "1",
                title: "Install the extension",
                desc: "Add it to Chrome in one click. Runs silently — no setup required.",
              },
              {
                n: "2",
                title: "Accept T&Cs as you normally would",
                desc: 'Click \u201cI Accept\u201d on any sign-up. The extension automatically captures and timestamps the document.',
              },
              {
                n: "3",
                title: "Chat with your archive later",
                desc: '\u201cWhat data does Spotify collect on me?\u201d \u201cCan they sell my info?\u201d \u201cWhat changed since I signed up?\u201d',
              },
            ].map((item, i) => (
              <div key={i} style={{
                display: "flex", gap: 24, padding: "28px 0",
                borderBottom: i < 2 ? "1px solid var(--border)" : "none",
              }}>
                <div style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: 13, color: "var(--accent)", fontWeight: 700,
                  minWidth: 20, paddingTop: 2,
                }}>
                  {item.n}
                </div>
                <div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8, letterSpacing: "-0.01em" }}>
                    {item.title}
                  </h3>
                  <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.7, margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The moment that made this necessary */}
      <section style={{ borderTop: "1px solid var(--border)", padding: "80px 32px", background: "var(--card)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{
            fontSize: 11, color: "var(--accent)", fontWeight: 700,
            letterSpacing: "0.1em", marginBottom: 40, textTransform: "uppercase",
          }}>
            Why this matters
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {[
              {
                company: "Adobe · June 2024",
                text: "A single T&C clause went viral with 5M views. Millions discovered they'd unknowingly agreed to let Adobe access their files for AI training. Adobe rewrote their terms within weeks.",
              },
              {
                company: "LinkedIn · Sept 2024",
                text: "Began scraping user data for AI training before updating their privacy policy. Users had no record of what they originally agreed to — and no way to prove the terms changed.",
              },
              {
                company: "Zoom · 2023",
                text: "Hidden clauses implied Zoom could train AI on user conversations. They reversed the change within days — but only after millions noticed what they'd silently agreed to.",
              },
            ].map((item, i) => (
              <div key={i} style={{
                padding: 24, background: "var(--background)",
                border: "1px solid var(--border)", borderRadius: 8,
              }}>
                <div style={{
                  fontSize: 11, color: "var(--accent)", fontWeight: 700,
                  letterSpacing: "0.06em", marginBottom: 12,
                  fontFamily: "var(--font-geist-mono), monospace",
                }}>
                  {item.company}
                </div>
                <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.7, margin: 0 }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ borderTop: "1px solid var(--border)", padding: "80px 32px" }}>
        <div style={{ maxWidth: 520, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: 30, fontWeight: 700, marginBottom: 14, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
            Start knowing what<br />you&apos;re agreeing to.
          </h2>
          <p style={{ color: "var(--muted)", marginBottom: 32, fontSize: 15, lineHeight: 1.7 }}>
            Early access. Free to start.
          </p>
          <form style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
            <input
              type="email"
              placeholder="your@email.com"
              style={{
                padding: "11px 16px", borderRadius: 6,
                border: "1px solid var(--border)",
                background: "var(--card)", color: "var(--foreground)",
                fontSize: 14, outline: "none", width: 240,
              }}
            />
            <button type="submit" style={{
              background: "var(--accent)", color: "#000",
              padding: "11px 22px", borderRadius: 6,
              border: "none", fontWeight: 700, fontSize: 14, cursor: "pointer",
            }}>
              Get early access
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid var(--border)", padding: "24px 32px" }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto",
          display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12,
        }}>
          <span style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontWeight: 700, color: "var(--muted)", fontSize: 13,
          }}>
            what-have-i-signed<span style={{ color: "var(--accent)" }}>.</span>
          </span>
          <div style={{ display: "flex", gap: 24, fontSize: 13, color: "var(--muted)" }}>
            <span>2026</span>
            <a
              href="https://github.com/Lenguist/what-have-i-signed"
              target="_blank" rel="noopener noreferrer"
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
