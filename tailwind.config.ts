
import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        primary: "#b5a846",
        secondary: "#cc9e5d",
        accent: "#dce06d",
        highlight: "#c7d56f",
        success: "#9dd08b",
      },
    },
  },
  plugins: [],
} satisfies Config;
