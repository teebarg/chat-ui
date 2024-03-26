import React from "react";
import Link from "next/link";
import { GET } from "@/lib/http";
import { redirect } from "next/navigation";
import ErrorPage from "@/components/core/ErrorPage";
import { Conversation } from "@/lib/types";

async function getData() {
    const { ok, status, data } = await GET("/conversations/?page=1&per_page=20", "conversations");

    if ([401, 403].includes(status)) {
        redirect("/logout");
    }

    if (!ok) {
        return { error: true };
    }

    return data;
}

export default async function ChatLayout({ children }: { children: React.ReactNode }) {
    const { conversations, error }: { conversations: Conversation[]; error: Boolean } = await getData();

    if (error) {
        return <ErrorPage></ErrorPage>;
    }
    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <div className="flex flex-1">
                {/* Sidebar */}
                <div className="bg-white border-r border-gray-200 w-64 lg:w-80 p-4 overflow-y-auto max-h-screen relative">
                    <div className="fixed bg-green-600 -m-4 px-4 py-2 w-64 lg:w-80">
                        <h2 className="text-lg font-semibold text-gray-800">Chats</h2>
                    </div>
                    {conversations.length === 0 && (
                        <div className="flex flex-col items-center justify-center mt-12">
                            <div className="max-w-md mx-auto text-center">
                                <svg
                                    className="w-20 h-20 mx-auto text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                    />
                                </svg>
                                <h2 className="mt-6 text-2xl font-bold text-gray-800">No Available Chats</h2>
                                <p className="mt-2 text-gray-600">
                                    {`It looks like you don't have any active chats at the moment. Start a new conversation or check back later.`}
                                </p>
                            </div>
                        </div>
                    )}
                    <ul className="mt-10">
                        {/* Chat List */}
                        {conversations.map((conversation: Conversation, key: number) => (
                            <li key={key} className="mb-2 mt-4">
                                <Link
                                    href={`/chat/${conversation.slug}`}
                                    className="flex items-center px-3 py-2 rounded-md transition duration-300 ease-in-out bg-indigo-100 hover:bg-indigo-200"
                                >
                                    <div className="w-8 h-8 bg-indigo-200 rounded-full flex items-center justify-center text-indigo-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path
                                                fillRule="evenodd"
                                                d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-gray-800 truncate w-56">{conversation.excerpt}</p>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Chat Area */}
                <div className="flex-1 bg-white p-6 flex flex-col">{children}</div>
            </div>
        </div>
    );
}
