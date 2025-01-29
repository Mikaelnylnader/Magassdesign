import React, { useState } from "react";
import { motion } from "framer-motion";

export const AnimatedTooltip = ({ items }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {items.map((item, idx) => (
        <div
          key={item.id}
          className="relative"
          onMouseEnter={() => {
            console.log('Mouse enter:', idx);
            setHoveredIndex(idx);
          }}
          onMouseLeave={() => {
            console.log('Mouse leave:', idx);
            setHoveredIndex(null);
          }}
        >
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-800 hover:border-accent transition-colors duration-300">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Tooltip */}
          {hoveredIndex === idx && (
            <div className="absolute -top-24 left-1/2 transform -translate-x-1/2 bg-black/90 text-white p-4 rounded-lg shadow-xl min-w-[200px] text-center">
              <div className="font-bold mb-1">{item.name}</div>
              <div className="text-sm text-accent">{item.designation}</div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};