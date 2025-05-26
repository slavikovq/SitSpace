import { createContext, useContext, useState, useEffect } from "react";
import { getUser } from "../models/user";
import { alert } from "../utils/sweetAlert";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [logoutTimer, setLogoutTimer] = useState(null);

  const getTokenExpiration = (token) => {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000;
  };

  const scheduleLogout = (expirationTime) => {
    const now = Date.now();
    const timeout = expirationTime - now;

    if (timeout > 0) {
      const timerId = setTimeout(() => {
        logout();
        alert("info", "Your session has expired. You have been logged out.");
      }, timeout);
      setLogoutTimer(timerId);
    }
  };

  const clearLogoutTimer = () => {
    if (logoutTimer) {
      clearTimeout(logoutTimer);
      setLogoutTimer(null);
    }
  };

  const fetchUser = async () => {
    const token = localStorage.getItem("token");

    const exp = getTokenExpiration(token);
    const now = Date.now();

    if (!token || (exp && exp < now)) {
      logout();
      return;
    }

    try {
      const userData = await getUser();
      setUser(userData.payload);
      scheduleLogout(exp);
    } catch (err) {
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  console.log(logoutTimer)

  const login = async (token) => {
    localStorage.setItem("token", token);
    await fetchUser();
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    clearLogoutTimer();
  };

  useEffect(() => {
    fetchUser();
    return () => clearLogoutTimer();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
