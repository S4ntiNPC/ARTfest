// Tipos de Eventos
export type EventType = 'taller' | 'seleccion' | 'comida' | 'general';

export interface Facilitator {
  id: string;
  name: string;
  bio: string;
  instagramUrl?: string;
  avatar: string;
}

export interface Venue {
  id: string;
  name: string;
  address: string;
  googleMapsLink: string;
}

export interface FestivalEvent {
  id: string;
  title: string;
  description?: string;
  day: '15' | '16' | '17' | '18';
  startTime: string;
  endTime: string;
  type: EventType;
  venue: Venue;
  facilitator?: Facilitator;
}

// --- DATOS REALES (Ubicaciones de Chihuahua) ---

const VENUES: Record<string, Venue> = {
  casaSebastian: {
    id: 'v1',
    name: 'Casa Sebastián (Museo)',
    address: 'Av. Juárez 601, Centro',
    // Link directo a la búsqueda exacta en Maps
    googleMapsLink: 'https://www.google.com/maps/search/?api=1&query=Museo+Sebastian+Casa+Siglo+XIX+Chihuahua',
  },
  teatroCiudad: {
    id: 'v2',
    name: 'Teatro de la Ciudad',
    address: 'Calle Ojinaga 106, Centro',
    googleMapsLink: 'https://www.google.com/maps/search/?api=1&query=Teatro+de+la+Ciudad+Chihuahua',
  },
  plazaPrincipal: {
    id: 'v3',
    name: 'Plaza de Armas',
    address: 'Av. Independencia y Libertad',
    googleMapsLink: 'https://www.google.com/maps/search/?api=1&query=Plaza+de+Armas+Chihuahua',
  }
};

export const SCHEDULE: FestivalEvent[] = [
  {
    id: 'e1',
    title: 'Inauguración ARTfest 2026',
    day: '15',
    startTime: '09:00',
    endTime: '10:30',
    type: 'general',
    venue: VENUES.plazaPrincipal,
    description: 'Ceremonia de apertura con autoridades y presentación de disciplinas.'
  },
  {
    id: 'e2',
    title: 'Taller de Fotografía Urbana',
    day: '15',
    startTime: '11:00',
    endTime: '13:00',
    type: 'taller',
    venue: VENUES.casaSebastian,
    facilitator: {
      id: 'f1',
      name: 'Ana Lens',
      bio: 'Fotógrafa documental con 10 años de experiencia.',
      instagramUrl: 'https://instagram.com',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
    }
  },
  {
    id: 'e3',
    title: 'Eliminatoria: Danza Contemporánea',
    day: '15',
    startTime: '11:00',
    endTime: '14:00',
    type: 'seleccion',
    venue: VENUES.teatroCiudad,
    description: 'Primera ronda de selecciones para la categoría de Danza.'
  },
  {
    id: 'e4',
    title: 'Hora de Comida - Food Trucks',
    day: '15',
    startTime: '14:00',
    endTime: '16:00',
    type: 'comida',
    venue: VENUES.plazaPrincipal,
    description: 'Zona de comida habilitada para participantes.'
  },
  // Evento extra para probar el día 16
  {
    id: 'e5',
    title: 'Finales de Storytelling',
    day: '16',
    startTime: '10:00',
    endTime: '12:00',
    type: 'seleccion',
    venue: VENUES.teatroCiudad,
    description: 'Los mejores narradores compiten por el premio mayor.'
  },
];