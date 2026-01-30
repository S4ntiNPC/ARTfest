// --- TIPOS ---
export type EventType = 'taller' | 'seleccion' | 'comida' | 'general' | 'track_container';

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
  venue?: Venue;
  facilitator?: Facilitator;
  // Propiedad para bloques con rutas (Tracks)
  tracks?: {
    trackName: string;
    trackColor: string; // 'blue' | 'pink'
    events: FestivalEvent[];
  }[];
}

// --- SEDES ---
const VENUES: Record<string, Venue> = {
  campusChihuahua: {
    id: 'v_campus',
    name: 'Campus Chihuahua',
    address: 'Calle Sexta y de la Llave #1803, Centro Campus, C. Sexta 2004, 31000 Chihuahua, Chih.',
    googleMapsLink: 'https://maps.app.goo.gl/Q11tB85TPgwXmwKX6', 
  },
  plazaArmas: {
    id: 'v_plaza',
    name: 'Plaza de Armas',
    address: 'C. Segunda n, Centro, 31000 Chihuahua, Chih.',
    googleMapsLink: 'https://maps.app.goo.gl/MDCW5as1gjhWibLQ7',
  },
  teatroCiudad: {
    id: 'v_teatro',
    name: 'Teatro de la Ciudad',
    address: 'Calle Ojinaga 106, Zona Centro, 31000 Chihuahua, Chih.',
    googleMapsLink: 'https://maps.app.goo.gl/i4WfJb13aXfSC7Ay6',
  },
  quintaGameros: {
    id: 'v_gameros',
    name: 'Quinta Gameros',
    address: 'Simon, Av. Paseo Bolívar 401, Zona Centro, 31000 Chihuahua, Chih.',
    googleMapsLink: 'https://maps.app.goo.gl/CeVCyPZSEYAyGMo4A',
  },
  casaSebastian: {
    id: 'v_sebastian',
    name: 'Casa Sebastián',
    address: 'Av. Benito Juárez 601, Parque Rotario, 31000 Chihuahua, Chih.',
    googleMapsLink: 'https://maps.app.goo.gl/DQQrY59y9Fn4hE8q6',
  },
  qualityInn: {
    id: 'v_quality',
    name: 'Hotel Quality Inn',
    address: 'Calle Guadalupe Victoria 409, Centro, 31000 Chihuahua, Chih.',
    googleMapsLink: 'https://maps.app.goo.gl/kjyTMgDHdSeM7DxV8',
  },
  planB: {
    id: 'v_planb',
    name: 'Plan B',
    address: 'Av. Tecnológico¿?', // Ajustar dirección si es necesario
    googleMapsLink: 'https://maps.google.com/?q=Casa+Sebastian7',
  },
  tbd: {
    id: 'v_tbd',
    name: 'Sede por definir',
    address: 'Ubicación pendiente',
    googleMapsLink: '#',
  }
};

