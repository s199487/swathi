import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { loginUser } from "../lib/api";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await loginUser(form);
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      router.push("/dashboard");
    } catch (err) {
      setError("Invalid username or password.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <Link href="/" className="font-display font-bold text-xl text-offwhite mb-8 block text-center">
          SPEC BUSINESS
        </Link>
        <form onSubmit={handleSubmit} className="bg-surface border border-rule rounded-2xl p-8">
          <h1 className="font-display font-semibold text-xl text-offwhite mb-6">Log in</h1>
          {error && <p className="text-sm text-red-400 mb-4">{error}</p>}

          <label className="block text-xs text-offwhite/50 mb-1.5">Username</label>
          <input
            className="w-full bg-black border border-rule rounded-lg px-4 py-2.5 mb-4 text-offwhite placeholder-offwhite/30 focus:outline-none focus:border-offwhite/40"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />

          <label className="block text-xs text-offwhite/50 mb-1.5">Password</label>
          <input
            type="password"
            className="w-full bg-black border border-rule rounded-lg px-4 py-2.5 mb-6 text-offwhite placeholder-offwhite/30 focus:outline-none focus:border-offwhite/40"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button
            type="submit"
            className="w-full bg-offwhite text-black rounded-full py-2.5 font-medium hover:bg-offwhite/90"
          >
            Log in
          </button>
        </form>
        <p className="text-center text-sm text-offwhite/40 mt-6">
          No account?{" "}
          <Link href="/register" className="text-offwhite hover:underline">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}
