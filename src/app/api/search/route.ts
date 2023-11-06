import { ClientQuery } from "@/scripts/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get("q");

  if (!search) {
    return NextResponse.json(
      { error: "search param required" },
      { status: 400 }
    );
  }

  const result = await ClientQuery(
    "select id, username, avatar from users where username ilike $1 limit 10",
    [`%${search}%`]
  );

  return NextResponse.json({ data: result.rows });
}
