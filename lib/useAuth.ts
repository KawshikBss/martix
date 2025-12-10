import { deleteCookie, getCookie, setCookie } from "cookies-next";

const useAuth = () => {
    const login = async (authToken: string) => {
        console.log("Setting auth token:", authToken);
        await setCookie("authToken", authToken, {
            secure: false,
            sameSite: "lax",
            path: "/",
        });
    };

    const logout = async () => {
        await deleteCookie("authToken");
    };

    const isAuthenticated = async () => {
        const authToken = await getCookie("authToken");
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
