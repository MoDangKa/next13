import { ClientQuery } from "@/scripts/db";
import { getJWTPayload } from "@/util/auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page =
    (searchParams.get("page") && parseInt(searchParams.get("page")!)) || 0;
  console.log("page:", page);
  const limit = 10;
  const offset = page * limit;
  const jwtPayload = await getJWTPayload();

  const result = await ClientQuery(
    `select p.*, u.username, u.avatar from posts p inner join users u on p.user_id = u.id where user_id in (select user_id from follows where follower_id = $1) order by created_at desc limit $2 offset $3;`,
    [jwtPayload.sub, limit, offset]
  );

  return NextResponse.json({ data: result.rows });
}
