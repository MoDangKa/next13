import { ClientQuery } from "../../../scripts/db";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const json = await request.json();
  const result = await ClientQuery(
    "select id, username, password from users where username ilike $1",
    [json.username]
  );

  const jwtToken = process.env.NEXT_PUBLIC_JWT_TOKEN!;

  if (result.rowCount === 0) {
    const response = NextResponse.json(
      { error: "user not found" },
      { status: 404 }
    );
    response.cookies.delete(jwtToken);
    return response;
  }

  const user = result.rows[0];
  const match = await bcrypt.compare(json.password, user.password);
  if (!match) {
    const response = NextResponse.json(
      { error: "invalid credentials" },
      { status: 401 }
    );
    response.cookies.delete(jwtToken);
    return response;
  }

  const token = await new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime("2w")
    .sign(new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET));

  const response = NextResponse.json({ msg: "login success" });

  response.cookies.set(jwtToken, token, {
    sameSite: "strict",
    httpOnly: true,
    secure: true,
  });

  return response;
}
