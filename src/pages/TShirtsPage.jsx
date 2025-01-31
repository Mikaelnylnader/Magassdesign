import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GradientHeading } from '../components/ui/gradient-heading';
import { ShoppingBagIcon } from 'lucide-react';
import { Carousel } from '../components/ui/carousel';

function TShirtsPage() {
  const [selectedSize, setSelectedSize] = useState(null);
  
  const tshirts = [
    {
      id: 1,
      name: "Classic Magass Logo T-Shirt",
      price: 299,
      image: "/Untitled design (11).png",
      description: "Premium black t-shirt with embroidered Magass Design logo",
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Black", "White"],
      inStock: true
    },
    {
      id: 2,
      name: "Performance Series T-Shirt",
      price: 349,
      image: "/Untitled design (11).png",
      description: "Technical t-shirt with reflective prints and moisture-wicking fabric",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Black", "Navy"],
      inStock: true
    },
    {
      id: 3,
      name: "Limited Edition Race T-Shirt",
      price: 399,
      image: "/Untitled design (11).png",
      description: "Limited edition t-shirt featuring race-inspired graphics",
      sizes: ["M", "L", "XL"],
      colors: ["Black", "Red"],
      inStock: false
    }
  ];

  const handleAddToCart = (tshirt, size) => {
    if (!size) {
      alert("Please select a size");
      return;
    }
    // Add to cart logic here
    console.log(`Added ${tshirt.name} (${size}) to cart`);
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
                Magass T-Shirts
              </GradientHeading>
              <p className="text-xl text-white max-w-3xl text-center">
                Premium quality t-shirts featuring unique automotive designs. 
                Each piece is crafted with attention to detail and style in mind.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tshirts.map((tshirt) => (
              <Link to={`/shop/t-shirts/${tshirt.id}`} key={tshirt.id}>
                <motion.div
                  className="bg-gray-900 rounded-xl overflow-hidden group cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={tshirt.image}
                      alt={tshirt.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {!tshirt.inStock && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">Out of Stock</span>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-white text-xl font-bold mb-2">{tshirt.name}</h3>
                    <p className="text-gray-400 mb-4">{tshirt.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-white text-2xl font-bold">{tshirt.price} kr</span>
                      <div className="flex gap-2">
                        {tshirt.colors.map((color) => (
                          <div
                            key={color}
                            className="w-6 h-6 rounded-full border-2 border-gray-700"
                            style={{ backgroundColor: color.toLowerCase() }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TShirtsPage; 