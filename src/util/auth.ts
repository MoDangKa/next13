import { ClientQuery } from "@/scripts/db";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function getJWTPayload() {
  const cookieStore = cookies();
  const token = cookieStore.get(process.env.JWT_TOKEN!);
  const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
  const { payload, protectedHeader } = await jwtVerify(token?.value!, secret);
  return payload;
}

export async function authorizeAdmin(func: Function) {
  const jwtPayload = await getJWTPayload();
  const result = await ClientQuery("select is_admin from users where id = $1", [
    jwtPayload.sub,
  ]);
  const data = result.rows[0];
  if (!data.is_admin) {
    return NextResponse.json({ error: "unauthorized" }, { status: 403 });
  }
  return func();
}
