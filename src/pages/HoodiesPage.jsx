import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GradientHeading } from '../components/ui/gradient-heading';
import { ShoppingBagIcon } from 'lucide-react';
import { Carousel } from '../components/ui/carousel';
import { useNavigate } from 'react-router-dom';

function HoodiesPage() {
  const [selectedSize, setSelectedSize] = useState(null);
  const navigate = useNavigate();
  
  const hoodies = [
    {
      id: 1,
      name: "Classic Magass Logo Hoodie",
      price: 79.99,
      image: "https://placehold.co/600x400/111111/FFFFFF/png?text=Magass+Hoodie",
      description: "Premium black hoodie with embroidered Magass Design logo",
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Black", "Red", "Blue"],
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
                className="bg-black/40 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-accent/50 transition-all duration-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ 
                  y: -4,
                  scale: 1.01,
                  transition: { 
                    duration: 0.15,
                    ease: "easeOut"
                  }
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => hoodie.id === 1 && navigate('/product/classic-magass-hoodie')}
                style={{ cursor: hoodie.id === 1 ? 'pointer' : 'default' }}
              >
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src="/1000020198.jpg"
                    alt={hoodie.name}
                    className="w-full h-full object-cover"
                  />
                  {!hoodie.inStock && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                      <span className="text-white font-bold text-lg">Out of Stock</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col items-start justify-end p-6">
                    <h3 className="text-white text-xl font-bold mb-2 transform transition-all duration-300 group-hover:translate-y-0">{hoodie.name}</h3>
                    <p className="text-gray-200 mb-4">{hoodie.description}</p>
                    <div className="flex justify-between items-center w-full">
                      <span className="text-white text-2xl font-bold">${hoodie.price}</span>
                      <div className="flex gap-2">
                        {hoodie.colors.map((color) => (
                          <div
                            key={color}
                            className="w-6 h-6 rounded-full border-2 border-white/20 hover:border-accent transition-colors duration-300"
                            style={{ backgroundColor: color.toLowerCase() }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-black">
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