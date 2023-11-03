import { ClientQuery } from "@/scripts/db";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const json = await request.json();
  const result = await ClientQuery(
    "select id, username from users where username ilike $1",
    [json.username]
  );

  if (result.rowCount > 0) {
    return NextResponse.json({ error: "user already exists" }, { status: 400 });
  }

  const salt = parseInt(process.env.NEXT_PUBLIC_SALT!);
  const hash = await bcrypt.hash(json.password, salt);

  await ClientQuery(
    "insert into public.users (username, password) values ($1, $2)",
    [json.username, hash]
  );

  return NextResponse.json({ msg: "registration success" }, { status: 201 });
}
