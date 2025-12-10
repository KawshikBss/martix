import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

const useAuth = () => {
    const { replace } = useRouter();
    const login = async (authToken: string, authUser: object) => {
        console.log("Setting auth token:", authToken);
        await setCookie("authToken", authToken, {
            secure: false,
            sameSite: "lax",
            path: "/",
        });
        await setCookie("authUser", authUser, {
            secure: false,
            sameSite: "lax",
            path: "/",
        });
        replace("/dashboard");
    };

    const logout = async () => {
        await deleteCookie("authToken");
        replace("/login");
    };

    const isAuthenticated = async () => {
        const authToken = await getCookie("authToken");
        if (authToken) {
            return true;
        }
        return false;
    };

    const getAuthUser = async () => {
        const authUser = await getCookie("authUser");
        return JSON.parse(authUser ?? "{}") as UserInterface;
    };

    return {
        login,
        logout,
        getAuthUser,
        isAuthenticated,
    };
};

export default useAuth;
