"use client";

import { Provider, useDispatch } from "react-redux";
import { store } from "./store/store";
import { useEffect } from "react";
import { setUser } from "./store/userSlice";

function InitUserFromStorage() {
  const dispatch = useDispatch();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      dispatch(setUser(JSON.parse(savedUser)));
    }
  }, [dispatch]);

  return null;
}

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <InitUserFromStorage />
      {children}
    </Provider>
  );
}
