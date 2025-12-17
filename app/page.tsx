// app/page.tsx
'use client';

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
      color: "white",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    }}>
      {/* Hero Section */}
      <div style={{
        padding: "100px 20px",
        textAlign: "center",
        background: "radial-gradient(circle at 50% 0%, rgba(56, 189, 248, 0.1) 0%, transparent 50%)"
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto"
        }}>
          <div style={{
            display: "inline-block",
            padding: "10px 25px",
            background: "rgba(56, 189, 248, 0.1)",
            border: "1px solid rgba(56, 189, 248, 0.3)",
            borderRadius: "30px",
            marginBottom: "30px",
            fontSize: "0.9rem",
            fontWeight: "500",
            color: "#38bdf8",
            letterSpacing: "1px"
          }}>
            🚀 БЕТТИНГ ПЛАТФОРМА НОВОГО ПОКОЛЕНИЯ
          </div>
          
          <h1 style={{
            fontSize: "5rem",
            fontWeight: "900",
            marginBottom: "30px",
            background: "linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #c084fc 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-2px",
            lineHeight: "1",
            marginTop: "20px"
          }}>
            LooseLine
          </h1>
          
          <p style={{
            fontSize: "1.8rem",
            color: "#cbd5e1",
            marginBottom: "50px",
            maxWidth: "800px",
            margin: "0 auto",
            fontWeight: "300",
            lineHeight: "1.5"
          }}>
            Самая безопасная и технологичная букмекерская платформа.<br/>
            Ставки нового уровня с молниеносной аутентификацией.
          </p>

          {/* CTA Buttons */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "25px",
            marginBottom: "80px",
            flexWrap: "wrap"
          }}>
            <InteractiveLink 
              href="/login" 
              gradient="linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%)"
              shadowColor="rgba(56, 189, 248, 0.4)"
              emoji="🎯"
              text="Начать делать ставки"
            />
            
            <InteractiveLink 
              href="/register" 
              gradient="linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)"
              shadowColor="rgba(139, 92, 246, 0.4)"
              emoji="💰"
              text="Создать аккаунт"
            />
          </div>

          {/* Stats */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "60px",
            flexWrap: "wrap",
            marginTop: "80px"
          }}>
            <StatItem number="99.9%" label="Аптайм" />
            <StatItem number="<100мс" label="Скорость ставок" />
            <StatItem number="256-bit" label="Шифрование" />
            <StatItem number="24/7" label="Поддержка" />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div style={{
        padding: "100px 20px",
        background: "rgba(15, 23, 42, 0.8)"
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto"
        }}>
          <h2 style={{
            fontSize: "3.5rem",
            fontWeight: "800",
            marginBottom: "80px",
            textAlign: "center",
            background: "linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            Почему выбирают LooseLine?
          </h2>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "40px"
          }}>
            <FeatureCard 
              emoji="🛡️"
              title="Максимальная безопасность"
              description="Банковское шифрование и двухфакторная аутентификация. Ваши средства и данные под защитой военного уровня."
              color="#38bdf8"
            />
            
            <FeatureCard 
              emoji="⚡"
              title="Мгновенные выплаты"
              description="Выводите выигрыши за секунды. Никаких ожиданий — получайте свои деньги моментально."
              color="#10b981"
            />
            
            <FeatureCard 
              emoji="📊"
              title="Продвинутая аналитика"
              description="AI-анализ коэффициентов и умные рекомендации. Делайте ставки на основе данных, а не удачи."
              color="#8b5cf6"
            />
            
            <FeatureCard 
              emoji="🎮"
              title="Live-ставки"
              description="Ставки в реальном времени с минимальной задержкой. Почувствуйте адреналин live-событий."
              color="#f59e0b"
            />
            
            <FeatureCard 
              emoji="📱"
              title="Удобный интерфейс"
              description="Адаптивный дизайн для любых устройств. Делайте ставки где угодно и когда угодно."
              color="#ec4899"
            />
            
            <FeatureCard 
              emoji="🔒"
              title="Честная игра"
              description="Прозрачные алгоритмы и проверенные коэффициенты. Мы играем по правилам."
              color="#ef4444"
            />
          </div>
        </div>
      </div>

      {/* Auth Status Section */}
      <div style={{
        padding: "80px 20px",
        background: "linear-gradient(135deg, rgba(56, 189, 248, 0.1) 0%, rgba(15, 23, 42, 0.8) 100%)"
      }}>
        <div style={{
          maxWidth: "1000px",
          margin: "0 auto",
          background: "rgba(30, 41, 59, 0.6)",
          borderRadius: "25px",
          padding: "60px",
          border: "1px solid rgba(56, 189, 248, 0.2)",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)"
        }}>
          <h2 style={{
            fontSize: "2.8rem",
            fontWeight: "800",
            marginBottom: "50px",
            textAlign: "center",
            color: "#f8fafc"
          }}>
            <span style={{ color: "#38bdf8" }}>Система</span> аутентификации
          </h2>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "40px",
            textAlign: "center"
          }}>
            <StatusItem 
              emoji="✅"
              title="Безопасный вход"
              status="Активен"
              description="BetterAuth с 2FA"
              color="#10b981"
            />
            
            <StatusItem 
              emoji="✅"
              title="Регистрация"
              status="Доступна"
              description="Менее 30 секунд"
              color="#10b981"
            />
            
            <StatusItem 
              emoji="🔐"
              title="Шифрование"
              status="256-bit"
              description="Банковский уровень"
              color="#38bdf8"
            />
            
            <StatusItem 
              emoji="⚡"
              title="Скорость API"
              status="<50мс"
              description="Мгновенный ответ"
              color="#f59e0b"
            />
          </div>
          
          <div style={{
            textAlign: "center",
            marginTop: "60px",
            paddingTop: "40px",
            borderTop: "1px solid rgba(56, 189, 248, 0.2)"
          }}>
            <p style={{
              color: "#94a3b8",
              fontSize: "1.1rem",
              marginBottom: "30px"
            }}>
              Готовы начать? Присоединяйтесь к тысячам довольных игроков
            </p>
            
            <Link 
              href="/register" 
              style={{
                padding: "18px 50px",
                background: "linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%)",
                color: "white",
                borderRadius: "12px",
                textDecoration: "none",
                fontSize: "1.2rem",
                fontWeight: "700",
                display: "inline-block",
                transition: "transform 0.2s",
                boxShadow: "0 10px 30px rgba(56, 189, 248, 0.4)"
              }}
            >
              🚀 Начать бесплатно
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        padding: "60px 20px",
        background: "rgba(15, 23, 42, 0.95)",
        borderTop: "1px solid rgba(56, 189, 248, 0.1)",
        textAlign: "center"
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto"
        }}>
          <div style={{
            fontSize: "2.5rem",
            fontWeight: "900",
            marginBottom: "20px",
            background: "linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            LooseLine
          </div>
          
          <p style={{
            color: "#94a3b8",
            fontSize: "1rem",
            marginBottom: "40px",
            maxWidth: "600px",
            margin: "0 auto"
          }}>
            © 2024 LooseLine Betting Platform. Все права защищены.<br/>
            Ответственная игра. Только для лиц старше 18 лет.
          </p>
          
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "30px",
            flexWrap: "wrap",
            marginBottom: "40px"
          }}>
            <span style={{ color: "#64748b" }}>Licensed & Regulated</span>
            <span style={{ color: "#64748b" }}>SSL Secured</span>
            <span style={{ color: "#64748b" }}>Responsible Gaming</span>
            <span style={{ color: "#64748b" }}>24/7 Support</span>
          </div>
          
          <div style={{
            color: "#475569",
            fontSize: "0.9rem"
          }}>
            Next.js • BetterAuth • TypeScript • Secure Infrastructure
          </div>
        </div>
      </div>
    </div>
  );
}

