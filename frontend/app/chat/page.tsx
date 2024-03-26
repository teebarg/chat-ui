import React from "react";

const ChatScreen = async () => {
    return (
        <>
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">How can i help you?</h2>
            </div>
            <div className="flex flex-col flex-1">
                <div className="flex-1 overflow-y-auto">Tell me what i can do for you today</div>
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
