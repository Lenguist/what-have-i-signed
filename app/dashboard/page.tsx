"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface Document {
  id: string;
  url: string;
  title: string;
  word_count: number;
  captured_at: string;
}

function hostname(url: string) {
  try { return new URL(url).hostname.replace("www.", ""); }
  catch { return url; }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });
}

export default function Dashboard() {
  const router = useRouter();
  const [docs, setDocs] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { router.replace("/login"); return; }

      const res = await fetch("/api/documents", {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      if (res.ok) {
        const json = await res.json();
        setDocs(json.documents);
      }
      setLoading(false);
    }
    load();
  }, [router]);

  async function deleteDoc(id: string) {
    if (!confirm("Delete this document?")) return;
    setDeleting(id);

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    await fetch(`/api/documents/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${session.access_token}` },
    });

    setDocs((prev) => prev.filter((d) => d.id !== id));
    setDeleting(null);
  }

  async function signOut() {
    await supabase.auth.signOut();
    router.replace("/login");
  }

  return (
    <div style={{ background: "var(--background)", minHeight: "100vh" }}>
      {/* Nav */}
      <nav style={{
        borderBottom: "1px solid var(--border)",
        position: "sticky", top: 0, zIndex: 50,
        backdropFilter: "blur(12px)",
        background: "rgba(8, 12, 20, 0.9)",
      }}>
        <div style={{
          maxWidth: 960, margin: "0 auto", padding: "0 24px",
          height: 56, display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <span style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 15, fontWeight: 700, color: "var(--accent)",
          }}>
            what-have-i-signed
          </span>
          <button
            onClick={signOut}
            style={{
              background: "none", border: "none", color: "var(--muted)",
              fontSize: 13, cursor: "pointer",
            }}
          >
            Sign out
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "48px 24px" }}>
        <div style={{ marginBottom: 40, display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 6 }}>
              My archive
            </h1>
            <p style={{ color: "var(--muted)", fontSize: 15 }}>
              {loading ? "Loading..." : `${docs.length} document${docs.length !== 1 ? "s" : ""} saved`}
            </p>
          </div>
        </div>

        {loading && (
          <p style={{ color: "var(--muted)" }}>Loading your archive...</p>
        )}

        {!loading && docs.length === 0 && (
          <div style={{
            padding: 40, textAlign: "center",
            background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12,
          }}>
            <p style={{ color: "var(--muted)", marginBottom: 8 }}>No documents saved yet.</p>
            <p style={{ color: "var(--muted)", fontSize: 14 }}>
              Install the Chrome extension and click &ldquo;Save this T&amp;C&rdquo; on any sign-up page.
            </p>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {docs.map((doc) => (
            <div
              key={doc.id}
              style={{
                background: "var(--card)", border: "1px solid var(--border)",
                borderRadius: 10, padding: "18px 20px",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                gap: 16,
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4, display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{
                    fontFamily: "var(--font-geist-mono), monospace",
                    fontSize: 12, color: "var(--accent)",
                    background: "rgba(59,130,246,0.1)", padding: "2px 8px", borderRadius: 4,
                    whiteSpace: "nowrap",
                  }}>
                    {hostname(doc.url)}
                  </span>
                  <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {doc.title}
                  </span>
                </div>
                <div style={{ fontSize: 13, color: "var(--muted)" }}>
                  {formatDate(doc.captured_at)} · {doc.word_count.toLocaleString()} words
                </div>
              </div>

              <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                <button
                  onClick={() => router.push(`/dashboard/${doc.id}`)}
                  style={{
                    padding: "7px 14px", borderRadius: 6,
                    background: "var(--accent)", color: "#fff",
                    border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer",
                  }}
                >
                  View
                </button>
                <button
                  onClick={() => deleteDoc(doc.id)}
                  disabled={deleting === doc.id}
                  style={{
                    padding: "7px 10px", borderRadius: 6,
                    background: "none", color: "var(--muted)",
                    border: "1px solid var(--border)", fontSize: 13, cursor: "pointer",
                  }}
                >
                  {deleting === doc.id ? "..." : "✕"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
