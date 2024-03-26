import React from "react";
import HomeComponent from "@/components/home/HomeComponent";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function Home() {
    // @ts-expect-error
    const session = await getServerSession(authOptions);
    return (
        <main className="bg-white">
            <HomeComponent session={session} />
        </main>
    );
}
