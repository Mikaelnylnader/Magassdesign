import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRightIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';
import { RainbowButton } from '../components/ui/rainbow-button';

function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = 5.99;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">Your Cart</h1>
            <p className="text-xl text-gray-400 mb-8">Your cart is empty</p>
            <RainbowButton
              onClick={() => window.location.href = '/shop'}
              className="inline-flex items-center"
            >
              Continue Shopping
              <ArrowUpRightIcon className="w-5 h-5 ml-2" />
            </RainbowButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-12 text-primary">Your Cart</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {cartItems.map((item) => (
                <motion.div
                  key={`${item.id}-${item.size}`}
                  className="bg-gray-900 rounded-lg p-6 mb-4 flex items-center gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-primary mb-2">{item.name}</h3>
                    <p className="text-gray-400 mb-2">Size: {item.size}</p>
                    <div className="flex items-center gap-4">
                      <select
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, item.size, parseInt(e.target.value))}
                        className="bg-gray-800 text-primary rounded-lg px-3 py-2"
                      >
                        {[1, 2, 3, 4, 5].map((num) => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        ))}
                      </select>
                      <p className="text-primary font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id, item.size)}
                    className="text-gray-400 hover:text-accent transition-colors"
                  >
                    <TrashIcon className="w-6 h-6" />
                  </button>
                </motion.div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-gray-900 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-primary mb-6">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-400">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-primary font-bold text-xl pt-4 border-t border-gray-800">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                <RainbowButton className="w-full">
                  Proceed to Checkout
                </RainbowButton>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Cart;