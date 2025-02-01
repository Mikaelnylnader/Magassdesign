import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HomeIcon, UserIcon, BriefcaseIcon, ShoppingBagIcon, LogInIcon, WrenchIcon } from 'lucide-react';
import { CartProvider, useCart } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Work from './pages/Work';
import About from './pages/About';
import Services from './pages/Services';
import ImageTest from './pages/ImageTest';
import Account from './pages/Account';
import HoodiesPage from './pages/HoodiesPage';
import ProductPage from './pages/ProductPage';
import Chatbot from './components/Chatbot';
import AuthModal from './components/AuthModal';
import Navigation from './components/Navigation';
import { ScrollToTop } from './components/ui/scroll-to-top';
import { NavBar } from './components/ui/tubelight-navbar';
import TShirtsPage from './pages/TShirtsPage';
import HandbrakePage from './pages/HandbrakePage';
import ProductDetail from './pages/ProductDetail';
import TShirtDetail from './pages/TShirtDetail';
import HandbrakeDetail from './pages/HandbrakeDetail';

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
  const [showLogo, setShowLogo] = useState(true);
  const { user, signOut } = useAuth();

  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowLogo(currentScrollY <= 100 || currentScrollY < lastScrollY);
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAuthClick = () => {
    setIsAuthModalOpen(true);
  };

  const handleAuthClose = () => {
    setIsAuthModalOpen(false);
  };

  const authButton = user ? (
    <button
      onClick={signOut}
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
      <motion.img
        src="/Magass Design logo.png"
        alt="Magass Design Logo"
        className="fixed top-6 left-6 w-32 h-auto z-50"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: showLogo ? 1 : 0,
          y: showLogo ? 0 : -20
        }}
        transition={{ duration: 0.3 }}
      />
      <NavBar items={navItems} className="z-50">
        {authButton}
      </NavBar>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <AuthModal isOpen={isAuthModalOpen} onClose={handleAuthClose} />
      <Chatbot />
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">Magass Design</h3>
              <p className="text-white">Excellence in automotive customization since 2008</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Follow Us</h4>
              <div className="space-y-2">
                <a 
                  href="https://www.instagram.com/magassdesign" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block text-white hover:text-accent transition-colors cursor-pointer"
                >
                  Instagram
                </a>
                <a href="https://www.youtube.com/magassdesign" target="_blank" rel="noopener noreferrer" className="block text-white hover:text-accent transition-colors">YouTube</a>
                <a href="https://www.facebook.com/share/17tVwbZA8C/" target="_blank" rel="noopener noreferrer" className="block text-white hover:text-accent transition-colors">Facebook</a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Contact</h4>
              <p className="text-white">shop@magassdesign.com</p>
              <p className="text-white">+1 (555) 123-4567</p>
              <p className="text-white">Göteborg, Sweden</p>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-white">
            <p>&copy; 2025 Magass Design. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/shop/hoodies" element={<HoodiesPage />} />
              <Route path="/shop/t-shirts" element={<TShirtsPage />} />
              <Route path="/shop/t-shirts/:id" element={<ProductPage />} />
              <Route path="/shop/handbrake" element={<HandbrakePage />} />
              <Route path="/work" element={<Work />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/about" element={<About />} />
              <Route path="/image-test" element={<ImageTest />} />
              <Route path="/account" element={<Account />} />
              <Route path="/product/classic-magass-hoodie" element={<ProductDetail />} />
              <Route path="/product/classic-magass-tshirt" element={<TShirtDetail />} />
              <Route path="/product/magass-pro-handbrake" element={<HandbrakeDetail />} />
            </Routes>
          </Layout>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;