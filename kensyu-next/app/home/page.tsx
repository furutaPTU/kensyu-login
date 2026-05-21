"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const checkLogin = async () => {
      const response = await fetch("http://localhost:8080/me", {
        credentials: "include",
      });

      if (response.ok) return;

      await new Promise((r) => setTimeout(r, 1000));
      router.push("/");
    };

    checkLogin();
  }, [router]);

  return (
    <div
      style={{
        backgroundColor: "#f5f6fa",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
          textAlign: "center",
          width: "400px",
        }}
      >
        <h1 style={{ fontSize: "22px", marginBottom: "10px" }}>
          ホーム画面
        </h1>

        <p style={{ marginBottom: "30px", color: "#666" }}>
          ログイン成功しました 🎉
        </p>

        {/* ✅ ユーザー一覧へ */}
        <button
          onClick={() => router.push("/users")}
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#4f46e5",
            color: "white",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          ユーザー一覧を見る
        </button>
      </div>
    </div>
  );
}