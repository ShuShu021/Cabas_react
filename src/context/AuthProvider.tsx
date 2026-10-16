import { useCallback, useMemo, type ReactNode } from "react";
import { login as apiLogin } from "../services/api";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { AuthUser, LoginCredentials } from "../types";
import { AuthContext } from "./AuthContext";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useLocalStorage<AuthUser | null>("cabas-auth", null);

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      const res = await apiLogin(credentials);
      setUser({
        id: res.id,
        username: res.username,
        firstName: res.firstName,
        image: res.image,
        accessToken: res.accessToken,
      });
    },
    [setUser],
  );

  const logout = useCallback(() => setUser(null), [setUser]);

  const value = useMemo(
    () => ({ user, token: user?.accessToken ?? null, login, logout }),
    [user, login, logout],
  );

  return <AuthContext value={value}>{children}</AuthContext>;
}
