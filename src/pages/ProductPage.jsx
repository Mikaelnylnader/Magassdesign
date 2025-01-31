import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { RainbowButton } from '../components/ui/rainbow-button';

function ProductPage() {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);

  const products = {
    "1": {
      id: 1,
      name: "Classic Magass Logo T-Shirt",
      price: 299,
      description: "Premium black t-shirt with embroidered Magass Design logo. Made from 100% organic cotton for maximum comfort and durability.",
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Black", "White"],
      images: ['/Untitled design (11).png'],
      features: [
        'Premium organic cotton',
        'Comfortable fit',
        'High-quality print',
        'Machine washable',
        'Made in Sweden'
      ],
      inStock: true
    }
  };

  const product = products[id];

  if (!product) {
    return (
      <div className="min-h-screen bg-secondary py-16">
        <div className="max-w-7xl mx-auto px-6">
          <Link to="/shop/t-shirts" className="inline-flex items-center text-white hover:text-accent mb-8">
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Back to T-shirts
          </Link>
          <div className="text-white text-center">
            <h1 className="text-3xl font-bold">Product Not Found</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary py-16">
      <div className="max-w-7xl mx-auto px-6">
        <Link to="/shop/t-shirts" className="inline-flex items-center text-white hover:text-accent mb-8">
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Back to T-shirts
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="aspect-square rounded-lg overflow-hidden bg-black/20">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white"
          >
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-2xl font-bold mb-6">{product.price} kr</p>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Size</h3>
              <div className="flex gap-4">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center
                      ${selectedSize === size 
                        ? 'border-accent text-accent' 
                        : 'border-gray-600 text-gray-400 hover:border-gray-400'
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Colors</h3>
              <div className="flex gap-4">
                {product.colors.map((color) => (
                  <div
                    key={color}
                    className="w-10 h-10 rounded-full border-2 border-gray-600"
                    style={{ backgroundColor: color.toLowerCase() }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Quantity</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg border-2 border-gray-600 text-gray-400 hover:border-gray-400"
                >
                  -
                </button>
                <span className="text-xl">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg border-2 border-gray-600 text-gray-400 hover:border-gray-400"
                >
                  +
                </button>
              </div>
            </div>

            <RainbowButton 
              className="w-full mb-8 py-4 flex items-center justify-center gap-2"
              disabled={!product.inStock}
            >
              <ShoppingCartIcon className="w-5 h-5" />
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </RainbowButton>

            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Description</h3>
              <p className="text-gray-300">{product.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Features</h3>
              <ul className="list-disc list-inside text-gray-300">
                {product.features.map((feature, index) => (
                  <li key={index} className="mb-2">{feature}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage; 