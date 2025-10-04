import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { requireAuth } from "@/lib/authMiddleware";

export async function POST(req: NextRequest) {
  const user = requireAuth(req);

  if (!user) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const { code_type } = body;

    if (!code_type) {
      return NextResponse.json(
        { success: false, error: "Missing code_type" },
        { status: 400 }
      );
    }

    // Call stored procedure
    const { data, error } = await supabaseServer.rpc(
      "sp_get_code_subcode_master",
      { p_code_type: code_type }
    );

    if (error) {
      console.error("Supabase RPC Error:", error.message);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Master data retrieved successfully",
      code_type,
      data,
      user, // you can omit this if you don’t want to expose JWT payload
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Route Error:", err.message);
      return NextResponse.json(
        { success: false, error: err.message },
        { status: 500 }
      );
    }
    console.error("Unexpected Error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
