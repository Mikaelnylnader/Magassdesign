import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GradientHeading } from '../components/ui/gradient-heading';
import { ShoppingBagIcon } from 'lucide-react';
import { Carousel } from '../components/ui/carousel';

function HoodiesPage() {
  const [selectedSize, setSelectedSize] = useState(null);
  
  const hoodies = [
    {
      id: 1,
      name: "Classic Magass Logo Hoodie",
      price: 79.99,
      image: "https://placehold.co/600x400/111111/FFFFFF/png?text=Magass+Hoodie",
      description: "Premium black hoodie with embroidered Magass Design logo",
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Black", "Gray"],
      inStock: true
    },
    {
      id: 2,
      name: "Performance Series Hoodie",
      price: 89.99,
      image: "https://placehold.co/600x400/111111/FFFFFF/png?text=Performance+Hoodie",
      description: "Technical hoodie with reflective prints and premium materials",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Black"],
      inStock: true
    },
    {
      id: 3,
      name: "Limited Edition Race Hoodie",
      price: 99.99,
      image: "https://placehold.co/600x400/111111/FFFFFF/png?text=Race+Hoodie",
      description: "Limited edition hoodie featuring race-inspired graphics",
      sizes: ["M", "L", "XL"],
      colors: ["Black", "Navy"],
      inStock: false
    }
  ];

  const handleAddToCart = (hoodie, size) => {
    if (!size) {
      alert("Please select a size");
      return;
    }
    // Add to cart logic here
    console.log(`Added ${hoodie.name} (${size}) to cart`);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section with Carousel */}
      <div className="relative w-full min-h-[60vh]">
        <Carousel />
        <div className="relative z-30">
          <div className="container mx-auto px-6">
            <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
              <GradientHeading size="xl" variant="light" className="text-center">
                Magass Hoodies
              </GradientHeading>
              <p className="text-xl text-white max-w-3xl text-center">
                Premium quality hoodies featuring unique automotive designs. 
                Each piece is crafted with attention to detail and comfort in mind.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hoodies.map((hoodie) => (
              <motion.div
                key={hoodie.id}
                className="bg-gray-900 rounded-xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={hoodie.image}
                    alt={hoodie.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  {!hoodie.inStock && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">Out of Stock</span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-white text-xl font-bold mb-2">{hoodie.name}</h3>
                  <p className="text-gray-400 mb-4">{hoodie.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-white text-2xl font-bold">${hoodie.price}</span>
                    <div className="flex gap-2">
                      {hoodie.colors.map((color) => (
                        <div
                          key={color}
                          className="w-6 h-6 rounded-full border-2 border-gray-700"
                          style={{ backgroundColor: color.toLowerCase() }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-sm text-gray-400 mb-2">Select Size:</div>
                    <div className="flex flex-wrap gap-2">
                      {hoodie.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors
                            ${selectedSize === size 
                              ? 'bg-accent text-white' 
                              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleAddToCart(hoodie, selectedSize)}
                    disabled={!hoodie.inStock}
                    className={`w-full py-3 px-4 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors
                      ${hoodie.inStock 
                        ? 'bg-accent text-white hover:bg-accent/90' 
                        : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}
                  >
                    <ShoppingBagIcon className="w-5 h-5" />
                    {hoodie.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HoodiesPage; 