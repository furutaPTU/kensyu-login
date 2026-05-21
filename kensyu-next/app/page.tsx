"use client";
import { routerServerGlobal } from "next/dist/server/lib/router-utils/router-server-context";
import { use, useState } from "react";//ユーザー入力を受け取る
import { useRouter } from "next/navigation";//ページ遷移のためのフック

export default function Home() {

  const [mode, setMode] = useState("login"); //ログインとサインアップの切り替え
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    console.log("password:", password);
    const response = await fetch(mode === "login" ? "http://localhost:8080/login" : "http://localhost:8080/register", {
      method:  "POST",
      credentials: "include", // クッキーを送信するために必要,この通信ではクッキーを送信する許可を与える
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const text = await response.text();
    setMessage(text);

    if (mode === "login" && text.includes("成功")) {
      router.push("/home");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">

        <h1 className="text-2xl font-bold mb-4 text-center">
          {mode === "login" ? "ログイン" : "サインアップ"}
        </h1>

        
        <div className="flex mb-4">
          <button
            onClick={() => setMode("login")}
            className={`w-1/2 py-2 ${
              mode === "login" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            ログイン
          </button>
          <button
            onClick={() => setMode("register")}
            className={`w-1/2 py-2 ${
              mode === "register" ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
          >
            サインアップ
          </button>
        </div>

        <input
          type="text"
          placeholder="メールアドレス"
          className="w-full border px-3 py-2 rounded mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="パスワード"
          className="w-full border px-3 py-2 rounded mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {mode === "login" ? "ログイン" : "サインアップ"}
        </button>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-700">
            {message}
          </p>
        )}

      </div>
    </div>
  );
}