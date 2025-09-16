"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type AuthContextType = {
  token: string | null;
  organizationId: string | null;
  organizationCode: string | null;
  organizationName: string | null;
  login: (token: string, orgId: string, code: string, name: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [organizationId, setOrganizationId] = useState<string | null>(null);
  const [organizationCode, setOrganizationCode] = useState<string | null>(null);
  const [organizationName, setOrganizationName] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedOrgId = localStorage.getItem("organizationId");
    const storedCode = localStorage.getItem("organizationCode");
    const storedName = localStorage.getItem("organizationName");

    if (storedToken) {
      setToken(storedToken);
      setOrganizationId(storedOrgId);
      setOrganizationCode(storedCode);
      setOrganizationName(storedName);
    }
  }, []);

  const login = (t: string, orgId: string, code: string, name: string) => {
    localStorage.setItem("token", t);
    localStorage.setItem("organizationId", orgId);
    localStorage.setItem("organizationCode", code);
    localStorage.setItem("organizationName", name);

    setToken(t);
    setOrganizationId(orgId);
    setOrganizationCode(code);
    setOrganizationName(name);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("organizationId");
    localStorage.removeItem("organizationCode");
    localStorage.removeItem("organizationName");

    setToken(null);
    setOrganizationId(null);
    setOrganizationCode(null);
    setOrganizationName(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, organizationId, organizationCode, organizationName, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};