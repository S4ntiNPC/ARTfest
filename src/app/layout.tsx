import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AlertBanner } from '@/components/ui/AlertBanner';
import { html } from 'framer-motion/client';

// Cargamos la fuente Inter (muy legible para UI)
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ARTfest 2026',
  description: 'La experiencia inmersiva del festival de arte.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-black text-white antialiased`}>
        {/* El Navbar siempre visible arriba */}
        <Navbar />
        {/* Agregamos el Banner aquí para que se vea en todas las páginas */}
        <div className="pt-16"> 
           <AlertBanner />
           <main className="min-h-screen">
          {children}
           </main>
        </div>
        {/* El Footer siempre visible abajo */}
        <Footer />
      </body>
    </html>
  );
}