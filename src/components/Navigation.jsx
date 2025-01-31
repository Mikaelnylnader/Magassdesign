import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HomeIcon, WrenchIcon, ShoppingBagIcon, BriefcaseIcon, UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();

  const navItems = [
    { name: 'Home', url: '/', icon: HomeIcon },
    { name: 'Services', url: '/services', icon: WrenchIcon },
    { name: 'Shop', url: '/shop', icon: ShoppingBagIcon },
    { name: 'Work', url: '/work', icon: BriefcaseIcon },
    { name: 'About', url: '/about', icon: UserIcon }
  ];

  return (
    <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <img src="/Magass Design logo.png" alt="Magass Design" className="h-12 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.url}
                className={`text-white hover:text-accent transition-colors ${
                  location.pathname === item.url ? 'text-accent' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
            {user ? (
              <Link
                to="/account"
                className="text-white hover:text-accent transition-colors"
              >
                Account
              </Link>
            ) : (
              <Link
                to="/login"
                className="text-white hover:text-accent transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white hover:text-accent"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-black/95"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.url}
                  className={`block px-3 py-2 text-white hover:text-accent transition-colors ${
                    location.pathname === item.url ? 'text-accent' : ''
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {user ? (
                <Link
                  to="/account"
                  className="block px-3 py-2 text-white hover:text-accent transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Account
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="block px-3 py-2 text-white hover:text-accent transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
} 