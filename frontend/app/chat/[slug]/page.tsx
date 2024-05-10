import React from "react";
import Image from "next/image";
import { GET } from "@/lib/http";
import { redirect } from "next/navigation";
import ErrorPage from "@/components/core/ErrorPage";
import { Message } from "@/lib/types";
import { mdTextToHtml } from "@/lib/utils";
import Avatar from "@/components/core/Avatar";
import ai from "@/public/ai.png";
import ChatInputForm from "@/components/forms/ChatInputForm";
import AIContent from "@/components/AIContent";
import ScrollToBottom from "@/components/ScrollToBottom";

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
    // sort messages by id
    messages.sort((a, b) => a.id - b.id);

    // check if the last message is from the AI
    const lastMessage = messages[messages.length - 1];
    const lastMessageIsAI = lastMessage.ai;

    if (error) {
        return <ErrorPage></ErrorPage>;
    }
    return (
        <div className="flex-1 relative flex flex-col px-6 max-h-screen">
            <div className="w-full py-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Conversation</h2>
            </div>
            {/* Chat Messages */}
            <ScrollToBottom>
                {messages.map((message: Message, key: number) => (
                    <div key={key} className="mb-8 flex gap-4">
                        <div className="w-10">
                            {message.ai ? (
                                <div className="h-10 w-10 rounded-full relative overflow-hidden border border-solid">
                                    <Image className="" src={ai} alt="Avatar" fill />
                                </div>
                            ) : (
                                <Avatar />
                            )}
                        </div>
                        <div className="flex-1 overflow-x-auto">
                            <div dangerouslySetInnerHTML={{ __html: mdTextToHtml(message.message) }} />
                        </div>
                    </div>
                ))}
                {/* AI Content */}
                {!lastMessageIsAI && <AIContent slug={params.slug}></AIContent>}
            </ScrollToBottom>
            <div className="pb-8">
                <ChatInputForm slug={params.slug}></ChatInputForm>
                <p className="text-xs text-center text-gray-400 font-semibold mt-1">AI can make mistakes. Consider checking important information.</p>
            </div>
        </div>
    );
};

export default ChatScreen;
