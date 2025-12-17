// app/login/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// 🔴 ВАЖНО: тот же список что и в других файлах!
const ADMIN_EMAILS = process.env.NEXT_PUBLIC_ADMIN_EMAILS 
  ? process.env.NEXT_PUBLIC_ADMIN_EMAILS.split(',').map(e => e.trim().toLowerCase())
  : ['admin@example.com'];

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('🔐 Отправка запроса на вход для:', email);
      
      // 🔴 КЛЮЧЕВОЕ ИЗМЕНЕНИЕ: используем callbackURL на страницу проверки роли
      const requestBody = {
        email,
        password,
        callbackURL: '/auth/redirect' // Перенаправляем на страницу проверки роли
      };

      console.log('📤 Тело запроса:', requestBody);

      // Пробуем оба возможных пути Better-auth
      const pathsToTry = [
        '/api/auth/sign-in/email',
        '/api/auth/signin/email'
      ];

      let response;
      let responseData;

      for (const path of pathsToTry) {
        try {
          console.log(`🔄 Пробуем путь: ${path}`);
          response = await fetch(path, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
            credentials: 'include' // Важно для cookies
          });
          
          console.log(`📥 Ответ от ${path}: статус ${response.status}`);
          
          if (response.status !== 404) {
            const text = await response.text();
            console.log(`📄 Ответ текст:`, text);
            
            if (text) {
              try {
                responseData = JSON.parse(text);
                console.log(`✅ JSON парсинг успешен:`, responseData);
              } catch (parseError) {
                console.log(`❌ Ответ не JSON`);
                responseData = { message: text };
              }
            }
            break; // если путь работает, выходим из цикла
          }
        } catch (err) {
          console.log(`❌ Ошибка пути ${path}:`, err);
        }
      }

      if (!response) {
        throw new Error('Все пути аутентификации не работают. Проверьте настройки Better-auth.');
      }

      if (response.ok) {
        console.log('✅ Вход успешен!');
        console.log('📊 Данные ответа:', responseData);
        
        // 🔴 ПРОВЕРЯЕМ РОЛЬ ПОЛЬЗОВАТЕЛЯ СРАЗУ ПОСЛЕ ВХОДА
        const userEmail = email.toLowerCase();
        const isAdmin = ADMIN_EMAILS.includes(userEmail);
        
        console.log(`👤 Email пользователя: ${userEmail}`);
        console.log(`👑 Админ emails: ${ADMIN_EMAILS}`);
        console.log(`🔐 Является админом: ${isAdmin}`);
        
        if (isAdmin) {
          console.log(`🚀 ${userEmail} - АДМИН! Редирект в админ-панель...`);
          // Даем время для установки сессии
          setTimeout(() => {
            router.push('/admin');
            router.refresh();
          }, 300);
        } else {
          console.log(`👤 ${userEmail} - обычный пользователь. Редирект в кабинет...`);
          setTimeout(() => {
            router.push('/dashboard');
            router.refresh();
          }, 300);
        }
        
      } else {
        const errorMsg = responseData?.error?.message || 
                        responseData?.message || 
                        responseData?.error ||
                        `Ошибка входа (${response.status})`;
        
        console.log('❌ Ошибка входа:', errorMsg);
        console.log('📄 Полный ответ:', responseData);
        
        setError(errorMsg);
      }
    } catch (err: any) {
      console.error('🔥 Неожиданная ошибка:', err);
      setError(err.message || 'Ошибка сервера. Попробуйте снова.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f9fafb',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '400px',
        width: '100%',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '40px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '8px'
          }}>
            🔐 Вход в систему
          </h1>
          <p style={{
            color: '#6b7280',
            fontSize: '14px'
          }}>
            Или{' '}
            <Link 
              href="/register" 
              style={{
                color: '#3b82f6',
                fontWeight: '500',
                textDecoration: 'none'
              }}
            >
              зарегистрируйтесь
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div style={{
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ color: '#dc2626', marginRight: '8px' }}>⚠️</span>
                <span style={{ color: '#7f1d1d', fontSize: '14px' }}>{error}</span>
              </div>
            </div>
          )}

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '6px'
            }}>
              Email адрес
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '6px'
            }}>
              Пароль
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ваш пароль"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: loading ? '#9ca3af' : '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginBottom: '20px'
            }}
          >
            {loading ? 'Вход...' : 'Войти'}
          </button>

          <div style={{ textAlign: 'center' }}>
            <Link 
              href="/" 
              style={{
                color: '#6b7280',
                fontSize: '14px',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              ← Вернуться на главную
            </Link>
          </div>
        </form>

        {/* Информация для администраторов */}
        <div style={{
          marginTop: '30px',
          padding: '20px',
          backgroundColor: '#f0f9ff',
          borderRadius: '8px',
          border: '1px solid #bae6fd'  // ИСПРАВЛЕНО: закрытая строка
        }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#0369a1',
            marginBottom: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            👑 Для администраторов
          </h3>
          
          <div style={{ fontSize: '13px', color: '#64748b' }}>
            <p style={{ marginBottom: '8px' }}>
              <strong>Администраторы системы:</strong>
            </p>
            {ADMIN_EMAILS.map((adminEmail, index) => (
              <div key={index} style={{
                backgroundColor: 'white',
                padding: '8px 12px',
                borderRadius: '6px',
                marginBottom: '6px',
                border: '1px solid #bae6fd',  // ИСПРАВЛЕНО: закрытая строка
                fontFamily: 'monospace',
                fontSize: '12px'
              }}>
                {adminEmail}
              </div>
            ))}
            <p style={{ marginTop: '12px', fontSize: '12px' }}>
              При входе под этими email вы будете перенаправлены в админ-панель.
            </p>
          </div>
        </div>

        {/* Тестовые данные */}
        <div style={{
          marginTop: '20px',
          padding: '16px',
          backgroundColor: '#f3f4f6',
          borderRadius: '8px',
          fontSize: '12px',
          color: '#6b7280',
          textAlign: 'center'
        }}>
          <p style={{ margin: 0 }}>
            <strong>Тестовые данные:</strong><br />
            <span style={{ fontFamily: 'monospace' }}>
              Email: admin@example.com<br />
              Пароль: Admin123!
            </span>
          </p>
        </div>

        {/* Ссылка на отладку */}
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <Link 
            href="/debug-auth" 
            style={{
              color: '#8b5cf6',
              fontSize: '12px',
              textDecoration: 'none',
              fontFamily: 'monospace'
            }}
          >
            🐞 /debug-auth (проверить сессию)
          </Link>
        </div>
      </div>
    </div>
  );
}