"use client";

import { useState } from "react";
import { useTranslation } from "../context/TranslationContext";
import { useRouter } from "next/navigation";
import { useLoading } from "../context/LoadingContext";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

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
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.email_id ||
      !form.password ||
      (!isLogin && !form.full_name) ||
      (!isLogin && !form.confirmPassword)
    ) {
      showToast("All fields are required.", "error");
      return;
    }

    if (!isLogin && form.password !== form.confirmPassword) {
      showToast("Passwords do not match.", "error");
      return;
    }

    setLoading(true);
    show();

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        showToast(
          data.error || (isLogin ? "Login failed" : "Signup failed"),
          "error"
        );
        return;
      }

      if (isLogin) {
        login(
          data.token,
          data.organization.organization_id,
          data.organization.organization_code,
          data.organization.full_name
        );
        hide();
        router.push("/admin/dashboard");
        showToast("Login successful!", "success");
      } else {
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
      showToast("Something went wrong. Please try again.", "error");
    } finally {
      setLoading(false);
      hide();
    }
  };

  return (
    <main className="min-h-screen w-full flex flex-col">
      <div className="flex flex-1 flex-col md:flex-row items-center justify-center">
        {/* Left: Welcome content hidden on mobile */}
        <section className="hidden md:flex flex-1 flex-col items-center text-center justify-center p-12">
          <h1 className="mb-2">{t("welcomeTitle")}</h1>
          <h5>{t("welcomeSubtitle")}</h5>
        </section>

        {/* Right: Login/Signup form */}
        <section className="flex flex-1 items-center justify-center w-full p-4">
          <div className="w-full max-w-md bg-[var(--card-background)] p-10 sm:p-6 rounded-xl shadow-[var(--card-shadow)]">
            <h2 className="text-center mb-4">
              {isLogin ? "Login" : "Sign Up"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <Input
                  variant="text"
                  fullWidth
                  placeholder="Full Name"
                  name="full_name"
                  value={form.full_name}
                  onChange={handleChange}
                />
              )}
              <Input
                variant="email"
                fullWidth
                placeholder="Email"
                name="email_id"
                value={form.email_id}
                onChange={handleChange}
              />
              <Input
                variant="password"
                fullWidth
                placeholder="Password"
                name="password"
                value={form.password}
                onChange={handleChange}
              />
              {!isLogin && (
                <Input
                  variant="password"
                  fullWidth
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                />
              )}

              <div className="flex justify-center">
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth={false}
                  disabled={loading}
                >
                  {loading
                    ? isLogin
                      ? "Logging in..."
                      : "Signing up..."
                    : isLogin
                    ? "Login"
                    : "Sign Up"}
                </Button>
              </div>
            </form>

            <h6 className="mt-4 text-center">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <span
                className="text-[var(--color-primary-text)] font-bold cursor-pointer hover:underline"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setForm({
                    full_name: "",
                    email_id: "",
                    password: "",
                    confirmPassword: "",
                  });
                }}
              >
                {isLogin ? "Sign Up" : "Login"}
              </span>
            </h6>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="mt-auto text-center opacity-70 py-4">
        <h6>
          © {new Date().getFullYear()} Installngo. {t("rightsReserved")}
        </h6>
      </footer>
    </main>
  );
}