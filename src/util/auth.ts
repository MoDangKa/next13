import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export async function getJWTPayload() {
  const cookieStore = cookies();
  const token = cookieStore.get(process.env.NEXT_PUBLIC_JWT_TOKEN!);
  const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET!);
  const { payload, protectedHeader } = await jwtVerify(token?.value!, secret);
  return payload;
}
