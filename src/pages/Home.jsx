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
import { TeamMemberPopup } from '../components/ui/team-member-popup';
import { getInstagramFeed } from '../services/instagram';

const projects = [
  { 
    id: 1, 
    title: 'Custom Engine Work', 
    category: 'Performance', 
    image: '/engine-lights.jpg.jpg'
  },
  { 
    id: 2, 
    title: 'Custom Infiniti Q60', 
    category: 'Body Modification', 
    image: '/infiniti-front.jpg.jpeg'
  },
  { 
    id: 3, 
    title: 'Custom Body Modifications', 
    category: 'Body Kit', 
    image: '/infiniti-side.jpg.jpg'
  }
];

const youtubeVideos = [
  {
    id: 1,
    thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    title: 'Custom BMW M4 Build - Full Process',
    views: '524K views',
    url: 'https://www.youtube.com/watch?v=VIDEO_ID_1'
  },
  {
    id: 2,
    thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    title: 'Carbon Fiber Hood Installation Guide',
    views: '328K views',
    url: 'https://www.youtube.com/watch?v=VIDEO_ID_2'
  },
  {
    id: 3,
    thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    title: 'Professional Paint Protection Guide',
    views: '412K views',
    url: 'https://www.youtube.com/watch?v=VIDEO_ID_3'
  }
];

