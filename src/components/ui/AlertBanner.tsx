'use client';

import { useState, useEffect } from 'react';
import { X, Sparkles, Cloud, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getSmartWeatherRecommendation } from '@/app/actions';

export const AlertBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [data, setData] = useState<{temp: number, recommendation: string} | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Llamamos a la Server Action al montar el componente
    const fetchData = async () => {
      const result = await getSmartWeatherRecommendation();
      if (result.success) {
        setData({
          temp: result.temp,
          recommendation: result.recommendation
        });
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="bg-indigo-600 text-white relative overflow-hidden"
      >
        <div className="container mx-auto px-4 py-3 flex items-start gap-3">
          
          {/* Icono animado */}
          <div className="p-1.5 bg-white/20 rounded-full flex-shrink-0">
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4 text-yellow-300" />
            )}
          </div>
          
          <div className="flex-1 text-xs md:text-sm font-medium pt-0.5">
            {loading ? (
              <span className="animate-pulse">Consultando a Gemini el mejor outfit...</span>
            ) : data ? (
              <p className="flex flex-col sm:flex-row sm:gap-2">
                <span className="font-bold text-indigo-200 uppercase tracking-wider flex items-center gap-1">
                   <Cloud className="h-3 w-3" /> {data.temp}°C en Chihuahua:
                </span>
                <span>{data.recommendation}</span>
              </p>
            ) : (
              <p>No pudimos cargar el clima, ¡ve preparado para todo!</p>
            )}
          </div>

          <button 
            onClick={() => setIsVisible(false)}
            className="text-white/60 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};