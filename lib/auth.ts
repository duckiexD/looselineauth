// lib/auth.ts
import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";

const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
});

export const auth = betterAuth({
  database: {
    dialect: dialect,
    type: "postgres",
  },
  
  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.NEXTAUTH_URL || "http://localhost:3000", 
  
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },
  
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
});