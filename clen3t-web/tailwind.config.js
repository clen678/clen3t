/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,jsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#099e6a",
                "primary-red": "#C65252",
                "primary-red-dark": "#aa4444",
                "primary-red-darker": "#8a3636",
                "primary-text": "#F5F5F5",
                "primary-background": "#1C1D21",
                "primary-background-lightish": "#626772",
                "primary-background-light": "#35363D",
                "primary-background-lighter" : "#4A4C54",
                "primary-blue": "#5299C6",
                "primary-blue-dark": "#4380a7",
                "primary-blue-darker": "#356786",
            },
            fontSize: {
                massive: [
                    "80px",
                    {
                        fontWeight: "700",
                    },
                ],
                heading: [
                    "48px",
                    {
                        fontWeight: "700",
                    },
                ],
                "sub-heading": [
                    "32px",
                    {
                        fontWeight: "600",
                    },
                ],
                body: [
                    "24px",
                    {
                        fontWeight: "500",
                    },
                ],
                "body-small": [
                    "18px",
                    {
                        fontWeight: "500",
                    },
                ],
                "body-tiny": [
                    "12px",
                    {
                        fontWeight: "500",
                    },
                ],
                button: [
                    "24px",
                    {
                        fontWeight: "700",
                    },
                ],
                "button-small": [
                    "18px",
                    {
                        fontWeight: "700",
                    },
                ],
            },
            fontFamily: {
                sans: ["Open Sans", "sans-serif"],
                serif: ["Namdhinggo", "serif"],
            },
        },
    },
    plugins: [
      require('@tailwindcss/aspect-ratio'),
      require('tailwind-scrollbar'),
    ],
};