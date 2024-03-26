"use client";

// import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

// import { ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon } from "@heroicons/react/24/outline";

const HomeComponent = ({ session }: { session: any }) => {
    const isAuthenticated = session && session.user;
    const link = isAuthenticated ? "/chat" : "/login";
    const linkName = isAuthenticated ? "Chat Now" : "Get Started";
    return (
        <div className="bg-gray-100">
            <Head>
                <title>AI Chat App</title>
                <meta name="description" content="Experience the power of AI-powered conversations" />
            </Head>

            {/* Hero Section */}
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 py-32 lg:py-48">
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
                    <div className="md:w-1/2 mb-12 md:mb-0 animate-fade-in-up">
                        <h1 className="text-6xl lg:text-7xl font-extrabold text-white mb-6">AI Chat App</h1>
                        <p className="text-lg lg:text-xl text-gray-200 mb-8 animate-fade-in-up animation-delay-300">
                            Experience the future of conversations with our AI-powered chat assistant
                        </p>
                        <Link
                            href={link}
                            className="px-8 py-3 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 animate-fade-in-up animation-delay-600"
                        >
                            {linkName}
                        </Link>
                    </div>
                    <div className="md:w-1/2 animate-fade-in-up animation-delay-900">
                        <img src="/hero-illustration.svg" alt="Hero Illustration" className="mx-auto" />
                    </div>
                </div>
            </div>

            {/* About Us Section */}
            <div className="container mx-auto px-4 py-24">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="md:w-1/2 mb-12 md:mb-0 animate-fade-in-left">
                        <img src="/about-illustration.svg" alt="About Illustration" className="mx-auto" />
                    </div>
                    <div className="md:w-1/2 animate-fade-in-right">
                        <h2 className="text-4xl font-bold mb-6">About Us</h2>
                        <p className="text-lg text-gray-700 mb-8">
                            At AI Chat App, we are dedicated to providing cutting-edge AI technology for effortless communication. Our team of experts
                            has developed a powerful chat assistant that combines natural language processing and machine learning to deliver
                            intelligent and contextual responses.
                        </p>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-gray-200 py-24">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12 animate-fade-in-up">Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-lg shadow-md p-8 animate-fade-in-up animation-delay-300">
                            <img src="/feature-1.svg" alt="Feature 1" className="mx-auto mb-6" />
                            <h3 className="text-xl font-bold mb-4">Natural Conversations</h3>
                            <p className="text-gray-700">
                                Our AI chat assistant can engage in natural, human-like conversations, understanding context and intent.
                            </p>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-8 animate-fade-in-up animation-delay-600">
                            <img src="/feature-2.svg" alt="Feature 2" className="mx-auto mb-6" />
                            <h3 className="text-xl font-bold mb-4">Multi-Purpose</h3>
                            <p className="text-gray-700">
                                From task assistance to creative writing, our AI chat assistant can handle a wide range of use cases.
                            </p>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-8 animate-fade-in-up animation-delay-900">
                            <img src="/feature-3.svg" alt="Feature 3" className="mx-auto mb-6" />
                            <h3 className="text-xl font-bold mb-4">Continuous Learning</h3>
                            <p className="text-gray-700">
                                Our AI chat assistant is constantly learning and improving, providing more accurate and relevant responses over time.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Call-to-Action */}
            <div className="container mx-auto px-4 py-24">
                <div className="text-center animate-fade-in-up">
                    <h2 className="text-4xl font-bold mb-6">Join the Future of Conversations</h2>
                    <p className="text-lg text-gray-700 mb-8">Experience the power of our AI chat assistant today.</p>
                    <Link href={link} className="px-8 py-3 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
                        {linkName}
                    </Link>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 py-8">
                <div className="container mx-auto px-4">
                    <p className="text-center text-white">&copy; {new Date().getFullYear()} AI Chat App. All rights reserved.</p>
                </div>
            </footer>

            <style jsx>{`
                @keyframes fadeInUp {
                    0% {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes fadeInLeft {
                    0% {
                        opacity: 0;
                        transform: translateX(-20px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes fadeInRight {
                    0% {
                        opacity: 0;
                        transform: translateX(20px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                .animate-fade-in-up {
                    animation: fadeInUp 0.6s ease-in-out;
                }

                .animate-fade-in-left {
                    animation: fadeInLeft 0.6s ease-in-out;
                }

                .animate-fade-in-right {
                    animation: fadeInRight 0.6s ease-in-out;
                }

                .animation-delay-300 {
                    animation-delay: 0.3s;
                }

                .animation-delay-600 {
                    animation-delay: 0.6s;
                }

                .animation-delay-900 {
                    animation-delay: 0.9s;
                }
            `}</style>
        </div>
    );
};

export default HomeComponent;
