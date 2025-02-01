import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBagIcon, Star, Truck, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import PayPalButton from '../components/PayPalButton';

function TShirtDetail() {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState('Black');
  const [showPayPal, setShowPayPal] = useState(false);
  const navigate = useNavigate();

  const sizes = ["S", "M", "L", "XL", "XXL"];
  const colors = [
    { name: "Black", hex: "#000000" },
    { name: "White", hex: "#FFFFFF" },
    { name: "Blue", hex: "#0000FF" }
  ];

  const price = 39.99;

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    setShowPayPal(true);
  };

  const handlePayPalSuccess = (details) => {
    console.log('Payment completed:', details);
    // Handle successful payment (e.g., show confirmation, update order status)
    alert('Payment successful! Order ID: ' + details.id);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to T-Shirts
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <motion.div 
              className="aspect-square rounded-xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <img
                src="/1000020198.jpg"
                alt="Classic Magass Logo T-Shirt"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square rounded-lg overflow-hidden">
                  <img
                    src="/1000020198.jpg"
                    alt={`Product view ${i + 1}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Classic Magass Logo T-Shirt</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <span className="text-white/60">(18 reviews)</span>
              </div>
              <p className="text-3xl font-bold text-accent">${price}</p>
            </div>

            <p className="text-lg text-white/80">
              Premium quality t-shirt featuring the iconic Magass Design logo. Made from soft, 
              breathable cotton for all-day comfort. Perfect for car enthusiasts and style-conscious 
              individuals alike.
            </p>

            {/* Color Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Color</h3>
              <div className="flex gap-3">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      selectedColor === color.name 
                        ? 'border-accent scale-110' 
                        : 'border-white/20 hover:border-white/50'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Size</h3>
              <div className="flex flex-wrap gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedSize === size
                        ? 'bg-accent text-white'
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleBuyNow}
                className="w-full py-4 bg-accent hover:bg-accent/90 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
              >
                Buy Now
              </button>

              {showPayPal && selectedSize && (
                <div className="mt-4 p-4 bg-white/5 rounded-lg">
                  <PayPalScriptProvider options={{ 
                    "client-id": "YOUR_PAYPAL_CLIENT_ID",
                    currency: "USD"
                  }}>
                    <PayPalButton 
                      amount={price} 
                      onSuccess={handlePayPalSuccess}
                    />
                  </PayPalScriptProvider>
                </div>
              )}
            </div>

            {/* Shipping Info */}
            <div className="flex items-center gap-3 text-white/60">
              <Truck className="w-5 h-5" />
              <span>Free shipping on orders over $100</span>
            </div>

            {/* Product Features */}
            <div className="border-t border-white/10 pt-6">
              <h3 className="text-lg font-semibold mb-4">Features</h3>
              <ul className="list-disc list-inside space-y-2 text-white/80">
                <li>100% premium cotton material</li>
                <li>Screen-printed Magass Design logo</li>
                <li>Reinforced shoulder seams</li>
                <li>Tagless neck label for comfort</li>
                <li>Pre-shrunk fabric</li>
                <li>Machine washable</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TShirtDetail; 