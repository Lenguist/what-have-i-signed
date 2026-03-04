"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setSent(true);
    }
    setLoading(false);
  }

  return (
    <div style={{
      background: "var(--background)", minHeight: "100vh",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "24px",
    }}>
      <div style={{ width: "100%", maxWidth: 400 }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <span style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 16, fontWeight: 700, color: "var(--accent)",
          }}>
            what-have-i-signed
          </span>
          <h1 style={{ fontSize: 26, fontWeight: 700, marginTop: 16, letterSpacing: "-0.02em" }}>
            Sign in
          </h1>
          <p style={{ color: "var(--muted)", marginTop: 8, fontSize: 15 }}>
            We&apos;ll email you a magic link.
          </p>
        </div>

        {sent ? (
          <div style={{
            padding: 24, background: "rgba(74, 222, 128, 0.08)",
            border: "1px solid rgba(74, 222, 128, 0.25)", borderRadius: 12,
            textAlign: "center",
          }}>
            <div style={{ fontSize: 28, marginBottom: 12 }}>📬</div>
            <p style={{ fontWeight: 600, marginBottom: 8 }}>Check your email</p>
            <p style={{ color: "var(--muted)", fontSize: 14 }}>
              We sent a link to <strong>{email}</strong>. Click it to sign in.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                padding: "12px 16px", borderRadius: 8,
                border: "1px solid var(--border)",
                background: "var(--card)", color: "var(--foreground)",
                fontSize: 15, outline: "none", width: "100%",
              }}
            />
            {error && (
              <p style={{ color: "#f87171", fontSize: 13 }}>{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              style={{
                background: "var(--accent)", color: "#fff",
                padding: "12px", borderRadius: 8,
                border: "none", fontWeight: 700, fontSize: 15,
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.6 : 1,
              }}
            >
              {loading ? "Sending..." : "Send magic link"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
