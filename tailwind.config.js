/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      fontFamily: {
        roboto: ["roboto"],
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xlg: "1536px",
    },
  },
  plugins: [],
};
