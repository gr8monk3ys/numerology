import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep cosmic backgrounds
        void: {
          950: "#050416",
          900: "#0a0821",
          800: "#120e33",
          700: "#1b1548",
        },
        // Mystic violet / amethyst
        mystic: {
          50: "#f5f2ff",
          100: "#ece5ff",
          200: "#d9ccff",
          300: "#bfa6ff",
          400: "#a175ff",
          500: "#8b4dff",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
        },
        // Celestial gold
        gold: {
          50: "#fdf9ec",
          100: "#faf0cf",
          200: "#f4e0a0",
          300: "#eecb6b",
          400: "#e6b845",
          500: "#d99e2b",
          600: "#c07d20",
          700: "#9c5c1e",
          800: "#804a20",
          900: "#6d3e1f",
        },
        // Ethereal teal (aura accent)
        aura: {
          300: "#7ee8d6",
          400: "#43d0bb",
          500: "#1fb6a0",
        },
      },
      fontFamily: {
        display: ["var(--font-cinzel)", "serif"],
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "cosmic-radial":
          "radial-gradient(ellipse at top, rgba(124,58,237,0.25), transparent 55%), radial-gradient(ellipse at bottom, rgba(31,182,160,0.12), transparent 55%)",
        "gold-sheen":
          "linear-gradient(135deg, #f4e0a0 0%, #e6b845 45%, #c07d20 100%)",
      },
      boxShadow: {
        glow: "0 0 40px -8px rgba(139,77,255,0.55)",
        "glow-gold": "0 0 36px -6px rgba(230,184,69,0.5)",
        "inner-glow": "inset 0 0 30px rgba(139,77,255,0.15)",
      },
      keyframes: {
        twinkle: {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px -6px rgba(139,77,255,0.5)" },
          "50%": { boxShadow: "0 0 44px 2px rgba(139,77,255,0.75)" },
        },
      },
      animation: {
        twinkle: "twinkle 4s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin-slow 40s linear infinite",
        "spin-slower": "spin-slow 90s linear infinite",
        "fade-up": "fade-up 0.6s ease-out both",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
