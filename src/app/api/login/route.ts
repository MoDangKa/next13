import { ClientQuery } from "@/scripts/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  const json = await request.json();
  const result = await ClientQuery(
    "select id, username, password from users where username ilike $1",
    [json.username]
  );

  if (result.rowCount === 0) {
    return NextResponse.json({ error: "user not found" }, { status: 404 });
  }

  //   const user = result.rows[0];
  //   const match = await bcrypt.compare(json.password, user.password);
  //   if (!match) {
  //     return NextResponse.json({ error: "invalid credentials" }, { status: 401 });
  //   }

  return NextResponse.json({ data: result.rows[0] });
}
