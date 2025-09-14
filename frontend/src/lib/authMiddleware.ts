import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Define the payload type returned from JWT
export interface AuthPayload {
  organization_id: string;
  email_id: string;
}

/**
 * Verifies JWT from the Authorization header.
 * @param req NextRequest
 * @returns AuthPayload or null
 */
export function verifyJWT(req: NextRequest): AuthPayload | null {
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) return null;

    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as AuthPayload;
    return payload;
  } catch (err) {
    console.error("JWT verification failed:", err);
    return null;
  }
}

/**
 * Middleware helper to require authentication in API routes.
 * Returns AuthPayload if valid, or sends 401 response.
 */
export function requireAuth(req: NextRequest) {
  const user = verifyJWT(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return user;
}