import { UserInterface } from "@/lib/interfaces/UserInterface";
import { getCookie } from "cookies-next";
import Image from "next/image";
import React from "react";
import { FaCamera } from "react-icons/fa";
import { toast } from "react-toastify";

type Props = {
    authUser: UserInterface | undefined;
    updateAuthUser: (user: UserInterface) => Promise<void>;
};

const ProfileSummary = (props: Props) => {
    const { authUser, updateAuthUser } = props;
    const profileImageInputRef = React.useRef<HTMLInputElement | null>(null);
    const [profileImagePreview, setProfileImagePreview] = React.useState<
        string | null
    >(null);

    const handleProfileImageClick = () => profileImageInputRef.current?.click();

    const handleProfileImageChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        setProfileImagePreview(url);

        try {
            const formData = new FormData();
            formData.append("image", file);
            formData.append("name", authUser?.name || "");

            const authToken = await getCookie("authToken");

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/user-update`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                    body: formData,
                }
            );
            const data = await response.json();

            if (response.ok && data) {
                toast.success("Profile image updated successfully!");
                updateAuthUser(data);
            }
        } catch (error) {
            toast.error("Failed to upload profile image.");
        }
    };

    React.useEffect(() => {
        return () => {
            if (profileImagePreview) URL.revokeObjectURL(profileImagePreview);
        };
    }, [profileImagePreview]);
    return (
        <div className="flex flex-row justify-start items-center gap-6">
            <div className="relative w-[120px] h-[120px]">
                <button
                    type="button"
                    onClick={handleProfileImageClick}
                    className="absolute inset-0 rounded-full overflow-hidden focus:outline-none"
                    aria-label="Change profile picture"
                >
                    <Image
                        src={
                            profileImagePreview ??
                            authUser?.image ??
                            "/default-profile.png"
                        }
                        alt={authUser?.name ?? "Profile"}
                        className="rounded-full w-[120px] h-[120px] object-cover"
                        width={120}
                        height={120}
                    />
                    <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                        <span className="text-sm text-white w-2/3 h-2/3 bg-black/50 rounded-full text-center flex flex-col justify-center items-center gap-2">
                            <FaCamera className="text-lg" />
                            Update
                        </span>
                    </div>
                </button>

                <input
                    ref={profileImageInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleProfileImageChange}
                />
            </div>
            <div>
                <h2 className="text-xl font-medium">
                    {authUser?.name ?? "N/A"}
                </h2>
                {authUser?.role && (
                    <p className="text-sm font-bold text-gray-500">
                        {authUser?.role.name}
                    </p>
                )}
                <p className="bg-gray-300 px-4 py-1 rounded-lg mt-1">
                    Active Subscription
                </p>
            </div>
        </div>
    );
};

export default ProfileSummary;
