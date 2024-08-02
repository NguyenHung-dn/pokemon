/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        "6px": "6px",
        "150px": "150px",
        "152px": "152px",
        "200px": "200px",
        "330px": "330px",
        "340px": "340px",
      },
      colors: {
        black: "#333333",
        bug: "#A6B91A",
        dark: "#705746",
        dragon: "#406280",
        electric: "#F7D02C",
        fairy: "#D685AD",
        fighting: "#C22E28",
        fire: "#EE8130",
        flying: "#A98FF3",
        ghost: "#735797",
        grass: "#7AC74C",
        ground: "#E2BF65",
        ice: "#96D9D6",
        normal: "#A8A77A",
        poison: "#A33EA1",
        primary: "#009B6C",
        "primary-light": "#57D2A0",
        psychic: "#F95587",
        rock: "#B6A136",
        secondary: "#00BAFF",
        steel: "#B7B7CE",
        "surface-light": "#CDFBE4",
        water: "#6390F0",
      },
      fontFamily: {
        montserrat: ["var(--font-montserrat)"],
        press_start_2p: ["var(--font-press_start_2p)"],
      },
      borderRadius: {
        4: "4px",
        "60px": "60px",
      },
    },
  },
  plugins: [],
};
