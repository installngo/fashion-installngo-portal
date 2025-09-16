import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

// GET subcategories by categoryId
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const categoryId = searchParams.get("categoryId");

  if (!categoryId) {
    return NextResponse.json({ error: "categoryId is required" }, { status: 400 });
  }

  const { data, error } = await supabaseServer
    .from("subcategories")
    .select("*")
    .eq("category_id", categoryId)
    .order("created_at");

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// POST insert new subcategory
export async function POST(req: Request) {
  const body = await req.json();

  const { data, error } = await supabaseServer.rpc("manage_subcategory", {
    p_mode: "INSERT",
    p_subcategory_id: null,
    p_category_id: body.categoryId,
    p_title: body.subcategoryTitle,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// PUT update subcategory
export async function PUT(req: Request) {
  const body = await req.json();

  if (!body.subcategoryId) {
    return NextResponse.json({ error: "subcategoryId is required" }, { status: 400 });
  }

  const { data, error } = await supabaseServer.rpc("manage_subcategory", {
    p_mode: "UPDATE",
    p_subcategory_id: body.subcategoryId,
    p_category_id: body.categoryId,
    p_title: body.subcategoryTitle,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// DELETE subcategory
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const subcategoryId = searchParams.get("subcategoryId");

  if (!subcategoryId) {
    return NextResponse.json({ error: "subcategoryId is required" }, { status: 400 });
  }

  const { data, error } = await supabaseServer.rpc("manage_subcategory", {
    p_mode: "DELETE",
    p_subcategory_id: subcategoryId,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
