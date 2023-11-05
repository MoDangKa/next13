import { ClientQuery } from "@/scripts/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const searchParams = request.nextUrl.searchParams;
  const page =
    (searchParams.get("page") && parseInt(searchParams.get("page")!)) || 0;

  const limit = 5;
  const offset = page * limit;

  const result = await ClientQuery(
    `select u.id, u.username, u.avatar from users u
    inner join follows f on u.id = f.follower_id
    where user_id = $1 limit $2 offset $3`,
    [params.id, limit, offset]
  );

  return NextResponse.json({ data: result.rows });
}
