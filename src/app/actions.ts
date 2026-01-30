'use server';

export async function getSmartWeatherRecommendation() {
  try {
    // ---------------------------------------------------------
    // 1. Obtener clima de Chihuahua (OpenWeatherMap)
    // ---------------------------------------------------------
    const weatherRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Chihuahua,MX&units=metric&lang=es&appid=${process.env.OPENWEATHER_API_KEY}`,
      { cache: 'no-store' }
    );

    if (!weatherRes.ok) {
      console.error("Error OpenWeather:", weatherRes.status);
      throw new Error('Error al obtener clima');
    }
    
    const weatherData = await weatherRes.json();
    const temp = Math.round(weatherData.main.temp);
    const desc = weatherData.weather[0].description;

    // ---------------------------------------------------------
    // 2. Conectar con Gemini (Modo Manual / REST API)
    // ---------------------------------------------------------
    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
    
    // Prompt
    const prompt = `
      Actúa como un asistente de estilo experto y breve para un festival de arte al aire libre.
      El clima actual en Chihuahua es: ${temp}°C y ${desc}.
      Dame una recomendación de vestimenta MUY BREVE (máximo 15 palabras).
      Ejemplo: "Hace frío, lleva tu chamarra favorita."
      Sin saludos.
    `;

    // URL directa a la API (Modelo Gemini 1.5 Flash)
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-preview:generateContent?key=${apiKey}`;

    const geminiRes = await fetch(geminiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      })
    });

    if (!geminiRes.ok) {
      const errorDetails = await geminiRes.text();
      console.error("🔴 Error Gemini API:", errorDetails);
      throw new Error('Error al conectar con Gemini');
    }

    const geminiData = await geminiRes.json();
    
    // Extraemos la respuesta del JSON complejo de Google
    const recommendation = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || "¡Disfruta el evento!";

    return {
      success: true,
      temp,
      desc,
      recommendation,
    };

  } catch (error) {
    console.error("Error General:", error);
    // Fallback para que no truene la web
    return {
      success: false,
      temp: 0,
      desc: 'No disponible',
      recommendation: 'Lleva ropa cómoda y revisa el pronóstico.',
    };
  }
}