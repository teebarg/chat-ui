/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: "var(--font-inter)",
                display: "var(--font-lexend)",
            },
        },
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: ["winter"],
    },
};
