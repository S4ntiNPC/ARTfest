'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';

export async function getSmartWeatherRecommendation() {
  try {
    // 1. Obtener clima de Chihuahua (Coordenadas aproximadas o por ciudad)
    const weatherRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Chihuahua,MX&units=metric&lang=es&appid=${process.env.OPENWEATHER_API_KEY}`,
      { cache: 'no-store' } // Importante: No guardar caché para que sea real
    );
    
    if (!weatherRes.ok) {
      console.log("🔥 Estatus HTTP:", weatherRes.status); 
      const errorBody = await weatherRes.text();
      console.log("🔥 Mensaje API:", errorBody);
      
      throw new Error('Error clima'); // Esto lanza el error que ves ahora
    }

    if (!weatherRes.ok) throw new Error('Error clima');
    
    const weatherData = await weatherRes.json();
    const temp = Math.round(weatherData.main.temp);
    const desc = weatherData.weather[0].description;

    // 2. Conectar con Gemini
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || '');
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // 3. Crear el Prompt para la IA
    const prompt = `
      Actúa como un asistente de estilo experto y breve para un festival de arte al aire libre.
      El clima actual en Chihuahua es: ${temp}°C y ${desc}.
      
      Dame una recomendación de vestimenta MUY BREVE (máximo 15 palabras) con un tono amigable y útil.
      Ejemplo: "Hace frío, lleva tu chamarra favorita y bufanda."
      No uses saludos, ve directo al grano.
    `;

    const result = await model.generateContent(prompt);
    const recommendation = result.response.text();

    return {
      success: true,
      temp,
      desc,
      recommendation,
    };

  } catch (error) {
    console.error("🔴 ERROR CRÍTICO EN SERVER ACTION:");
    console.error(error); 
    return {
      success: false,
      temp: 0,
      desc: 'No disponible',
      recommendation: 'Revisa el pronóstico local antes de salir.',
    };
  }
}