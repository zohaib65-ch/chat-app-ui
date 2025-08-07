"use client";

import React, { ReactNode, useContext, useEffect, useState } from "react";
import axiosWrapper from "@/lib/axiosWrapper";
import axios from "axios";

export interface User {
  id?: string;
  name: string;
  email: string;
  memberSince?: string;
}

export interface Chat {
  _id: string;
  users: string[];
  latestMessage: {
    text: string;
    sender: string;
  };
  createdAt: string;
  updatedAt: string;
  unseenCount?: number;
}

export interface Chats {
  _id: string;
  users: User;
  chat: Chat;
}

interface AppContextType {
  user?: User;
  loading: boolean;
  isAuth: boolean;
  allUsers: User[] | null;
  chats: Chats[] | null;
  users: User[] | null;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  fetchChat: (token: string) => Promise<void>;
  fetchAllUsers: (token: string) => Promise<void>;
  logoutUser: () => void;
}

const AppContext = React.createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>();
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [chat, setChat] = useState<Chats[] | null>(null);
  const [allUsers, setAllUsers] = useState<User[] | null>(null);

  const fetchChat = async (token: string) => {
    try {
      const { data } = await axios.get("http://localhost:5002/api/v1/chat/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setChat(data);
    } catch (error) {
      console.error("Error fetching chat:", error);
    }
  };

  const fetchAllUsers = async (token: string) => {
    try {
      const { data } = await axiosWrapper.get("/users/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllUsers(data.users || data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuth(false);
    setUser(undefined);
    setChat(null);
    setAllUsers(null);
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuth(true);
      fetchChat(token);
      fetchAllUsers(token);
      setLoading(false);
      return;
    }

    async function fetchUser() {
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

        if (token) {
          await fetchChat(token);
          await fetchAllUsers(token);
        }
      } catch {
        setIsAuth(false);
        setUser(undefined);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        isAuth,
        loading,
        allUsers,
        chats: chat,
        users: allUsers,
        setUser,
        setIsAuth,
        setLoading,
        fetchChat,
        fetchAllUsers,
        logoutUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppData = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppData must be used within an AppProvider");
  return context;
};
