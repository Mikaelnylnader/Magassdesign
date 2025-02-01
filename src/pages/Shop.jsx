import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GradientHeading } from '../components/ui/gradient-heading';
import { Carousel } from '../components/ui/carousel';
import { ShoppingBagIcon, ShirtIcon, HardHatIcon, WrenchIcon, StickerIcon } from 'lucide-react';
import { GlareCard } from '../components/ui/glare-card';

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
            <Link 
              to="/shop/hoodies"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <GlareCard className="flex flex-col items-center justify-center">
                <img
                  className="h-full w-full absolute inset-0 object-cover"
                  src="/1000020198.jpg"
                  alt="Hoodies"
                />
                <div className="absolute inset-0 bg-black/50 flex flex-col items-start justify-end p-6">
                  <h3 className="text-xl font-bold text-white mb-2">Hoodies</h3>
                  <p className="text-gray-200">Premium quality street wear</p>
                </div>
              </GlareCard>
            </Link>

            <Link 
              to="/shop/t-shirts"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <GlareCard className="flex flex-col items-center justify-center">
                <img
                  className="h-full w-full absolute inset-0 object-cover"
                  src="/Untitled design (11).png"
                  alt="T-shirts"
                />
                <div className="absolute inset-0 bg-black/50 flex flex-col items-start justify-end p-6">
                  <h3 className="text-xl font-bold text-white mb-2">T-shirts</h3>
                  <p className="text-gray-200">Stylish and comfortable designs</p>
                </div>
              </GlareCard>
            </Link>

            <Link 
              to="/shop/handbrake"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <GlareCard className="flex flex-col items-center justify-center h-64">
                <img
                  className="h-full w-full absolute inset-0 object-contain"
                  src="/ebrake-600x900.png"
                  alt="Handbrake"
                />
                <div className="absolute inset-0 bg-black/50 flex flex-col items-start justify-end p-6">
                  <h3 className="text-xl font-bold text-white mb-2">Handbrake</h3>
                  <p className="text-gray-200">Professional-grade hydraulic handbrakes</p>
                </div>
              </GlareCard>
            </Link>

            <Link 
              to="/shop/caps"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <GlareCard className="flex flex-col items-center justify-center">
                <img
                  className="h-full w-full absolute inset-0 object-cover"
                  src="/caps.jpg"
                  alt="Caps"
                />
                <div className="absolute inset-0 bg-black/50 flex flex-col items-start justify-end p-6">
                  <h3 className="text-xl font-bold text-white mb-2">Caps</h3>
                  <p className="text-gray-200">Classic and snapback caps with automotive flair</p>
                  <div className="absolute top-4 right-4 bg-accent px-3 py-1 rounded-full text-xs font-semibold text-white">
                    Coming Soon
                  </div>
                </div>
              </GlareCard>
            </Link>

            <Link 
              to="/shop/stickers"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <GlareCard className="flex flex-col items-center justify-center">
                <img
                  className="h-full w-full absolute inset-0 object-cover"
                  src="/stickers.jpg"
                  alt="Stickers"
                />
                <div className="absolute inset-0 bg-black/50 flex flex-col items-start justify-end p-6">
                  <h3 className="text-xl font-bold text-white mb-2">Stickers</h3>
                  <p className="text-gray-200">High-quality vinyl stickers to show your passion</p>
                  <div className="absolute top-4 right-4 bg-accent px-3 py-1 rounded-full text-xs font-semibold text-white">
                    Coming Soon
                  </div>
                </div>
              </GlareCard>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;