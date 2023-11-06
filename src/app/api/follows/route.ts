import { ClientQuery } from "@/scripts/db";
import { getJWTPayload } from "@/util/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const jwtPayload = await getJWTPayload();
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get("user_id");

  const result = await ClientQuery(
    "select * from follows where user_id = $1 and follower_id = $2",
    [userId, jwtPayload.sub]
  );

  return NextResponse.json({ data: result.rows });
}

export async function POST(request: NextRequest) {
  const jwtPayload = await getJWTPayload();
  const json = await request.json();

  const result = await ClientQuery(
    "select * from follows where user_id = $1 and follower_id = $2",
    [json.user_id, jwtPayload.sub]
  );

  if (result.rowCount > 0) {
    return NextResponse.json({ error: "already following" }, { status: 409 });
  }

  await ClientQuery(
    "insert into follows (user_id, follower_id) values ($1, $2)",
    [json.user_id, jwtPayload.sub]
  );

  return NextResponse.json({ msg: "follow success" });
}
