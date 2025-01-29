import React from 'react';
import { motion } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { RainbowButton } from './rainbow-button';

export function ServicePopup({ isOpen, onClose, service }) {
  if (!isOpen || !service) return null;

  const serviceTypes = service.title === "Body Modifications" ? [
    {
      name: "Wide Body Kits",
      description: "Complete body transformation with extended fenders and aggressive styling",
      price: "Starting from $8,000"
    },
    {
      name: "Custom Panels",
      description: "Bespoke body panels designed and fabricated to your specifications",
      price: "Starting from $3,500"
    },
    {
      name: "Fender Flares",
      description: "Enhanced wheel clearance with aggressive styling",
      price: "Starting from $2,500"
    },
    {
      name: "Front & Rear Bumpers",
      description: "Custom designed bumpers for unique aesthetics and improved aerodynamics",
      price: "Starting from $4,000"
    },
    {
      name: "Side Skirts & Diffusers",
      description: "Enhanced ground effects and improved aerodynamic performance",
      price: "Starting from $3,000"
    }
  ] : [
    {
      name: "Solid Colors",
      description: "Classic, timeless finishes with deep, rich colors",
      price: "Starting from $3,000"
    },
    {
      name: "Metallic & Pearl",
      description: "Sophisticated finishes with depth and shimmer",
      price: "Starting from $4,500"
    },
    {
      name: "Candy Paint",
      description: "Rich, deep colors with exceptional depth and shine",
      price: "Starting from $6,000"
    },
    {
      name: "Color Shift",
      description: "Dynamic finishes that change color based on viewing angle",
      price: "Starting from $7,500"
    },
    {
      name: "Matte & Satin",
      description: "Contemporary finishes with a sophisticated non-glossy look",
      price: "Starting from $4,000"
    }
  ];

  const process = service.title === "Body Modifications" ? [
    "Design Consultation & 3D Modeling",
    "Custom Panel Fabrication",
    "Test Fitting & Adjustments",
    "Surface Preparation",
    "Paint & Finish Work",
    "Final Assembly",
    "Quality Control & Testing",
    "Final Detailing"
  ] : [
    "Initial Consultation & Color Selection",
    "Surface Preparation & Repair",
    "Primer Application",
    "Base Coat Application",
    "Color Coat Application",
    "Clear Coat Application",
    "Finishing & Detailing",
    "Quality Control & Inspection"
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden"
      >
        {/* Background Gradient */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0 animate-rainbow"
            style={{
              backgroundImage: 'linear-gradient(90deg, hsl(var(--color-1)), hsl(var(--color-5)), hsl(var(--color-3)), hsl(var(--color-4)), hsl(var(--color-2)))',
              backgroundSize: '200%'
            }}
          />
        </div>

        <div className="relative">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-800">
            <h2 className="text-2xl font-bold text-primary">{service.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[80vh] overflow-y-auto">
            {/* Hero Image */}
            <div className="relative h-64 rounded-xl overflow-hidden mb-8">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            {/* Paint Types */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-primary mb-4">
                {service.title === "Body Modifications" ? "Modification Options" : "Paint Options"}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {serviceTypes.map((type) => (
                  <div
                    key={type.name}
                    className="bg-gray-900 p-4 rounded-lg"
                  >
                    <h4 className="text-lg font-semibold text-primary mb-2">{type.name}</h4>
                    <p className="text-gray-400 text-sm mb-2">{type.description}</p>
                    <p className="text-accent">{type.price}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Process */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-primary mb-4">Our Process</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {process.map((step, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-gray-900 p-4 rounded-lg"
                  >
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold">
                      {index + 1}
                    </span>
                    <p className="text-gray-400">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Information */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-primary mb-4">
                Why Choose Our {service.title} Service?
              </h3>
              <ul className="space-y-3 text-gray-400">
                {service.title === "Body Modifications" ? [
                  "Expert fabrication using high-grade materials",
                  "Custom design and 3D modeling capabilities",
                  "Precision fitment and quality assurance",
                  "Comprehensive aerodynamic testing",
                  "Full warranty on all modifications"
                ] : [
                  "Premium quality materials from industry-leading brands",
                  "Expert color matching and custom color creation",
                  "State-of-the-art paint booth and equipment",
                  "Experienced technicians with years of expertise",
                  "Comprehensive warranty on all paint work"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="text-accent">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="flex justify-center">
              <RainbowButton onClick={() => window.location.href = 'mailto:shop@magassdesign.com'}>
                Schedule a Consultation
              </RainbowButton>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}