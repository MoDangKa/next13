import { ClientQuery } from "@/scripts/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const result = await ClientQuery(
    "delete from posts where is_misinformation = true and is_misinformation_flagged_at <= now() - interval '1 minute'"
  );
  return NextResponse.json({
    msg: `misinformation posts deleted ${result.rowCount}`,
  });
}
