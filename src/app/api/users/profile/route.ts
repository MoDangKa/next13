import { getJWTPayload } from "@/util/auth";
import { NextRequest, NextResponse } from "next/server";
import { ClientQuery } from "../../../../scripts/db";

export async function GET(request: NextRequest) {
  const jwtPayload = await getJWTPayload();

  const result = await ClientQuery(
    "select id, username, avatar from users where id = $1",
    [jwtPayload.sub]
  );

  const user = result.rows[0];

  return NextResponse.json({ data: user });
}
