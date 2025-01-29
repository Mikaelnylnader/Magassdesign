import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const LogoColumn = React.memo(({ logos, index, currentTime }) => {
  const cycleInterval = 2000;
  const columnDelay = index * 200;
  const adjustedTime = (currentTime + columnDelay) % (cycleInterval * logos.length);
  const currentIndex = Math.floor(adjustedTime / cycleInterval);
  const CurrentLogo = useMemo(() => logos[currentIndex].img, [logos, currentIndex]);

  return (
    <motion.div
      className="relative h-24 w-48 overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.1,
        duration: 0.5,
        ease: "easeOut",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`${logos[currentIndex].id}-${currentIndex}`}
          className="absolute inset-0 flex items-center justify-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 20,
              mass: 1,
            },
          }}
          exit={{
            y: -20,
            opacity: 0,
            transition: {
              duration: 0.3,
              ease: "easeIn",
            },
          }}
        >
          <CurrentLogo className="h-16 w-16 text-primary transition-colors duration-200 hover:text-accent" />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
});

function LogoCarousel({ columnCount = 3, logos }) {
  const [logoSets, setLogoSets] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);

  const distributeLogos = useCallback((allLogos, count) => {
    const columns = Array.from({ length: count }, () => []);
    allLogos.forEach((logo, index) => {
      columns[index % count].push(logo);
    });
    return columns;
  }, []);

  useEffect(() => {
    const distributedLogos = distributeLogos(logos, columnCount);
    setLogoSets(distributedLogos);
  }, [logos, columnCount, distributeLogos]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(prev => prev + 100);
    }, 100);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex items-center justify-center gap-12">
      {logoSets.map((columnLogos, index) => (
        <LogoColumn
          key={index}
          logos={columnLogos}
          index={index}
          currentTime={currentTime}
        />
      ))}
    </div>
  );
}

export { LogoCarousel };