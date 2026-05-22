"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type User = {
  id: number;
  email: string;
  role: number;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("http://localhost:8080/users");
      const data = await res.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

    const handleDelete = async (id: number) => {
        if (!confirm("本当に削除しますか？")) return;

        const response = await fetch(`http://localhost:8080/users/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            alert("削除に失敗しました");
            return;
        }

        setUsers((prev) => prev.filter((user) => user.id !== id));// 削除成功したユーザーを画面からも消す(削除したユーザーを残して表示している)
    };
  return (
    <div style={{ padding: "40px", backgroundColor: "#f5f6fa", minHeight: "100vh" }}>
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          background: "white",
          borderRadius: "12px",
          padding: "24px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ marginBottom: "20px", fontSize: "24px", fontWeight: "bold" }}>
          ユーザー一覧
        </h1>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f1f3f5" }}>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Role</th>
              <th>操作</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={tdStyle}>{user.id}</td>
                <td style={tdStyle}>
                  <Link href={`/users/${user.id}`} style={{ color: "#3b82f6", textDecoration: "underline" }}>
                    {user.email}
                  </Link>
                </td>
                <td style={tdStyle}>
                  {user.role === 1 ? "管理者" : "一般ユーザー"}
                </td>
                <td>
                    <button
                    onClick={() => handleDelete(user.id)}
                    style={{
                        backgroundColor: "#ef4444",
                        color: "white",
                        padding: "4px 10px",
                        borderRadius: "6px",
                        border: "none",
                        cursor: "pointer",
                    }}
                    >
                    削除
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const thStyle = {
  textAlign: "left" as const,
  padding: "12px",
  fontWeight: "600",
};

const tdStyle = {
  padding: "12px",
};
``