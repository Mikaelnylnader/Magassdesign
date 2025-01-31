import React from 'react';

// Custom Partner Logo component that accepts an image source
export function PartnerLogo({ src, alt, className }) {
  return (
    <img 
      src={src} 
      alt={alt || "Partner logo"} 
      className={`w-auto h-16 object-contain transition-opacity duration-200 hover:opacity-80 ${className || ''}`}
    />
  );
} 