'use client';

import { useState } from 'react';
import Image from 'next/image';
import { SCHEDULE, FestivalEvent } from '@/lib/data';
import { MapPin, Clock, ExternalLink } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  // Estado para el día seleccionado (Tipado estricto)
  const [selectedDay, setSelectedDay] = useState<'15'|'16'|'17'|'18'>('15');
  
  // Estado para filtro de categoría
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Lógica de filtrado en tiempo real
  const filteredEvents = SCHEDULE.filter(event => {
    const isDayMatch = event.day === selectedDay;
    const isCategoryMatch = selectedCategory === 'all' || event.type === selectedCategory;
    return isDayMatch && isCategoryMatch;
  });

  return (
    <div className="min-h-screen bg-black pb-24 pt-4">
      {/* --- HEADER (Sticky) --- */}
      <section className="sticky top-0 z-40 bg-black/80 backdrop-blur-md py-4 px-4 mb-6 border-b border-white/5">
        <h1 className="text-3xl font-extrabold tracking-tight text-white">
          Agenda <span className="text-purple-500">2026</span>
        </h1>
        
        {/* Selector de Días (Tabs estilo iOS) */}
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
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

        {/* Filtros rápidos por Categoría */}
        <div className="mt-3 flex gap-2 overflow-x-auto scrollbar-hide py-1">
          <FilterPill label="Todos" active={selectedCategory === 'all'} onClick={() => setSelectedCategory('all')} color="bg-zinc-700" />
          <FilterPill label="Talleres" active={selectedCategory === 'taller'} onClick={() => setSelectedCategory('taller')} color="bg-blue-600" />
          <FilterPill label="Selección" active={selectedCategory === 'seleccion'} onClick={() => setSelectedCategory('seleccion')} color="bg-pink-600" />
          <FilterPill label="Comida" active={selectedCategory === 'comida'} onClick={() => setSelectedCategory('comida')} color="bg-green-600" />
        </div>
      </section>

      {/* --- LISTA DE EVENTOS (Con Animaciones) --- */}
      <section className="px-4 space-y-4 max-w-2xl mx-auto min-h-[50vh]">
        <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-widest pl-1 mb-4">
          {filteredEvents.length} Eventos · Febrero {selectedDay}
        </h2>

        <div className="space-y-4">
          {/* AnimatePresence permite animar componentes cuando se desmontan/eliminan del DOM */}
          <AnimatePresence mode="wait">
            {filteredEvents.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="py-12 text-center text-zinc-500 rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/30"
              >
                <p>No hay eventos programados para este filtro.</p>
                <button 
                  onClick={() => setSelectedCategory('all')}
                  className="mt-4 text-sm text-purple-400 hover:underline"
                >
                  Ver todos los eventos
                </button>
              </motion.div>
            ) : (
              filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  // Animación de entrada
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  // Animación de salida
                  exit={{ opacity: 0, y: -20 }}
                  // Delay escalonado para efecto cascada
                  transition={{ duration: 0.3, delay: index * 0.05 }} 
                >
                  <EventCard event={event} />
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}

// --- SUBCOMPONENTES UI ---

const EventCard = ({ event }: { event: FestivalEvent }) => {
  // Configuración de estilos por tipo de evento
  const colorMap = {
    taller: 'bg-blue-600 shadow-[0_0_15px_-3px_rgba(37,99,235,0.4)]',
    seleccion: 'bg-pink-600 shadow-[0_0_15px_-3px_rgba(219,39,119,0.4)]',
    comida: 'bg-green-600 shadow-[0_0_15px_-3px_rgba(22,163,74,0.4)]',
    general: 'bg-purple-600 shadow-[0_0_15px_-3px_rgba(147,51,234,0.4)]'
  };

  const accentStyle = colorMap[event.type] || 'bg-zinc-500';

  return (
    <div className="group relative flex overflow-hidden rounded-2xl bg-zinc-900 border border-white/5 transition-all hover:border-white/10 hover:bg-zinc-800/80">
      {/* Barra lateral de color con Glow */}
      <div className={`w-1.5 ${accentStyle}`} />
      
      <div className="flex-1 p-5">
        {/* Header de la tarjeta: Hora y Badges */}
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 bg-zinc-950/50 px-2 py-1 rounded-md border border-white/5">
            <Clock className="h-3.5 w-3.5 text-zinc-300" />
            <span className="tracking-wide text-zinc-200">{event.startTime} - {event.endTime}</span>
          </div>
          {event.type === 'taller' && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded-full">
              Cupo Limitado
            </span>
          )}
        </div>

        <Link href={`/event/${event.id}`} className="hover:underline decoration-white/30 decoration-2 underline-offset-2">
          <h3 className="text-xl font-bold text-white leading-tight mb-3">
            {event.title}
          </h3>
        </Link>

        {/* Información de Ubicación (Link a Google Maps) */}
        <div className="flex flex-col gap-3">
          <a
            href={event.venue.googleMapsLink}
            target="_blank" // Abrir en nueva pestaña/app
            rel="noopener noreferrer" // Seguridad
            className="group/map flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors w-fit"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 group-hover/map:bg-purple-500/20 group-hover/map:text-purple-400 transition-colors">
              <MapPin className="h-4 w-4" />
            </div>
            <span className="underline decoration-zinc-700 underline-offset-4 group-hover/map:decoration-purple-500">
              {event.venue.name}
            </span>
            <ExternalLink className="h-3 w-3 opacity-0 -ml-1 transition-all group-hover/map:opacity-100 group-hover/map:translate-x-1" />
          </a>
          
          {/* Sección de Facilitador (Si existe) */}
          {event.facilitator && (
             <div className="flex items-center gap-3 mt-1 pl-1 border-l-2 border-zinc-800">
                <div className="relative h-8 w-8 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-black bg-zinc-800 ml-2">
                  <Image 
                    src={event.facilitator.avatar} 
                    alt={event.facilitator.name}
                    fill
                    sizes="32px"
                    className="object-cover" 
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-zinc-500">Imparte</span>
                  <span className="text-sm font-medium text-zinc-200">{event.facilitator.name}</span>
                </div>
             </div>
          )}
          
          {/* Descripción (Si no hay facilitador) */}
          {event.description && !event.facilitator && (
             <p className="text-sm text-zinc-500 line-clamp-2 leading-relaxed">{event.description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Definición de Props para los Filtros (TypeScript) ---
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