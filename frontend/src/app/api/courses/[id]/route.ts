import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

// 🔹 Update course
export async function PUT(req: Request) {
  // Extract courseId from URL
  const url = new URL(req.url);
  const courseId = url.pathname.split("/").pop(); // gets [id] from /api/courses/[id]

  if (!courseId) {
    return NextResponse.json({ error: "courseId is required" }, { status: 400 });
  }

  const body = await req.json();

  const { data, error } = await supabaseServer.rpc("manage_course", {
    p_mode: "UPDATE",
    p_course_id: courseId,
    p_org_id: body.orgId,
    p_title: body.courseTitle,
    p_category_id: body.categoryId,
    p_subcategory_id: body.subcategoryId,
    p_type: body.type,
    p_duration: body.duration,
    p_status: body.status,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// 🔹 Suspend course
export async function PATCH(req: Request) {
  const url = new URL(req.url);
  const courseId = url.pathname.split("/").pop();

  if (!courseId) {
    return NextResponse.json({ error: "courseId is required" }, { status: 400 });
  }

  const { data, error } = await supabaseServer.rpc("manage_course", {
    p_mode: "SUSPEND",
    p_course_id: courseId,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ message: "Course suspended successfully", data });
}

// 🔹 Delete course
export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const courseId = url.pathname.split("/").pop();

  if (!courseId) {
    return NextResponse.json({ error: "courseId is required" }, { status: 400 });
  }

  const { data, error } = await supabaseServer.rpc("manage_course", {
    p_mode: "DELETE",
    p_course_id: courseId,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ message: "Course deleted successfully", data });
}