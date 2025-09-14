"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ email_id: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.email_id || !form.password) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email_id: form.email_id,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      // Pass token, organization_id, and code to AuthContext
      login(data.token, data.organization.organization_id, data.organization.code);
      router.push("/admin");

    } catch (err: unknown) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" name="email_id" placeholder="Email" value={form.email_id} onChange={handleChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"/>
          <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"/>
          <button type="submit" className={`w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition ${loading ? "opacity-70 cursor-not-allowed" : ""}`} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Dont have an account? <span className="text-blue-600 cursor-pointer hover:underline" onClick={() => router.push("/signup")}>Sign Up</span>
        </p>
      </div>
    </main>
  );
}
