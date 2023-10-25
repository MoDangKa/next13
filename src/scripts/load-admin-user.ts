import bcrypt from "bcrypt";
import { Client, salt } from "./db";

// tsx src/scripts/load-admin-user.ts admin strings123
async function loadAdminUser(username: string, password: string) {
  console.log(`executing loading admin user ${username} pw ${password}`);

  const hash = await bcrypt.hash(password, salt);
  const client = await Client();
  await client.connect();
  await client.query(
    "insert into public.users (username, password, is_admin) values ($1, $2, $3)",
    [username, hash, true]
  );
  await client.end();
}

const username = process.argv[2];
const password = process.argv[3];
loadAdminUser(username, password);
