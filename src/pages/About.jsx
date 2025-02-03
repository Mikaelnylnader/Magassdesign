"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GradientHeading } from '../components/ui/gradient-heading';
import { Carousel } from '../components/ui/carousel';
import { AnimatedTooltip } from "../components/ui/animated-tooltip";
import { TeamMemberPopup } from '../components/ui/team-member-popup';

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
    designation: "Custom fabrication, 3D scan and CAD-designer",
    image: "/Mattis%20profil.png",
    bio: "Mattias is our expert in digital design and custom fabrication, bringing cutting-edge technology to automotive customization. His mastery of 3D scanning and CAD design enables us to create precise, innovative solutions for complex automotive projects.",
    expertise: [
      "3D Scanning & Modeling",
      "Custom Part Fabrication",
      "CAD Design & Engineering",
      "Digital Prototyping"
    ],
    achievements: [
      "Pioneered 3D scanning workflow for custom parts",
      "Developed numerous custom fabrication solutions",
      "Led multiple high-profile vehicle modification projects",
      "Implemented advanced CAD design processes"
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

function AnimatedTooltipPreview() {
  return (
    <div className="flex flex-row items-center justify-center mb-10 w-full">
      <AnimatedTooltip items={people} />
    </div>
  );
}

function About() {
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <>
      {/* Hero Section with Background Carousel */}
      <div className="relative w-full min-h-[60vh]">
        <Carousel />
        <div className="relative z-30">
          <div className="container mx-auto px-6">
            <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
              <GradientHeading size="xl" variant="light" className="text-center">
                About
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
                      Christian Magass in a small garage in Göteborg, we started with a simple 
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
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="bg-black p-8 rounded-lg border border-gray-800 hover:border-accent group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <h3 className="text-xl font-bold mb-4 text-primary relative z-10 group-hover:text-accent transition-colors duration-300">Excellence</h3>
                  <p className="text-gray-400 relative z-10 group-hover:text-gray-300 transition-colors duration-300">
                    We pursue perfection in every detail, from the initial design to the final polish. 
                    Our commitment to excellence drives us to exceed expectations and deliver 
                    exceptional results in every project.
                  </p>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="bg-black p-8 rounded-lg border border-gray-800 hover:border-accent group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <h3 className="text-xl font-bold mb-4 text-primary relative z-10 group-hover:text-accent transition-colors duration-300">Innovation</h3>
                  <p className="text-gray-400 relative z-10 group-hover:text-gray-300 transition-colors duration-300">
                    We constantly push boundaries and explore new techniques, combining traditional 
                    craftsmanship with cutting-edge technology to create unique and groundbreaking 
                    automotive designs.
                  </p>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="bg-black p-8 rounded-lg border border-gray-800 hover:border-accent group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <h3 className="text-xl font-bold mb-4 text-primary relative z-10 group-hover:text-accent transition-colors duration-300">Integrity</h3>
                  <p className="text-gray-400 relative z-10 group-hover:text-gray-300 transition-colors duration-300">
                    Trust is the foundation of our business. We maintain the highest standards of 
                    honesty and transparency in all our dealings, ensuring lasting relationships 
                    with our clients.
                  </p>
                </motion.div>
              </div>
            </section>

            {/* Team Section */}
            <section className="mb-20">
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
            </section>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default About;