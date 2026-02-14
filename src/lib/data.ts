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
  trackColor?: string;  
  hideTime?: boolean;   
  isFullWidth?: boolean; 
  // Propiedad para bloques con rutas (Tracks)
  tracks?: {
    trackName: string;
    trackColor: string; 
    events: FestivalEvent[];
  }[];
}

// --- SEDES ---
const VENUES: Record<string, Venue> = {
  campusChihuahua: {
    id: 'v_campus',
    name: 'Campus Chihuahua',
    address: 'Calle Sexta y de la Llave #1803, Centro Campus, 31000 Chihuahua, Chih.',
    googleMapsLink: 'https://maps.google.com/?q=Tecmilenio+Chihuahua', 
  },
  plazaArmas: {
    id: 'v_plaza',
    name: 'Plaza de Armas',
    address: 'C. Segunda n, Centro, 31000 Chihuahua, Chih.',
    googleMapsLink: 'https://maps.google.com/?q=Plaza+de+Armas+Chihuahua',
  },
  teatroCiudad: {
    id: 'v_teatro',
    name: 'Teatro de la Ciudad',
    address: 'Calle Ojinaga 106, Zona Centro, 31000 Chihuahua, Chih.',
    googleMapsLink: 'https://maps.google.com/?q=Teatro+de+la+Ciudad+Chihuahua',
  },
  quintaGameros: {
    id: 'v_gameros',
    name: 'Quinta Gameros',
    address: 'Av. Paseo Bolívar 401, Zona Centro, 31000 Chihuahua, Chih.',
    googleMapsLink: 'https://maps.google.com/?q=Quinta+Gameros',
  },
  casaSebastian: { 
    id: 'v_sebastian',
    name: 'Casa Sebastián (Museo)',
    address: 'Av. Benito Juárez 601, Parque Rotario, 31000 Chihuahua, Chih.',
    googleMapsLink: 'https://maps.google.com/?q=Casa+Siglo+XIX+Museo+Sebastian',
  },
  qualityInn: { 
    id: 'v_quality',
    name: 'Hotel Quality Inn',
    address: 'Calle Guadalupe Victoria 409, Centro, 31000 Chihuahua, Chih.',
    googleMapsLink: 'https://maps.google.com/?q=Quality+Inn+Chihuahua',
  },
  planB: { 
    id: 'v_planb',
    name: 'Plan B Estudio',
    address: 'Isla Robinson, Plaza del Sol, 31384 Chihuahua, Chih.', 
    googleMapsLink: 'https://maps.app.goo.gl/FzX19E1Sgx8sN6zXA',
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
    id: '15_llegada',
    title: 'Llegada a Campus',
    description: 'Recepción de delegaciones y registro.',
    day: '15',
    startTime: '14:30',
    endTime: '15:00',
    type: 'general', 
    venue: VENUES.campusChihuahua,
  },
  {
    id: '15_feria',
    title: 'Feria Vaquera',
    description: 'Actividades de integración y cultura local.',
    day: '15',
    startTime: '15:00',
    endTime: '18:00',
    type: 'general', 
    venue: VENUES.campusChihuahua,
  },
  {
    id: '15_inauguracion',
    title: 'INAUGURACIÓN',
    day: '15',
    startTime: '18:00',
    endTime: '20:30',
    type: 'general', 
    venue: VENUES.campusChihuahua, 
  },
  {
    id: '15_salida',
    title: 'Salida Delegaciones',
    day: '15',
    startTime: '20:30',
    endTime: '21:00',
    type: 'general', 
    venue: VENUES.campusChihuahua,
  },

  // ==========================================
  // DÍA 16 DE FEBRERO (Lunes)
  // ==========================================
  {
    id: '16_llegada_teatro',
    title: 'Llegada a Teatro',
    day: '16',
    startTime: '08:00',
    endTime: '08:30',
    type: 'general',
    venue: VENUES.teatroCiudad,
  },
  {
    id: '16_masterclass',
    title: 'Masterclass – IA',
    description: 'Para todas las disciplinas',
    day: '16',
    startTime: '08:30',
    endTime: '09:30',
    type: 'general',
    venue: VENUES.teatroCiudad,
  },
  {
    id: '16_panel',
    title: 'Panel: Arte e Inteligencia Artificial',
    day: '16',
    startTime: '09:30',
    endTime: '10:30',
    type: 'general',
    venue: VENUES.teatroCiudad,
  },

  // --- TRACKS DÍA 16 ---
  {
    id: '16_division_disciplinas',
    title: 'División por Disciplina',
    day: '16',
    startTime: '10:30', 
    endTime: '17:00', 
    type: 'track_container', 
    description: 'Selecciona tu disciplina para ver tu agenda específica:',
    tracks: [
      // --- CANTO ---
      {
        trackName: 'Canto',
        trackColor: '#9C27B0', // Purple
        events: [
          { id: 'c16_div', title: 'División y Traslado (Teatro)', startTime: '10:30', endTime: '11:00', day: '16', type: 'general', venue: VENUES.teatroCiudad },
          { id: 'c16_voc', title: 'Vocalización', startTime: '11:00', endTime: '12:00', day: '16', type: 'taller', venue: VENUES.teatroCiudad },
          { id: 'c16_elim', title: 'Eliminatoria', startTime: '12:00', endTime: '14:00', day: '16', type: 'seleccion', venue: VENUES.teatroCiudad },
          { id: 'c16_food', title: 'Comida', startTime: '14:00', endTime: '15:00', day: '16', type: 'comida' },
          { id: 'c16_tra', title: 'Traslado (Excepto Finalistas)', startTime: '14:30', endTime: '15:00', day: '16', type: 'general', venue: VENUES.teatroCiudad }, 
          { id: 'c16_tall', title: 'Taller con Jasset (Excepto Finalistas)', startTime: '15:30', endTime: '16:30', day: '16', type: 'taller', venue: VENUES.campusChihuahua },
          { id: 'c16_ens', title: 'Ensayo General (Finalistas)', startTime: '17:00', endTime: '18:00', day: '16', type: 'general', venue: VENUES.teatroCiudad }, // Ajuste previo al show
        ]
      },
      // --- ENSAMBLE MUSICAL ---
      {
        trackName: 'Ensamble',
        trackColor: '#E91E63', // Pink
        events: [
          { id: 'e16_tras', title: 'Traslado a Plan B', startTime: '10:30', endTime: '11:00', day: '16', type: 'general', venue: VENUES.planB },
          { id: 'e16_prep', title: 'Preparación con Coaches', startTime: '11:00', endTime: '12:00', day: '16', type: 'taller', venue: VENUES.planB },
          { id: 'e16_elim', title: 'Eliminatoria', startTime: '12:00', endTime: '14:00', day: '16', type: 'seleccion', venue: VENUES.planB },
          { id: 'e16_food', title: 'Comida', startTime: '14:00', endTime: '15:00', day: '16', type: 'comida' },
          { id: 'e16_tra', title: 'Traslado (Excepto Finalistas)', startTime: '14:30', endTime: '15:00', day: '16', type: 'general', venue: VENUES.teatroCiudad },
          { id: 'e16_tall', title: 'Taller con Yuridia (Excepto Finalistas)', startTime: '15:30', endTime: '16:30', day: '16', type: 'taller', venue: VENUES.planB },
          { id: 'e16_ens', title: 'Ensayo General (Finalistas)', startTime: '17:00', endTime: '18:00', day: '16', type: 'general', venue: VENUES.teatroCiudad },
        ]
      },
      // --- DANZA ---
      {
        trackName: 'Danza',
        trackColor: '#00BCD4', // Cyan
        events: [
          { id: 'd16_tras', title: 'División - Hotel', startTime: '10:30', endTime: '11:00', day: '16', type: 'general', venue: VENUES.qualityInn },
          { id: 'd16_tall1', title: 'Taller Danza Vogue', startTime: '11:00', endTime: '14:00', day: '16', type: 'taller', venue: VENUES.qualityInn },
          { id: 'd16_food', title: 'Comida', startTime: '14:00', endTime: '15:00', day: '16', type: 'comida' },
          { id: 'd16_tall2', title: 'Taller: Hip Hop', startTime: '15:00', endTime: '17:00', day: '16', type: 'taller', venue: VENUES.qualityInn },
        ]
      },
      // --- URBAN ART ---
      {
        trackName: 'Urban Art',
        trackColor: '#FF9800', // Orange
        events: [
          { id: 'u16_tras', title: 'División - Campus', startTime: '10:30', endTime: '11:00', day: '16', type: 'general', venue: VENUES.campusChihuahua },
          { id: 'u16_tall1', title: 'Taller División del Norte', startTime: '11:00', endTime: '14:00', day: '16', type: 'taller', venue: VENUES.campusChihuahua },
          { id: 'u16_food', title: 'Comida', startTime: '14:00', endTime: '15:00', day: '16', type: 'comida' },
          { id: 'u16_tall2', title: 'Taller Parte Dos', startTime: '15:00', endTime: '17:00', day: '16', type: 'taller', venue: VENUES.campusChihuahua },
        ]
      },
      // --- STORYTELLING ---
      {
        trackName: 'Storytelling',
        trackColor: '#4CAF50', // Green
        events: [
          { id: 's16_tras', title: 'División - Museo', startTime: '10:30', endTime: '11:00', day: '16', type: 'general', venue: VENUES.casaSebastian },
          { id: 's16_tall1', title: 'Taller', startTime: '11:00', endTime: '14:00', day: '16', type: 'taller', venue: VENUES.casaSebastian },
          { id: 's16_food', title: 'Comida', startTime: '14:00', endTime: '15:00', day: '16', type: 'comida' },
          { id: 's16_tall2', title: 'Taller', startTime: '15:00', endTime: '17:00', day: '16', type: 'taller', venue: VENUES.casaSebastian },
        ]
      },
      // --- FOTOGRAFÍA ---
      {
        trackName: 'Fotografía',
        trackColor: '#0f2594', // Green
        events: [
          { id: 'f16_tras', title: 'División - Quinta Gameros', startTime: '10:30', endTime: '11:00', day: '16', type: 'general', venue: VENUES.quintaGameros },
          { id: 'f16_tall1', title: 'Masterclass Natgeo Explorer', startTime: '11:00', endTime: '14:00', day: '16', type: 'taller', venue: VENUES.quintaGameros },
          { id: 'f16_food', title: 'Comida', startTime: '14:00', endTime: '15:00', day: '16', type: 'comida' },
          { id: 'f16_tall2', title: 'Taller', startTime: '15:00', endTime: '17:00', day: '16', type: 'taller', venue: VENUES.casaSebastian },
        ]
      }

    ]
  },
  
  // EVENTOS DE LA TARDE-NOCHE (Comunes)
  {
    id: '16_traslado_teatro',
    title: 'Traslado a Teatro',
    day: '16',
    startTime: '17:00',
    endTime: '18:00',
    type: 'general',
    venue: VENUES.teatroCiudad,
  },
  {
    id: '16_showcase',
    title: 'SHOWCASE MUSICAL (Canto y Ensamble)',
    description: 'Presentación de Canto y Ensamble. Danza, Storytelling y Urban Art asisten como espectadores.',
    day: '16',
    startTime: '18:00',
    endTime: '19:00',
    type: 'general',
    venue: VENUES.teatroCiudad,
  },
  {
    id: '16_salida',
    title: 'Salida Delegaciones',
    day: '16',
    startTime: '20:30',
    endTime: '21:00',
    type: 'general',
  },

  // ==========================================
  // DÍA 17 DE FEBRERO (Martes)
  // ==========================================
  {
    id: '17_llegada',
    title: 'Llegada a Campus',
    day: '17',
    startTime: '08:00',
    endTime: '08:30',
    type: 'general',
    venue: VENUES.campusChihuahua,
  },
  {
    id: '17_division',
    title: 'División por Disciplina',
    day: '17',
    startTime: '08:30',
    endTime: '09:00',
    type: 'general',
    venue: VENUES.campusChihuahua,
  },

  // --- TRACKS DÍA 17 ---
  {
    id: '17_bloque_disciplinas',
    title: 'Actividades por Disciplina',
    day: '17',
    startTime: '09:00', 
    endTime: '17:00',   
    type: 'track_container', 
    description: 'Selecciona tu disciplina:',
    tracks: [
      // --- CANTO ---
      {
        trackName: 'Canto',
        trackColor: '#9C27B0',
        events: [
          { id: 'c17_m1', title: 'Taller: Mi Música, Mi Negocio', startTime: '09:00', endTime: '10:30', day: '17', type: 'taller', venue: VENUES.campusChihuahua },
          { id: 'c17_br', title: 'Break', startTime: '10:30', endTime: '11:00', day: '17', type: 'general' },
          { id: 'c17_tall', title: 'Taller: Expresión Escénica', startTime: '11:00', endTime: '14:00', day: '17', type: 'taller', venue: VENUES.campusChihuahua },
          { id: 'c17_co', title: 'Comida', startTime: '14:00', endTime: '15:00', day: '17', type: 'comida' },
          { id: 'c17_ens', title: 'Ensayo General (Finalistas)', startTime: '15:00', endTime: '17:00', day: '17', type: 'general' },
        ]
      },
      // --- ENSAMBLE ---
      {
        trackName: 'Ensamble',
        trackColor: '#E91E63',
        events: [
          { id: 'e17_m1', title: 'Taller: Mi Música, Mi Negocio', startTime: '09:00', endTime: '10:30', day: '17', type: 'taller', venue: VENUES.campusChihuahua },
          { id: 'e17_tras', title: 'Traslado a Plan B', startTime: '10:30', endTime: '11:00', day: '17', type: 'general' },
          { id: 'e17_tall1', title: 'Taller', startTime: '11:00', endTime: '14:00', day: '17', type: 'taller', venue: VENUES.planB },
          { id: 'e17_co', title: 'Comida', startTime: '14:00', endTime: '15:00', day: '17', type: 'comida' },
          { id: 'e17_ens', title: 'Ensayo General (Finalistas)', startTime: '15:00', endTime: '17:00', day: '17', type: 'general' },
          { id: 'e17_tall2', title: 'Taller', startTime: '15:00', endTime: '17:00', day: '17', type: 'taller', venue: VENUES.planB },
        ]
      },
      // --- DANZA ---
      {
        trackName: 'Danza',
        trackColor: '#00BCD4',
        events: [
          { id: 'd17_t1', title: 'Taller: House', startTime: '09:00', endTime: '10:30', day: '17', type: 'taller', venue: VENUES.teatroCiudad },
          { id: 'd17_br', title: 'Break Preparación', startTime: '10:30', endTime: '11:00', day: '17', type: 'general' },
          { id: 'd17_eli', title: 'Eliminatoria Danza', startTime: '11:00', endTime: '14:00', day: '17', type: 'seleccion', venue: VENUES.teatroCiudad },
          { id: 'd17_co', title: 'Comida', startTime: '14:00', endTime: '15:00', day: '17', type: 'comida' },
          { id: 'd17_tra', title: 'Traslado (Excepto Finalistas)', startTime: '14:30', endTime: '15:00', day: '17', type: 'general', venue: VENUES.teatroCiudad },
          { id: 'd17_t2', title: 'Taller: Danza Contemporánea (Excepto Finalistas)', startTime: '15:00', endTime: '17:00', day: '17', type: 'taller', venue: VENUES.qualityInn },
          { id: 'd17_ens', title: 'Ensayo General (Finalistas)', startTime: '15:00', endTime: '17:00', day: '17', type: 'general', venue: VENUES.teatroCiudad },
        ]
      },
      // --- URBAN ART ---
      {
        trackName: 'Urban Art',
        trackColor: '#FF9800',
        events: [
          { id: 'u17_mur', title: 'Elaboración de Mural', startTime: '09:00', endTime: '14:00', day: '17', type: 'taller', venue: VENUES.campusChihuahua },
          { id: 'u17_co', title: 'Comida', startTime: '14:00', endTime: '15:00', day: '17', type: 'comida' },
          { id: 'u17_cie', title: 'Cierre de Talleres', startTime: '15:00', endTime: '17:00', day: '17', type: 'taller', venue: VENUES.campusChihuahua },
        ]
      },
      // --- STORYTELLING ---
      {
        trackName: 'Storytelling',
        trackColor: '#4CAF50',
        events: [
          { id: 's17_t1', title: 'Taller', startTime: '09:00', endTime: '10:30', day: '17', type: 'taller', venue: VENUES.campusChihuahua },
          { id: 's17_br', title: 'Break', startTime: '10:30', endTime: '11:00', day: '17', type: 'general' },
          { id: 's17_ret', title: 'Reto Storytelling', startTime: '11:00', endTime: '14:00', day: '17', type: 'seleccion', venue: VENUES.campusChihuahua },
          { id: 's17_co', title: 'Comida', startTime: '14:00', endTime: '15:00', day: '17', type: 'comida' },
          { id: 's17_t2', title: 'Taller', startTime: '15:00', endTime: '17:00', day: '17', type: 'taller', venue: VENUES.campusChihuahua },
        ]
      },{ // --- FOTOGRAFÍA ---
        trackName: 'Fotografía',
        trackColor: '#4f1023',
        events: [
          { id: 'f17_t1', title: 'Taller: Principios de Museografía', startTime: '09:00', endTime: '10:30', day: '17', type: 'taller', venue: VENUES.casaSebastian },
          { id: 'f17_br', title: 'Break y Traslado', startTime: '10:30', endTime: '11:00', day: '17', type: 'general' },
          { id: 'f17_ret', title: 'Taller: Exploración', startTime: '11:00', endTime: '14:00', day: '17', type: 'seleccion', venue: VENUES.campusChihuahua },
          { id: 'f17_co', title: 'Comida', startTime: '14:00', endTime: '15:00', day: '17', type: 'comida' },
          { id: 'f17_t2', title: 'Exposición en Campus', startTime: '15:00', endTime: '17:00', day: '17', type: 'taller', venue: VENUES.campusChihuahua },
        ]
      }
    ]
  },

  // TARDE DÍA 17 (Común)
  {
    id: '17_traslado_teatro',
    title: 'Traslado a Teatro',
    day: '17',
    startTime: '17:00',
    endTime: '18:00',
    type: 'general',
    venue: VENUES.teatroCiudad,
  },
  {
    id: '17_showcase',
    title: 'SHOWCASE DANZA',
    description: 'Presentación de finalistas de Danza.',
    day: '17',
    startTime: '18:00',
    endTime: '19:00',
    type: 'general',
    venue: VENUES.teatroCiudad,
  },
  {
    id: '17_salida',
    title: 'Salida Delegaciones',
    day: '17',
    startTime: '20:30',
    endTime: '21:00',
    type: 'general',
  },

  // ==========================================
  // DÍA 18 DE FEBRERO (Miércoles)
  // ==========================================
  {
    id: '18_llegada',
    title: 'Llegada a Teatro',
    day: '18',
    startTime: '09:00',
    endTime: '10:00',
    type: 'general',
    venue: VENUES.teatroCiudad,
  },
  {
    id: '18_gala',
    title: 'GALA DE PREMIACIÓN ARTFEST',
    description: 'Ceremonia de clausura y entrega de premios.',
    day: '18',
    startTime: '10:00',
    endTime: '13:30',
    type: 'general',
    venue: VENUES.teatroCiudad,
  },
  {
    id: '18_regreso',
    title: 'Regreso a Casa',
    day: '18',
    startTime: '13:30',
    endTime: '14:00',
    type: 'general',
  },
{
    id: '18_gracias',
    title: 'Gracias por vivir el arte en todas sus expresiones.\n¡Nos vemos en la próxima edición de ARTFEST!',
    day: '18',
    startTime: '14:00', 
    endTime: '14:30',
    type: 'general',
    trackColor: '#5f4e22', 
    hideTime: true,       
    isFullWidth: true    
}
];