import React from "react";
import { GET } from "@/lib/http";
import { redirect } from "next/navigation";
import ErrorPage from "@/components/core/ErrorPage";
import { Message } from "@/lib/types";
import { mdTextToHtml } from "@/lib/utils";
import cn from "classnames";

async function getData(slug: string) {
    const { ok, status, data } = await GET(`/conversations/${slug}`, "conversation");

    if ([401, 403].includes(status)) {
        redirect("/logout");
    }

    if (!ok) {
        return { error: true };
    }

    return data;
}

const ChatScreen = async ({ params }: { params: { slug: string } }) => {
    const { messages, error }: { messages: Message[]; error: boolean } = await getData(params.slug);

    if (error) {
        return <ErrorPage></ErrorPage>;
    }
    return (
        <>
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">General111</h2>
            </div>
            <div className="flex flex-col flex-1">
                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto">
                    {messages.map((message: Message, key: number) => (
                        <div key={key} className="mb-4">
                            <div className="w-8 h-8 bg-indigo-200 rounded-full flex items-center justify-center text-indigo-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        fillRule="evenodd"
                                        d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div className={cn("")}>
                                <div dangerouslySetInnerHTML={{ __html: mdTextToHtml(message.message) }} />
                                {/* <div dangerouslySetInnerHTML={{ __html: convertToMarkdown(message.message) }} />
                                <p className="text-sm text-gray-800">{convertToMarkdown(message.message)}</p> */}
                            </div>
                        </div>
                    ))}
                </div>
                {/* Input Area */}
                {/* <form onSubmit={handleSubmit} className="mt-4">
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
                        </form> */}
            </div>
        </>
    );
};

export default ChatScreen;
