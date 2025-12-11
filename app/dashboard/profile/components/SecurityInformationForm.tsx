import { UserInterface } from "@/lib/interfaces/UserInterface";
import { getCookie } from "cookies-next";
import React from "react";
import { toast } from "react-toastify";

type Props = {
    authUser: UserInterface | undefined;
    updateAuthUser: (user: UserInterface) => Promise<void>;
};

const SecurityInformationForm = (props: Props) => {
    const { authUser, updateAuthUser } = props;

    const handlePasswordUpdate = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        const formElements = e.currentTarget.elements;
        const current_password = (
            formElements.namedItem("current_password") as HTMLInputElement
        ).value;
        const new_password = (
            formElements.namedItem("new_password") as HTMLInputElement
        ).value;

        if (!new_password || !current_password) {
            toast("Please check the password fields!");
        } else if (new_password.length < 8) {
            toast("Password must be at least 8 characters long!");
        } else if (new_password === current_password) {
            toast("New password must be different from current password!");
        }

        const authToken = await getCookie("authToken");

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/password-update`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authToken}`,
                    },
                    body: JSON.stringify({
                        current_password,
                        new_password,
                    }),
                }
            );

            const data = await response.json();

            if (response.ok && data && data.message) {
                toast.success(data.message);
                updateAuthUser(data);
            } else if (response.status === 400 && data && data.error) {
                toast.error(data.error);
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    const handleToggleTFA = async () => {
        const authToken = await getCookie("authToken");

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/user-update`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authToken}`,
                    },
                    body: JSON.stringify({
                        ...authUser,
                        tfa_enabled: authUser ? !authUser.tfa_enabled : true,
                    }),
                }
            );

            const data = await response.json();

            if (response.ok && data) {
                toast.success(
                    `TFA ${
                        authUser?.tfa_enabled ? "disabled" : "enabled"
                    } successfully!`
                );
                updateAuthUser(data);
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    return (
        <div className="my-4 bg-white rounded-2xl shadow-md p-4 md:p-6 w-full">
            <h3 className="text-2xl font-medium">Security</h3>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <h4 className="text-lg font-normal text-gray-600">
                        Password
                    </h4>
                    <form
                        onSubmit={handlePasswordUpdate}
                        className="flex items-center gap-2 mt-1"
                    >
                        <input
                            type="password"
                            name="current_password"
                            placeholder="Enter current password"
                            className="w-2/5 border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#615cf6] focus:border-transparent"
                        />
                        <input
                            type="password"
                            name="new_password"
                            placeholder="Enter new password"
                            className="w-2/5 border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#615cf6] focus:border-transparent"
                        />
                        <button
                            type="submit"
                            className="bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-3 py-1 rounded-md text-sm"
                        >
                            Update
                        </button>
                    </form>
                </div>
                <div>
                    <h4 className="text-lg font-normal text-gray-600">
                        Two-Factor Authentication
                    </h4>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={authUser?.tfa_enabled ?? false}
                            onChange={handleToggleTFA}
                        />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#615cf6]"></div>
                        <span className="ml-3 text-sm font-medium text-gray-900">
                            {authUser?.tfa_enabled ? "Enabled" : "Disabled"}
                        </span>
                    </label>
                </div>
                <button className="w-fit bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md">
                    Active Sessions (logout from other devices)
                </button>
                <button className="w-fit bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md">
                    Device Login History
                </button>
            </div>
        </div>
    );
};

export default SecurityInformationForm;
