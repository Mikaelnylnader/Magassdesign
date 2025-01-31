import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GradientHeading } from '../components/ui/gradient-heading';
import { Carousel } from '../components/ui/carousel';
import { ShoppingBagIcon, ShirtIcon, HardHatIcon, WrenchIcon, StickerIcon } from 'lucide-react';

function Shop() {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const categories = [
    {
      id: 'hoodies',
      name: 'Hoodies',
      description: 'Premium quality hoodies with unique automotive designs',
      icon: ShoppingBagIcon,
      path: '/shop/hoodies',
      comingSoon: false
    },
    {
      id: 'tshirts',
      name: 'T-Shirts',
      description: 'Stylish t-shirts featuring car culture inspired graphics',
      icon: ShirtIcon,
      path: '/shop/t-shirts',
      comingSoon: false
    },
    {
      id: 'caps',
      name: 'Caps',
      description: 'Classic and snapback caps with automotive flair',
      icon: HardHatIcon,
      path: '/shop/caps',
      comingSoon: true
    },
    {
      id: 'handbrake',
      name: 'Handbrake',
      description: 'Custom designed handbrakes for performance and style',
      icon: WrenchIcon,
      path: '/shop/handbrake',
      comingSoon: false
    },
    {
      id: 'stickers',
      name: 'Stickers',
      description: 'High-quality vinyl stickers to show your passion',
      icon: StickerIcon,
      path: '/shop/stickers',
      comingSoon: true
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <div className="relative w-full min-h-[60vh]">
        <Carousel />
        <div className="relative z-30">
          <div className="container mx-auto px-6">
            <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
              <GradientHeading size="xl" variant="light" className="text-center">
                Shop Collection
              </GradientHeading>
              <p className="text-xl text-white max-w-3xl text-center">
                Discover our exclusive automotive lifestyle apparel and accessories. Each piece is designed with the same attention to detail we bring to our custom builds.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Product Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {categories.map((category) => (
              <motion.div
                key={category.id}
                initial={{ y: 0 }}
                animate={{ y: 0 }}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                {category.comingSoon ? (
                  <div
                    onMouseEnter={() => setHoveredCategory(category.id)}
                    onMouseLeave={() => setHoveredCategory(null)}
                    className={`relative bg-black border border-gray-800 rounded-lg p-8 transition-all cursor-not-allowed w-full h-full flex flex-col
                      shadow-[0_0_15px_rgba(0,0,0,0.2)] backdrop-blur-sm
                      ${hoveredCategory === category.id ? 'border-accent shadow-[0_8px_30px_rgba(0,0,0,0.4)]' : 'hover:border-gray-700'}`}
                  >
                    <div className="absolute top-4 right-4 bg-accent px-3 py-1 rounded-full text-xs font-semibold text-white">
                      Coming Soon
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                      {React.createElement(category.icon, {
                        className: `w-6 h-6 ${hoveredCategory === category.id ? 'text-accent' : 'text-gray-400'}`,
                        strokeWidth: 2
                      })}
                      <h3 className="text-white text-2xl font-bold">{category.name}</h3>
                    </div>
                    <p className={`text-gray-400 transition-colors ${hoveredCategory === category.id ? 'text-gray-300' : ''}`}>
                      {category.description}
                    </p>
                  </div>
                ) : (
                  <Link
                    to={category.path}
                    onMouseEnter={() => setHoveredCategory(category.id)}
                    onMouseLeave={() => setHoveredCategory(null)}
                    className={`relative bg-black border border-gray-800 rounded-lg p-8 transition-all w-full h-full flex flex-col no-underline
                      shadow-[0_0_15px_rgba(0,0,0,0.2)] backdrop-blur-sm
                      ${hoveredCategory === category.id ? 'border-accent shadow-[0_8px_30px_rgba(0,0,0,0.4)]' : 'hover:border-gray-700'}`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      {React.createElement(category.icon, {
                        className: `w-6 h-6 ${hoveredCategory === category.id ? 'text-accent' : 'text-gray-400'}`,
                        strokeWidth: 2
                      })}
                      <h3 className="text-white text-2xl font-bold">{category.name}</h3>
                    </div>
                    <p className={`text-gray-400 transition-colors ${hoveredCategory === category.id ? 'text-gray-300' : ''}`}>
                      {category.description}
                    </p>
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;