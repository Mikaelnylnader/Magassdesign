import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GradientHeading } from '../components/ui/gradient-heading';
import { ShoppingBagIcon } from 'lucide-react';
import { Carousel } from '../components/ui/carousel';

function HandbrakePage() {
  const [selectedOption, setSelectedOption] = useState(null);
  
  const handbrakes = [
    {
      id: 1,
      name: "Magass Pro Handbrake V1",
      price: 299.99,
      image: "https://placehold.co/600x400/111111/FFFFFF/png?text=Pro+Handbrake+V1",
      description: "Professional-grade hydraulic handbrake with precision engineering",
      options: ["Standard", "Competition"],
      colors: ["Black", "Silver"],
      inStock: true
    },
    {
      id: 2,
      name: "Drift Spec Handbrake",
      price: 349.99,
      image: "https://placehold.co/600x400/111111/FFFFFF/png?text=Drift+Handbrake",
      description: "Specialized handbrake designed for drift applications with extended lever",
      options: ["Street", "Pro"],
      colors: ["Black", "Red"],
      inStock: true
    },
    {
      id: 3,
      name: "Limited Edition Carbon Handbrake",
      price: 499.99,
      image: "https://placehold.co/600x400/111111/FFFFFF/png?text=Carbon+Handbrake",
      description: "Premium carbon fiber handbrake with titanium hardware",
      options: ["Premium"],
      colors: ["Carbon"],
      inStock: false
    }
  ];

  const handleAddToCart = (handbrake, option) => {
    if (!option) {
      alert("Please select an option");
      return;
    }
    // Add to cart logic here
    console.log(`Added ${handbrake.name} (${option}) to cart`);
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
                Magass Handbrakes
              </GradientHeading>
              <p className="text-xl text-white max-w-3xl text-center">
                Professional-grade hydraulic handbrakes engineered for precision control. 
                Each handbrake is crafted with premium materials and rigorous quality testing.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {handbrakes.map((handbrake) => (
              <motion.div
                key={handbrake.id}
                className="bg-gray-900 rounded-xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={handbrake.image}
                    alt={handbrake.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  {!handbrake.inStock && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">Out of Stock</span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-white text-xl font-bold mb-2">{handbrake.name}</h3>
                  <p className="text-gray-400 mb-4">{handbrake.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-white text-2xl font-bold">${handbrake.price}</span>
                    <div className="flex gap-2">
                      {handbrake.colors.map((color) => (
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
                    <div className="text-sm text-gray-400 mb-2">Select Option:</div>
                    <div className="flex flex-wrap gap-2">
                      {handbrake.options.map((option) => (
                        <button
                          key={option}
                          onClick={() => setSelectedOption(option)}
                          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors
                            ${selectedOption === option 
                              ? 'bg-accent text-white' 
                              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleAddToCart(handbrake, selectedOption)}
                    disabled={!handbrake.inStock}
                    className={`w-full py-3 px-4 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors
                      ${handbrake.inStock 
                        ? 'bg-accent text-white hover:bg-accent/90' 
                        : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}
                  >
                    <ShoppingBagIcon className="w-5 h-5" />
                    {handbrake.inStock ? 'Add to Cart' : 'Out of Stock'}
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

export default HandbrakePage; 