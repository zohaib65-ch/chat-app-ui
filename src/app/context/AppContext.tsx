"use client";

import React, { ReactNode, useContext, useEffect } from "react";
import axiosWrapper from "@/lib/axiosWrapper";

export interface User {
  id?: string;
  name: string;
  email: string;
  memberSince?: string;
}

interface AppContextType {
  user?: User;
  loading: boolean;
  isAuth: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = React.createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = React.useState<User>();
  const [isAuth, setIsAuth] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
      setIsAuth(true);
      setLoading(false);
      return;
    }

    if (!token) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const { data } = await axiosWrapper.get("/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userData: User = {
          id: data.user._id,
          name: data.user.name,
          email: data.user.email,
          memberSince: new Date(data.user.createdAt).toLocaleString("default", {
            month: "long",
            year: "numeric",
          }),
        };

        setUser(userData);
        setIsAuth(true);
        localStorage.setItem("user", JSON.stringify(userData));
      } catch {
        setIsAuth(false);
        setUser(undefined);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <AppContext.Provider value={{ user, isAuth, loading, setUser, setIsAuth, setLoading }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppData = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppData must be used within an AppProvider");
  return context;
};
