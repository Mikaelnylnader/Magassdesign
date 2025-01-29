import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { RainbowButton } from './rainbow-button';

export function TeamMemberPopup({ member, isOpen, onClose }) {
  if (!member) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-black rounded-2xl p-6 overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0 animate-rainbow"
                style={{
                  backgroundImage: 'linear-gradient(90deg, hsl(var(--color-1)), hsl(var(--color-5)), hsl(var(--color-3)), hsl(var(--color-4)), hsl(var(--color-2)))',
                  backgroundSize: '200%'
                }}
              />
            </div>
            
            <div className="relative">
              <button
                onClick={onClose}
                className="absolute right-0 top-0 p-2 text-gray-400 hover:text-white transition-colors"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>

              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-shrink-0">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-xl object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-primary mb-2">{member.name}</h3>
                  <p className="text-accent mb-4">{member.designation}</p>
                  <div className="space-y-4 text-gray-400">
                    <p>{member.bio}</p>
                    {member.expertise && (
                      <div>
                        <h4 className="text-primary font-semibold mb-2">Expertise</h4>
                        <ul className="list-disc list-inside">
                          {member.expertise.map((skill, index) => (
                            <li key={index}>{skill}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {member.projects && (
                      <div>
                        <h4 className="text-primary font-semibold mb-2">Notable Projects</h4>
                        <ul className="list-disc list-inside">
                          {member.projects.map((project, index) => (
                            <li key={index}>{project}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  {member.email && (
                    <div className="mt-6">
                      <RainbowButton
                        onClick={() => window.location.href = `mailto:${member.email}`}
                        className="inline-flex items-center"
                      >
                        Contact {member.name.split(' ')[0]}
                      </RainbowButton>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}