"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type User = {
  id: number;
  email: string;
  role: number;
};

export default function UserDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(0);
  const [saving, setSaving] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`http://localhost:8080/users/${id}`);
      if (!res.ok) return;
      const data: User = await res.json();
      setUser(data);
      setEmail(data.email);
      setRole(data.role);
    };
    fetchUser();
  }, [id]);

  const handlePasswordChange = async () => {
    setChangingPassword(true);
    const res = await fetch(`http://localhost:8080/users/${id}/password`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    setChangingPassword(false);
    const message = await res.text();
    if (!res.ok) {
      alert(message);
      return;
    }
    alert(message);
    setCurrentPassword("");
    setNewPassword("");
  };

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch(`http://localhost:8080/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, role }),
    });
    setSaving(false);
    if (!res.ok) {
      alert("更新に失敗しました");
      return;
    }
    alert("更新しました");
    router.push("/users");
  };

  if (!user) return <div style={{ padding: "40px" }}>読み込み中...</div>;

  return (
    <div style={{ padding: "40px", backgroundColor: "#f5f6fa", minHeight: "100vh" }}>
      <div
        style={{
          maxWidth: "480px",
          margin: "0 auto",
          background: "white",
          borderRadius: "12px",
          padding: "32px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ marginBottom: "24px", fontSize: "22px", fontWeight: "bold" }}>
          ユーザー詳細 (ID: {user.id})
        </h1>

        <div style={{ marginBottom: "16px" }}>
          <label style={labelStyle}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: "24px" }}>
          <label style={labelStyle}>Role</label>
          <select
            value={role}
            onChange={(e) => setRole(Number(e.target.value))}
            style={inputStyle}
          >
            <option value={0}>一般ユーザー</option>
            <option value={1}>管理者</option>
          </select>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              backgroundColor: "#3b82f6",
              color: "white",
              padding: "8px 20px",
              borderRadius: "6px",
              border: "none",
              cursor: saving ? "not-allowed" : "pointer",
              opacity: saving ? 0.7 : 1,
            }}
          >
            {saving ? "保存中..." : "保存"}
          </button>
          <button
            onClick={() => router.push("/users")}
            style={{
              backgroundColor: "#e5e7eb",
              color: "#374151",
              padding: "8px 20px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
            }}
          >
            戻る
          </button>
        </div>

        <hr style={{ margin: "24px 0", borderColor: "#e5e7eb" }} />

        <h2 style={{ marginBottom: "16px", fontSize: "18px", fontWeight: "bold" }}>
          パスワード変更
        </h2>

        <div style={{ marginBottom: "16px" }}>
          <label style={labelStyle}>現在のパスワード</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: "24px" }}>
          <label style={labelStyle}>新しいパスワード</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={inputStyle}
          />
        </div>

        <button
          onClick={handlePasswordChange}
          disabled={changingPassword}
          style={{
            backgroundColor: "#10b981",
            color: "white",
            padding: "8px 20px",
            borderRadius: "6px",
            border: "none",
            cursor: changingPassword ? "not-allowed" : "pointer",
            opacity: changingPassword ? 0.7 : 1,
          }}
        >
          {changingPassword ? "変更中..." : "パスワードを変更"}
        </button>
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: "6px",
  fontWeight: "600",
  fontSize: "14px",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "8px 12px",
  border: "1px solid #d1d5db",
  borderRadius: "6px",
  fontSize: "14px",
  boxSizing: "border-box",
};
