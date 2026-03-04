"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

// Supabase redirects here after magic link click.
// We grab the session, send the token to the extension if present, then redirect to dashboard.
export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    async function handleCallback() {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;

      if (token) {
        // If opened from the extension, send the token back to it
        // The extension's background service worker listens for this message
        const extensionId = new URLSearchParams(window.location.search).get("ext");
        if (extensionId) {
          try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (window as any).chrome?.runtime?.sendMessage(extensionId, {
              type: "SET_AUTH_TOKEN",
              token,
            });
          } catch {
            // chrome not available (e.g. Firefox) — ignore
          }
        }
      }

      router.replace("/dashboard");
    }

    handleCallback();
  }, [router]);

  return (
    <div style={{
      background: "var(--background)", minHeight: "100vh",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <p style={{ color: "var(--muted)" }}>Signing you in...</p>
    </div>
  );
}
