import { loadEnvConfig } from "@next/env";
import { Client } from "pg";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

export async function getClient() {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    port: parseInt(process.env.POSTGRES_PORT!),
  });
  return client;
}

export const salt = 10;
