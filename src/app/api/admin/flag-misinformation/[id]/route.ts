import { ClientQuery } from "@/scripts/db";
import { authorizeAdmin } from "@/util/auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  return authorizeAdmin(async () => {
    const { id } = params;
    console.log(`flagging ${id} as misinformation`);
    await ClientQuery(
      "update posts set is_misinformation = true, is_misinformation_flagged_at = now() where id = $1",
      [id]
    );
    return NextResponse.json({ msg: "flagged as misinformation" });
  });
}
