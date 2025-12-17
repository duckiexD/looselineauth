"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

type User = {
  id: string;
  email: string | null;
  role: string;
  banned: boolean;
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        // listUsers ожидает объект с полем query
        const res = await authClient.admin.listUsers({
          query: {
            // все поля внутри query опциональные, поэтому оставляем пустым объектом
            // при необходимости можно указать limit, offset, searchValue и т.д.
          },
        });

        if (!res.error && res.data) {
          setUsers(res.data.users as User[]);
        }
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) return <div>Загрузка пользователей…</div>;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Пользователи</h1>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            <th className="border px-2 py-1">Email</th>
            <th className="border px-2 py-1">Роль</th>
            <th className="border px-2 py-1">Статус</th>
            <th className="border px-2 py-1">Действия</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td className="border px-2 py-1">{u.email}</td>
              <td className="border px-2 py-1">{u.role}</td>
              <td className="border px-2 py-1">
                {u.banned ? "Заблокирован" : "Активен"}
              </td>
              <td className="border px-2 py-1 space-x-2">
                {/* Переключение роли */}
                <button
                  className="text-blue-600 underline"
                  onClick={async () => {
                    const newRole = u.role === "admin" ? "user" : "admin";

                    await authClient.admin.setRole({
                      userId: u.id,
                      role: newRole,
                    });

                    setUsers((prev) =>
                      prev.map((x) =>
                        x.id === u.id ? { ...x, role: newRole } : x,
                      ),
                    );
                  }}
                >
                  Перекл. роль
                </button>

                {/* Бан / разбан */}
                <button
                  className="text-red-600 underline"
                  onClick={async () => {
                    if (u.banned) {
                      // Разбан
                      await authClient.admin.unbanUser({ userId: u.id });
                      setUsers((prev) =>
                        prev.map((x) =>
                          x.id === u.id ? { ...x, banned: false } : x,
                        ),
                      );
                    } else {
                      // Бан
                      await authClient.admin.banUser({
                        userId: u.id,
                        banReason: "Заблокирован администратором",
                        // banExpiresIn: 60 * 60 * 24, // при желании срок бана в секундах
                      });
                      setUsers((prev) =>
                        prev.map((x) =>
                          x.id === u.id ? { ...x, banned: true } : x,
                        ),
                      );
                    }
                  }}
                >
                  {u.banned ? "Разблок." : "Заблок."}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
