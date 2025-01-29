import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { PhoneIcon } from "@heroicons/react/24/outline";
import { RainbowButton } from "./rainbow-button";
import { Carousel } from "./carousel";

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["custom", "unique", "stunning", "beautiful", "perfect"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="relative w-full min-h-screen">
      <Carousel />
      <div className="relative z-30">
        <div className="container mx-auto">
          <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
            <div>
              <h1 className="text-5xl md:text-7xl font-bold text-primary mb-8">
                Magass Design
              </h1>
            </div>
            <div className="flex gap-4 flex-col">
              <h2 className="text-4xl md:text-6xl max-w-2xl tracking-tighter text-center font-regular">
                <span className="text-primary">We create</span>
                <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                  &nbsp;
                  {titles.map((title, index) => (
                    <motion.span
                      key={index}
                      className="absolute font-semibold"
                      initial={{ opacity: 0, y: "-100" }}
                      transition={{ type: "spring", stiffness: 50 }}
                      animate={
                        titleNumber === index
                          ? {
                              y: 0,
                              opacity: 1,
                            }
                          : {
                              y: titleNumber > index ? -150 : 150,
                              opacity: 0,
                            }
                      }
                    >
                      {title}
                    </motion.span>
                  ))}
                </span>
              </h2>

              <p className="text-lg md:text-xl leading-relaxed tracking-tight text-gray-400 max-w-2xl text-center">
                Transform your vehicle into a masterpiece with our expert custom paint,
                body work, and carbon fiber modifications. Experience automotive excellence
                crafted with Swedish precision.
              </p>
            </div>
            <div className="flex flex-row gap-3">
              <RainbowButton className="gap-4">
                Book Consultation <PhoneIcon className="w-4 h-4" />
              </RainbowButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero };