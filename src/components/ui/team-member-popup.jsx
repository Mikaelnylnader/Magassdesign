import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export function TeamMemberPopup({ isOpen, onClose, member }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            {/* Popup Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-[90%] max-w-4xl mx-auto p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative bg-black rounded-3xl overflow-hidden">
                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-20">
                  {/* Image Section */}
                  <div>
                    <div className="relative h-80 w-full">
                      <motion.img
                        initial={{ scale: 1.2, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.4 }}
                        src={member?.image}
                        alt={member?.name}
                        className="h-full w-full rounded-3xl object-cover object-center"
                      />
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex justify-between flex-col py-4 pr-8">
                    {/* Close Button */}
                    <button
                      onClick={onClose}
                      className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
                    >
                      <X size={24} />
                    </button>

                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h3 className="text-2xl font-bold text-primary mb-2">{member?.name}</h3>
                      <p className="text-accent mb-6">{member?.designation}</p>
                      
                      <motion.p className="text-lg text-gray-400 mt-8">
                        {member?.bio.split(" ").map((word, index) => (
                          <motion.span
                            key={index}
                            initial={{
                              filter: "blur(10px)",
                              opacity: 0,
                              y: 5,
                            }}
                            animate={{
                              filter: "blur(0px)",
                              opacity: 1,
                              y: 0,
                            }}
                            transition={{
                              duration: 0.2,
                              ease: "easeInOut",
                              delay: 0.02 * index,
                            }}
                            className="inline-block"
                          >
                            {word}&nbsp;
                          </motion.span>
                        ))}
                      </motion.p>

                      {member?.expertise && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                          className="mt-6"
                        >
                          <h4 className="text-primary font-semibold mb-2">Expertise</h4>
                          <ul className="list-none space-y-1">
                            {member.expertise.map((skill, index) => (
                              <motion.li 
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6 + (index * 0.1) }}
                                className="text-gray-400"
                              >
                                • {skill}
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      )}

                      {member?.achievements && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8 }}
                          className="mt-6"
                        >
                          <h4 className="text-primary font-semibold mb-2">Key Achievements</h4>
                          <ul className="list-none space-y-1">
                            {member.achievements.map((achievement, index) => (
                              <motion.li 
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.9 + (index * 0.1) }}
                                className="text-gray-400"
                              >
                                • {achievement}
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}