'use client';

import { useState } from 'react';
import { AlertTriangle, X, CloudSnow } from 'lucide-react'; // Iconos relevantes
import { motion, AnimatePresence } from 'framer-motion';

export const AlertBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

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
          <div className="p-1.5 bg-white/20 rounded-full flex-shrink-0 animate-pulse">
            <CloudSnow className="h-4 w-4" />
          </div>
          
          <div className="flex-1 text-xs md:text-sm font-medium pt-0.5">
            <p>
              <span className="font-bold text-indigo-200 uppercase tracking-wider mr-1">Clima:</span>
              Pronóstico de bajas temperaturas para el cierre. ¡Traigan abrigo! 🧥
            </p>
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