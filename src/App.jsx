import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HomeIcon, UserIcon, BriefcaseIcon, ShoppingBagIcon, LogInIcon, WrenchIcon } from 'lucide-react';
import { CartProvider, useCart } from './context/CartContext';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Work from './pages/Work';
import About from './pages/About';
import Services from './pages/Services';
import ImageTest from './pages/ImageTest';
import Account from './pages/Account';
import Chatbot from './components/Chatbot';
import AuthModal from './components/AuthModal';
import { NavBar } from './components/ui/tubelight-navbar';
import { ScrollToTop } from './components/ui/scroll-to-top';

const navItems = [
  { name: 'Home', url: '/', icon: HomeIcon },
  { name: 'Services', url: '/services', icon: WrenchIcon },
  { name: 'Shop', url: '/shop', icon: ShoppingBagIcon },
  { name: 'Work', url: '/work', icon: BriefcaseIcon },
  { name: 'About', url: '/about', icon: UserIcon }
];

function Layout({ children }) {
  const location = useLocation();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleAuthClick = () => {
    setIsAuthModalOpen(true);
  };

  const handleAuthClose = () => {
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    window.location.reload();
  };

  const authButton = isAuthenticated ? (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white hover:text-accent transition-colors"
    >
      <LogInIcon className="w-4 h-4" />
      Sign Out
    </button>
  ) : (
    <button
      onClick={handleAuthClick}
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white hover:text-accent transition-colors"
    >
      <LogInIcon className="w-4 h-4" />
      Sign In
    </button>
  );

  return (
    <div className="min-h-screen bg-secondary text-primary">
      <NavBar items={navItems} className="z-50">
        {authButton}
      </NavBar>
      <AnimatePresence mode="wait">
        {children}
      </AnimatePresence>
      <ScrollToTop />
      <Chatbot />
      <AuthModal isOpen={isAuthModalOpen} onClose={handleAuthClose} />
      <footer className="bg-primary text-secondary py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Magass Design</h3>
              <p className="text-gray-600">Excellence in automotive customization since 2008</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="space-y-2">
                <a href="https://www.instagram.com/magassdesign?igsh=OWMzMTNjeWZ1a3Vn" target="_blank" rel="noopener noreferrer" className="block text-gray-600 hover:text-accent transition-colors">Instagram</a>
                <a href="https://www.youtube.com/magassdesign" target="_blank" rel="noopener noreferrer" className="block text-gray-600 hover:text-accent transition-colors">YouTube</a>
                <a href="https://www.facebook.com/share/17tVwbZA8C/" target="_blank" rel="noopener noreferrer" className="block text-gray-600 hover:text-accent transition-colors">Facebook</a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <p className="text-gray-600">shop@magassdesign.com</p>
              <p className="text-gray-600">+1 (555) 123-4567</p>
              <p className="text-gray-600">Göteborg, Sweden</p>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-600">
            <p>&copy; 2023 Magass Design. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <CartProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/work" element={<Work />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
            <Route path="/image-test" element={<ImageTest />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </Layout>
      </CartProvider>
    </Router>
  );
}

export default App;