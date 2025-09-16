import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

// GET all courses (by orgId)
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const orgId = searchParams.get("orgId");

  if (!orgId) {
    return NextResponse.json({ error: "orgId is required" }, { status: 400 });
  }

  const { data, error } = await supabaseServer.rpc("get_courses", { org_id: orgId });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// POST insert new course
export async function POST(req: Request) {
  const body = await req.json();

  const { data, error } = await supabaseServer.rpc("manage_course", {
    p_mode: "INSERT",
    p_course_id: null,
    p_org_id: body.orgId,
    p_name: body.courseTitle,
    p_description: body.courseDescription,
    p_thumbnail: body.thumbnailUrl,
    p_category_id: body.categoryId,
    p_subcategory_id: body.subcategoryId,
    p_type_code: body.courseTypeCode,
    p_duration_code: body.courseDurationCode,
    p_price: body.price,
    p_discount: body.discountPrice,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}