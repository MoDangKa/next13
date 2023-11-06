import { ClientQuery } from "../../../scripts/db";
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

  const sql = `select p.*, u.avatar, u.username from posts p
  inner join users u on p.user_id = u.id where user_id = $1
  order by created_at desc limit $2 offset $3`;

  if (username) {
    const userResult = await ClientQuery(
      "select * from users where username = $1",
      [username]
    );

    if (userResult.rowCount === 0) {
      return NextResponse.json({ error: "not found" }, { status: 404 });
    }

    const user = userResult.rows[0];
    const postsResult = await ClientQuery(sql, [user.id, limit, offset]);
    return NextResponse.json({ data: postsResult.rows });
  }

  const result = await ClientQuery(sql, [jwtPayload.sub, limit, offset]);

  return NextResponse.json({ data: result.rows });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const jwtPayload = await getJWTPayload();

  const result = await ClientQuery(
    "insert into posts (user_id, content) values ($1, $2) returning *",
    [jwtPayload.sub, body.content]
  );

  return NextResponse.json({ data: result.rows[0] }, { status: 201 });
}
