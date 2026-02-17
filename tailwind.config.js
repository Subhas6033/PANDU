export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                serif: ['"Times New Roman"', 'Times', 'serif'],
            },
            screens: {
                'max-lg': { 'max': '1500px' },
                'max-md': { 'max': '768px' },
            },
        },
    },
    plugins: [],
}
