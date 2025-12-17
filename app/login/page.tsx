// app/login/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
      console.log('Sending login request...');
      
      // Пробуем оба пути, так как в зависимости от версии Better-auth может быть разный путь
      const pathsToTry = [
        '/api/auth/sign-in/email',
        '/api/auth/signin/email'
      ];

      let response;
      let lastError;

      for (const path of pathsToTry) {
        try {
          console.log(`Trying path: ${path}`);
          response = await fetch(path, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email,
              password,
              callbackURL: '/dashboard', // указываем куда редиректить после входа
            }),
          });
          
          if (response.status !== 404) {
            break; // если путь работает, выходим из цикла
          }
        } catch (err) {
          lastError = err;
        }
      }

      if (!response) {
        throw new Error('Все пути аутентификации не работают');
      }

      console.log('Response status:', response.status);
      
      const responseText = await response.text();
      console.log('Response text:', responseText);

      let data;
      if (responseText) {
        try {
          data = JSON.parse(responseText);
          console.log('Parsed data:', data);
        } catch (parseError) {
          console.log('Response is not JSON');
        }
      }

      if (response.ok) {
        console.log('✅ Login successful, redirecting to dashboard...');
        
        // Ждем немного перед редиректом, чтобы сессия установилась
        setTimeout(() => {
          router.push('/dashboard');
          router.refresh(); // обновляем данные приложения
        }, 500);
        
      } else {
        const errorMsg = data?.error?.message || 
                        data?.message || 
                        data?.error ||
                        `Ошибка входа (${response.status})`;
        console.log('❌ Login error:', errorMsg);
        setError(errorMsg);
      }
    } catch (err: any) {
      console.error('❌ Login catch error:', err);
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
            🔐 Вход в аккаунт
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
              placeholder="ваш@email.com"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '16px',
                boxSizing: 'border-box',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
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
                boxSizing: 'border-box',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
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
              transition: 'background-color 0.2s',
              marginBottom: '20px'
            }}
            onMouseOver={(e) => {
              if (!loading) e.currentTarget.style.backgroundColor = '#2563eb';
            }}
            onMouseOut={(e) => {
              if (!loading) e.currentTarget.style.backgroundColor = '#3b82f6';
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

        <div style={{
          marginTop: '30px',
          padding: '16px',
          backgroundColor: '#f3f4f6',
          borderRadius: '8px',
          fontSize: '12px',
          color: '#6b7280',
          textAlign: 'center'
        }}>
          <p style={{ margin: 0 }}>
            <strong>Тестовые данные:</strong><br />
            Email: <strong>test@example.com</strong><br />
            Пароль: <strong>password123</strong>
          </p>
        </div>
      </div>
    </div>
  );
}