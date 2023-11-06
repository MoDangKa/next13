import { ClientQuery } from "@/scripts/db";
import { getJWTPayload } from "@/util/auth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { user_id: number } }
) {
  const jwtPayload = await getJWTPayload();
  const userId = params.user_id;
  await ClientQuery(
    "delete from follows where user_id = $1 and follower_id = $2",
    [userId, jwtPayload.sub]
  );
  return NextResponse.json({ msg: "follow deleted" });
}
