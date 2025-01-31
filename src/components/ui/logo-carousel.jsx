import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const LogoColumn = React.memo(({ logos, currentIndex, onMouseEnter, onMouseLeave }) => {
  // Add safety check for undefined logos
  if (!logos || logos.length === 0) {
    return null;
  }

  // Ensure currentIndex is within bounds
  const safeIndex = currentIndex % logos.length;
  const CurrentLogo = logos[safeIndex].img;
  const currentLogoData = logos[safeIndex];

  return (
    <div 
      className="relative h-40 w-40 overflow-hidden"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`${logos[safeIndex].id}-${safeIndex}`}
          className="absolute inset-0 flex items-center justify-center"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{
            y: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
        >
          <a 
            href={currentLogoData.url || '#'} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block transform transition-all duration-300 hover:scale-110"
            title={`Visit ${currentLogoData.name}`}
          >
            <CurrentLogo 
              className="h-28 w-auto max-w-full transition-all duration-300 
                grayscale hover:grayscale-0" 
            />
          </a>
        </motion.div>
      </AnimatePresence>
    </div>
  );
});

function LogoCarousel({ columnCount = 3, logos = [] }) {
  const [logoSets, setLogoSets] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const distributeLogos = useCallback((allLogos, count) => {
    if (!allLogos || allLogos.length === 0) return Array(count).fill([]);
    
    // Distribute logos evenly across columns
    const itemsPerColumn = Math.ceil(allLogos.length / count);
    const columns = Array.from({ length: count }, (_, columnIndex) => {
      const start = columnIndex * itemsPerColumn;
      const end = start + itemsPerColumn;
      return allLogos.slice(start, end);
    });
    
    return columns;
  }, []);

  useEffect(() => {
    const distributedLogos = distributeLogos(logos, columnCount);
    setLogoSets(distributedLogos);
  }, [logos, columnCount, distributeLogos]);

  useEffect(() => {
    if (isPaused) return; // Don't set up interval if paused

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, [isPaused]); // Re-run effect when isPaused changes

  if (!logos || logos.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-20 py-12">
      {logoSets.map((columnLogos, index) => (
        <LogoColumn
          key={index}
          logos={columnLogos}
          currentIndex={currentIndex}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        />
      ))}
    </div>
  );
}

export { LogoCarousel };