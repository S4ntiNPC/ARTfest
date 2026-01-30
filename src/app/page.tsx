'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SCHEDULE, FestivalEvent } from '@/lib/data';
import { MapPin, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  // Estado tipado estrictamente
  const [selectedDay, setSelectedDay] = useState<'15'|'16'|'17'|'18'>('15');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Lógica de filtrado
  const filteredEvents = SCHEDULE.filter(event => {
    const isDayMatch = event.day === selectedDay;
    // Mostramos si coincide la categoría O si es un contenedor de rutas (para que no desaparezca al filtrar)
    const isCategoryMatch = selectedCategory === 'all' || event.type === selectedCategory || event.type === 'track_container';
    return isDayMatch && isCategoryMatch;
  });

  return (
    <div className="min-h-screen bg-black pb-24 pt-4">
      {/* --- HEADER --- */}
      <section className="sticky top-0 z-40 bg-black/95 backdrop-blur-md py-4 px-4 mb-6 border-b border-white/5">
        <h1 className="text-3xl font-extrabold tracking-tight text-white">
          Agenda <span className="text-purple-500">2026</span>
        </h1>
        
        {/* Selector de Días */}
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {/* CORRECCIÓN 1: 'as const' para evitar error de tipos en el array */}
          {(['15', '16', '17', '18'] as const).map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={clsx(
                "flex-shrink-0 rounded-full px-6 py-2 text-sm font-bold transition-all active:scale-95",
                selectedDay === day 
                  ? "bg-white text-black scale-105 shadow-lg shadow-white/10" 
                  : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 border border-zinc-800"
              )}
            >
              Feb {day}
            </button>
          ))}
        </div>

        {/* Filtros rápidos */}
        <div className="mt-3 flex gap-2 overflow-x-auto scrollbar-hide py-1">
          <FilterPill label="Todos" active={selectedCategory === 'all'} onClick={() => setSelectedCategory('all')} color="bg-zinc-700" />
          <FilterPill label="Talleres" active={selectedCategory === 'taller'} onClick={() => setSelectedCategory('taller')} color="bg-blue-600" />
          <FilterPill label="Selección" active={selectedCategory === 'seleccion'} onClick={() => setSelectedCategory('seleccion')} color="bg-pink-600" />
          <FilterPill label="Comida" active={selectedCategory === 'comida'} onClick={() => setSelectedCategory('comida')} color="bg-green-600" />
        </div>
      </section>

      {/* --- LISTA DE EVENTOS --- */}
      <section className="px-4 space-y-6 max-w-2xl mx-auto min-h-[50vh]">
        <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-widest pl-1">
          Eventos · Feb {selectedDay}
        </h2>

        <div className="space-y-4">
          <AnimatePresence mode='popLayout'>
            {filteredEvents.length === 0 ? (
               <div className="py-10 text-center text-zinc-500">No hay eventos con este filtro.</div>
            ) : (
              filteredEvents.map((event) => (
                <motion.div 
                  key={event.id} 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  
                  {/* Si es un bloque dividido (Tracks), usamos el componente especial */}
                  {event.type === 'track_container' ? (
                    <TrackSelector event={event} />
                  ) : (
                    /* Si es evento normal, usamos la tarjeta estándar */
                    <EventCard event={event} />
                  )}

                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}

// --- COMPONENTE: SELECTOR DE RUTAS (TRACKS) ---
const TrackSelector = ({ event }: { event: FestivalEvent }) => {
  // Estado para saber qué track está abierto (0, 1, o null)
  const [activeTrackIndex, setActiveTrackIndex] = useState<number | null>(null);

  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-900/50 overflow-hidden">
      <div className="p-4 border-b border-white/5 bg-zinc-900">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-2 w-2 rounded-full bg-yellow-500 animate-pulse" />
          <h3 className="text-sm font-bold text-zinc-300 uppercase tracking-wider">
            {event.startTime} - {event.endTime} · Actividades Simultáneas
          </h3>
        </div>
        <p className="text-lg font-bold text-white mb-4">{event.description || 'Selecciona tu grupo:'}</p>
        
        {/* Botones de Selección */}
        <div className="grid grid-cols-2 gap-3">
          {event.tracks?.map((track, index) => (
            <button
              key={track.trackName}
              onClick={() => setActiveTrackIndex(activeTrackIndex === index ? null : index)}
              className={clsx(
                "relative flex flex-col items-center justify-center gap-2 rounded-xl p-4 transition-all duration-300 border",
                activeTrackIndex === index 
                  ? track.trackColor === 'pink' ? "bg-pink-600 border-pink-500 text-white" : "bg-blue-600 border-blue-500 text-white"
                  : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:bg-zinc-800"
              )}
            >
              <span className="text-sm font-bold text-center leading-tight">{track.trackName}</span>
              {activeTrackIndex === index ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          ))}
        </div>
      </div>

      {/* Lista Desplegable */}
      <AnimatePresence>
        {activeTrackIndex !== null && event.tracks && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-black/40 border-t border-white/5"
          >
            <div className="p-3 space-y-3">
              {event.tracks[activeTrackIndex].events.map((subEvent) => (
                <EventCard key={subEvent.id} event={subEvent} isSmall />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- COMPONENTE: TARJETA DE EVENTO ---
const EventCard = ({ event, isSmall }: { event: FestivalEvent, isSmall?: boolean }) => {
  // Mapa de colores seguro
  const colorMap = {
    taller: 'bg-blue-600', 
    seleccion: 'bg-pink-600', 
    comida: 'bg-green-600', 
    general: 'bg-purple-600',
    track_container: 'bg-zinc-800' // Fallback
  };
  
  // CORRECCIÓN 2: Acceso seguro al objeto con keyof
  const accentStyle = colorMap[event.type as keyof typeof colorMap] || 'bg-zinc-500';

  return (
    <div className={clsx(
      "group relative flex overflow-hidden rounded-xl bg-zinc-900 border border-white/5 transition-all hover:border-white/10",
      isSmall ? "bg-zinc-800/40" : ""
    )}>
      {/* Barra lateral de color */}
      <div className={`w-1.5 ${accentStyle}`} />
      
      <div className="flex-1 p-4">
        {/* Hora */}
        <div className="mb-1 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400">
            <Clock className="h-3.5 w-3.5" />
            <span className="text-zinc-200">{event.startTime} - {event.endTime}</span>
          </div>
        </div>

        {/* Título con Enlace (Si no es track container) */}
        <Link href={event.type !== 'track_container' ? `/event/${event.id}` : '#'} className="block hover:opacity-80 transition-opacity">
          <h3 className={clsx("font-bold text-white mb-2 leading-tight", isSmall ? "text-base" : "text-lg")}>
            {event.title}
          </h3>
        </Link>

        {/* Ubicación */}
        {event.venue && (
          <a href={event.venue.googleMapsLink} target="_blank" className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white w-fit mb-2">
            <MapPin className="h-3 w-3" />
            <span className="underline decoration-zinc-700 underline-offset-2">{event.venue.name}</span>
          </a>
        )}

        {/* CORRECCIÓN 3: Facilitador con Image component optimizado */}
        {event.facilitator && !isSmall && (
             <div className="flex items-center gap-2 mt-3 pt-2 border-t border-white/5">
                <div className="relative h-6 w-6 flex-shrink-0 overflow-hidden rounded-full bg-zinc-800">
                  <Image 
                    src={event.facilitator.avatar} 
                    alt={event.facilitator.name}
                    fill
                    sizes="24px"
                    className="object-cover" 
                  />
                </div>
                <span className="text-xs text-zinc-300">Con {event.facilitator.name}</span>
             </div>
        )}
      </div>
    </div>
  );
};

// --- PROPS DE FILTROS ---
interface FilterPillProps {
  label: string;
  active: boolean;
  onClick: () => void;
  color: string;
}

const FilterPill = ({ label, active, onClick, color }: FilterPillProps) => (
  <button
    onClick={onClick}
    className={clsx(
      "flex-shrink-0 rounded-full px-4 py-1.5 text-xs font-bold border transition-all active:scale-95",
      active 
        ? `${color} text-white border-transparent shadow-md` 
        : "bg-transparent text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-zinc-200"
    )}
  >
    {label}
  </button>
);