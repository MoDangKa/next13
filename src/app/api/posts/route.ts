import { ClientQuery } from "@/scripts/db";
import { getJWTPayload } from "@/util/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const jwtPayload = await getJWTPayload();
  const searchParams = request.nextUrl.searchParams;
  const username = searchParams.get("username");
  const page =
    (searchParams.get("page") && parseInt(searchParams.get("page")!)) || 0;

  const limit = 3;
  const offset = page * limit;

  if (username) {
    // todo
  }

  const result = await ClientQuery(
    `select p.*, u.avatar, u.username from posts p
    inner join users u on p.user_id = u.id where user_id = $1
    order by created_at desc limit $2 offset $3`,
    [jwtPayload.sub, limit, offset]
  );

  return NextResponse.json({ data: result.rows });
}
