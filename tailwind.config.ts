import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
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
        "slide-in-diagonal": {
          "0%": { transform: "translateX(-100%) translateY(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0) translateY(0)", opacity: "1" },
        },
        "slide-out-diagonal": {
          "0%": { transform: "translateX(0) translateY(0)", opacity: "1" },
          "100%": { transform: "translateX(100%) translateY(100%)", opacity: "0" },
        },
        "shape-wipe": {
          "0%": { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" },
          "100%": { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" },
        },
        "stagger-in": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px hsl(var(--primary) / 0.3)" },
          "50%": { boxShadow: "0 0 40px hsl(var(--primary) / 0.6)" },
        },
        "text-shimmer": {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
        "persona-slide": {
          "0%": { transform: "translateX(-100%) skewX(-15deg)", opacity: "0" },
          "100%": { transform: "translateX(0) skewX(0)", opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slide-in-diagonal": "slide-in-diagonal 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "slide-out-diagonal": "slide-out-diagonal 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "shape-wipe": "shape-wipe 0.8s cubic-bezier(0.65, 0, 0.35, 1)",
        "stagger-in": "stagger-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "float": "float 3s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "text-shimmer": "text-shimmer 3s linear infinite",
        "persona-slide": "persona-slide 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
