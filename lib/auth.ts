// lib/auth.ts
import { betterAuth } from "better-auth";
import { admin } from "better-auth/plugins"; // добавляем импорт админ плагина
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

  // добавляем плагин admin
  plugins: [
    admin({
      defaultRole: "user",        // роль по умолчанию для новых пользователей
      adminRoles: ["admin"],      // роли с полными правами админа
    })
  ],
});
