import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { SCHEDULE } from '@/lib/data';
import { MapPin, Clock, ChevronDown, ChevronUp, Utensils, ArrowLeft, Calendar, Users, Instagram } from 'lucide-react';

export function generateStaticParams() {
  return SCHEDULE.map((event) => ({
    id: event.id,
  }));
}

// CORRECCIÓN 1: Definimos params como Promesa (Requisito Next.js 15)
interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EventDetailPage({ params }: PageProps) {
  // CORRECCIÓN 1: Esperamos la promesa
  const { id } = await params;

  const event = SCHEDULE.find((e) => e.id === id);

  if (!event) {
    notFound();
  }

  const bgColors = {
    taller: 'bg-blue-600',
    seleccion: 'bg-pink-600',
    comida: 'bg-green-600',
    general: 'bg-purple-600',
    track_container: 'bg-zinc-800'
  };
  
  const eventType = event.type as keyof typeof bgColors;
  const headerColor = bgColors[eventType] || 'bg-zinc-800';

  return (
    <div className="min-h-screen bg-black pb-10">
      {/* HEADER */}
      <div className={`relative h-48 w-full ${headerColor}`}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-6 relative z-10">
          <Link href="/" className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-black/40 px-4 py-2 text-sm font-medium text-white backdrop-blur-md hover:bg-black/60 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Link>
          <span className="mb-2 inline-block w-fit rounded bg-white/20 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md">
            {event.type}
          </span>
          <h1 className="text-3xl font-extrabold text-white leading-tight">
            {event.title}
          </h1>
        </div>
      </div>

      {/* CONTENIDO */}
      <div className="container mx-auto px-4 -mt-4 relative z-20">
        <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6 shadow-xl">
          
          {/* Info Básica */}
          <div className="flex flex-col gap-4 mb-6 pb-6 border-b border-white/5">
            <div className="flex items-center gap-3 text-zinc-300">
              <Calendar className="h-5 w-5 text-purple-500" />
              <span className="font-medium">Febrero {event.day}</span>
            </div>
            <div className="flex items-center gap-3 text-zinc-300">
              <Clock className="h-5 w-5 text-purple-500" />
              <span className="font-medium">{event.startTime} - {event.endTime}</span>
            </div>
            
            {/* CORRECCIÓN 2: Verificamos si existe event.venue antes de renderizar */}
            {event.venue && (
              <a 
                href={event.venue.googleMapsLink}
                target="_blank"
                className="flex items-center gap-3 text-zinc-300 hover:text-white transition-colors group"
              >
                <MapPin className="h-5 w-5 text-purple-500 group-hover:scale-110 transition-transform" />
                <span className="font-medium underline decoration-zinc-700 underline-offset-4 group-hover:decoration-purple-500">
                  {event.venue.name}
                </span>
              </a>
            )}
          </div>

          {/* Facilitador */}
          {event.facilitator ? (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-white mb-4">Sobre el Tallerista</h2>
              <div className="flex items-start gap-4">
                <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full border-2 border-purple-500/30">
                  <Image 
                    src={event.facilitator.avatar} 
                    alt={event.facilitator.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{event.facilitator.name}</h3>
                  <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                    {event.facilitator.bio}
                  </p>
                  {event.facilitator.instagramUrl && (
                    <a href={event.facilitator.instagramUrl} target="_blank" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-pink-500 hover:text-pink-400">
                      <Instagram className="h-4 w-4" />
                      Seguir en Instagram
                    </a>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="mb-6">
               <h2 className="text-lg font-bold text-white mb-2">Descripción</h2>
               <p className="text-zinc-400 leading-relaxed">
                 {event.description || "Asiste a este evento y disfruta de la experiencia ARTfest."}
               </p>
            </div>
          )}

          <button className="w-full rounded-xl bg-white py-3 text-center font-bold text-black hover:bg-zinc-200 transition-colors">
            {event.type === 'taller' ? 'Inscribirme ahora' : 'Agendar recordatorio'}
          </button>
        </div>
      </div>
    </div>
  );
}