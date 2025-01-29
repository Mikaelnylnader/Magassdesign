import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Carousel } from '../components/ui/carousel';
import { GradientHeading } from '../components/ui/gradient-heading';
import { RainbowButton } from '../components/ui/rainbow-button';

function Work() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const projects = [
    { 
      id: 1, 
      title: 'Matte Black M4', 
      category: 'Custom Paint', 
      image_url: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&h=800&q=80' 
    },
    { 
      id: 2, 
      title: 'Carbon Fiber Hood', 
      category: 'Body Modification', 
      image_url: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=800&h=800&q=80' 
    },
    { 
      id: 3, 
      title: 'Pearl White GTR', 
      category: 'Full Restoration', 
      image_url: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&h=800&q=80' 
    },
    { 
      id: 4, 
      title: 'Custom Widebody', 
      category: 'Body Kit', 
      image_url: 'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=800&h=800&q=80' 
    },
    { 
      id: 5, 
      title: 'Porsche 911 Wrap', 
      category: 'Vinyl Wrap', 
      image_url: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&h=800&q=80'
    },
    { 
      id: 6, 
      title: 'Mercedes AMG', 
      category: 'Performance', 
      image_url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&h=800&q=80'
    }
  ];

  const categories = [
    'All',
    'Custom Paint',
    'Body Modification',
    'Full Restoration',
    'Body Kit',
    'Vinyl Wrap',
    'Performance'
  ];

  return (
    <div className="min-h-screen bg-black">
      <div className="relative w-full min-h-[60vh]">
        <Carousel />
        <div className="relative z-30">
          <div className="container mx-auto px-6">
            <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
              <GradientHeading size="xl" variant="light" className="text-center">
                Our Work
              </GradientHeading>
              <p className="text-xl text-white max-w-3xl text-center">
                Explore our portfolio of custom automotive projects. Each build is a unique masterpiece, crafted with precision and passion.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <button
                  key={category} 
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full transition-colors ${
                    selectedCategory === category
                      ? 'bg-accent text-white'
                      : 'bg-gray-900 text-primary hover:bg-accent hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" ref={ref}>
              {projects
                .filter(project => selectedCategory === 'All' || project.category === selectedCategory)
                .map((project) => (
                <motion.div
                  key={project.id}
                  className="group cursor-pointer relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                >
                  <div className="relative overflow-hidden rounded-xl aspect-square">
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="text-white text-center p-6">
                        <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                        <p className="text-accent">{project.category}</p>
                      </div>
                    </div>
                  </div>
                  <div className="md:hidden mt-2">
                    <h3 className="text-lg font-bold text-primary">{project.title}</h3>
                    <p className="text-sm text-accent">{project.category}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="text-center mt-12">
            <RainbowButton
              onClick={() => window.location.href = 'mailto:shop@magassdesign.com'}
            >
              Start Your Project
            </RainbowButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Work;