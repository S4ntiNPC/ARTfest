'use client'; // Necesario porque usaremos animaciones y estado en el futuro

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';

export const Navbar = () => {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/60 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo Animado */}
        <Link href="/" className="flex items-center gap-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold tracking-tighter text-white"
          >
            ART<span className="text-purple-500">fest</span>
          </motion.div>
        </Link>

        {/* Menú Desktop (oculto en móvil) */}
        <nav className="hidden md:block">
          <ul className="flex gap-6 text-sm font-medium text-zinc-400">
            <li className="hover:text-white transition-colors">
              <Link href="/agenda">Agenda</Link>
            </li>
            <li className="hover:text-white transition-colors">
              <Link href="/mapa">Mapa</Link>
            </li>
            <li className="hover:text-white transition-colors">
              <Link href="/artistas">Artistas</Link>
            </li>
          </ul>
        </nav>

        {/* Botón Menú Móvil (visible solo en móvil) */}
        <button className="text-white md:hidden">
          <Menu className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
};