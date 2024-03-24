import React from "react";
import Navbar from "@/components/navbar";

export default async function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="flex min-h-screen flex-col">
            <div>
                <Navbar />
            </div>
            <div className="flex-1 flex flex-col">
                <div className="xl:pr-80 flex-1 flex flex-col">{children}</div>
                <aside className="fixed inset-y-0 right-0 hidden w-80 overflow-y-auto top-16 border-l border-gray-200 px-4 py-6 xl:flex xl:flex-col items-center ">
                    <p>Aside content</p>
                </aside>
            </div>
        </main>
    );
}
