"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Http } from "@/lib/http";
import { mdTextToHtml } from "@/lib/utils";
import ai from "@/public/ai.png";

const AIContent = ({ slug }: { slug: string }) => {
    const [data, setData] = useState<string>("");

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Empty dependency array ensures this effect runs only once on mount

    const fetchData = async () => {
        // setIsLoading(true);
        // Simulating an API call with setTimeout
        try {
            // const path = slug ? `/conversations/${slug}/message` : `/conversations`;
            const res = await Http(`/conversations/${slug}/ai`, "GET");
            const reader = res?.body?.getReader();
            let descriptionContent = "";
            // eslint-disable-next-line no-constant-condition
            while (true && reader) {
                const { done, value } = await reader.read();
                if (done) break;
                descriptionContent += new TextDecoder().decode(value);
                setData(descriptionContent);
            }
        } catch (error) {
            console.error("🚀 ~ AIContent ~ error:", error);
        }
    };

    return (
        <div className="mb-8 flex gap-4">
            <div className="w-10">
                <div className="h-10 w-10 rounded-full relative overflow-hidden border border-solid">
                    <Image className="" src={ai} alt="Avatar" fill />
                </div>
            </div>
            <div className="flex-1 overflow-x-auto">
                <div dangerouslySetInnerHTML={{ __html: mdTextToHtml(data) }} />
            </div>
        </div>
    );
};

export default AIContent;
