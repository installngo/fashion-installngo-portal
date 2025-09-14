"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type AuthContextType = {
  token: string | null;
  organizationId: string | null;
  code: string | null;
  login: (token: string, orgId: string, code: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [organizationId, setOrganizationId] = useState<string | null>(null);
  const [code, setCode] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedOrgId = localStorage.getItem("organizationId");
    const storedCode = localStorage.getItem("organizationCode");
    if (storedToken) {
      setToken(storedToken);
      setOrganizationId(storedOrgId);
      setCode(storedCode);
    }
  }, []);

  const login = (t: string, orgId: string, c: string) => {
    localStorage.setItem("token", t);
    localStorage.setItem("organizationId", orgId);
    localStorage.setItem("organizationCode", c);
    setToken(t);
    setOrganizationId(orgId);
    setCode(c);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("organizationId");
    localStorage.removeItem("organizationCode");
    setToken(null);
    setOrganizationId(null);
    setCode(null);
  };

  return (
    <AuthContext.Provider value={{ token, organizationId, code, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);