import { loadEnvConfig } from "@next/env";
import pg, { ClientConfig, QueryResult } from "pg";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

export async function Client(): Promise<pg.Client> {
  const config: ClientConfig = {
    host: process.env.NEXT_PUBLIC_DB_HOST,
    port: parseInt(process.env.NEXT_PUBLIC_DB_PORT!),
    database: process.env.NEXT_PUBLIC_DB_DATABASE,
    user: process.env.NEXT_PUBLIC_DB_USER,
    password: process.env.NEXT_PUBLIC_DB_PASSWORD,
  };
  const client = new pg.Client(config);
  return client;
}

export async function ClientQuery(
  sql: string,
  value?: Array<any>
): Promise<QueryResult<any>> {
  const client = await Client();
  await client.connect();
  const result = await client.query(sql, value);
  await client.end();
  return result;
}
