import { ClientQuery } from "@/scripts/db";
import { getJWTPayload } from "@/util/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
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

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const body = await request.json();
  const jwtPayload = await getJWTPayload();

  const result = await ClientQuery(
    "select * from posts where user_id = $1 and id = $2",
    [jwtPayload.sub, params.id]
  );

  if (result.rowCount === 0) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  await ClientQuery(
    "update posts set content = $1 where user_id = $2 and id = $3",
    [body.content, jwtPayload.sub, params.id]
  );

  return NextResponse.json({ msg: "update success" });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const jwtPayload = await getJWTPayload();
  const result = await ClientQuery(
    "delete from posts where user_id = $1 and id = $2",
    [jwtPayload.sub, params.id]
  );

  if (result.rowCount === 1) {
    return NextResponse.json({ msg: "delete success" });
  }
  
  return NextResponse.json({ error: "not found" }, { status: 404 });
}