// --- AGENDA COMPLETA ---
export const SCHEDULE: FestivalEvent[] = [
  
  // ==========================================
  // DÍA 15 DE FEBRERO (Domingo)
  // ==========================================
  {
    id: '15_montaje',
    title: 'Montaje General',
    description: 'Preparativos y logística en explanada.',
    day: '15',
    startTime: '08:00',
    endTime: '14:30',
    type: 'general',
    venue: VENUES.campusChihuahua,
  },
  {
    id: '15_apertura',
    title: 'Apertura de Campus a Delegaciones',
    description: 'Bienvenida a participantes foráneos.',
    day: '15',
    startTime: '15:00',
    endTime: '15:30',
    type: 'comida', 
    venue: VENUES.campusChihuahua,
  },
  {
    id: '15_feria',
    title: 'Feria Vaquera & Entrega de Kits',
    day: '15',
    startTime: '15:30',
    endTime: '17:30',
    type: 'general', 
    venue: VENUES.campusChihuahua,
  },
  {
    id: '15_inauguracion',
    title: 'INAUGURACIÓN OFICIAL',
    day: '15',
    startTime: '17:30',
    endTime: '20:00',
    type: 'general', 
    venue: VENUES.plazaArmas,
  },
  {
    id: '15_cierre',
    title: 'Cierre del día / Salida',
    day: '15',
    startTime: '20:00',
    endTime: '20:30',
    type: 'comida', 
    venue: VENUES.campusChihuahua,
  },

  // ==========================================
  // DÍA 16 DE FEBRERO (Lunes)
  // ==========================================
  {
    id: '16_registro',
    title: 'Registro General',
    day: '16',
    startTime: '08:00',
    endTime: '08:30',
    type: 'general',
    venue: VENUES.teatroCiudad,
  },
  {
    id: '16_masterclass',
    title: 'Masterclass IA',
    day: '16',
    startTime: '08:30',
    endTime: '09:00',
    type: 'seleccion',
    venue: VENUES.teatroCiudad,
  },
  {
    id: '16_panel',
    title: 'Panel IA',
    day: '16',
    startTime: '09:00',
    endTime: '10:00',
    type: 'seleccion',
    venue: VENUES.teatroCiudad,
  },
  {
    id: '16_break_morning',
    title: 'Break + Traslados',
    day: '16',
    startTime: '10:00',
    endTime: '10:30',
    type: 'general',
  },

  // --- TRACKS DÍA 16 (CORREGIDO: TALLERES SEPARADOS) ---
  {
    id: '16_bloque_dividido',
    title: 'División de Grupos (Día 16)',
    day: '16',
    startTime: '10:30', 
    endTime: '17:30',   
    type: 'track_container', 
    description: 'Selecciona tu grupo:',
    tracks: [
      {
        trackName: 'Selección Canto',
        trackColor: 'pink',
        events: [
          { id: 'c1', title: 'Selección de Canto', startTime: '10:30', endTime: '13:30', day: '16', type: 'seleccion', venue: VENUES.teatroCiudad },
          { id: 'c2', title: 'Comida', startTime: '13:30', endTime: '14:00', day: '16', type: 'comida', venue: VENUES.teatroCiudad },
          { id: 'c3', title: 'Movimiento a Ensayos', startTime: '14:00', endTime: '14:30', day: '16', type: 'general' },
          { id: 'c4', title: 'Ensayo General', startTime: '14:30', endTime: '16:30', day: '16', type: 'general', venue: VENUES.teatroCiudad },
          { id: 'c5', title: 'Preparación para Show', startTime: '16:30', endTime: '17:30', day: '16', type: 'general', venue: VENUES.teatroCiudad },
        ]
      },
      {
        trackName: 'Talleres',
        trackColor: 'blue',
        events: [
          // --- BLOQUE 1 (10:30 - 11:30) ---
          { id: 't16_1_foto', title: 'Taller de Fotografía', startTime: '10:30', endTime: '11:30', day: '16', type: 'taller', venue: VENUES.quintaGameros },
          { id: 't16_1_story', title: 'Taller de StoryTelling', startTime: '10:30', endTime: '11:30', day: '16', type: 'taller', venue: VENUES.casaSebastian },
          { id: 't16_1_danza', title: 'Taller de Danza', startTime: '10:30', endTime: '11:30', day: '16', type: 'taller', venue: VENUES.qualityInn },
          { id: 't16_1_urbano', title: 'Taller de Arte Urbano', startTime: '10:30', endTime: '11:30', day: '16', type: 'taller', venue: VENUES.campusChihuahua },
          
          // Break
          { id: 't16_br', title: 'Break: Hidratación', startTime: '11:30', endTime: '12:00', day: '16', type: 'general' },
          
          // --- BLOQUE 2 (12:00 - 13:30) ---
          { id: 't16_2_foto', title: 'Taller de Fotografía', startTime: '12:00', endTime: '13:30', day: '16', type: 'taller', venue: VENUES.quintaGameros },
          { id: 't16_2_story', title: 'Taller de StoryTelling', startTime: '12:00', endTime: '13:30', day: '16', type: 'taller', venue: VENUES.casaSebastian },
          { id: 't16_2_danza', title: 'Taller de Danza', startTime: '12:00', endTime: '13:30', day: '16', type: 'taller', venue: VENUES.qualityInn },
          { id: 't16_2_urbano', title: 'Taller de Arte Urbano', startTime: '12:00', endTime: '13:30', day: '16', type: 'taller', venue: VENUES.campusChihuahua },
          
          // Comida
          { id: 't16_co', title: 'Comida', startTime: '13:30', endTime: '14:30', day: '16', type: 'comida' },
          
          // --- BLOQUE 3 (14:30 - 16:30) ---
          { id: 't16_3_foto', title: 'Taller de Fotografía', startTime: '14:30', endTime: '16:30', day: '16', type: 'taller', venue: VENUES.quintaGameros },
          { id: 't16_3_story', title: 'Taller de StoryTelling', startTime: '14:30', endTime: '16:30', day: '16', type: 'taller', venue: VENUES.casaSebastian },
          { id: 't16_3_danza', title: 'Taller de Danza', startTime: '14:30', endTime: '16:30', day: '16', type: 'taller', venue: VENUES.qualityInn },
          { id: 't16_3_urbano', title: 'Taller de Arte Urbano', startTime: '14:30', endTime: '16:30', day: '16', type: 'taller', venue: VENUES.campusChihuahua },
          // Adicionales según imagen
          { id: 't16_3_canto', title: 'Canto (No finalistas)', startTime: '14:30', endTime: '16:30', day: '16', type: 'taller', venue: VENUES.campusChihuahua },
          { id: 't16_3_ensamble', title: 'Ensamble (No finalistas)', startTime: '14:30', endTime: '16:30', day: '16', type: 'taller', venue: VENUES.planB },

          // Traslado
          { id: 't16_tr', title: 'Traslado a Teatro', startTime: '16:30', endTime: '17:30', day: '16', type: 'general', venue: VENUES.teatroCiudad },
        ]
      }
    ]
  },
  {
    id: '16_showcase',
    title: 'Showcase Canto y Ensamble',
    day: '16',
    startTime: '17:30',
    endTime: '20:00',
    type: 'general',
    venue: VENUES.teatroCiudad,
  },
  {
    id: '16_cierre',
    title: 'Cierre del día',
    day: '16',
    startTime: '20:00',
    endTime: '20:30',
    type: 'comida',
    venue: VENUES.teatroCiudad,
  },

  // ==========================================
  // DÍA 17 DE FEBRERO (Martes)
  // ==========================================
  {
    id: '17_llegada',
    title: 'Llegada a Campus',
    day: '17',
    startTime: '07:30',
    endTime: '08:00',
    type: 'general',
    venue: VENUES.campusChihuahua,
  },
  {
    id: '17_division',
    title: 'División por disciplina',
    day: '17',
    startTime: '08:00',
    endTime: '08:30',
    type: 'general',
    venue: VENUES.campusChihuahua,
  },
  {
    id: '17_traslado',
    title: 'Traslado general a sedes',
    day: '17',
    startTime: '08:30',
    endTime: '09:00',
    type: 'general',
  },
  // Bloque previo
  {
    id: '17_pre_foto',
    title: 'Taller de Fotografía',
    day: '17',
    startTime: '09:00',
    endTime: '10:00',
    type: 'taller',
    venue: VENUES.casaSebastian,
  },
  {
    id: '17_pre_story',
    title: 'Taller de StoryTelling',
    day: '17',
    startTime: '09:00',
    endTime: '10:00',
    type: 'taller',
    venue: VENUES.tbd,
  },
  {
    id: '17_pre_canto',
    title: 'Taller de Canto',
    day: '17',
    startTime: '09:00',
    endTime: '10:00',
    type: 'taller',
    venue: VENUES.campusChihuahua,
  },
  {
    id: '17_pre_ensamble',
    title: 'Taller de Ensamble',
    day: '17',
    startTime: '09:00',
    endTime: '10:00',
    type: 'taller',
    venue: VENUES.campusChihuahua,
  },
  {
    id: '17_pre_urbano',
    title: 'Taller de Arte Urbano',
    day: '17',
    startTime: '09:00',
    endTime: '10:00',
    type: 'taller',
    venue: VENUES.campusChihuahua,
  },

  {
    id: '17_break_pre',
    title: 'Break',
    day: '17',
    startTime: '10:00',
    endTime: '10:30',
    type: 'general',
  },

  // --- TRACKS DÍA 17 ---
  {
    id: '17_bloque_dividido',
    title: 'División de Grupos (Día 17)',
    day: '17',
    startTime: '10:30', 
    endTime: '17:30',   
    type: 'track_container', 
    description: 'Selecciona tu grupo (Danza o Talleres):',
    tracks: [
      {
        trackName: 'Selección de Danza',
        trackColor: 'pink',
        events: [
          { id: 'd1', title: 'Selección de Danza', startTime: '10:30', endTime: '13:30', day: '17', type: 'seleccion', venue: VENUES.tbd },
          { id: 'd2', title: 'Comida por Sede', startTime: '13:30', endTime: '14:00', day: '17', type: 'comida' },
          { id: 'd3', title: 'Movimiento a Ensayo/Taller', startTime: '14:00', endTime: '14:30', day: '17', type: 'general' },
          { id: 'd4', title: 'Ensayo General de Baile', startTime: '14:30', endTime: '16:30', day: '17', type: 'seleccion', venue: VENUES.tbd },
          { id: 'd5', title: 'Preparación para Show', startTime: '16:30', endTime: '17:30', day: '17', type: 'general' },
        ]
      },
      {
        trackName: 'Talleres Simultáneos',
        trackColor: 'blue',
        events: [
          // Bloque 1
          { id: 't17_1_foto', title: 'Taller de Fotografía', startTime: '10:30', endTime: '13:30', day: '17', type: 'taller', venue: VENUES.casaSebastian },
          { id: 't17_1_story', title: 'Taller de StoryTelling', startTime: '10:30', endTime: '13:30', day: '17', type: 'taller', venue: VENUES.tbd },
          { id: 't17_1_canto', title: 'Taller de Canto', startTime: '10:30', endTime: '13:30', day: '17', type: 'taller', venue: VENUES.campusChihuahua },
          { id: 't17_1_urb', title: 'Taller de Arte Urbano', startTime: '10:30', endTime: '13:30', day: '17', type: 'taller', venue: VENUES.campusChihuahua },
          
          { id: 't17_comida', title: 'Comida', startTime: '13:30', endTime: '14:30', day: '17', type: 'comida' },
          
          // Bloque 2
          { id: 't17_2_foto', title: 'Taller de Fotografía', startTime: '14:30', endTime: '16:30', day: '17', type: 'taller', venue: VENUES.casaSebastian },
          { id: 't17_2_story', title: 'Taller de StoryTelling', startTime: '14:30', endTime: '16:30', day: '17', type: 'taller', venue: VENUES.tbd },
          { id: 't17_2_canto', title: 'Taller de Canto', startTime: '14:30', endTime: '16:30', day: '17', type: 'taller', venue: VENUES.campusChihuahua },
          { id: 't17_2_urb', title: 'Taller de Arte Urbano', startTime: '14:30', endTime: '16:30', day: '17', type: 'taller', venue: VENUES.campusChihuahua },
          
          { id: 't17_traslado', title: 'Traslado a Teatro', startTime: '16:30', endTime: '17:30', day: '17', type: 'general', venue: VENUES.teatroCiudad },
        ]
      }
    ]
  },
  
  // CIERRE DÍA 17
  {
    id: '17_showcase',
    title: 'Showcase Baile',
    day: '17',
    startTime: '17:30',
    endTime: '20:00',
    type: 'general',
    venue: VENUES.teatroCiudad,
  },
  {
    id: '17_cierre',
    title: 'Cierre de día / Salida',
    day: '17',
    startTime: '20:00',
    endTime: '20:30',
    type: 'comida',
    venue: VENUES.teatroCiudad,
  },

  // ==========================================
  // DÍA 18 DE FEBRERO (Miércoles)
  // ==========================================
  {
    id: '18_llegada',
    title: 'Llegada a Teatro',
    day: '18',
    startTime: '08:30',
    endTime: '09:00',
    type: 'general',
    venue: VENUES.teatroCiudad,
  },
  {
    id: '18_gala',
    title: 'GALA DE PREMIACIÓN',
    description: 'Ceremonia de clausura y entrega de premios ARTfest 2026.',
    day: '18',
    startTime: '09:00',
    endTime: '13:30',
    type: 'general',
    venue: VENUES.teatroCiudad,
  }
];