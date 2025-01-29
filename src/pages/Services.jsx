import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GradientHeading } from '../components/ui/gradient-heading';
import { RainbowButton } from '../components/ui/rainbow-button';
import { PhoneIcon } from '@heroicons/react/24/outline';
import { ServicePopup } from '../components/ui/service-popup';
import { GlareCard } from '../components/ui/glare-card';
import { ServicesCarousel } from '../components/ui/services-carousel';

const services = [
  {
    title: "Custom Paint",
    description: "Transform your vehicle with our premium paint services, from classic finishes to cutting-edge color-shift paints.",
    features: [
      "Premium Paint Materials",
      "Custom Color Matching",
      "Candy & Pearl Finishes",
      "Color-Shift Paint",
      "Matte & Satin Finishes",
      "Paint Protection Film",
      "Ceramic Coating"
    ],
    image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&h=800&q=80"
  },
  {
    title: "Body Modifications",
    description: "Enhance your vehicle's aesthetics and aerodynamics with our expert body modification services.",
    features: [
      "Wide Body Kits",
      "Custom Panels",
      "Fender Flares",
      "Front & Rear Bumpers",
      "Side Skirts",
      "Hood Modifications",
      "Trunk Spoilers"
    ],
    image: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=800&h=800&q=80"
  },
  {
    title: "Carbon Fiber",
    description: "Lightweight, strong, and beautiful - our carbon fiber components enhance both performance and aesthetics.",
    features: [
      "Custom Hood Design",
      "Splitters & Diffusers",
      "Mirror Covers",
      "Interior Trim",
      "Spoilers & Wings",
      "Engine Covers",
      "Complete Body Panels"
    ],
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&h=800&q=80"
  },
  {
    title: "Performance",
    description: "Unlock your vehicle's full potential with our comprehensive performance upgrades.",
    features: [
      "Engine Tuning",
      "Suspension Setup",
      "Brake Systems",
      "Exhaust Systems",
      "Turbo & Superchargers",
      "Transmission Upgrades",
      "Cooling Systems"
    ],
    image: "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=800&h=800&q=80"
  }
];

function Services() {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <div className="min-h-screen bg-black">
      <div className="relative w-full min-h-[60vh]">
        <ServicesCarousel />
        <div className="relative z-30">
          <div className="container mx-auto px-6">
            <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
              <GradientHeading size="xl" variant="light" className="text-center">
                Our Services
              </GradientHeading>
              <p className="text-xl text-white max-w-3xl text-center">
                Experience automotive excellence with our comprehensive range of customization services. Each service is delivered with Swedish precision and uncompromising attention to detail.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Services Grid */}
            <div className="grid grid-cols-1 gap-16">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex flex-col md:flex-row items-center gap-8 ${
                    index % 2 === 1 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  <div className="flex-1 w-full">
                    <GlareCard className="flex flex-col items-center justify-center">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover absolute inset-0 transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-start justify-end p-6">
                        <h3 className="text-3xl font-bold text-white mb-2">{service.title}</h3>
                      </div>
                    </GlareCard>
                  </div>
                  <div className="flex-1 w-full flex flex-col justify-center">
                    <h3 className="text-2xl font-bold text-primary mb-4">{service.title}</h3>
                    <p className="text-gray-400 mb-6">{service.description}</p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-gray-400">
                          <span className="text-accent mr-2">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <RainbowButton 
                      className="mt-8"
                      onClick={() => setSelectedService(service)}
                    >
                      Learn More
                    </RainbowButton>
                  </div>
                </motion.div>
              ))}
            </div>

            <ServicePopup
              isOpen={selectedService !== null}
              onClose={() => setSelectedService(null)}
              service={selectedService}
            />

            {/* CTA Section */}
            <section className="mt-20 text-center">
              <GradientHeading size="lg" variant="secondary" className="mb-6">
                Ready to Transform Your Vehicle?
              </GradientHeading>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                Contact us today to discuss your project and discover how we can help bring your vision to life.
              </p>
              <RainbowButton className="inline-flex items-center gap-2">
                Get Started <PhoneIcon className="w-5 h-5" />
              </RainbowButton>
            </section>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Services;