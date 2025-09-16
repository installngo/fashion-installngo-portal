import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

// GET categories by organization
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const orgId = searchParams.get("orgId");

  if (!orgId) {
    return NextResponse.json({ error: "orgId is required" }, { status: 400 });
  }

  const { data, error } = await supabaseServer
    .from("categories")
    .select("*")
    .eq("organization_id", orgId)
    .order("created_at");

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// POST insert new category
export async function POST(req: Request) {
  const body = await req.json();

  const { data, error } = await supabaseServer.rpc("manage_category", {
    p_mode: "INSERT",
    p_category_id: null,
    p_org_id: body.orgId,
    p_title: body.categoryTitle,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// PUT update category
export async function PUT(req: Request) {
  const body = await req.json();

  if (!body.categoryId) {
    return NextResponse.json({ error: "categoryId is required" }, { status: 400 });
  }

  const { data, error } = await supabaseServer.rpc("manage_category", {
    p_mode: "UPDATE",
    p_category_id: body.categoryId,
    p_org_id: body.orgId,
    p_title: body.categoryTitle,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// DELETE category
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const categoryId = searchParams.get("categoryId");

  if (!categoryId) {
    return NextResponse.json({ error: "categoryId is required" }, { status: 400 });
  }

  const { data, error } = await supabaseServer.rpc("manage_category", {
    p_mode: "DELETE",
    p_category_id: categoryId,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
