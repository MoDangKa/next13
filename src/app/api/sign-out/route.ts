import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const response = NextResponse.json({ msg: "sign out success" });
  const jwtToken = process.env.JWT_TOKEN!;
  response.cookies.delete(jwtToken);
  return response;
}
