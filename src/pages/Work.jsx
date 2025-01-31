import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Carousel } from '../components/ui/carousel';
import { GradientHeading } from '../components/ui/gradient-heading';
import { RainbowButton } from '../components/ui/rainbow-button';
import { CalendarIcon, WrenchIcon, ClockIcon, StarIcon } from 'lucide-react';

function Work() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const recentJobs = [
    {
      id: 'job1',
      title: 'BMW M4 Competition Full Build',
      date: 'March 2024',
      duration: '3 weeks',
      category: 'Full Restoration',
      rating: 5,
      description: 'Complete transformation including custom paint, performance upgrades, and interior modifications.',
      details: [
        'Matte black paint with gloss accents',
        'Carbon fiber body kit installation',
        'Stage 2 performance tune',
        'Custom exhaust system',
        'Interior alcantara upgrade'
      ],
      beforeImage: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&h=800&q=80',
      afterImage: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&h=800&q=80'
    },
    {
      id: 'job2',
      title: 'Porsche 911 GT3 Track Build',
      date: 'February 2024',
      duration: '4 weeks',
      category: 'Performance',
      rating: 5,
      description: 'Track-focused build with emphasis on performance and aerodynamics.',
      details: [
        'Custom aero package installation',
        'Suspension optimization',
        'Brake system upgrade',
        'Roll cage installation',
        'Race-spec wheel setup'
      ],
      beforeImage: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&h=800&q=80',
      afterImage: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&h=800&q=80'
    },
    {
      id: 'job3',
      title: 'Mercedes-AMG GTR Pro Wrap',
      date: 'January 2024',
      duration: '2 weeks',
      category: 'Vinyl Wrap',
      rating: 5,
      description: 'Premium vinyl wrap with custom design elements and paint protection.',
      details: [
        'Custom designed vinyl wrap',
        'Paint protection film',
        'Ceramic coating application',
        'Window tinting',
        'Chrome delete'
      ],
      beforeImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&h=800&q=80',
      afterImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&h=800&q=80'
    }
  ];

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

      {/* Recent Jobs Section */}
      <div className="py-16 bg-black/50">
        <div className="max-w-7xl mx-auto px-6">
          <GradientHeading size="lg" variant="light" className="text-center mb-12">
            Recent Projects
          </GradientHeading>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {recentJobs.map((job) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-black border border-gray-800 rounded-xl overflow-hidden hover:border-accent transition-colors"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative aspect-square">
                    <img
                      src={job.beforeImage}
                      alt={`${job.title} Before`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-black/80 px-2 py-1 rounded text-xs">Before</div>
                  </div>
                  <div className="relative aspect-square">
                    <img
                      src={job.afterImage}
                      alt={`${job.title} After`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-black/80 px-2 py-1 rounded text-xs">After</div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{job.title}</h3>
                  <p className="text-gray-400 mb-4">{job.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-gray-400">
                      <CalendarIcon className="w-4 h-4" />
                      <span className="text-sm">{job.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <ClockIcon className="w-4 h-4" />
                      <span className="text-sm">{job.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <WrenchIcon className="w-4 h-4" />
                      <span className="text-sm">{job.category}</span>
                    </div>
                    <div className="flex items-center gap-1 text-accent">
                      {[...Array(job.rating)].map((_, i) => (
                        <StarIcon key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {job.details.map((detail, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                        <span className="text-sm text-gray-400">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Portfolio Grid Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <GradientHeading size="lg" variant="light" className="mb-12">
              Project Gallery
            </GradientHeading>

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