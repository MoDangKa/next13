// import { loadEnvConfig } from "@next/env";
import pg, { ClientConfig, QueryResult } from "pg";

// use case is for [.env] or [.env.local]
// const projectDir = process.cwd();
// loadEnvConfig(projectDir);

export async function Client(): Promise<pg.Client> {
  if (process.env.NEXT_PUBLIC_URL) {
    const client = new pg.Client({
      connectionString: process.env.NEXT_PUBLIC_URL + "?sslmode=require",
    });
    return client;
  }
  const config: ClientConfig = {
    host: process.env.NEXT_PUBLIC_HOST,
    port: parseInt(process.env.NEXT_PUBLIC_PORT!),
    database: process.env.NEXT_PUBLIC_DATABASE,
    user: process.env.NEXT_PUBLIC_USER,
    password: process.env.NEXT_PUBLIC_PASSWORD,
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
