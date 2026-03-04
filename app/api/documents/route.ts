import { NextRequest, NextResponse } from "next/server";
import { getUserFromToken, supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

// GET /api/documents — list all documents for the authenticated user
export async function GET(req: NextRequest) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await getUserFromToken(token);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabaseAdmin
    .from("documents")
    .select("id, url, title, word_count, captured_at")
    .eq("user_id", user.id)
    .order("captured_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ documents: data });
}

// POST /api/documents — save a new document
export async function POST(req: NextRequest) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await getUserFromToken(token);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  if (!body?.url || !body?.text) {
    return NextResponse.json({ error: "Missing url or text" }, { status: 400 });
  }

  const { url, title, text, wordCount } = body;

  const { data, error } = await supabaseAdmin
    .from("documents")
    .insert({
      user_id: user.id,
      url,
      title: title ?? url,
      raw_text: text,
      word_count: wordCount ?? text.split(/\s+/).filter(Boolean).length,
    })
    .select("id")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ id: data.id }, { status: 201 });
}
