import React from 'react';
import { motion } from 'framer-motion';
import { GradientHeading } from './gradient-heading';

export function PageHero({ 
  title, 
  subtitle, 
  backgroundImage,
  overlayOpacity = 'bg-black/50',
  height = 'h-[60vh]'
}) {
  return (
    <div className={`relative w-full ${height} overflow-hidden`}>
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {/* Gradient Overlay */}
        <div className={`absolute inset-0 ${overlayOpacity} backdrop-blur-sm`} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center z-10 max-w-4xl mx-auto space-y-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-primary">
            {title}
          </h1>
          <p className="text-xl md:text-3xl text-white/90 font-light max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </motion.div>
      </div>
    </div>
  );
} 