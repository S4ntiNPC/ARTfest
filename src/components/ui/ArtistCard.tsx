'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Artist } from '@/lib/data'; // Importamos el tipo

interface ArtistCardProps {
  artist: Artist;
}

export const ArtistCard = ({ artist }: ArtistCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -10 }} // Pequeña levitación al pasar el mouse
      className="group relative h-96 w-full cursor-pointer overflow-hidden rounded-2xl bg-zinc-900"
    >
      {/* Imagen de fondo con Zoom suave al hover */}
      <div className="absolute inset-0 h-full w-full">
        <Image
          src={artist.image}
          alt={artist.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Gradiente para que el texto se lea siempre */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      </div>

      {/* Información del Artista */}
      <div className="absolute bottom-0 w-full p-6 text-white">
        <span className="mb-2 inline-block rounded-full bg-purple-600/80 px-3 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
          {artist.genre}
        </span>
        <h3 className="mb-1 text-3xl font-bold">{artist.name}</h3>
        <div className="flex items-center gap-4 text-sm text-zinc-300">
          <span className="flex items-center gap-1">
            🕒 {artist.time}
          </span>
          <span className="flex items-center gap-1">
            📍 {artist.stage}
          </span>
        </div>
      </div>
    </motion.div>
  );
};