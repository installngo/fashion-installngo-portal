"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@context/AuthContext";

export default function Signup() {
  const router = useRouter();
  const { login } = useAuth();
  const [form, setForm] = useState({ full_name: "", email_id: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.full_name || !form.email_id || !form.password || !form.confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/admin/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: form.full_name,
          email_id: form.email_id,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Signup failed");
        setLoading(false);
        return;
      }

      // Pass token, organization_id, and code to AuthContext
      login(data.token, data.organization.organization_id, data.organization.code);

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
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="full_name" placeholder="Full Name" value={form.full_name} onChange={handleChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"/>
          <input type="email" name="email_id" placeholder="Email" value={form.email_id} onChange={handleChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"/>
          <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"/>
          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"/>
          <button type="submit" className={`w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition ${loading ? "opacity-70 cursor-not-allowed" : ""}`} disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Already have an account? <span className="text-blue-600 cursor-pointer hover:underline" onClick={() => router.push("/login")}>Login</span>
        </p>
      </div>
    </main>
  );
}
