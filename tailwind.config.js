/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./component/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      'custom-bg' : "url('./public/bg.png')",
    },
  },
  plugins: [],
}

