// ScrollToBottom.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";

interface Props {
    children: React.ReactNode;
}

const ScrollToBottom: React.FC<Props> = ({ children }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const [, setShouldScroll] = useState<boolean>(false);

    const onWheel = (event: any) => {
        // console.dir(event);
        const descElement = event.target;
        setShouldScroll(false);
        // Continue scrolling if we hit the bottom of the div
        if (descElement.scrollTop + descElement.clientHeight >= descElement.scrollHeight - 5) {
            setShouldScroll(true);
        }
    };

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        console.dir(scrollContainer);
        console.log(scrollContainer?.scrollHeight, scrollContainer?.scrollTop, scrollContainer?.clientHeight, scrollContainer?.offsetHeight);

        if (scrollContainer) {
            scrollContainer.scrollTop = scrollContainer?.scrollHeight ?? 0;
        }
    }, [children]);

    return (
        <div ref={scrollContainerRef} style={{ height: "300px", overflowY: "auto" }} onWheel={onWheel}>
            {children}
        </div>
    );
};

export default ScrollToBottom;
