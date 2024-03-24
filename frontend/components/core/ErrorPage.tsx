import React from "react";

interface Props {
    // name: string;
}

const ErrorPage: React.FC<Props> = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full flex-1 bg-gray-100">
            <div className="max-w-md mx-auto text-center">
                <svg className="w-20 h-20 mx-auto text-red-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                </svg>
                <h1 className="text-4xl font-bold text-gray-800 mt-6">Oops! Something Went Wrong</h1>
                <p className="text-gray-600 mt-4">We&apos;re sorry, but an unexpected error occurred. Please try again later.</p>
            </div>
        </div>
    );
};

export default ErrorPage;
