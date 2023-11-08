import { ClientQuery } from "@/scripts/db";
import { getJWTPayload } from "@/util/auth";
import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const jwtPayload = await getJWTPayload();
  const searchParams = request.nextUrl.searchParams;
  const filename = searchParams.get("filename")!;

  const blob = await put(filename, request.body!, {
    access: "public",
  });

  await ClientQuery("update users set avatar = $1 where id = $2", [
    blob.url,
    jwtPayload.sub,
  ]);

  return NextResponse.json(blob);
}
