import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../lib/utils";

export function NavBar({ items, className, children }) {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(items[0].name);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Set active tab based on current location
    const currentItem = items.find(item => item.url === location.pathname);
    if (currentItem) {
      setActiveTab(currentItem.name);
    }
  }, [location, items]);

  const handleNavClick = (item) => {
    setActiveTab(item.name);
    if (location.pathname === item.url && item.url === '/') {
      // If clicking home link while on home page, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div
      className={cn(
        "fixed top-0 left-1/2 -translate-x-1/2 z-50 pt-6",
        className
      )}
    >
      <div className="flex items-center gap-3 bg-white/10 border border-white/20 backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
        {items?.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.url;

          return (
            <Link
              key={item.name}
              to={item.url}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
                "text-white/80 hover:text-white",
                isActive && "text-white"
              )}
            >
              <span className="relative z-10 flex items-center gap-2">
                <Icon className="w-4 h-4" />
                {item.name}
              </span>
              {isActive && (
                <motion.div
                  layoutId="navbar"
                  className="absolute inset-0 bg-white/10 rounded-full -z-10"
                  transition={{
                    type: "spring",
                    bounce: 0.25,
                    stiffness: 130,
                    damping: 20,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-white rounded-t-full">
                    <div className="absolute w-12 h-6 bg-white/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-white/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-white/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </Link>
          );
        })}
        <div className="pl-2">{children}</div>
      </div>
    </div>
  );
}