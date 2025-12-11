import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UserInterface } from "../interfaces/UserInterface";
import { authService } from "../services/authService";

const useAuth = () => {
    const [authToken, setauthToken] = useState<string | undefined>(undefined);
    const [authUser, setauthUser] = useState<UserInterface | undefined>(
        undefined
    );

    const { replace } = useRouter();
    const login = async (authToken: string, authUser: UserInterface) => {
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
        setauthToken(authToken);
        setauthUser(authUser);
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

    const getAuthToken = async () => {
        const token = (await getCookie("token")) ?? undefined;
        return token;
    };

    const getAuthUser = async () => {
        const user = await getCookie("authUser");
        if (!user) {
            const userData = await authService.getUser();
            await setCookie("authUser", userData, {
                secure: false,
                sameSite: "lax",
                path: "/",
            });
            return userData;
        }

        try {
            return JSON.parse(user) as UserInterface;
        } catch {
            return undefined;
        }
    };

    const updateAuthUser = async (user: UserInterface) => {
        await setCookie("authUser", user, {
            secure: false,
            sameSite: "lax",
            path: "/",
        });
        setauthUser(user);
    };

    useEffect(() => {
        const fetchAuthData = async () => {
            const token = await getAuthToken();
            const user = await getAuthUser();
            setauthToken(token);
            setauthUser(user);
        };
        fetchAuthData();
    }, []);

    return {
        login,
        logout,
        getAuthToken,
        getAuthUser,
        updateAuthUser,
        isAuthenticated,
        authToken,
        authUser,
    };
};

export default useAuth;
