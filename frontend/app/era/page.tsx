// import ErrorPage from "@/components/core/ErrorPage";
// import NoRecords from "@/components/core/NoRecords";

// export const metadata = {
//     title: "Profile | Starter Template",
//     description: "Shopit profile starter template built with Tailwind CSS and Next.js.",
// };

// export default async function Era() {
//     return (
//         <>
//             <ErrorPage></ErrorPage>
//             <NoRecords></NoRecords>
//         </>
//     );
// }

"use client";

import React from "react";
import Head from "next/head";
import Link from "next/link";

const LoginPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Head>
                <title>AI Chat App - Login</title>
                <meta name="description" content="Login to AI Chat App" />
            </Head>

            <div className="w-full max-w-md px-6 py-8 bg-white rounded-lg shadow-md">
                <div className="mb-6 text-center">
                    <h1 className="text-3xl font-bold text-gray-800">Login</h1>
                    <p className="text-sm text-gray-600">Welcome back! Please sign in to continue.</p>
                </div>

                <form>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            placeholder="Enter your password"
                        />
                    </div>

                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <label className="inline-flex items-center">
                                <input type="checkbox" className="form-checkbox text-indigo-600" />
                                <span className="ml-2 text-sm text-gray-600">Remember me</span>
                            </label>
                        </div>
                        <Link href="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-800">
                            Forgot Password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-full hover:bg-indigo-700 focus:outline-none focus:shadow-outline"
                    >
                        Sign In
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">Or sign in with:</p>
                    <div className="flex items-center justify-center mt-2">
                        <button
                            type="button"
                            className="mx-2 text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center"
                        >
                            Google
                        </button>
                        <button
                            type="button"
                            className="mx-2 text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center"
                        >
                            Facebook
                        </button>
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        {`Don't have an account?`}
                        <Link href="/signup" className="text-indigo-600 hover:text-indigo-800">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
