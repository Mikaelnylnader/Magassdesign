import React from 'react';
import { GradientHeading } from '../components/ui/gradient-heading';
import { Carousel } from '../components/ui/carousel';

function Shop() {
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
          {/* Shop Heading Section */}
          <div className="text-center mb-16">
            <GradientHeading size="lg" variant="light" className="mb-4">
              Shop
            </GradientHeading>
            <p className="text-white text-lg max-w-3xl mx-auto leading-relaxed mb-16">
              Explore our exclusive collection of automotive lifestyle products. We offer premium quality 
              hoodies and t-shirts featuring unique designs inspired by car culture. Complete your style with 
              our custom handbrakes and show your passion with our exclusive sticker collection. Each item 
              is carefully designed and crafted for automotive enthusiasts who appreciate quality and style.
            </p>

            {/* Product Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-gray-900 rounded-lg p-8 hover:bg-gray-800 transition-colors cursor-pointer w-full h-full flex flex-col">
                <h3 className="text-white text-2xl font-bold mb-4">Hoodies</h3>
                <p className="text-gray-400">Premium quality hoodies with unique automotive designs</p>
              </div>

              <div className="bg-gray-900 rounded-lg p-8 hover:bg-gray-800 transition-colors cursor-pointer w-full h-full flex flex-col">
                <h3 className="text-white text-2xl font-bold mb-4">T-Shirts</h3>
                <p className="text-gray-400">Stylish t-shirts featuring car culture inspired graphics</p>
              </div>

              <div className="bg-gray-900 rounded-lg p-8 hover:bg-gray-800 transition-colors cursor-pointer w-full h-full flex flex-col">
                <h3 className="text-white text-2xl font-bold mb-4">Caps</h3>
                <p className="text-gray-400">Classic and snapback caps with automotive flair</p>
              </div>

              <div className="bg-gray-900 rounded-lg p-8 hover:bg-gray-800 transition-colors cursor-pointer w-full h-full flex flex-col">
                <h3 className="text-white text-2xl font-bold mb-4">Handbrake</h3>
                <p className="text-gray-400">Custom designed handbrakes for performance and style</p>
              </div>

              <div className="bg-gray-900 rounded-lg p-8 hover:bg-gray-800 transition-colors cursor-pointer w-full h-full flex flex-col">
                <h3 className="text-white text-2xl font-bold mb-4">Stickers</h3>
                <p className="text-gray-400">High-quality vinyl stickers to show your passion</p>
              </div>

              {/* Adding an invisible div to maintain grid alignment */}
              <div className="hidden lg:block"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;