// Компоненты
function InteractiveLink({ 
  href, 
  gradient, 
  shadowColor, 
  emoji, 
  text 
}: { 
  href: string; 
  gradient: string; 
  shadowColor: string; 
  emoji: string; 
  text: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link 
      href={href}
      style={{
        padding: "20px 45px",
        background: gradient,
        color: "white",
        borderRadius: "12px",
        textDecoration: "none",
        fontSize: "1.2rem",
        fontWeight: "700",
        minWidth: "250px",
        textAlign: "center",
        boxShadow: isHovered 
          ? `0 20px 40px ${shadowColor.replace('0.4', '0.6')}` 
          : `0 10px 30px ${shadowColor}`,
        transition: "all 0.3s ease",
        border: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
        transform: isHovered ? "translateY(-5px)" : "translateY(0)"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span style={{ fontSize: "1.5rem" }}>{emoji}</span>
      {text}
    </Link>
  );
}

function StatItem({ number, label }: { number: string; label: string }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{
        fontSize: "2.8rem",
        fontWeight: "800",
        marginBottom: "10px",
        background: "linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent"
      }}>
        {number}
      </div>
      <div style={{
        color: "#cbd5e1",
        fontSize: "1rem",
        fontWeight: "500"
      }}>
        {label}
      </div>
    </div>
  );
}

function FeatureCard({ 
  emoji, 
  title, 
  description, 
  color 
}: { 
  emoji: string; 
  title: string; 
  description: string; 
  color: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      style={{
        padding: "35px",
        background: "rgba(30, 41, 59, 0.6)",
        borderRadius: "20px",
        border: `1px solid ${color}20`,
        transition: "all 0.3s ease",
        transform: isHovered ? "translateY(-10px)" : "translateY(0)",
        boxShadow: isHovered ? `0 20px 40px ${color}20` : "0 10px 30px rgba(0, 0, 0, 0.2)"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{
        fontSize: "3rem",
        marginBottom: "25px",
        display: "inline-block"
      }}>
        {emoji}
      </div>
      <h3 style={{
        fontSize: "1.6rem",
        fontWeight: "700",
        marginBottom: "15px",
        color: "#f8fafc"
      }}>
        {title}
      </h3>
      <p style={{
        color: "#94a3b8",
        fontSize: "1.05rem",
        lineHeight: "1.6",
        fontWeight: "400"
      }}>
        {description}
      </p>
    </div>
  );
}

function StatusItem({ 
  emoji, 
  title, 
  status, 
  description,
  color 
}: { 
  emoji: string; 
  title: string; 
  status: string; 
  description: string;
  color: string;
}) {
  return (
    <div style={{ padding: "25px" }}>
      <div style={{
        fontSize: "3rem",
        marginBottom: "15px",
        display: "inline-block"
      }}>
        {emoji}
      </div>
      <h3 style={{
        fontSize: "1.4rem",
        fontWeight: "700",
        marginBottom: "8px",
        color: "#f8fafc"
      }}>
        {title}
      </h3>
      <div style={{
        color: color,
        fontSize: "1.8rem",
        fontWeight: "800",
        marginBottom: "8px"
      }}>
        {status}
      </div>
      <p style={{
        color: "#94a3b8",
        fontSize: "0.95rem"
      }}>
        {description}
      </p>
    </div>
  );
}