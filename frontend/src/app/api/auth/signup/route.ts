import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { supabaseServer } from "@/lib/supabaseServer";

const SALT_ROUNDS = 10;

export async function POST(req: NextRequest) {

  try {
    const body = await req.json();

    const { full_name, email_id, password } = body;

    // Validate required fields
    if (!full_name || !email_id || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Generate unique organization code
    const organization_code = Math.random().toString(36).substring(2, 8).toUpperCase();

    // Hash password
    const password_hash = await bcrypt.hash(password, SALT_ROUNDS);

    // Insert into organizations table (no schema prefix!)
    const { data, error } = await supabaseServer
      .from("organizations") // ✅ only table name
      .insert({ organization_code, full_name, email_id, password_hash })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Generate JWT
    const token = jwt.sign(
      { organization_id: data.organization_id, email_id: data.email_id, code: data.code },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    // Return response
    const response = NextResponse.json({
      message: "Organization created successfully",
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
      return NextResponse.json({ error: err.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
  }
}