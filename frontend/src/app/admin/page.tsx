"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@context/AuthContext";

export default function AdminPage() {
  const { token } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [token, router]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-3xl font-bold">Admin Page</h1>
    </div>
  );
}