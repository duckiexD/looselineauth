// app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('Checking auth session...');
        
        // Better-auth с Kysely может использовать другие пути
        // Пробуем разные варианты
        const sessionPaths = [
          '/api/auth/session',
          '/api/auth/get-session',
          '/api/auth/me'
        ];
        
        let response;
        let lastError;
        
        for (const path of sessionPaths) {
          try {
            console.log(`Trying session path: ${path}`);
            response = await fetch(path, {
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
              },
            });
            
            console.log(`Path ${path} status: ${response.status}`);
            
            if (response.ok) {
              break;
            }
          } catch (err) {
            lastError = err;
            console.log(`Path ${path} error:`, err);
          }
        }
        
        if (!response) {
          console.error('All session paths failed');
          setError('Не удалось проверить сессию');
          setTimeout(() => router.push('/login'), 2000);
          return;
        }
        
        if (response.ok) {
          try {
            const data = await response.json();
            console.log('Session data:', data);
            
            // Better-auth может возвращать данные в разных форматах
            const userData = data.data?.user || data.user || data;
            
            if (userData?.email || userData?.id) {
              console.log('✅ User authenticated:', userData);
              setUser(userData);
            } else {
              console.log('❌ No user data in response');
              setError('Требуется авторизация');
              setTimeout(() => router.push('/login'), 1500);
            }
          } catch (jsonError) {
            console.error('❌ JSON parse error:', jsonError);
            setError('Ошибка данных сессии');
            setTimeout(() => router.push('/login'), 1500);
          }
        } else {
          console.log('❌ Session check failed with status:', response.status);
          
          // Пробуем прочитать текст ответа для отладки
          try {
            const text = await response.text();
            console.log('Response text:', text);
          } catch {}
          
          if (response.status === 404) {
            setError('Эндпоинт сессии не найден. Проверьте конфигурацию auth.');
          } else {
            setError(`Ошибка сервера: ${response.status}`);
          }
          
          setTimeout(() => router.push('/login'), 1500);
        }
      } catch (error) {
        console.error('❌ Auth check failed:', error);
        setError('Ошибка соединения с сервером');
        setTimeout(() => router.push('/login'), 1500);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    try {
      setLoading(true);
      console.log('Logging out...');
      
      // Пробуем разные пути для выхода
      const logoutPaths = [
        '/api/auth/signout',
        '/api/auth/logout',
        '/api/auth/sign-out'
      ];
      
      let success = false;
      
      for (const path of logoutPaths) {
        try {
          console.log(`Trying logout path: ${path}`);
          const response = await fetch(path, { 
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          });
          
          if (response.ok) {
            console.log(`✅ Logout successful via ${path}`);
            success = true;
            break;
          }
        } catch (err) {
          console.log(`Path ${path} error:`, err);
        }
      }
      
      if (success) {
        router.push('/login');
        router.refresh();
      } else {
        console.log('❌ All logout paths failed');
        setError('Не удалось выйти из системы');
      }
    } catch (error) {
      console.error('❌ Logout error:', error);
      setError('Ошибка сети при выходе');
    } finally {
      setLoading(false);
    }
  };

  // Если все еще загружается
  if (loading && !user) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9fafb'
      }}>
        <div style={{
          textAlign: 'center',
          padding: '40px',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          maxWidth: '400px',
          width: '100%'
        }}>
          <p style={{ 
            marginBottom: '20px', 
            color: '#4b5563',
            fontSize: '16px'
          }}>
            Проверка авторизации...
          </p>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid #f3f4f6',
            borderTop: '4px solid #3b82f6',
            borderRadius: '50%',
            margin: '0 auto',
            animation: 'spin 1s linear infinite'
          }}></div>
          <style jsx>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  // Если есть ошибка и нет пользователя
  if (error && !user) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9fafb'
      }}>
        <div style={{
          textAlign: 'center',
          padding: '40px',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          maxWidth: '500px',
          width: '100%'
        }}>
          <div style={{
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <span style={{ color: '#dc2626', fontSize: '20px' }}>⚠️</span>
              <span style={{ color: '#7f1d1d', fontSize: '16px' }}>{error}</span>
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
            <Link
              href="/login"
              style={{
                padding: '12px 24px',
                backgroundColor: '#3b82f6',
                color: 'white',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '500',
                transition: 'background-color 0.2s',
                minWidth: '200px',
                textAlign: 'center'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
            >
              Войти в аккаунт
            </Link>
            
            <Link
              href="/"
              style={{
                padding: '12px 24px',
                color: '#6b7280',
                textDecoration: 'none',
                fontWeight: '500',
                fontSize: '14px'
              }}
            >
              ← Вернуться на главную
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Если пользователь авторизован, показываем dashboard
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f9fafb'
    }}>
      {/* Навигация */}
      <nav style={{
        backgroundColor: 'white',
        borderBottom: '1px solid #e5e7eb',
        padding: '16px 20px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <h1 style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#1f2937',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              margin: 0
            }}>
              <span>🏠</span>
              <span>Личный кабинет</span>
            </h1>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end'
            }}>
              <span style={{
                color: '#6b7280',
                fontSize: '14px'
              }}>
                Привет,
              </span>
              <span style={{
                fontWeight: '600',
                color: '#1f2937'
              }}>
                {user?.name || user?.email?.split('@')[0] || 'Пользователь'}
              </span>
            </div>
            
            <button
              onClick={handleLogout}
              disabled={loading}
              style={{
                padding: '8px 16px',
                backgroundColor: loading ? '#9ca3af' : '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => {
                if (!loading) e.currentTarget.style.backgroundColor = '#dc2626';
              }}
              onMouseOut={(e) => {
                if (!loading) e.currentTarget.style.backgroundColor = '#ef4444';
              }}
            >
              {loading ? 'Выход...' : 'Выйти'}
            </button>
          </div>
        </div>
      </nav>

      {/* Основное содержимое */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 20px'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          padding: '40px',
          marginBottom: '30px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '30px'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              backgroundColor: '#3b82f6',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              color: 'white',
              fontWeight: 'bold'
            }}>
              {user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div>
              <h1 style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: '#1f2937',
                marginBottom: '8px'
              }}>
                Добро пожаловать, {user?.name || user?.email?.split('@')[0] || 'Пользователь'}!
              </h1>
              <p style={{
                color: '#6b7280',
                fontSize: '16px'
              }}>
                Рады видеть вас в личном кабинете
              </p>
            </div>
          </div>

          {/* Информационные карточки */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            marginBottom: '40px'
          }}>
            <div style={{
              backgroundColor: '#f8fafc',
              padding: '24px',
              borderRadius: '8px',
              border: '1px solid #e2e8f0'
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#334155',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span>👤</span> Профиль
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <div style={{ 
                    fontSize: '12px', 
                    color: '#64748b',
                    marginBottom: '4px'
                  }}>
                    Email
                  </div>
                  <div style={{ 
                    fontSize: '16px', 
                    color: '#1e293b',
                    fontWeight: '500',
                    wordBreak: 'break-all'
                  }}>
                    {user?.email || 'Не указан'}
                  </div>
                </div>
                <div>
                  <div style={{ 
                    fontSize: '12px', 
                    color: '#64748b',
                    marginBottom: '4px'
                  }}>
                    ID пользователя
                  </div>
                  <div style={{ 
                    fontSize: '14px', 
                    color: '#475569',
                    fontFamily: 'monospace',
                    wordBreak: 'break-all'
                  }}>
                    {user?.id || 'Не доступен'}
                  </div>
                </div>
              </div>
            </div>

            <div style={{
              backgroundColor: '#f0f9ff',
              padding: '24px',
              borderRadius: '8px',
              border: '1px solid #bae6fd'
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#0369a1',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span>⚡</span> Статус
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <div style={{ 
                    fontSize: '12px', 
                    color: '#64748b',
                    marginBottom: '4px'
                  }}>
                    Статус аккаунта
                  </div>
                  <div style={{ 
                    fontSize: '16px', 
                    color: '#1e293b',
                    fontWeight: '500'
                  }}>
                    <span style={{
                      backgroundColor: '#d1fae5',
                      color: '#065f46',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '14px'
                    }}>
                      Активен
                    </span>
                  </div>
                </div>
                <div>
                  <div style={{ 
                    fontSize: '12px', 
                    color: '#64748b',
                    marginBottom: '4px'
                  }}>
                    Последняя активность
                  </div>
                  <div style={{ 
                    fontSize: '16px', 
                    color: '#1e293b',
                    fontWeight: '500'
                  }}>
                    Только что
                  </div>
                </div>
              </div>
            </div>

            <div style={{
              backgroundColor: '#fefce8',
              padding: '24px',
              borderRadius: '8px',
              border: '1px solid #fde047'
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#854d0e',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span>🎯</span> Действия
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button
                  style={{
                    padding: '10px',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                    textAlign: 'left'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
                >
                  ✏️ Редактировать профиль
                </button>
                <button
                  style={{
                    padding: '10px',
                    backgroundColor: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                    textAlign: 'left'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#059669'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#10b981'}
                >
                  🔒 Настройки безопасности
                </button>
              </div>
            </div>
          </div>

          {/* Кнопка возврата */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '30px',
            paddingTop: '30px',
            borderTop: '1px solid #e5e7eb'
          }}>
            <Link
              href="/"
              style={{
                padding: '12px 24px',
                backgroundColor: '#f3f4f6',
                color: '#374151',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#e5e7eb';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#f3f4f6';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              ← На главную страницу
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}