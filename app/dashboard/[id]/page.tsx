"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface Document {
  id: string;
  url: string;
  title: string;
  raw_text: string;
  word_count: number;
  captured_at: string;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long", day: "numeric", year: "numeric",
  });
}

export default function DocumentPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [doc, setDoc] = useState<Document | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { router.replace("/login"); return; }

      const res = await fetch(`/api/documents/${id}`, {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });

      if (!res.ok) { router.replace("/dashboard"); return; }

      const json = await res.json();
      setDoc(json.document);
      setLoading(false);
    }
    load();
  }, [id, router]);

  if (loading) {
    return (
      <div style={{ background: "var(--background)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "var(--muted)" }}>Loading...</p>
      </div>
    );
  }

  if (!doc) return null;

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
          height: 56, display: "flex", alignItems: "center", gap: 16,
        }}>
          <button
            onClick={() => router.push("/dashboard")}
            style={{ background: "none", border: "none", color: "var(--muted)", fontSize: 13, cursor: "pointer" }}
          >
            ← Archive
          </button>
          <span style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 13, color: "var(--muted)",
          }}>
            {doc.title}
          </span>
        </div>
      </nav>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px 24px" }}>
        {/* Metadata */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 12 }}>
            {doc.title}
          </h1>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <span style={{ fontSize: 13, color: "var(--muted)" }}>
              Saved {formatDate(doc.captured_at)}
            </span>
            <span style={{ fontSize: 13, color: "var(--muted)" }}>
              {doc.word_count.toLocaleString()} words
            </span>
            <a
              href={doc.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: 13, color: "var(--accent)", textDecoration: "none" }}
            >
              Original →
            </a>
          </div>
        </div>

        {/* Document text */}
        <div style={{
          background: "var(--card)", border: "1px solid var(--border)",
          borderRadius: 12, padding: 32,
        }}>
          <pre style={{
            fontFamily: "inherit", fontSize: 14, lineHeight: 1.8,
            color: "var(--foreground)", whiteSpace: "pre-wrap", wordBreak: "break-word",
            margin: 0,
          }}>
            {doc.raw_text}
          </pre>
        </div>
      </div>
    </div>
  );
}
