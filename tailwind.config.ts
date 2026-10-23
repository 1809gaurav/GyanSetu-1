import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2.5rem",
      },
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        paper: {
          DEFAULT: "#FAF7F1",
          deep: "#F2EBDD",
          line: "#E6DECF",
        },
        navy: {
          950: "#050B1E",
          900: "#0A1633",
          800: "#101F45",
          700: "#182F60",
          600: "#25437F",
        },
        gold: {
          100: "#FBF3DC",
          200: "#F3E3B4",
          300: "#E8C468",
          400: "#D4AF37",
          500: "#B9922B",
          600: "#8F6C17",
          700: "#6C5010",
        },
        ink: "#0F1A33",
        muted: "#4C5468",
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
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', "Georgia", "serif"],
        sans: ["Lexend", "system-ui", "-apple-system", "sans-serif"],
        hindi: ['"Noto Sans Devanagari"', '"Nirmala UI"', "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "4xl": "2rem",
        "5xl": "2.75rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(10, 22, 51, 0.04), 0 12px 40px -18px rgba(10, 22, 51, 0.18)",
        lift: "0 2px 4px rgba(10, 22, 51, 0.05), 0 30px 60px -30px rgba(10, 22, 51, 0.28)",
        gold: "0 20px 50px -24px rgba(185, 146, 43, 0.55)",
        dock: "0 18px 45px -18px rgba(10, 22, 51, 0.35), 0 2px 0 rgba(255,255,255,0.6) inset",
      },
      backgroundImage: {
        "gold-radial": "radial-gradient(120% 120% at 20% 0%, rgba(232,196,104,0.22) 0%, rgba(250,247,241,0) 55%)",
        "navy-radial": "radial-gradient(90% 90% at 80% 0%, rgba(232,196,104,0.18) 0%, rgba(5,11,30,0) 60%)",
        "grain": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E\")",
      },
      transitionTimingFunction: {
        outExpo: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "scroll-cue": {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.55" },
          "50%": { transform: "translateY(6px)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "scroll-cue": "scroll-cue 2.2s ease-in-out infinite",
        shimmer: "shimmer 8s linear infinite",
      },
    },
  },
  plugins: [animate],
} satisfies Config;