const allLogos = [
  { 
    name: "DB Akuten", 
    id: 1,
    url: "https://dbakuten.se/",
    img: ({ className }) => (
      <img 
        src="/DB akuten.png" 
        alt="DB Akuten" 
        className={className}
      />
    )
  },
  { 
    name: "DB Akuten Service", 
    id: 2,
    url: "https://sonax.se/",
    img: ({ className }) => (
      <img 
        src="/DB akuten (1).png" 
        alt="DB Akuten Service" 
        className={className}
      />
    )
  },
  { 
    name: "DB Akuten Workshop", 
    id: 3,
    url: "https://thorsbilsadelmakeri.se/",
    img: ({ className }) => (
      <img 
        src="/DB akuten (2).png" 
        alt="DB Akuten Workshop" 
        className={className}
      />
    )
  },
  { 
    name: "59 Performance", 
    id: 4,
    url: "https://www.59northwheels.se/en/",
    img: ({ className }) => (
      <img 
        src="/59 (2).png" 
        alt="59 Performance" 
        className={className}
      />
    )
  }
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

const teamMembers = [
  {
    id: 1,
    name: "Christian Magass",
    designation: "Founder & Paint Specialist",
    image: "/crille .png",
    bio: "With over 15 years of experience in automotive paint and customization, Christian founded Magass Design with a vision to revolutionize the custom car scene in Sweden. His expertise in paint techniques and color design has set new standards in automotive finishing.",
    expertise: [
      "Custom Paint Design",
      "Color Theory & Application",
      "Paint Protection Systems",
      "Custom Finish Development"
    ],
    achievements: [
      "Founded Magass Design in 2008",
      "Developed signature paint techniques",
      "Featured in Top Gear Magazine 2019",
      "Winner of Stockholm Custom Auto Show 2022"
    ]
  },
  {
    id: 2,
    name: "Mattias Karlsson",
    designation: "Head of Paint Department",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&h=800&q=80",
    bio: "Mattias brings his artistic vision and technical expertise to every paint job. His innovative color combinations and flawless application techniques have become a signature element of Magass Design's distinctive style.",
    expertise: [
      "Custom Paint Formulation",
      "Airbrush Artistry",
      "Color Theory",
      "Clear Coat Applications"
    ],
    achievements: [
      "Developed signature pearl color series",
      "Trained 12 apprentice painters",
      "Best Paint Award - Nordic Car Show 2021",
      "Featured in Auto Color Magazine"
    ]
  },
  {
    id: 3,
    name: "Sofia Bergstedt",
    designation: "Carbon Fiber Specialist",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&h=800&q=80",
    bio: "Sofia leads our carbon fiber division, pushing the boundaries of lightweight performance parts. Her expertise in composite materials has revolutionized our approach to custom component manufacturing.",
    expertise: [
      "Carbon Fiber Manufacturing",
      "Composite Materials",
      "3D Modeling",
      "Structural Analysis"
    ],
    achievements: [
      "Patented carbon fiber manufacturing process",
      "Reduced component weight by 40%",
      "Innovation Award - Automotive Tech Expo",
      "Published research on composite materials"
    ]
  }
];

function Home() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  const [youtubeVideos, setYoutubeVideos] = useState([]);
  const [isLoadingVideos, setIsLoadingVideos] = useState(true);
  const [instagramPosts, setInstagramPosts] = useState([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    const fetchYoutubeVideos = async () => {
      try {
        const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
        const CHANNEL_ID = 'YOUR_CHANNEL_ID'; // Replace with your actual channel ID
        
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=3`
        );
        
        const data = await response.json();
        
        const videos = data.items.map(item => ({
          id: item.id.videoId,
          thumbnail: item.snippet.thumbnails.high.url,
          title: item.snippet.title,
          url: `https://www.youtube.com/watch?v=${item.id.videoId}`
        }));
        
        setYoutubeVideos(videos);
      } catch (error) {
        console.error('Error fetching YouTube videos:', error);
        // Fallback to static data if API fails
        setYoutubeVideos([
          {
            id: 1,
            thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
            title: 'Custom BMW M4 Build - Full Process',
            url: 'https://youtube.com/@magassdesign?si=05YXUD1lm2PAAaKp'
          },
          {
            id: 2,
            thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
            title: 'Carbon Fiber Hood Installation Guide',
            url: 'https://youtube.com/@magassdesign?si=05YXUD1lm2PAAaKp'
          },
          {
            id: 3,
            thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
            title: 'Professional Paint Protection Guide',
            url: 'https://youtube.com/@magassdesign?si=05YXUD1lm2PAAaKp'
          }
        ]);
      } finally {
        setIsLoadingVideos(false);
      }
    };

    fetchYoutubeVideos();
  }, []);

  useEffect(() => {
    async function fetchInstagramPosts() {
      try {
        const posts = await getInstagramFeed(4);
        if (posts) {
          setInstagramPosts(posts);
        } else {
          // Fallback to static data if API fails
          setInstagramPosts([
            {
              id: 1,
              image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800&q=80',
              url: 'https://www.instagram.com/magassdesign'
            },
            {
              id: 2,
              image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=800&q=80',
              url: 'https://www.instagram.com/magassdesign'
            },
            {
              id: 3,
              image: 'https://images.unsplash.com/photo-1535732820275-9ffd998cac22?auto=format&fit=crop&w=800&q=80',
              url: 'https://www.instagram.com/magassdesign'
            },
            {
              id: 4,
              image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80',
              url: 'https://www.instagram.com/magassdesign'
            }
          ]);
        }
      } catch (error) {
        console.error('Error loading Instagram posts:', error);
      } finally {
        setIsLoadingPosts(false);
      }
    }

    fetchInstagramPosts();
  }, []);

  return (
    <div className="relative">
      <Hero />

      {/* Shop Section */}
      <section className="bg-secondary py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-8">
              Featured Products
            </h2>
            <p className="text-xl text-white mb-8">Shop Collection</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link 
              to="/shop/hoodies" 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <GlareCard className="flex flex-col items-center justify-center">
                <img
                  className="h-full w-full absolute inset-0 object-cover"
                  src="/1000020198.jpg"
                  alt="Hoodies"
                />
                <div className="absolute inset-0 bg-black/50 flex flex-col items-start justify-end p-6">
                  <h3 className="text-xl font-bold text-white mb-2">Hoodies</h3>
                  <p className="text-gray-200">Premium quality street wear</p>
                </div>
              </GlareCard>
            </Link>

            <Link 
              to="/shop/t-shirts"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <GlareCard className="flex flex-col items-center justify-center">
                <img
                  className="h-full w-full absolute inset-0 object-cover"
                  src="/Untitled design (11).png"
                  alt="T-shirts"
                />
                <div className="absolute inset-0 bg-black/50 flex flex-col items-start justify-end p-6">
                  <h3 className="text-xl font-bold text-white mb-2">T-shirts</h3>
                  <p className="text-gray-200">Stylish and comfortable designs</p>
                </div>
              </GlareCard>
            </Link>

            <Link 
              to="/shop/handbrake"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <GlareCard className="flex flex-col items-center justify-center h-64">
                <img
                  className="h-full w-full absolute inset-0 object-contain"
                  src="/ebrake-600x900.png"
                  alt="Handbrake"
                />
                <div className="absolute inset-0 bg-black/50 flex flex-col items-start justify-end p-6">
                  <h3 className="text-xl font-bold text-white mb-2">Handbrake</h3>
                  <p className="text-gray-200">Professional-grade hydraulic handbrakes</p>
                </div>
              </GlareCard>
            </Link>
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-8">
              Spinn to see the G35
            </h2>
          </motion.div>
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
            <h2 className="text-4xl font-bold mb-4 text-white">Featured Builds</h2>
            <p className="text-xl text-white">Discover our latest automotive transformations</p>
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

      {/* Team Section */}
      <section className="bg-black py-20">
        <div className="max-w-7xl mx-auto px-6">
          <GradientHeading size="lg" variant="light" className="text-center mb-12">
            Meet Our Team
          </GradientHeading>
          <p className="text-gray-400 text-center max-w-2xl mx-auto mb-16">
            Our team of passionate automotive experts brings together decades of experience
            in custom design, fabrication, and innovation.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-12">
            {teamMembers.map((member) => (
              <motion.div
                key={member.id}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                onClick={() => setSelectedMember(member)}
                className="relative cursor-pointer group"
              >
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-800 hover:border-accent transition-colors duration-300">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -top-24 left-1/2 transform -translate-x-1/2 bg-black/90 text-white p-4 rounded-lg shadow-xl min-w-[200px] text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="font-bold mb-1">{member.name}</div>
                  <div className="text-sm text-accent">{member.designation}</div>
                </div>
              </motion.div>
            ))}
          </div>
          <TeamMemberPopup
            isOpen={!!selectedMember}
            onClose={() => setSelectedMember(null)}
            member={selectedMember}
          />
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="bg-secondary py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <GradientHeading variant="light" className="mb-4">
              Trusted by Magass Design
            </GradientHeading>
            <GradientHeading size="lg" variant="light">
              Our partners
            </GradientHeading>
          </motion.div>
          <LogoCarousel columnCount={3} logos={allLogos} />
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
            <h2 className="text-4xl font-bold mb-6 text-white">Watch Our Builds</h2>
            <p className="text-xl text-white mb-8">
              Get an inside look at our custom builds and processes
            </p>
            <motion.a
              href="https://youtube.com/@magassdesign?si=05YXUD1lm2PAAaKp"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Subscribe to Our Channel
              <ArrowUpRightIcon className="w-5 h-5 ml-2" />
            </motion.a>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {isLoadingVideos ? (
              // Loading skeleton
              Array(3).fill(0).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gray-700 aspect-video rounded-lg mb-3"></div>
                  <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-700 rounded w-1/4"></div>
                </div>
              ))
            ) : (
              youtubeVideos.map((video) => (
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
                  <h3 className="text-white font-semibold mb-1 group-hover:text-accent transition-colors">
                    {video.title}
                  </h3>
                </motion.a>
              ))
            )}
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
            <h2 className="text-4xl font-bold mb-6 text-white">Follow Our Journey</h2>
            <p className="text-xl text-white mb-8">
              Stay updated with our latest builds and behind-the-scenes content
            </p>
            <motion.a
              href="https://www.instagram.com/magassdesign"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 transition-colors cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Follow Us on Instagram
              <ArrowUpRightIcon className="w-5 h-5 ml-2" />
            </motion.a>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {isLoadingPosts ? (
              // Loading skeleton
              Array(4).fill(0).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="aspect-square bg-gray-700 rounded-lg"></div>
                </div>
              ))
            ) : (
              instagramPosts.map((post) => (
                <motion.a
                  key={post.id}
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group cursor-pointer relative aspect-square block"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <img
                    src={post.image}
                    alt={post.caption || "Instagram post"}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <div className="text-white text-center p-4">
                      <p className="text-sm line-clamp-3">{post.caption}</p>
                    </div>
                  </div>
                </motion.a>
              ))
            )}
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