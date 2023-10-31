import { ClientQuery } from "@/scripts/db";
import { getJWTPayload } from "@/util/auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const jwtPayload = await getJWTPayload();

  const result = await ClientQuery(
    "select id, username, avatar from users where id = $1",
    [jwtPayload.sub]
  );

  const user = result.rows[0];

  return NextResponse.json({ data: user });
}
