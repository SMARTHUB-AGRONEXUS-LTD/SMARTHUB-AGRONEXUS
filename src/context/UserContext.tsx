"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface UserData {
    name: string;
    email: string;
    password?: string;
    profileImage: string;
    currency: string;
    country: string;
    address: string;
}

interface UserContextType {
    user: UserData | null;
    updateUser: (data: Partial<UserData>) => void;
    logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserData | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("smarthub_user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            setUser({
                name: "John Deo",
                email: "johndeo@gmail.com",
                profileImage: "/avatar-2.png",
                currency: "usd",
                country: "usa",
                address: ""
            });
        }
    }, []);

    const updateUser = (data: Partial<UserData>) => {
        setUser((prev) => {
            const updated = prev ? { ...prev, ...data } : {
                name: "",
                email: "",
                profileImage: "/avatar-2.png",
                currency: "",
                country: "",
                address: "",
                ...data
            };
            localStorage.setItem("smarthub_user", JSON.stringify(updated));
            return updated;
        });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("smarthub_user");
    };

    return (
        <UserContext.Provider value={{ user, updateUser, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
