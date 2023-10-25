import { ClientQuery } from "@/scripts/db";
import { NextResponse } from "next/server";

export async function GET() {
  const createTableText = `
  drop table follows;
  drop table posts;
  drop table users;
  drop extension citext;
  `;

  try {
    await ClientQuery(createTableText);
  } catch (e) {
    return NextResponse.json(
      { message: "drop tables failed" },
      { status: 404 }
    );
  }

  return NextResponse.json({ message: "drop tables succeed" });
}
