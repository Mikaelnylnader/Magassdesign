"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { GradientHeading } from '../components/ui/gradient-heading';
import { Carousel } from '../components/ui/carousel';
import { AnimatedTestimonials } from '../components/ui/animated-testimonials';
import { AnimatedTooltip } from "../components/ui/animated-tooltip";

const people = [
  {
    id: 1,
    name: "John Doe",
    designation: "Software Engineer",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  },
  {
    id: 2,
    name: "Robert Johnson",
    designation: "Product Manager",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    name: "Jane Smith",
    designation: "Data Scientist",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 4,
    name: "Emily Davis",
    designation: "UX Designer",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 5,
    name: "Tyler Durden",
    designation: "Soap Developer",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
  },
  {
    id: 6,
    name: "Dora",
    designation: "The Explorer",
    image:
      "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
  },
];

const teamMembers = [
  {
    id: 1,
    name: "Magnus Svensson",
    designation: "Founder & Lead Designer",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=800&h=800&q=80",
  },
  {
    id: 2,
    name: "Erik Anderson",
    designation: "Head of Paint Department",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&h=800&q=80",
  },
  {
    id: 3,
    name: "Maria Nilsson",
    designation: "Carbon Fiber Specialist",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&h=800&q=80",
  },
  {
    id: 4,
    name: "Johan Lindström",
    designation: "Master Fabricator",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&h=800&q=80",
  }
];

function AnimatedTooltipPreview() {
  return (
    <div className="flex flex-row items-center justify-center mb-10 w-full">
      <AnimatedTooltip items={people} />
    </div>
  );
}

function About() {
  return (
    <>
      {/* Hero Section with Background Carousel */}
      <div className="relative w-full min-h-[60vh]">
        <Carousel />
        <div className="relative z-30">
          <div className="container mx-auto px-6">
            <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
              <GradientHeading size="xl" variant="light" className="text-center">
                About Magass Design
              </GradientHeading>
              <p className="text-xl text-white max-w-3xl text-center">
                Since 2008, we've been crafting automotive excellence in the heart of Göteborg, 
                combining Swedish precision with innovative design to create extraordinary vehicles.
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
          >
            {/* History Section */}
            <section className="mb-20">
              <h2 className="text-3xl font-bold mb-8 text-primary">Our Journey</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-accent mb-4">The Beginning (2008)</h3>
                    <p className="text-gray-400">
                      Magass Design was born from a passion for automotive excellence and a vision 
                      to transform ordinary vehicles into extraordinary masterpieces. Founded by 
                      Magnus Svensson in a small garage in Göteborg, we started with a simple 
                      mission: to bring innovative design and Swedish craftsmanship to the automotive 
                      customization industry.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-accent mb-4">Growth & Innovation (2010-2015)</h3>
                    <p className="text-gray-400">
                      As our reputation for excellence grew, so did our capabilities. We expanded 
                      our facilities, invested in cutting-edge technology, and assembled a team of 
                      skilled craftsmen and designers. During this period, we completed several 
                      high-profile projects that put us on the map in the European custom car scene.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-accent mb-4">International Recognition (2015-Present)</h3>
                    <p className="text-gray-400">
                      Today, Magass Design is recognized globally for our innovative approaches to 
                      automotive customization. We've collaborated with major manufacturers, won 
                      numerous industry awards, and built a loyal client base across Europe and beyond. 
                      Our work has been featured in leading automotive publications and showcased at 
                      prestigious events worldwide.
                    </p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-4">Key Milestones</h3>
                    <ul className="space-y-4 text-gray-400">
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        <span>2008: Founded in Göteborg, Sweden</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        <span>2010: Opened our first dedicated workshop</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        <span>2012: First international project completed</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        <span>2015: Expanded facility to include state-of-the-art paint booth</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        <span>2018: Celebrated 10 years of excellence</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        <span>2020: Launched carbon fiber manufacturing division</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        <span>2023: Opened second location in Stockholm</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Values Section */}
            <section className="mb-20">
              <h2 className="text-3xl font-bold mb-12 text-primary text-center">Our Core Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-gray-900 p-8 rounded-lg">
                  <h3 className="text-xl font-bold mb-4 text-primary">Excellence</h3>
                  <p className="text-gray-400">
                    We pursue perfection in every detail, from the initial design to the final polish. 
                    Our commitment to excellence drives us to exceed expectations and deliver 
                    exceptional results in every project.
                  </p>
                </div>
                <div className="bg-gray-900 p-8 rounded-lg">
                  <h3 className="text-xl font-bold mb-4 text-primary">Innovation</h3>
                  <p className="text-gray-400">
                    We constantly push boundaries and explore new techniques, combining traditional 
                    craftsmanship with cutting-edge technology to create unique and groundbreaking 
                    automotive designs.
                  </p>
                </div>
                <div className="bg-gray-900 p-8 rounded-lg">
                  <h3 className="text-xl font-bold mb-4 text-primary">Integrity</h3>
                  <p className="text-gray-400">
                    Trust is the foundation of our business. We maintain the highest standards of 
                    honesty and transparency in all our dealings, ensuring lasting relationships 
                    with our clients.
                  </p>
                </div>
              </div>
            </section>

            {/* Add AnimatedTooltipPreview before the Testimonials section */}
            <section className="mb-20">
              <h2 className="text-3xl font-bold mb-12 text-primary text-center">Our Team</h2>
              <AnimatedTooltipPreview />
            </section>

            {/* Testimonials Section */}
            <section className="mb-20">
              <GradientHeading size="lg" variant="secondary" className="text-center mb-12">
                What Our Team Says
              </GradientHeading>
              <AnimatedTestimonials
                testimonials={[
                  {
                    quote: "Leading our paint division with over 15 years of experience in custom automotive finishes. Specializing in unique color formulations and flawless application techniques.",
                    name: "Erik Anderson",
                    designation: "Head of Paint Department",
                    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&h=800&q=80"
                  },
                  {
                    quote: "Pushing the boundaries of carbon fiber innovation. Our team develops custom components that combine lightweight performance with stunning aesthetics.",
                    name: "Maria Nilsson",
                    designation: "Carbon Fiber Specialist",
                    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&h=800&q=80"
                  },
                  {
                    quote: "Crafting custom body modifications that transform vehicles into unique works of art. Every project is an opportunity to create something extraordinary.",
                    name: "Johan Lindström",
                    designation: "Master Fabricator",
                    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&h=800&q=80"
                  }
                ]}
                autoplay={true}
              />
            </section>

            {/* Team Section */}
            <section className="mb-20">
              <GradientHeading size="lg" className="text-center mb-12">
                Meet Our Team
              </GradientHeading>
              <p className="text-gray-400 text-center max-w-2xl mx-auto mb-16">
                Our team of passionate automotive experts brings together decades of experience
                in custom design, fabrication, and innovation.
              </p>
              <AnimatedTooltip items={teamMembers} />
            </section>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default About;