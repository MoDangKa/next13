import { ClientQuery } from "@/scripts/db";
import { getJWTPayload } from "@/util/auth";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  const jwtPayload = await getJWTPayload();
  const result = await ClientQuery(
    "select * from posts where id = $1 and user_id = $2",
    [params.id, jwtPayload.sub]
  );

  if (result.rowCount === 0) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
  return NextResponse.json({ data: result.rows[0] });
}
