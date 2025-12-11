import { UserInterface } from "@/lib/interfaces/UserInterface";
import { authService } from "@/lib/services/authService";
import React from "react";
import { FaEnvelope, FaIdCard, FaPhone, FaUser } from "react-icons/fa";
import { FaLocationPin } from "react-icons/fa6";
import { toast } from "react-toastify";

type Props = {
    authUser: UserInterface | undefined;
    updateAuthUser: (user: UserInterface) => Promise<void>;
};

const ProfileInformationForm = (props: Props) => {
    const { authUser, updateAuthUser } = props;

    const [editPersonalInfo, setEditPersonalInfo] = React.useState(false);
    const toggleEditPersonalInfo = () => setEditPersonalInfo((prev) => !prev);

    const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formElements = e.currentTarget.elements;

        const name = (formElements.namedItem("name") as HTMLInputElement).value;
        const email = (formElements.namedItem("email") as HTMLInputElement)
            .value;
        const phone = (formElements.namedItem("phone") as HTMLInputElement)
            .value;
        const address = (formElements.namedItem("address") as HTMLInputElement)
            .value;
        const nid = (formElements.namedItem("nid") as HTMLInputElement).value;

        try {
            const data = await authService.updateUser({
                name,
                email,
                phone,
                address,
                nid,
            });
            if (data) {
                toast.success("Profile updated successfully!");
                updateAuthUser(data);
            }
        } catch (error) {
            console.error("Error during login:", error);
        } finally {
            toggleEditPersonalInfo();
        }
    };

    return (
        <form
            onSubmit={handleUpdateProfile}
            className="my-4 bg-white rounded-2xl shadow-md p-4 md:p-6 w-full"
        >
            <div className="flex flex-row justify-between items-center">
                <h3 className="text-2xl font-medium">Personal Information</h3>
                {editPersonalInfo ? (
                    <button
                        type="submit"
                        className="cursor-pointer bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md"
                    >
                        Save
                    </button>
                ) : (
                    <span
                        className="cursor-pointer bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md"
                        onClick={toggleEditPersonalInfo}
                    >
                        Edit
                    </span>
                )}
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <h4 className="text-lg font-normal text-gray-600 mb-1 flex items-center">
                        <FaUser className="inline-block me-2" />
                        Full Name
                    </h4>
                    {editPersonalInfo ? (
                        <input
                            type="text"
                            name="name"
                            defaultValue={authUser?.name ?? ""}
                            placeholder="Enter full name"
                            className="w-full md:w-fit border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#615cf6] focus:border-transparent"
                        />
                    ) : (
                        <p className="text-md font-medium">
                            {authUser?.name ?? "N/A"}
                        </p>
                    )}
                </div>
                <div>
                    <h4 className="text-lg font-normal text-gray-600 mb-1 flex items-center">
                        <FaEnvelope className="inline-block me-2" />
                        Email
                    </h4>
                    {editPersonalInfo ? (
                        <input
                            type="text"
                            name="email"
                            defaultValue={authUser?.email ?? ""}
                            placeholder="Enter email"
                            className="w-full md:w-fit border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#615cf6] focus:border-transparent"
                        />
                    ) : (
                        <p className="text-md font-medium">
                            {authUser?.email ?? "N/A"}
                        </p>
                    )}
                </div>
                <div>
                    <h4 className="text-lg font-normal text-gray-600 mb-1 flex items-center">
                        <FaPhone className="inline-block me-2" />
                        Phone
                    </h4>
                    {editPersonalInfo ? (
                        <input
                            type="text"
                            name="phone"
                            defaultValue={authUser?.phone ?? ""}
                            placeholder="Enter phone"
                            className="w-full md:w-fit border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#615cf6] focus:border-transparent"
                        />
                    ) : (
                        <p className="text-md font-medium">
                            {authUser?.phone ?? "N/A"}
                        </p>
                    )}
                </div>
                <div className="col-1">
                    <h4 className="text-lg font-normal text-gray-600 mb-1 flex items-center">
                        <FaLocationPin className="inline-block me-2" />
                        Address
                    </h4>
                    {editPersonalInfo ? (
                        <input
                            type="text"
                            name="address"
                            defaultValue={authUser?.address ?? ""}
                            placeholder="Enter address"
                            className="w-full md:w-fit border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#615cf6] focus:border-transparent"
                        />
                    ) : (
                        <p className="text-md font-medium">
                            {authUser?.address ?? "N/A"}
                        </p>
                    )}
                </div>
                <div>
                    <h4 className="text-lg font-normal text-gray-600 mb-1 flex items-center">
                        <FaIdCard className="inline-block me-2" />
                        NID
                    </h4>
                    {editPersonalInfo ? (
                        <input
                            type="text"
                            name="nid"
                            defaultValue={authUser?.nid ?? ""}
                            placeholder="Enter NID"
                            className="w-full md:w-fit border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#615cf6] focus:border-transparent"
                        />
                    ) : (
                        <p className="text-md font-medium">
                            {authUser?.nid ?? "N/A"}
                        </p>
                    )}
                </div>
            </div>
        </form>
    );
};

export default ProfileInformationForm;
