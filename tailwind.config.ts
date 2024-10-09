import type { Config } from "tailwindcss"
const plugin = require("tailwindcss/plugin")

const config = {
  darkMode: "selector",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./layout/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        announcement: {
          DEFAULT: "hsl(var(--announcement-bg))",
          foreground: "hsl(var(--primary-foreground))",
        },
        'linear-bg': '#f1f1f1',
        'crinkled-bg': '#f5f5f5',
        'ruled-bg': '#fffefc',
        'parchment-bg': '#faf3e3',
        'grid-bg': '#ffffff',
        'dot-matrix-bg': '#ffffff', 
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        marquee: {
          "0%": { transform: "translate(var(--announcement-width), 0)" },
          "100%": { transform: "translate(-100%, 0)" },
        },
        shining: {
          "50%": { color: "transparent" },
        },
        longer: {
          "0%": { width: "100%" },
          "100%": { width: "0%" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "marquee-sm": "marquee 5s linear infinite",
        "marquee-md": "marquee 20s linear infinite",
        "cursor-shining": "shining 500ms infinite",
        "longer-sm": "longer 500ms ease-in-out forwards",
        "longer-md": "longer 2500ms ease-in-out forwards",
        "longer-lg": "longer 5000ms ease-in-out forwards",
      },
      backgroundImage: {
        "linear-paper": `
          linear-gradient(90deg, transparent 40px, #abced4 40px, #abced4 42px, transparent 42px),
          linear-gradient(#e1e1e1 0.1em, transparent 0.1em)
        `,
        'crinkled-paper': `
          radial-gradient(circle, rgba(255, 255, 255, 0.3) 20%, transparent 20%),
          radial-gradient(circle, rgba(0, 0, 0, 0.05) 10%, transparent 10%)
        `,
        'ruled-paper': `
          linear-gradient(transparent 90%, #c0c0c0 90%)
        `,
        'parchment-paper': `
          radial-gradient(circle at 30% 30%, rgba(250, 240, 230, 0.7) 10%, transparent 10%),
          radial-gradient(circle at 70% 70%, rgba(255, 250, 240, 0.7) 20%, transparent 20%)
        `,
        'grid-paper': `
          linear-gradient(to right, #ccc 1px, transparent 1px),
          linear-gradient(to bottom, #ccc 1px, transparent 1px)
        `,
        'dot-matrix-paper': `
          radial-gradient(circle, rgba(0, 0, 0, 0.1) 1px, transparent 1px)
        `,
      },
      backgroundSize: {
        "linear-size": "100% 1.5em",
        'crinkled-size': '10px 10px',
        'ruled-size': '100% 20px',
        'parchment-size': '500px 500px',
        'grid-size': '20px 20px',
        'dot-matrix-size': '20px 20px',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        ".pause": {
          "animation-play-state": "paused",
        },
      }
      addUtilities(newUtilities, ["responsive", "hover"])
    }),
  ],
} satisfies Config

export default config
