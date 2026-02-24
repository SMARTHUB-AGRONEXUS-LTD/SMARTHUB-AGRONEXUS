"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Switch } from "@/components/ui/Switch";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { useUser } from "@/context/UserContext";

export default function SettingsPage() {
    const { toast } = useToast();
    const { user, updateUser } = useUser();

    const [emailNotif, setEmailNotif] = useState(true);
    const [smsNotif, setSmsNotif] = useState(true);
    const [twoFactor, setTwoFactor] = useState(true);

    const [profileImage, setProfileImage] = useState("/avatar-2.png");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [currency, setCurrency] = useState("");
    const [country, setCountry] = useState("");
    const [address, setAddress] = useState("");

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const fileInputRef = useRef<HTMLInputElement>(null);

    // Load data from UserContext when available
    useEffect(() => {
        if (user) {
            setUserName(user.name || "");
            setEmail(user.email || "");
            setProfileImage(user.profileImage || "/avatar-2.png");
            setCurrency(user.currency || "");
            setCountry(user.country || "");
            setAddress(user.address || "");
        }
    }, [user]);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
            updateUser({ profileImage: imageUrl });
            toast("Profile image updated successfully", "success");
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const handleSaveAccount = () => {
        updateUser({ name: userName, email });
        toast("Account details updated successfully", "success");
    };

    const handleSavePreferences = () => {
        updateUser({ currency, country, address });
        toast("Preferences saved successfully", "success");
    };

    const handleUpdatePassword = (): void => {
        if (!oldPassword || !newPassword) {
            toast("Please fill in both password fields", "error");
            return;
        }
        updateUser({ password: newPassword });
        toast("Password updated successfully", "success");
        setOldPassword("");
        setNewPassword("");
    };

    return (
        <div className="space-y-8 max-w-4xl">

            {/* Account Information */}
            <section className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">Account Information</h2>
                    <Button onClick={handleSaveAccount} className="bg-[#1B4D28] hover:bg-[#143d1f] text-white">
                        Save Changes
                    </Button>
                </div>

                <div className="flex items-center gap-6 mb-8">
                    <div className="relative h-16 w-16 rounded-full overflow-hidden">
                        <Image
                            src={profileImage}
                            alt="Profile"
                            fill
                            className="object-cover bg-gray-200"
                        />
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                    />
                    <Button
                        variant="outline"
                        className="h-9 px-4 text-sm font-normal text-gray-600 border-gray-200 bg-gray-50 hover:bg-gray-100"
                        onClick={triggerFileInput}
                    >
                        Change
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">User Name</label>
                        <Input value={userName} onChange={(e) => setUserName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                </div>
            </section>

            {/* Preference */}
            <section className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">Preference</h2>
                    <Button onClick={handleSavePreferences} className="bg-[#1B4D28] hover:bg-[#143d1f] text-white">
                        Save Changes
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Currency</label>
                        <Select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                            <option value="" disabled>Select currency</option>
                            <option value="usd">USD</option>
                            <option value="eur">EUR</option>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Country</label>
                        <Select value={country} onChange={(e) => setCountry(e.target.value)}>
                            <option value="" disabled>Select your country</option>
                            <option value="usa">United States</option>
                            <option value="uk">United Kingdom</option>
                        </Select>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Delivery Address.</label>
                    <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter your Address" />
                </div>
            </section>

            {/* Change Password */}
            <section className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">Change Password</h2>
                    <Button onClick={handleUpdatePassword} className="bg-[#1B4D28] hover:bg-[#143d1f] text-white">
                        Update Password
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Old Password</label>
                        <Input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} placeholder="Oldpassword" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">New Password</label>
                        <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Newpassword" />
                    </div>
                </div>
            </section>

            {/* Notification Preference */}
            <section className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Notification Preference</h2>

                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <label className="text-base font-medium text-gray-900">Email Notification</label>
                            <p className="text-sm text-gray-500">Receive update via email</p>
                        </div>
                        <Switch checked={emailNotif} onCheckedChange={setEmailNotif} />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <label className="text-base font-medium text-gray-900">SMS Notification</label>
                            <p className="text-sm text-gray-500">Receive update via email</p>
                        </div>
                        <Switch checked={smsNotif} onCheckedChange={setSmsNotif} />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <label className="text-base font-medium text-gray-900">Two-factor Authentication</label>
                            <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                        </div>
                        <Switch checked={twoFactor} onCheckedChange={setTwoFactor} />
                    </div>
                </div>
            </section>
        </div>
    );
}
