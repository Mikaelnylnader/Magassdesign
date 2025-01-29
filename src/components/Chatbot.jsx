import React, { useState, useEffect, useRef } from 'react';
import { XMarkIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { getChatResponse } from '../utils/deepseek';
import { motion, AnimatePresence } from 'framer-motion';
import { RainbowButton } from './ui/rainbow-button';

const ASSISTANT_PROFILE = {
  name: "Anna",
  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&h=256&q=80",
  role: "AI Assistant"
};

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm Anna. How can I help you with you needs today?", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { id: Date.now(), text: input, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getChatResponse(input);
      const botMessage = { id: Date.now() + 1, text: response, isBot: true };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "I apologize, but I'm having trouble right now. Please try again later or contact us directly at shop@magassdesign.com",
        isBot: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 bg-accent text-white rounded-full p-4 shadow-lg hover:bg-red-700 transition-colors z-50 animate-rainbow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{
          backgroundImage: 'linear-gradient(90deg, hsl(var(--color-1)), hsl(var(--color-5)), hsl(var(--color-3)), hsl(var(--color-4)), hsl(var(--color-2)))',
          backgroundSize: '200%'
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-8 w-96 bg-black rounded-lg shadow-xl z-50 border border-gray-800 overflow-hidden"
          >
            <motion.div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'linear-gradient(90deg, hsl(var(--color-1)), hsl(var(--color-5)), hsl(var(--color-3)), hsl(var(--color-4)), hsl(var(--color-2)))',
                backgroundSize: '200%'
              }}
              animate={{
                backgroundPosition: ['0%', '200%']
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'linear'
              }}
            />

            <div className="relative">
              <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-black/80 gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={ASSISTANT_PROFILE.image}
                    alt={ASSISTANT_PROFILE.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-primary">{ASSISTANT_PROFILE.name}</h3>
                    <p className="text-sm text-gray-400">{ASSISTANT_PROFILE.role}</p>
                  </div>
                </div>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-accent transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <XMarkIcon className="h-6 w-6" />
                </motion.button>
              </div>

              <div className="h-96 overflow-y-auto p-4 space-y-4 bg-black/80">
                {messages.map(message => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        message.isBot
                          ? 'bg-gray-900 text-primary'
                          : 'animate-rainbow text-white'
                      }`}
                      style={!message.isBot ? {
                        backgroundImage: 'linear-gradient(90deg, hsl(var(--color-1)), hsl(var(--color-5)), hsl(var(--color-3)), hsl(var(--color-4)), hsl(var(--color-2)))',
                        backgroundSize: '200%'
                      } : {}}
                    >
                      {message.text}
                    </motion.div>
                  </motion.div>
                ))}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-gray-900 text-primary rounded-lg px-4 py-2">
                      <div className="flex space-x-2">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            animate={{
                              y: [0, -8, 0],
                              backgroundColor: [
                                'hsl(var(--color-1))',
                                'hsl(var(--color-3))',
                                'hsl(var(--color-5))'
                              ]
                            }}
                            transition={{
                              y: { repeat: Infinity, duration: 0.6, delay: i * 0.1 },
                              backgroundColor: { repeat: Infinity, duration: 2, delay: i * 0.3 }
                            }}
                            className="w-2 h-2 rounded-full"
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={handleSend} className="p-4 border-t border-gray-800 bg-black/80">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    disabled={isLoading}
                    className="flex-1 bg-gray-900 text-primary rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
                  />
                  <RainbowButton
                    type="submit"
                    disabled={isLoading}
                    className="p-2 h-10 w-10 flex items-center justify-center"
                  >
                    <PaperAirplaneIcon className="h-5 w-5" />
                  </RainbowButton>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Chatbot;