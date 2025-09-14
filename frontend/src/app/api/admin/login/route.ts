import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { supabaseAdmin } from "@lib/supabaseAdminClient";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email_id, password } = body;

    if (!email_id || !password) {
      return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from("organizations")
      .select("*")
      .eq("email_id", email_id)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, data.password_hash);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // Generate JWT
    const token = jwt.sign(
      { organization_id: data.organization_id, email_id: data.email_id },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    // Return response with Authorization header
    const response = NextResponse.json({
      message: "Login successful",
      organization: {
        organization_id: data.organization_id,
        code: data.code,
        full_name: data.full_name,
        email_id: data.email_id,
        status_code: data.status_code,
      },
      token,
    });

    response.headers.set("Authorization", `Bearer ${token}`);
    return response;

  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
      return NextResponse.json({ error: err.message }, { status: 500 });
    } else {
      console.error(err);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
  }
}