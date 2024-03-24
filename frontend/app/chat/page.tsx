"use client";

import React, { useState } from "react";
import Head from "next/head";

const ChatScreen = () => {
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle message submission logic here
        console.log("Submitted message:", message);
        setMessage("");
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <Head>
                <title>AI Chat App - Chat</title>
                <meta name="description" content="Chat with AI assistant" />
            </Head>

            <div className="flex flex-1">
                {/* Sidebar */}
                <div className="bg-white border-r border-gray-200 w-64 lg:w-80 p-4 overflow-y-auto">
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold text-gray-800">Chats</h2>
                    </div>
                    <ul>
                        {/* Chat List */}
                        <li className="mb-2">
                            <a
                                href="#"
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
                                    <p className="text-sm font-medium text-gray-800">General</p>
                                </div>
                            </a>
                        </li>
                        {/* Add more chat list items here */}
                    </ul>
                </div>

                {/* Chat Area */}
                <div className="flex-1 bg-white p-6 flex flex-col">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">General</h2>
                    </div>
                    <div className="flex flex-col flex-1">
                        {/* Chat Messages */}
                        <div className="flex-1 overflow-y-auto">{/* Messages go here */}</div>
                        {/* Input Area */}
                        <form onSubmit={handleSubmit} className="mt-4">
                            <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2">
                                <input
                                    type="text"
                                    placeholder="Type your message..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="flex-grow bg-transparent outline-none text-sm text-gray-800"
                                />
                                <button
                                    type="submit"
                                    disabled={!message}
                                    className="ml-4 text-indigo-600 hover:text-indigo-800 transition duration-300 ease-in-out disabled:text-gray-400 disabled:cursor-not-allowed"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path
                                            fillRule="evenodd"
                                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatScreen;
