'use client';

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Пароли не совпадают");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Пароль должен быть не менее 6 символов");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/sign-up/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          name: name || email.split("@")[0],
        }),
      });

      let data;
      try {
        const text = await response.text();
        data = text ? JSON.parse(text) : {};
      } catch (e) {
        console.error("Ошибка при разборе JSON:", e);
        throw new Error("Неверный формат ответа от сервера");
      }

      console.log("Response:", response.status, data);

      if (response.ok) {
        setSuccess("Регистрация успешна! Перенаправляем на вход...");
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } else {
        // Обработка ошибок Better-auth
        const errorMessage = data?.error?.message || 
                            data?.message || 
                            data?.error || 
                            response.statusText ||
                            `Ошибка регистрации (${response.status})`;
        setError(errorMessage);
      }
    } catch (err: any) {
      console.error("Registration error:", err);
      setError(err.message || "Ошибка сети");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f9fafb",
      padding: "20px"
    }}>
      <div style={{
        maxWidth: "400px",
        width: "100%",
        backgroundColor: "white",
        borderRadius: "12px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        padding: "40px"
      }}>
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h1 style={{
            fontSize: "28px",
            fontWeight: "bold",
            color: "#1f2937",
            marginBottom: "8px"
          }}>
            📝 Регистрация
          </h1>
          <p style={{
            color: "#6b7280",
            fontSize: "14px"
          }}>
            Или{" "}
            <Link 
              href="/login" 
              style={{
                color: "#3b82f6",
                fontWeight: "500",
                textDecoration: "none"
              }}
            >
              войдите в аккаунт
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div style={{
              backgroundColor: "#fef2f2",
              border: "1px solid #fecaca",
              borderRadius: "8px",
              padding: "16px",
              marginBottom: "20px"
            }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ color: "#dc2626", marginRight: "8px" }}>⚠️</span>
                <span style={{ color: "#7f1d1d", fontSize: "14px" }}>{error}</span>
              </div>
            </div>
          )}

          {success && (
            <div style={{
              backgroundColor: "#d1fae5",
              border: "1px solid #a7f3d0",
              borderRadius: "8px",
              padding: "16px",
              marginBottom: "20px"
            }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ color: "#059669", marginRight: "8px" }}>✅</span>
                <span style={{ color: "#065f46", fontSize: "14px" }}>{success}</span>
              </div>
            </div>
          )}

          <div style={{ marginBottom: "20px" }}>
            <label style={{
              display: "block",
              fontSize: "14px",
              fontWeight: "500",
              color: "#374151",
              marginBottom: "6px"
            }}>
              Имя (опционально)
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ваше имя"
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                fontSize: "16px",
                boxSizing: "border-box"
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{
              display: "block",
              fontSize: "14px",
              fontWeight: "500",
              color: "#374151",
              marginBottom: "6px"
            }}>
              Email адрес *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ваш@email.com"
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                fontSize: "16px",
                boxSizing: "border-box"
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{
              display: "block",
              fontSize: "14px",
              fontWeight: "500",
              color: "#374151",
              marginBottom: "6px"
            }}>
              Пароль * (мин. 6 символов)
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Придумайте пароль"
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                fontSize: "16px",
                boxSizing: "border-box"
              }}
            />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label style={{
              display: "block",
              fontSize: "14px",
              fontWeight: "500",
              color: "#374151",
              marginBottom: "6px"
            }}>
              Подтвердите пароль *
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Повторите пароль"
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                fontSize: "16px",
                boxSizing: "border-box"
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              backgroundColor: loading ? "#9ca3af" : "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              marginBottom: "20px",
              transition: "background-color 0.2s"
            }}
            onMouseEnter={(e) => {
              if (!loading) e.currentTarget.style.backgroundColor = "#2563eb";
            }}
            onMouseLeave={(e) => {
              if (!loading) e.currentTarget.style.backgroundColor = "#3b82f6";
            }}
          >
            {loading ? "Регистрация..." : "Зарегистрироваться"}
          </button>

          <div style={{ textAlign: "center" }}>
            <Link 
              href="/login" 
              style={{
                color: "#6b7280",
                fontSize: "14px",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px"
              }}
            >
              Уже есть аккаунт? <span style={{ color: "#3b82f6" }}>Войти</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}