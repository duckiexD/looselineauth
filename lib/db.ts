// lib/db.ts

// 1. Переносим все типы прямо в этот файл
interface UserTable {
  id: string;
  name: string | null;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
  role: string;
  banned: boolean;
  banReason: string | null;
  banExpires: Date | null;
  password: string | null;
}

interface SessionTable {
  id: string;
  expiresAt: Date;
  token: string;
  createdAt: Date;
  updatedAt: Date;
  ipAddress: string | null;
  userAgent: string | null;
  userId: string | null;
  impersonatedBy: string | null;
}

interface AccountTable {
  id: string;
  accountId: string;
  providerId: string;
  userId: string;
  accessToken: string | null;
  refreshToken: string | null;
  idToken: string | null;
  accessTokenExpiresAt: Date | null;
  refreshTokenExpiresAt: Date | null;
  scope: string | null;
  password: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface VerificationTable {
  id: string;
  identifier: string;
  value: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Главный интерфейс базы данных
interface DatabaseSchema {
  user: UserTable;
  session: SessionTable;
  account: AccountTable;
  verification: VerificationTable;
}

// 2. Проверка переменных окружения
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set in environment variables');
}

// 3. Импорты
import { Pool } from 'pg';
import { Kysely, PostgresDialect } from 'kysely';

// 4. Создаем пул соединений
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

// 5. Обработка ошибок пула
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

// 6. Создаем диалект
const dialect = new PostgresDialect({
  pool: pool,
});

// 7. Создаем экземпляр Kysely
const dbInstance = new Kysely<DatabaseSchema>({
  dialect,
  log: (event) => {
    if (event.level === 'error') {
      console.error('Kysely error:', event.error);
    }
  },
});

// 8. Экспортируем
export const db = dbInstance;
export default dbInstance;

// 9. Экспортируем типы
export type Database = DatabaseSchema;
export type { UserTable, SessionTable, AccountTable, VerificationTable };