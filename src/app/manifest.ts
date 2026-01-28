import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ARTfest 2026',
    short_name: 'ARTfest',
    description: 'Agenda oficial y experiencia del festival ARTfest.',
    start_url: '/',
    display: 'standalone', // Esto elimina la barra de URL del navegador
    background_color: '#09090b',
    theme_color: '#09090b',
    icons: [
      {
        src: '/favicon.ico', // Usaremos el favicon por ahora
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}