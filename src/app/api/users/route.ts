import { ClientQuery } from "@/scripts/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json(
      { error: "username filter required" },
      { status: 400 }
    );
  }

  const result = await ClientQuery(
    "select id, username, avatar from users where username ilike $1",
    [username]
  );

  return NextResponse.json({ data: result.rows });
}
