import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Definimos la paleta oficial de ARTfest
      colors: {
        artfest: {
          blue: '#2563EB',   // Talleres (Ajusta este hex si tienes el exacto)
          pink: '#DB2777',   // Selección/Eliminatorias
          green: '#16A34A',  // Comida
          purple: '#9333EA', // Eventos Generales
          dark: '#09090b',   // Fondo principal
          gray: '#27272a',   // Tarjetas
        }
      },
      // ... (mantén tus animaciones si las tenías)
    },
  },
  plugins: [],
};
export default config;