import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const typeCode = searchParams.get("typeCode");

    if (!typeCode) {
      return NextResponse.json(
        { error: "Missing required parameter: typeCode" },
        { status: 400 }
      );
    }

    // Get course_type_id
    const { data: typeRow, error: typeError } = await supabaseServer
      .from("course_types")
      .select("course_type_id")
      .eq("type_code", typeCode)
      .single();

    if (typeError) {
      return NextResponse.json(
        { error: typeError.message },
        { status: 500 }
      );
    }

    if (!typeRow) {
      return NextResponse.json(
        { error: `Course type not found for code: ${typeCode}` },
        { status: 404 }
      );
    }

    // Get durations
    const { data, error } = await supabaseServer
      .from("course_durations")
      .select("duration_code, duration_name, display_sequence")
      .eq("course_type_id", typeRow.course_type_id)
      .order("display_sequence", { ascending: true });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: `No durations found for typeCode: ${typeCode}` },
        { status: 404 }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Unexpected server error" },
      { status: 500 }
    );
  }
}