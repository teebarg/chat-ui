// ScrollToBottom.tsx
"use client";

import React, { useEffect, useRef } from "react";

interface Props {
    children: React.ReactNode;
}

const ScrollToBottom: React.FC<Props> = ({ children }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        // Make sure the element exists
        if (scrollContainer) {
            // Define the callback function that will be called when mutations are observed.
            /* eslint-disable no-undef */
            const mutationCallback: MutationCallback = (mutationsList: any) => {
                for (const mutation of mutationsList) {
                    if (mutation.type === "childList") {
                        console.log("A child node has been added or removed.");
                        if (scrollContainer) {
                            scrollContainer.scrollTop = scrollContainer?.scrollHeight ?? 0;
                        }
                    } else if (mutation.type === "attributes") {
                        console.log("Attributes have changed.");
                    }
                }
            };

            // Create a MutationObserver instance
            const observer = new MutationObserver(mutationCallback);

            // Configure the observer to listen for specific types of mutations
            const observerOptions = {
                childList: true, // Observe direct children additions/removals
                subtree: true, // Observe all descendants
                characterData: true, // Observe text changes
                attributes: true, // Observe attribute changes
            };

            // Start observing the div element for configured mutations
            observer.observe(scrollContainerRef.current, observerOptions);

            // Disconnect the observer when the component unmounts
            return () => observer.disconnect();
        }
    }, []);

    return (
        <div ref={scrollContainerRef} className="flex-1 flex flex-col pt-4 pb-2 overflow-y-auto">
            {children}
        </div>
    );
};

export default ScrollToBottom;
