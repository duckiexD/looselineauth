// app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

// Добавляем тип для пользователя
interface User {
  id: string;
  email: string;
  name?: string; // Опциональное поле, может быть undefined
  emailVerified?: boolean;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth/session')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch session');
        return res.json();
      })
      .then(data => {
        setUser(data.user || null);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Session fetch error:', error);
        setLoading(false);
      });
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/signout', { method: 'POST' });
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div style={{ 
        padding: '40px', 
        textAlign: 'center',
        fontSize: '18px',
        color: '#666'
      }}>
        ⏳ Загрузка...
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ 
        padding: '40px', 
        textAlign: 'center',
        maxWidth: '500px',
        margin: '0 auto'
      }}>
        <div style={{
          padding: '30px',
          border: '1px solid #ffcdd2',
          backgroundColor: '#ffebee',
          borderRadius: '10px',
          marginBottom: '20px'
        }}>
          <h2 style={{ color: '#c62828' }}>🚫 Доступ запрещен</h2>
          <p style={{ margin: '15px 0' }}>Пожалуйста, войдите в систему</p>
          <Link 
            href="/login"
            style={{
              display: 'inline-block',
              padding: '10px 20px',
              background: '#0070f3',
              color: 'white',
              borderRadius: '5px',
              textDecoration: 'none'
            }}
          >
            🔐 Войти
          </Link>
        </div>
        <Link 
          href="/"
          style={{
            color: '#666',
            textDecoration: 'none',
            display: 'inline-block',
            marginTop: '20px'
          }}
        >
          ← На главную
        </Link>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '40px', 
      maxWidth: '800px', 
      margin: '0 auto',
      minHeight: '60vh'
    }}>
      <div style={{
        padding: '30px',
        border: '1px solid #e0e0e0',
        borderRadius: '12px',
        backgroundColor: 'white',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
      }}>
        <h1 style={{ 
          marginBottom: '20px',
          color: '#333',
          fontSize: '28px'
        }}>
          👋 Привет, {user.name || user.email}!
        </h1>
        
        <p style={{ 
          fontSize: '16px', 
          color: '#555',
          marginBottom: '30px'
        }}>
          🎉 Вы успешно вошли в систему
        </p>

        <div style={{ 
          backgroundColor: '#f8f9fa',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '30px'
        }}>
          <h3 style={{ marginBottom: '15px' }}>📊 Информация об аккаунте:</h3>
          <div style={{ lineHeight: '2' }}>
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Имя:</strong> {user.name || 'Не указано'}</p>
            <p><strong>Email подтвержден:</strong> {user.emailVerified ? '✅ Да' : '❌ Нет'}</p>
          </div>
        </div>

        <div style={{ 
          display: 'flex', 
          gap: '15px',
          flexWrap: 'wrap'
        }}>
          <button 
            onClick={handleLogout}
            style={{
              padding: '12px 24px',
              background: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '500',
              transition: 'background 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = '#c82333'}
            onMouseOut={(e) => e.currentTarget.style.background = '#dc3545'}
          >
            🚪 Выйти
          </button>
          
          <Link 
            href="/"
            style={{
              padding: '12px 24px',
              background: '#6c757d',
              color: 'white',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: '500',
              display: 'inline-block'
            }}
          >
            ← На главную
          </Link>
          
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '12px 24px',
              background: '#17a2b8',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '500'
            }}
          >
            🔄 Обновить
          </button>
        </div>
      </div>

      <div style={{
        marginTop: '40px',
        padding: '20px',
        backgroundColor: '#e8f4fd',
        borderRadius: '8px',
        border: '1px solid #b6d4fe'
      }}>
        <h3>ℹ️ Информация о сессии</h3>
        <p>Данные сессии автоматически обновляются при каждом входе/выходе.</p>
        <p style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>
          Для проверки API перейдите по адресу: <code>/api/auth/session</code>
        </p>
      </div>
    </div>
  );
}