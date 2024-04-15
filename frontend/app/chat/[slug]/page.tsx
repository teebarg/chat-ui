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
        <div className="max-h-screen overflow-y-auto relative pb-12">
            <div className="fixed max-w-5xl w-full top-0 bg-white py-4 z-10">
                <h2 className="text-2xl font-bold text-gray-800">Conversation</h2>
            </div>
            <div className="flex flex-col flex-1 mt-14">
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
                    {/* AI Content Ends */}
                </ScrollToBottom>
                <div className="fixed bottom-0 bg-white pb-8 max-w-5xl w-full">
                    <ChatInputForm slug={params.slug}></ChatInputForm>
                </div>
            </div>
        </div>
    );
};

export default ChatScreen;
