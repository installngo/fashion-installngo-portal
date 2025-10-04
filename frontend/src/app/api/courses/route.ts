import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { requireAuth } from "@/lib/authMiddleware";

// ✅ CREATE
export async function POST(req: NextRequest) {
  const user = requireAuth(req);
  if (!user) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();

    const { data, error } = await supabaseServer.rpc("sp_manage_courses", {
      p_action: "insert",
      p_organization_id: user.organization_id,
      p_course_title: body.course_title,
      p_course_description: body.course_description,
      p_thumbnail_url: body.thumbnail_url,
      p_category_code: body.category_code,
      p_sub_category_code: body.sub_category_code,
      p_course_type: body.course_type,
      p_validity_code: body.validity_code,
      p_original_price: body.original_price,
      p_discount_price: body.discount_price,
      p_effective_price: body.effective_price,
      p_status_code: body.status_code,
    });

    if (error) {
      console.error("Supabase RPC Error:", error.message);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("POST /courses Error:", err.message);
      return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

// ✅ UPDATE
export async function PUT(req: NextRequest) {
  const user = requireAuth(req);
  if (!user) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();

    const { data, error } = await supabaseServer.rpc("sp_manage_courses", {
      p_action: "update",
      p_course_id: body.course_id,
      p_course_title: body.course_title,
      p_course_description: body.course_description,
      p_thumbnail_url: body.thumbnail_url,
      p_category_code: body.category_code,
      p_sub_category_code: body.sub_category_code,
      p_course_type: body.course_type,
      p_validity_code: body.validity_code,
      p_original_price: body.original_price,
      p_discount_price: body.discount_price,
      p_effective_price: body.effective_price,
      p_status_code: body.status_code,
    });

    if (error) {
      console.error("Supabase RPC Error:", error.message);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("PUT /courses Error:", err.message);
      return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

// ✅ DELETE
export async function DELETE(req: NextRequest) {
  const user = requireAuth(req);
  if (!user) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const course_id = searchParams.get("course_id");

    if (!course_id) {
      return NextResponse.json({ success: false, error: "Missing course_id" }, { status: 400 });
    }

    const { data, error } = await supabaseServer.rpc("sp_manage_courses", {
      p_action: "delete",
      p_course_id: course_id,
    });

    if (error) {
      console.error("Supabase RPC Error:", error.message);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("DELETE /courses Error:", err.message);
      return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

// ✅ GET
export async function GET(req: NextRequest) {
  const user = requireAuth(req);
  if (!user) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const course_id = searchParams.get("course_id");

    const action = course_id ? "get_one" : "get_all";

    const { data, error } = await supabaseServer.rpc("sp_manage_courses", {
      p_action: action,
      p_organization_id: user.organization_id,
      p_course_id: course_id,
    });

    if (error) {
      console.error("Supabase RPC Error:", error.message);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("GET /courses Error:", err.message);
      return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}