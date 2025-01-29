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
        "fixed bottom-0 sm:top-0 left-0 sm:left-1/2 w-full sm:w-auto sm:-translate-x-1/2 z-50 px-4 pb-4 pt-2 sm:pb-0 sm:pt-6",
        className,
      )}
    >
      <div className="flex items-center justify-around sm:justify-start sm:gap-3 bg-black/80 sm:bg-background/5 border border-gray-800 backdrop-blur-lg py-2 sm:py-1 px-2 sm:px-1 rounded-2xl sm:rounded-full shadow-lg">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;

          return (
            <Link
              key={item.name}
              to={item.url}
              onClick={() => handleNavClick(item)}
              className={cn(
                "relative cursor-pointer text-sm font-semibold transition-colors flex flex-col sm:flex-row items-center",
                "px-3 sm:px-6 py-1 sm:py-2 rounded-full",
                "text-gray-400 hover:text-primary",
                isActive && "bg-muted text-primary",
              )}
            >
              <span className="sm:hidden">
                <Icon size={24} strokeWidth={2} />
              </span>
              <span className="hidden sm:inline">{item.name}</span>
              <span className="text-[10px] mt-1 sm:hidden">
                {item.name}
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10 hidden sm:block"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                    <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
              {isActive && (
                <motion.div
                  layoutId="mobile-indicator"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full sm:hidden"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                />
              )}
            </Link>
          );
        })}
        <div className="hidden sm:block border-l border-gray-700 h-8 mx-2" />
        <div className="hidden sm:block">
          {children}
        </div>
      </div>
    </div>
  );
}