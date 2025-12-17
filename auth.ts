import { betterAuth } from "better-auth"
import { Pool } from "pg"

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.DATABASE_URL 
  }),
  
  // Включаем аутентификацию по email и паролю
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },
  
  // Секретный ключ для шифрования сессий и токенов
  secret: process.env.BETTER_AUTH_SECRET,
  
  // Настройки сессии (опционально)
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 дней
    updateAge: 60 * 60 * 24, // обновлять каждые 24 часа
  },
})