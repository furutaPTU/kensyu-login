"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";



export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const checkLogin = async () => {
        const response = await fetch("http://localhost:8080/me", {
            credentials: "include", // クッキーを送信するために必要
        });

        if (response.ok) {
            return; //ここではまだリダイレクトしない。ログインしていないことを示すだけ
        }
       await new Promise((r) => setTimeout(r, 1000)); // 1秒待つ

        router.push("/"); // ログインしていない場合はログインページへリダイレクト
    };

    checkLogin();
  }, []);
  return (
    <div style={{ padding: "20px" }}>
      <h1>ログインした人だけが見られるホーム画面</h1>
      <p>ログイン成功しました 🎉</p>
    </div>
  );
}