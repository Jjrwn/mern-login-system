import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { setToken, removeToken } from "../utils/tokenHelper";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      // Fixed: guard against "undefined" string or null being stored
      if (!storedUser || storedUser === "undefined") return null;
      return JSON.parse(storedUser);
    } catch {
      return null;
    }
  });

  const loginUser = (data) => {
    setToken(data.token);
    const userData = {
      id: data.id,
      username: data.username,
      email: data.email,
    };
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logoutUser = () => {
    removeToken();
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}
