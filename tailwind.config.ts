import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#111111",
        snow: "#F5F5F5",
        mist: "#F5F5F5",
        copper: { DEFAULT: "#B89245", dark: "#8F6A2A", light: "#E6D2A0" },
      },
      fontFamily: { sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "sans-serif"] },
      maxWidth: { content: "72rem" },
    },
  },
  plugins: [],
};
export default config;
