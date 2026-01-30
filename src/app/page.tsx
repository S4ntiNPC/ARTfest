'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SCHEDULE, FestivalEvent } from '@/lib/data';
import { MapPin, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [selectedDay, setSelectedDay] = useState<'15'|'16'|'17'|'18'>('16'); // Empezamos en 16 para ver el cambio
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredEvents = SCHEDULE.filter(event => {
    const isDayMatch = event.day === selectedDay;
    const isCategoryMatch = selectedCategory === 'all' || event.type === selectedCategory || event.type === 'track_container';
    return isDayMatch && isCategoryMatch;
  });

  return (
    <div className="min-h-screen bg-black pb-24 pt-4">
      {/* HEADER */}
      <section className="sticky top-0 z-40 bg-black/95 backdrop-blur-md py-4 px-4 mb-6 border-b border-white/5">
        <h1 className="text-3xl font-extrabold tracking-tight text-white">
          Agenda <span className="text-purple-500">2026</span>
        </h1>
        
        {/* Días */}
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {(['15', '16', '17', '18'] as const).map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={clsx(
                "flex-shrink-0 rounded-full px-6 py-2 text-sm font-bold transition-all active:scale-95",
                selectedDay === day ? "bg-white text-black scale-105" : "bg-zinc-900 text-zinc-400 border border-zinc-800"
              )}
            >
              Feb {day}
            </button>
          ))}
        </div>
      </section>

      {/* LISTA */}
      <section className="px-4 space-y-6 max-w-2xl mx-auto min-h-[50vh]">
        <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-widest pl-1">
          Eventos · Feb {selectedDay}
        </h2>

        <div className="space-y-4">
          <AnimatePresence mode='popLayout'>
            {filteredEvents.map((event) => (
              <motion.div key={event.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                
                {/* SI ES UN CONTENEDOR DE RUTAS (El bloque dividido) */}
                {event.type === 'track_container' ? (
                  <TrackSelector event={event} />
                ) : (
                  /* SI ES UN EVENTO NORMAL */
                  <EventCard event={event} />
                )}

              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}

// --- COMPONENTE ESPECIAL: SELECTOR DE RUTAS ---
const TrackSelector = ({ event }: { event: FestivalEvent }) => {
  // Estado: 0 para Canto, 1 para Talleres, null para ninguno
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
        <p className="text-lg font-bold text-white mb-4">Selecciona tu grupo:</p>
        
        {/* BOTONES DE SELECCIÓN (COLUMNAS) */}
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
              <span className="text-sm font-bold text-center">{track.trackName}</span>
              {activeTrackIndex === index ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          ))}
        </div>
      </div>

      {/* LISTA DESPLEGABLE DE LA RUTA SELECCIONADA */}
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

// --- TARJETA DE EVENTO (Standard & Small) ---
const EventCard = ({ event, isSmall }: { event: FestivalEvent, isSmall?: boolean }) => {
  const colorMap: any = {
    taller: 'bg-blue-600', seleccion: 'bg-pink-600', comida: 'bg-green-600', general: 'bg-purple-600'
  };
  const accentStyle = colorMap[event.type] || 'bg-zinc-500';

  return (
    <div className={clsx(
      "group relative flex overflow-hidden rounded-xl bg-zinc-900 border border-white/5 transition-all hover:border-white/10",
      isSmall ? "bg-zinc-800/40" : ""
    )}>
      <div className={`w-1.5 ${accentStyle}`} />
      <div className="flex-1 p-4">
        <div className="mb-1 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400">
            <Clock className="h-3.5 w-3.5" />
            <span className="text-zinc-200">{event.startTime} - {event.endTime}</span>
          </div>
        </div>

        <Link href={event.type !== 'track_container' ? `/event/${event.id}` : '#'} className="block">
          <h3 className={clsx("font-bold text-white mb-2", isSmall ? "text-base" : "text-lg")}>
            {event.title}
          </h3>
        </Link>

        {event.venue && (
          <a href={event.venue.googleMapsLink} target="_blank" className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white w-fit">
            <MapPin className="h-3 w-3" />
            <span className="underline decoration-zinc-700 underline-offset-2">{event.venue.name}</span>
          </a>
        )}
      </div>
    </div>
  );
};