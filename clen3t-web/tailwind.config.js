/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,jsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#099e6a",
                "primary-red": "#C65252",
                "primary-red-dark": "#19497d",
                "primary-red-darker": "#0d3764",
                "primary-text": "#F5F5F5",
                "primary-background": "#1C1D21",
                "primary-blue": "#5299C6",
                "primary-blue-dark": "#19497d",
                "primary-blue-darker": "#0d3764",
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
    plugins: [],
};