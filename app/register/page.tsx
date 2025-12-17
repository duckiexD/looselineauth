// app/register/page.tsx
'use client';

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
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

    try {
      const response = await fetch("/api/auth/signup/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          name: email.split("@")[0],
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Регистрация успешна! Теперь вы можете войти.");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        setError(data.message || "Ошибка регистрации");
      }
    } catch (err) {
      setError("Ошибка сети");
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
              Email адрес
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
              Пароль
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
              Подтвердите пароль
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
              backgroundColor: loading ? "#9ca3af" : "#10b981",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              marginBottom: "20px"
            }}
          >
            {loading ? "Регистрация..." : "Зарегистрироваться"}
          </button>

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Link 
              href="/" 
              style={{
                color: "#6b7280",
                fontSize: "14px",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center"
              }}
            >
              ← На главную
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}