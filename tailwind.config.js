/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  prefix: "",
  theme: {
    extend: {
      transitionDuration: {
        '1500': '1500ms', // Thêm duration tùy chỉnh 2000ms
      },
      colors: {
        blue: {
          1: "#11cdef",
        },
        green: {
          1: "#2dce89",
        },
        red: {
          1: "#f5365c",
        },
        yellow: {
          1: "#ff9800",
        },
        purple: {
          1: "#5e72e4",
        },
        orange: {
          1: "#fb6340",
        },
        gray: {
          1: "#344767",
        },
        blur_bg: "rgba(0, 0, 0, 0.6)",
        blur_bg_white: "rgba(255, 255, 255, 19%)",
        dark: {
          bg: "#051139",
          bg_2: "#111c44",
          text: "#fff",
          textSoft: "#b7bac1",
          error: "#CF6679",
          success: "#1f7a33",
          warning: "#FFEB3B",
          primaryColor: "#BB86FC",
          secondaryColor: "#03DAC6",
          primaryColorVariant: "#3700B3",
        },
        light: {
          bg: "#eff4f7",
          bg_2: "#fff",
          text: "#000000",
          textSoft: "#4B2E2E",
          error: "#B00020",
          success: "#28a745",
          warning: "#FFC107",
          primaryColor: "#6200EE",
          secondaryColor: "#03DAC6",
          primaryColorVariant: "#3700B3",
        },
    
        // shadcn config
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

