import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — What Have I Signed?",
  description: "Privacy policy for What Have I Signed? and its Chrome extension.",
};

export default function PrivacyPage() {
  return (
    <div style={{ background: "var(--background)", minHeight: "100vh" }}>
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
          <Link href="/" style={{ color: "var(--accent)", fontWeight: 700, fontSize: 15, textDecoration: "none", letterSpacing: "-0.02em" }}>
            What Have I Signed?
          </Link>
        </div>
      </nav>

      <main style={{ maxWidth: 720, margin: "0 auto", padding: "64px 32px 96px" }}>
        <h1 style={{ fontSize: 36, fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 8, color: "var(--foreground)" }}>
          Privacy Policy
        </h1>
        <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 48 }}>
          Last updated: March 2026
        </p>

        <Section title="Overview">
          <p>
            What Have I Signed? (&ldquo;the Service&rdquo;) is a Chrome extension and web application that helps you
            save and understand the Terms &amp; Conditions you agree to online. This policy explains what
            data we collect, how we use it, and your rights.
          </p>
        </Section>

        <Section title="What we collect">
          <p>When you use the Service, we collect:</p>
          <ul>
            <li><strong>Account information</strong> — your email address, used to create and identify your account.</li>
            <li><strong>Document content</strong> — the text of Terms &amp; Conditions pages you choose to save via the extension.</li>
            <li><strong>Page metadata</strong> — the URL and title of pages you save, and the date you saved them.</li>
          </ul>
          <p>We do not collect browsing history, passwords, payment information, or any data from pages you do not explicitly save.</p>
        </Section>

        <Section title="How we use your data">
          <p>Your data is used solely to provide the Service:</p>
          <ul>
            <li>To store and display the documents you have saved.</li>
            <li>To power AI-assisted analysis of those documents when you request it.</li>
          </ul>
          <p>We do not sell your data. We do not use your data for advertising.</p>
        </Section>

        <Section title="Data storage">
          <p>
            Your data is stored in Supabase (a managed PostgreSQL database) and is protected by
            row-level security — only you can access your own documents. Data is stored in the
            United States.
          </p>
        </Section>

        <Section title="Third-party services">
          <p>The Service uses the following third-party providers:</p>
          <ul>
            <li><strong>Supabase</strong> — authentication and database hosting.</li>
            <li><strong>Vercel</strong> — web application hosting.</li>
            <li><strong>Anthropic</strong> — AI document analysis (document text is sent to Anthropic&apos;s API only when you explicitly request an analysis).</li>
          </ul>
        </Section>

        <Section title="Data retention and deletion">
          <p>
            You can delete individual saved documents at any time from your dashboard.
            To delete your account and all associated data, email us at the address below.
          </p>
        </Section>

        <Section title="Chrome extension permissions">
          <p>The extension requests the following browser permissions:</p>
          <ul>
            <li><strong>activeTab</strong> — to read the content of the current page when you click &ldquo;Save&rdquo;.</li>
            <li><strong>storage</strong> — to store your authentication session locally.</li>
          </ul>
          <p>The extension does not run in the background or access pages automatically.</p>
        </Section>

        <Section title="Contact">
          <p>
            Questions or data deletion requests: <a href="mailto:maksym.d.bondarenko@gmail.com" style={{ color: "var(--accent)" }}>maksym.d.bondarenko@gmail.com</a>
          </p>
        </Section>
      </main>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 40 }}>
      <h2 style={{
        fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em",
        color: "var(--foreground)", marginBottom: 12,
        borderBottom: "1px solid var(--border)", paddingBottom: 8,
      }}>
        {title}
      </h2>
      <div style={{ color: "#c8bfb0", lineHeight: 1.75, fontSize: 15 }}>
        {children}
      </div>
    </section>
  );
}
