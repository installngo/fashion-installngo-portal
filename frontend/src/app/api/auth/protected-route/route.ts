import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@lib/authMiddleware";

export async function GET(req: NextRequest) {
  // Check authentication
  const user = requireAuth(req);

  // If unauthorized, requireAuth already returns NextResponse
  if (user instanceof NextResponse) return user;

  // Example response for authorized users
  return NextResponse.json({
    message: `Hello ${user.email_id}, you are authorized!`,
    organization_id: user.organization_id,
  });
}