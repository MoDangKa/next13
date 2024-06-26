import { loadEnvConfig } from "@next/env";
import pg, { ClientConfig, QueryResult } from "pg";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

export async function Client(): Promise<pg.Client> {
  if (process.env.POSTGRES_URL) {
    const client = new pg.Client({
      connectionString: process.env.POSTGRES_URL + "?sslmode=require",
    });
    return client;
  }
  const config: ClientConfig = {
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT!),
    database: process.env.POSTGRES_DATABASE,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
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
