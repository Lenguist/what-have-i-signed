import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "What Have I Signed? — Your T&C Archive",
  description:
    "A Chrome extension that automatically saves every Terms & Conditions you accept. Come back later and chat with AI to understand what you agreed to.",
  openGraph: {
    title: "What Have I Signed?",
    description: "Auto-captures Terms & Conditions when you click accept. Chat with AI to understand what you agreed to.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "What Have I Signed?",
    description: "Auto-captures Terms & Conditions when you click accept. Chat with AI to understand what you agreed to.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${geistMono.variable} font-[family-name:var(--font-geist)] antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
