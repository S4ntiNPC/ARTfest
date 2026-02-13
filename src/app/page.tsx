'use client';

import { useState } from 'react';
import Image from 'next/image';
import { SCHEDULE, FestivalEvent } from '@/lib/data';
import { MapPin, Clock, ChevronDown, ChevronUp, Utensils, ArrowLeft, Calendar, Users, Instagram } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

// --- DATOS DE COMIDA ---
const FOOD_LOCATIONS = [
  { id: 1, name: "Campus / Quinta Gameros", image: "/images/campus.jpg", pdfUrl: "https://utmedu-my.sharepoint.com/:b:/g/personal/ivan_vr_tecmilenio_mx/IQAoRojQu0WjRJ_dWiHvR4UnAa79BMiLw_4gXYkg6GjZdJ4?e=wlPqu0" },
  { id: 2, name: "Teatro de la Ciudad", image: "/images/teatro.jpg", pdfUrl: "https://utmedu-my.sharepoint.com/:b:/g/personal/ivan_vr_tecmilenio_mx/IQDeYeuA--XKSL400kxdQsfYAZiKf1SW1tp9_DbKEbo7yPU?e=Pqg0sK" },
  { id: 3, name: "Museo San Sebastián", image: "/images/museo.jpg", pdfUrl: "https://utmedu-my.sharepoint.com/:b:/g/personal/ivan_vr_tecmilenio_mx/IQB7YzGJWKaKRppeOLlqZk4TARahlMP8Y6AxtMMHY2s_Mh8?e=BVjJ8b" },
  { id: 4, name: "Hotel Quality Inn", image: "/images/quality.jpg", pdfUrl: "https://utmedu-my.sharepoint.com/:b:/g/personal/ivan_vr_tecmilenio_mx/IQAjYNKotqU6TbOO8t76-IspAZGFT7ByHyYdEZWosINrEW4?e=gURUL2" },
  { id: 5, name: "Plan B", image: "/images/planb.jpg", pdfUrl: "https://utmedu-my.sharepoint.com/:b:/g/personal/ivan_vr_tecmilenio_mx/IQDUh2nZKgBwQYRzSRwsSWX6AQ3D2s53O3-cF0SHx-3KcaI?e=aVs99E" }
];

// --- DATOS DE TALLERISTAS ---
const FACILITATORS = [
  { id: 2, name: "Claudia Zapata", image: "/images/2.jpg", instagram: "https://www.instagram.com/claudiazappata/" },
  { id: 3, name: "Jasset", image: "/images/3.jpg", instagram: "https://instagram.com/jassetvocalcoach/" },
  { id: 4, name: "Aris Carcaño", image: "/images/4.jpg", instagram: "https://instagram.com/aris_carcano" },
  { id: 5, name: "Yuridia Otero", image: "/images/5.jpg", instagram: "" },
  { id: 6, name: "Adrian Gutierrez", image: "/images/6.jpg", instagram: "https://instagram.com/pasttensefilms" },
  { id: 7, name: "Alan Torres", image: "/images/7.jpg", instagram: "https://instagram.com/alan_torres15" },
  { id: 8, name: "Emilio Espino", image: "/images/8.jpg", instagram: "https://instagram.com/el.ems" },
  { id: 9, name: "Armando Vega", image: "/images/9.jpg", instagram: "https://instagram.com/armandovega.photo" },
  { id: 10, name: "Betsy Soto", image: "/images/10.jpg", instagram: "https://instagram.com/b_soju" },
  { id: 11, name: "Luis Núñez", image: "/images/11.jpg", instagram: "https://instagram.com/xhila_out" },
  { id: 12, name: "Erick Pando", image: "/images/12.jpg", instagram: "https://instagram.com/pando.06" },
  { id: 13, name: "María Fernanda", image: "/images/13.jpg", instagram: "" }
];

