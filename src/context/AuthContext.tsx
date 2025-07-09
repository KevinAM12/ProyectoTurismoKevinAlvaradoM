"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface User {
  correo: string;
  rol: string;
}

interface AuthContextType {
  estaAutenticado: boolean;
  user: User | null;
  login: (correo: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [estaAutenticado, setEstaAutenticado] = useState<boolean>(false);

  const login = async (correo: string, password: string): Promise<boolean> => {
    const usuarioValido = {
      correo: "admin@admin.com",
      password: "123456",
      rol: "1"
    };

    if (correo === usuarioValido.correo && password === usuarioValido.password) {
      setUser({ correo: usuarioValido.correo, rol: usuarioValido.rol });
      setEstaAutenticado(true);
      return true;
    }

    return false;
  };

  const logout = () => {
    setEstaAutenticado(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, estaAutenticado }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de un AuthProvider");
  return context;
};