"use client";

import { useState } from "react";
import { useTranslation } from "../context/TranslationContext";
import { useRouter } from "next/navigation";
import { useLoading } from "../context/LoadingContext";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export default function LandingPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { show, hide } = useLoading();
  const { login } = useAuth();
  const { showToast } = useToast();

  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    full_name: "",
    email_id: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (
      !form.email_id ||
      !form.password ||
      (!isLogin && !form.full_name) ||
      (!isLogin && !form.confirmPassword)
    ) {
      setError("All fields are required.");
      return;
    }

    if (!isLogin && form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    show();

    try {
      const endpoint = isLogin ? "/api/admin/login" : "/api/admin/signup";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || (isLogin ? "Login failed" : "Signup failed"));
        return;
      }

      if (isLogin) {
        login(
          data.token,
          data.organization.organization_id,
          data.organization.code
        );
        showToast("Login successful!", "success");
        router.push("/admin/dashboard");
      } else {
        // signup success: switch to login
        setIsLogin(true);
        setForm({
          full_name: "",
          email_id: "",
          password: "",
          confirmPassword: "",
        });
        showToast("Signup successful! Please login.", "success");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      hide();
    }
  };

  return (
    <main className="flex min-h-screen w-full">
      {/* Left: Welcome content */}
      <section className="hidden md:flex flex-1 flex-col items-center text-center justify-center p-12">
        <h1 className="mb-2">{t("welcomeTitle")}</h1>
        <h5>{t("welcomeSubtitle")}</h5>
      </section>

      {/* Right: Login/Signup form */}
      <section className="flex flex-1 items-center justify-center p-8">
        <div className="w-full max-w-md bg-white p-10 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-center text-[#D97B66] mb-6">
            {isLogin ? "Login" : "Sign Up"}
          </h2>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <input
                type="text"
                name="full_name"
                placeholder="Full Name"
                value={form.full_name}
                onChange={handleChange}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#D97B66]"
              />
            )}
            <input
              type="email"
              name="email_id"
              placeholder="Email"
              value={form.email_id}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#D97B66]"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#D97B66]"
            />
            {!isLogin && (
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#D97B66]"
              />
            )}
            <button
              type="submit"
              className={`w-full p-3 rounded-md font-medium text-white ${
                loading
                  ? "bg-[#D97B66]/70 cursor-not-allowed"
                  : "bg-[#C26457] hover:bg-[#D97B66]"
              } transition`}
              disabled={loading}
            >
              {loading
                ? isLogin
                  ? "Logging in..."
                  : "Signing up..."
                : isLogin
                ? "Login"
                : "Sign Up"}
            </button>
          </form>

          <p className="mt-4 text-center text-[#707B93]">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <span
              className="text-[#D97B66] cursor-pointer hover:underline"
              onClick={() => {
                setIsLogin(!isLogin);
                setForm({
                  full_name: "",
                  email_id: "",
                  password: "",
                  confirmPassword: "",
                });
                setError("");
              }}
            >
              {isLogin ? "Sign Up" : "Login"}
            </span>
          </p>
        </div>
      </section>
      <footer className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-70">
        <h6>
          © {new Date().getFullYear()} Installngo. {t("rightsReserved")}
        </h6>
      </footer>
    </main>
  );
}
