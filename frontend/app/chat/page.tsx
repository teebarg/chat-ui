"use client";

import React from "react";
import ChatInputForm from "@/components/forms/ChatInputForm";
import { Http } from "@/lib/http";

type Suggestion = {
    id: number;
    title: string;
    description: string;
    prompt: string;
};

const suggestions: Suggestion[] = [
    {
        id: 1,
        title: "Write a thank-you note",
        description: "to our babysitter for the last-minute help",
        prompt: "Dear [Name], I wanted to thank you for...",
    },
    {
        id: 2,
        title: "Show me a code snippet",
        description: "of a website's sticky header",
        prompt: "Can you show me a code snippet of a website's sticky header?",
    },
    {
        id: 3,
        title: "Book a reservation",
        description: "for a romantic dinner date",
        prompt: "Can you book a reservation for a romantic dinner date?",
    },
    {
        id: 4,
        title: "Get a gift",
        description: "for your mom's birthday",
        prompt: "Can you get a gift for your mom's birthday?",
    },
];

const ChatScreen = async () => {
    const submit = async (prompt: string) => {
        const body = JSON.stringify({ message: prompt });
        try {
            const res = await Http("/conversations", "POST", body);
            const data = await res.json();
            if (res.ok) {
                window.location.href = `/chat/${data.slug}`;
                return;
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="flex-1 flex flex-col min-w-[50rem] max-w-7xl mx-auto">
            <div className="flex flex-col items-center justify-center flex-1">
                <div className="max-w-md mx-auto text-center">
                    <svg
                        className="w-20 h-20 mx-auto text-indigo-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <h2 className="mt-6 text-2xl font-bold text-gray-800 dark:text-white">How may I help you today?</h2>
                    <p className="mt-2 text-gray-600 dark:text-white">{`Start a new conversation or ask me anything. I'm here to help!`}</p>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-4">
                {suggestions.map((suggestion: Suggestion, key: number) => (
                    <button
                        key={key}
                        onClick={() => submit(suggestion.prompt)}
                        className="suggest relative group rounded-xl px-4 py-3 text-left hover:bg-indigo-100 hover:text-indigo-600 transition duration-300 ease-in-out"
                    >
                        <div className="flex w-full gap-2 items-center justify-center">
                            <div className="flex w-full items-center justify-between">
                                <div className="flex flex-col overflow-hidden">
                                    <div className="truncate font-semibold">{suggestion.title}</div>
                                    <div className="truncate font-normal opacity-50">{suggestion.description}</div>
                                </div>
                                <div className="absolute bottom-0 right-0 top-0 flex items-center rounded-xl pl-6 pr-4">
                                    <span className="">
                                        <div className="rounded-lg p-1 shadow dark:shadow-none">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="icon-sm text-primary">
                                                <path
                                                    d="M7 11L12 6L17 11M12 18V7"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                ></path>
                                            </svg>
                                        </div>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
            <div className="pb-8">
                <ChatInputForm></ChatInputForm>
                <p className="text-xs text-center text-gray-400 dark:text-gray-200 font-semibold mt-1">
                    AI can make mistakes. Consider checking important information.
                </p>
            </div>
        </div>
    );
};

export default ChatScreen;