export default function Home() {
  const [selectedDay, setSelectedDay] = useState<'15'|'16'|'17'|'18'>('15');
  // 1. AHORA TENEMOS 3 ESTADOS POSIBLES
  const [currentView, setCurrentView] = useState<'agenda' | 'food' | 'workshops'>('agenda');

  const filteredEvents = SCHEDULE.filter(event => event.day === selectedDay);

  return (
    <div className="min-h-screen bg-black pb-24 font-sans text-zinc-100">
      
      {/* --- HEADER --- */}
      <section className="sticky top-0 z-40 bg-black/95 backdrop-blur-md pb-4 pt-2 px-4 mb-6 border-b border-white/5 shadow-sm shadow-black/20">
        
        {/* LOGO (Igual que antes) */}
        <div className="flex justify-center mb-4">
          <div className="relative h-16 w-48 transition-transform hover:scale-105">
            <Image src="/logo.png" alt="ARTfest Logo" fill className="object-contain" priority />
          </div>
        </div>

        {/* 2. NAVEGACIÓN PRINCIPAL (3 BOTONES) */}
        <div className="grid grid-cols-3 gap-1 bg-zinc-900/80 p-1 rounded-xl mb-4 border border-white/10">
            <button 
                onClick={() => setCurrentView('agenda')}
                className={clsx(
                    "flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all",
                    currentView === 'agenda' ? "bg-zinc-800 text-white shadow-md" : "text-zinc-500 hover:text-zinc-300"
                )}
            >
                <Calendar className="w-4 h-4" /> Agenda
            </button>
            <button 
                onClick={() => setCurrentView('workshops')}
                className={clsx(
                    "flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all",
                    currentView === 'workshops' ? "bg-blue-900/40 text-blue-200 border border-blue-500/30" : "text-zinc-500 hover:text-zinc-300"
                )}
            >
                <Users className="w-4 h-4" /> Talleristas
            </button>
            <button 
                onClick={() => setCurrentView('food')}
                className={clsx(
                    "flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all",
                    currentView === 'food' ? "bg-purple-900/40 text-purple-200 border border-purple-500/30" : "text-zinc-500 hover:text-zinc-300"
                )}
            >
                <Utensils className="w-4 h-4" /> Comida
            </button>
        </div>

        {/* SELECTOR DE DÍAS (Solo en Agenda) */}
        <AnimatePresence>
            {currentView === 'agenda' && (
                <motion.div 
                    initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                >
                    <div className="flex items-center justify-between mb-2">
                        <h1 className="text-2xl font-extrabold tracking-tight text-white">
                        Agenda <span className="text-purple-500">2026</span>
                        </h1>
                    </div>
                    {/* ... (tu código de botones de días sigue igual aquí) ... */}
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {(['15', '16', '17', '18'] as const).map((day) => (
                        <button key={day} onClick={() => setSelectedDay(day)} className={clsx("flex-shrink-0 rounded-full px-6 py-2 text-sm font-bold transition-all active:scale-95 border", selectedDay === day ? "bg-white text-black border-white scale-105 shadow-lg shadow-white/10" : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:bg-zinc-800")}>
                        Feb {day}
                        </button>
                    ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
      </section>

      {/* --- CONTENIDO --- */}
      <section className="px-4 max-w-2xl mx-auto min-h-[50vh]">
        
        {/* VISTA 1: AGENDA */}
        {currentView === 'agenda' && (
           /* ... TU CÓDIGO DE AGENDA EXISTENTE ... */
           <div className="space-y-4">
               {/* Pega aquí tu bloque de map filteredEvents... */}
               <AnimatePresence mode='popLayout'>
                {filteredEvents.map((event) => (
                    <motion.div key={event.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                        {event.type === 'track_container' ? <TrackSelector event={event} /> : <EventCard event={event} />}
                    </motion.div>
                ))}
               </AnimatePresence>
           </div>
        )}

        {/* VISTA 2: TALLERISTAS (NUEVA) */}
        {currentView === 'workshops' && (
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }}
                className="grid grid-cols-2 gap-4 pb-20"
            >
                 <div className="col-span-2 border-l-4 border-blue-500 pl-4 mb-4">
                    <h2 className="text-xl font-bold uppercase tracking-wide">Talleristas</h2>
                    <p className="text-zinc-400 text-sm">Conoce a los expertos del festival.</p>
                </div>

                {FACILITATORS.map((person) => (
                    <a 
                        key={person.id} 
                        href={person.instagram} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group relative block overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 hover:border-blue-500 transition-all duration-300"
                    >
                        {/* CAMBIO CLAVE: aspect-[3/4] es formato vertical (flyer) */}
                        <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-800">
                             <Image 
                                src={person.image} 
                                alt={person.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                sizes="(max-width: 768px) 50vw, 33vw"
                             />
                             {/* Gradiente sutil abajo */}
                             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-3">
                             <h3 className="text-sm font-bold text-white leading-tight mb-1">{person.name}</h3>
                             <div className="flex items-center gap-1 text-xs text-blue-400 font-medium">
                                <Instagram className="w-3 h-3" /> 
                                <span>Ver perfil</span>
                             </div>
                        </div>
                    </a>
                ))}
            </motion.div>
        )}

        {/* VISTA 3: COMIDA */}
        {currentView === 'food' && (
             /* ... TU CÓDIGO DE COMIDA EXISTENTE ... */
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
                {/* ... map de FOOD_LOCATIONS ... */}
                  <div className="col-span-1 md:col-span-2 border-l-4 border-purple-600 pl-4 mb-2">
                    <h2 className="text-xl font-bold uppercase tracking-wide">Menú Digital</h2>
                    <p className="text-zinc-400 text-sm">Selecciona tu ubicación para ver opciones.</p>
                </div>
                {FOOD_LOCATIONS.map((place) => (
                    <a key={place.id} href={place.pdfUrl} target="_blank" rel="noopener noreferrer" className="group relative block overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 hover:border-purple-500 transition-all duration-300 shadow-lg">
                        <div className="relative aspect-video w-full overflow-hidden bg-zinc-800">
                            <Image src={place.image} alt={place.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col justify-end p-4">
                            <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors drop-shadow-md">{place.name}</h3>
                            <p className="text-xs text-zinc-200 mt-1 flex items-center gap-1 font-medium">Ver Menú PDF <ChevronDown className="-rotate-90 w-3 h-3 text-purple-400"/></p>
                        </div>
                    </a>
                ))}
             </motion.div>
        )}

      </section>
    </div>
  );
}

// --- COMPONENTE: TARJETA DE EVENTO (Modificada) ---
const EventCard = ({ event, isSmall }: { event: FestivalEvent, isSmall?: boolean }) => {
  // 1. Extraemos las propiedades nuevas (asegúrate de que tu type FestivalEvent las soporte o usa 'as any' temporalmente)
  const { hideTime, trackColor } = event;
  // Mapa de colores base (fallback)
  const colorMap = {
    taller: 'bg-blue-600', 
    seleccion: 'bg-pink-600', 
    comida: 'bg-green-600', 
    general: 'bg-purple-600',
    track_container: 'bg-zinc-800'
  };
  
  const defaultClass = colorMap[event.type as keyof typeof colorMap] || 'bg-zinc-500';

  return (
    <div 
        className={clsx(
            "group relative flex overflow-hidden rounded-xl bg-zinc-900 border transition-all",
            isSmall ? "bg-zinc-800/40" : "",
            // Si hay trackColor usamos borde transparente para manejarlo con style, sino usamos el hover default
            trackColor ? "border-zinc-800" : "border-white/5 hover:border-white/10"
        )}
        style={trackColor ? { backgroundColor: trackColor, borderColor: trackColor } : {}}
    >
      {/* Barra lateral de color (Solo se muestra si NO hay trackColor personalizado, para mantener diseño estándar) */}
      {!trackColor && <div className={`w-1.5 ${defaultClass}`} />}
      
      <div className="flex-1 p-4">
        {/* HORA: Solo renderizar si hideTime es falso o undefined */}
        {!hideTime && (
            <div className="mb-1 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400">
                    <Clock className="h-3.5 w-3.5" />
                    <span className="text-zinc-200">{event.startTime} - {event.endTime}</span>
                </div>
            </div>
        )}

        {/* Título */}
        <h3 className={clsx(
              "font-bold text-white mb-2 leading-tight", 
              isSmall ? "text-base" : "text-lg",
              event.hideTime ? "text-center text-xl py-2 italic" : "" 
          )}>
            {event.title}
        </h3>

        {/* Ubicación */}
        {event.venue && !hideTime && (
          <a href={event.venue.googleMapsLink} target="_blank" className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white w-fit mb-2">
            <MapPin className="h-3 w-3" />
            <span className="underline decoration-zinc-700 underline-offset-2">{event.venue.name}</span>
          </a>
        )}

        {/* Facilitador */}
        {event.facilitator && !isSmall && !hideTime && (
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

// --- COMPONENTE: TRACK SELECTOR (Sin cambios mayores, solo cosméticos) ---
const TrackSelector = ({ event }: { event: FestivalEvent }) => {
  const [activeTrackIndex, setActiveTrackIndex] = useState<number | null>(null);

  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-900/50 overflow-hidden">
      <div className="p-4 border-b border-white/5 bg-zinc-900">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-2 w-2 rounded-full bg-yellow-500 animate-pulse" />
          <h3 className="text-sm font-bold text-zinc-300 uppercase tracking-wider">
            {event.startTime} - {event.endTime} · Simultáneo
          </h3>
        </div>
        <p className="text-lg font-bold text-white mb-4">{event.description || 'Selecciona tu grupo:'}</p>
        
        <div className="grid grid-cols-2 gap-3">
          {event.tracks?.map((track, index) => (
              <button
                key={track.trackName}
                onClick={() => setActiveTrackIndex(activeTrackIndex === index ? null : index)}
                style={activeTrackIndex === index ? { backgroundColor: track.trackColor, borderColor: track.trackColor } : {}}
                className={clsx(
                  "relative flex flex-col items-center justify-center gap-2 rounded-xl p-4 transition-all duration-300 border",
                  activeTrackIndex === index 
                    ? "text-white shadow-lg scale-[1.02]" 
                    : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:border-zinc-700"
                )}
              >
                <span className="text-sm font-bold text-center leading-tight">
                  {track.trackName}
                </span>
                {activeTrackIndex === index ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
          ))}
        </div>
      </div>

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