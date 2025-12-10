import { cookies } from "next/headers";

const useAuth = () => {
  const login = async () => {
    const authCookies = await cookies();
    authCookies.set("authToken", "your-auth-token", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 15,
    });
  };

  const logout = async () => {
    const authCookies = await cookies();
    authCookies.delete("authToken");
  };

  const isAuthenticated = async () => {
    const authCookies = await cookies();
    const authToken = authCookies.get("authToken");
    if (authToken) {
      return true;
    }
    return false;
  };

  return {
    login,
    logout,
    isAuthenticated,
  };
};

export default useAuth;
