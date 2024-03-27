"use client";

import React from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { getInitials } from "@/lib/utils";

// type Props {

// }

//  React fc Avatar
const Avatar: React.FC<any> = () => {
    const { data: session } = useSession();
    return (
        <div>
            {session?.user?.image ? (
                <div className="h-9 w-9 rounded-full bg-gray-50 relative overflow-hidden">
                    <Image className="bg-gray-50" src={session?.user?.image || ""} alt="Avatar" fill />
                </div>
            ) : (
                <span
                    style={{ backgroundColor: getInitials(session?.user?.name || "").color }}
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-full`}
                >
                    <span className={"font-medium leading-none text-white"}>{getInitials(session?.user?.name || "").initials}</span>
                </span>
            )}
        </div>
    );
};

export default Avatar;
