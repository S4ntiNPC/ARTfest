import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Footer } from '@/components/layout/Footer';
import { AlertBanner } from '@/components/ui/AlertBanner';

// Cargamos la fuente Inter
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
      <body className={`${inter.className} bg-black text-white antialiased m-0 p-0`}>
        <div className="w-full"> 
           <AlertBanner />
           <main className="min-h-screen">
             {children}
           </main>
        </div>
        <Footer />
      </body>
    </html>
  );
}