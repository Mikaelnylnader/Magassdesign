import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { ArrowUpRightIcon } from '@heroicons/react/24/outline';
import { Hero } from '../components/ui/animated-hero';
import { RainbowButton } from '../components/ui/rainbow-button';
import { ThreeDCarCarousel } from '../components/ui/3d-carousel';
import { LogoCarousel } from '../components/ui/logo-carousel';
import { GradientHeading } from '../components/ui/gradient-heading';
import { GlareCard } from '../components/ui/glare-card';
import { AnimatedTestimonials } from '../components/ui/animated-testimonials';
import {
  BMWIcon,
  MercedesIcon,
  AudiIcon,
  PorscheIcon,
  FerrariIcon,
  LamborghiniIcon
} from '../components/ui/car-logos';

const projects = [
  { 
    id: 1, 
    title: 'Custom Engine Work', 
    category: 'Performance', 
    image: '/engine-lights.jpg'
  },
  { 
    id: 2, 
    title: 'Custom Infiniti Q60', 
    category: 'Body Modification', 
    image: '/infiniti-front.jpg'
  },
  { 
    id: 3, 
    title: 'Custom Body Modifications', 
    category: 'Body Kit', 
    image: '/infiniti-side.jpg'
  }
];

const youtubeVideos = [
  {
    id: 1,
    thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    title: 'Custom BMW M4 Build - Full Process',
    views: '524K views',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  {
    id: 2,
    thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    title: 'Carbon Fiber Hood Installation Guide',
    views: '328K views',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  {
    id: 3,
    thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    title: 'Professional Paint Protection Guide',
    views: '412K views',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  }
];

const instagramPosts = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?auto=format&fit=crop&w=800&q=80',
    likes: '2.5K',
    comments: '128'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80',
    likes: '3.1K',
    comments: '245'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1595044426077-d36d9236d54c?auto=format&fit=crop&w=800&q=80',
    likes: '1.8K',
    comments: '96'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&w=800&q=80',
    likes: '4.2K',
    comments: '312'
  }
];

const carLogos = [
  { name: "BMW", id: 1, img: BMWIcon },
  { name: "Mercedes-Benz", id: 2, img: MercedesIcon },
  { name: "Audi", id: 3, img: AudiIcon },
  { name: "Porsche", id: 4, img: PorscheIcon },
  { name: "Ferrari", id: 5, img: FerrariIcon },
  { name: "Lamborghini", id: 6, img: LamborghiniIcon }
];

const testimonials = [
  {
    name: "Alex Thompson",
    designation: "BMW M4 Owner",
    quote: "Magass Design transformed my M4 into a masterpiece. Their attention to detail and craftsmanship is unmatched. The custom paint job and carbon fiber work exceeded all my expectations.",
    src: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&h=800&q=80"
  },
  {
    name: "Sarah Chen",
    designation: "Porsche 911 Owner",
    quote: "Working with Magass Design was an incredible experience. They understood my vision perfectly and delivered a stunning result. The quality of their work is truly world-class.",
    src: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=800&h=800&q=80"
  },
  {
    name: "Marcus Berg",
    designation: "Mercedes AMG GT Owner",
    quote: "The level of expertise and professionalism at Magass Design is outstanding. They've created something truly unique with my AMG GT, and the results speak for themselves.",
    src: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&h=800&q=80"
  }
];

