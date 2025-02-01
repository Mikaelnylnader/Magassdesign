import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBagIcon, Star, Truck, ArrowLeft, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import PayPalButton from '../components/PayPalButton';

function HandbrakeDetail() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedColor, setSelectedColor] = useState('Black');
  const [showPayPal, setShowPayPal] = useState(false);
  const navigate = useNavigate();

  const options = [
    { name: "Base Model", price: 299.99 },
    { name: "With Sensor", price: 349.99 },
    { name: "Premium Bundle", price: 399.99 }
  ];

  const colors = [
    { name: "Black", hex: "#000000" },
    { name: "Silver", hex: "#C0C0C0" }
  ];

  const price = selectedOption ? options.find(opt => opt.name === selectedOption)?.price : options[0].price;

  const handleBuyNow = () => {
    if (!selectedOption) {
      alert("Please select an option");
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
          Back to Handbrakes
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <motion.div 
              className="aspect-square rounded-xl overflow-hidden bg-white/5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <img
                src="/ebrake-600x900.png"
                alt="Magass Pro Handbrake V1"
                className="w-full h-full object-contain p-6"
              />
            </motion.div>
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square rounded-lg overflow-hidden bg-white/5">
                  <img
                    src="/ebrake-600x900.png"
                    alt={`Product view ${i + 1}`}
                    className="w-full h-full object-contain p-2 hover:scale-110 transition-transform cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Magass Pro Handbrake V1</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <span className="text-white/60">(32 reviews)</span>
              </div>
              <p className="text-3xl font-bold text-accent">${price}</p>
            </div>

            <p className="text-lg text-white/80">
              Professional-grade hydraulic handbrake designed for sim racing enthusiasts. 
              Features precision engineering, premium materials, and customizable resistance 
              for the ultimate racing experience.
            </p>

            {/* Option Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Choose Your Package</h3>
              <div className="space-y-3">
                {options.map((option) => (
                  <button
                    key={option.name}
                    onClick={() => setSelectedOption(option.name)}
                    className={`w-full p-4 rounded-lg border-2 transition-all flex items-center justify-between ${
                      selectedOption === option.name 
                        ? 'border-accent bg-accent/10' 
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div>
                      <span className="font-medium">{option.name}</span>
                      <p className="text-sm text-white/60 mt-1">
                        {option.name === "Base Model" && "Standard handbrake with manual calibration"}
                        {option.name === "With Sensor" && "Includes hall effect sensor for precise input"}
                        {option.name === "Premium Bundle" && "Full kit with sensor, USB adapter, and mounting kit"}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold">${option.price}</span>
                      {selectedOption === option.name && (
                        <Check className="w-5 h-5 text-accent" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

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

            {/* Payment Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleBuyNow}
                className="w-full py-4 bg-accent hover:bg-accent/90 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
              >
                Buy Now
              </button>

              {showPayPal && selectedOption && (
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
              <span>Free shipping worldwide on all orders</span>
            </div>

            {/* Product Features */}
            <div className="border-t border-white/10 pt-6">
              <h3 className="text-lg font-semibold mb-4">Features</h3>
              <ul className="list-disc list-inside space-y-2 text-white/80">
                <li>Aircraft-grade aluminum construction</li>
                <li>Precision hydraulic system</li>
                <li>Adjustable resistance</li>
                <li>Hall effect sensor option for accurate input</li>
                <li>USB plug-and-play compatibility</li>
                <li>Custom mounting options</li>
                <li>1-year warranty</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HandbrakeDetail; 