function Home() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <div className="relative">
      <motion.img
        src="/Magass Design logo.png"
        alt="Magass Design Logo"
        className="fixed top-6 left-6 w-48 h-auto z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
      <Hero />

      {/* Featured Products Section */}
      <section className="bg-secondary py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <GradientHeading size="lg" variant="secondary" className="mb-4">
              Shop Our Collection
            </GradientHeading>
            <GradientHeading size="xl">
              Featured Products
            </GradientHeading>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                id: 1,
                name: 'Classic Logo Hoodie',
                price: 59.99,
                image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&h=800&q=80',
                category: 'Hoodies'
              },
              {
                id: 2,
                name: 'Vintage Car T-Shirt',
                price: 29.99,
                image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&h=800&q=80',
                category: 'T-Shirts'
              },
              {
                id: 3,
                name: 'Performance Racing Hoodie',
                price: 69.99,
                image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=800&h=800&q=80',
                category: 'Hoodies'
              }
            ].map((product) => (
              <Link
                key={product.id}
                to="/shop"
                className="group hover-project"
              >
                <motion.div
                  className="bg-black border border-gray-800 rounded-lg overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="aspect-square relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-black/20"></div>
                  </div>
                  <div className="p-6 bg-black/90">
                    <p className="text-sm text-accent mb-2">{product.category}</p>
                    <h3 className="text-xl font-bold text-primary mb-2">{product.name}</h3>
                    <div className="flex justify-between items-center">
                      <p className="text-lg text-primary">${product.price}</p>
                      <span className="text-accent group-hover:translate-x-1 transition-transform">
                        <ArrowUpRightIcon className="w-5 h-5" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/shop">
              <RainbowButton className="inline-flex items-center gap-2">
                View All Products
                <ArrowUpRightIcon className="w-5 h-5" />
              </RainbowButton>
            </Link>
          </div>
        </div>
      </section>

      {/* 3D Car Carousel Section */}
      <section className="bg-secondary py-16">
        <div className="max-w-7xl mx-auto px-6">
          <ThreeDCarCarousel />
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="bg-secondary section-padding" ref={ref}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 text-primary">Featured Builds</h2>
            <p className="text-xl text-gray-400">Discover our latest automotive transformations</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 justify-items-center">
            {projects.map((project) => (
              <GlareCard key={project.id} className="flex flex-col items-center justify-center">
                <img
                  className="h-full w-full absolute inset-0 object-cover"
                  src={project.image}
                  alt={project.title}
                />
                <div className="absolute inset-0 bg-black/50 flex flex-col items-start justify-end p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-200">{project.category}</p>
                </div>
              </GlareCard>
            ))}
          </div>
        </div>
      </section>

      {/* Logo Carousel Section */}
      <section className="bg-secondary py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <GradientHeading variant="secondary" className="mb-4">
              Trusted by Magass Design and many others
            </GradientHeading>
            <GradientHeading size="lg">
              Our trusted partners
            </GradientHeading>
          </motion.div>
          <LogoCarousel columnCount={3} logos={carLogos} />
        </div>
      </section>

      {/* YouTube Section */}
      <section id="youtube" className="bg-secondary section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-6 text-primary">Watch Our Builds</h2>
            <p className="text-xl text-gray-400 mb-8">
              Get an inside look at our custom builds and processes
            </p>
            <a
              href="https://www.youtube.com/magassdesign"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
            >
              Subscribe to Our Channel
              <ArrowUpRightIcon className="w-5 h-5 ml-2" />
            </a>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {youtubeVideos.map((video) => (
              <motion.a
                key={video.id}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="relative aspect-video rounded-lg overflow-hidden mb-3">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <h3 className="text-primary font-semibold mb-1 group-hover:text-accent transition-colors">
                  {video.title}
                </h3>
                <p className="text-gray-400 text-sm">{video.views}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section id="instagram" className="bg-secondary section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-6 text-primary">Follow Our Journey</h2>
            <p className="text-xl text-gray-400 mb-8">
              Stay updated with our latest builds and behind-the-scenes content
            </p>
            <a
              href="https://www.instagram.com/magassdesign?igsh=OWMzMTNjeWZ1a3Vn"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 transition-colors"
            >
              Follow Us on Instagram
              <ArrowUpRightIcon className="w-5 h-5 ml-2" />
            </a>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {instagramPosts.map((post) => (
              <motion.div
                key={post.id}
                className="group cursor-pointer relative aspect-square"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                onClick={() => window.open('https://www.instagram.com/magassdesign?igsh=OWMzMTNjeWZ1a3Vn', '_blank')}
              >
                <img
                  src={post.image}
                  alt="Instagram post"
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="flex items-center justify-center space-x-4">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                        {post.likes}
                      </div>
                      <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" />
                        </svg>
                        {post.comments}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-secondary section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <GradientHeading size="lg" variant="secondary" className="mb-4">
              What Our Clients Say
            </GradientHeading>
            <GradientHeading size="xl">
              Client Testimonials
            </GradientHeading>
          </motion.div>
          <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
        </div>
      </section>
    </div>
  );
}

export default Home;