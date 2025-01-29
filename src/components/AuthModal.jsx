import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../utils/supabase';
import './AuthModal.css';

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: {
      duration: 0.2
    }
  }
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.2
    }
  },
  exit: { 
    opacity: 0,
    transition: {
      duration: 0.2
    }
  }
};

const sendWelcomeEmail = async (email, name) => {
  try {
    const response = await fetch('http://localhost:5000/api/email/welcome', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, name })
    });

    if (!response.ok) {
      throw new Error('Failed to send welcome email');
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending welcome email:', error);
    throw error;
  }
};

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const startResendCooldown = () => {
    setResendCooldown(60);
    const interval = setInterval(() => {
      setResendCooldown((current) => {
        if (current <= 1) {
          clearInterval(interval);
          return 0;
        }
        return current - 1;
      });
    }, 1000);
  };

  const handleResendVerification = async () => {
    if (resendCooldown > 0) return;
    
    setLoading(true);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: formData.email
      });
      
      if (error) throw error;
      
      setError('');
      setVerificationSent(true);
      startResendCooldown();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setVerificationSent(false);

    try {
      if (!formData.email || !formData.password) {
        throw new Error('Please fill in all required fields');
      }

      if (!isLogin && formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) {
          if (error.message.includes('Email not confirmed')) {
            setVerificationSent(true);
            throw new Error('Please verify your email address. Check your inbox for a confirmation link.');
          }
          throw error;
        }
        
        onClose();
        window.location.reload();
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.name,
            },
            emailRedirectTo: window.location.origin,
          },
        });

        if (error) throw error;

        if (data.user && !data.session) {
          // Send welcome email
          try {
            await sendWelcomeEmail(formData.email, formData.name);
          } catch (emailError) {
            console.error('Failed to send welcome email:', emailError);
            // Don't throw error here, as signup was successful
          }

          setVerificationSent(true);
          startResendCooldown();
          setError('Please check your email to confirm your account');
        } else {
          onClose();
          window.location.reload();
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="modal-overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />
          <div className="fixed inset-0 flex items-center justify-center z-[1001] px-4 pointer-events-none">
            <motion.div
              className="modal-container pointer-events-auto"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="modal-content">
                <button className="close-button" onClick={onClose}>×</button>
                <h2>{isLogin ? 'Sign In' : 'Sign Up'}</h2>
                
                {error && (
                  <div className="error-message">
                    {error}
                    {verificationSent && (
                      <div className="mt-2">
                        <button
                          onClick={handleResendVerification}
                          disabled={resendCooldown > 0 || loading}
                          className="resend-button"
                        >
                          {resendCooldown > 0
                            ? `Resend in ${resendCooldown}s`
                            : 'Resend verification email'}
                        </button>
                      </div>
                    )}
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  {!isLogin && (
                    <div className="form-group">
                      <label htmlFor="name">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                      />
                    </div>
                  )}

                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                      required
                    />
                  </div>

                  {!isLogin && (
                    <div className="form-group">
                      <label htmlFor="confirmPassword">Confirm Password</label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Confirm your password"
                      />
                    </div>
                  )}

                  <button 
                    type="submit" 
                    className="submit-button"
                    disabled={loading}
                  >
                    {loading ? 'Loading...' : (isLogin ? 'Sign In' : 'Sign Up')}
                  </button>
                </form>

                <div className="toggle-form">
                  <p>
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button
                      className="toggle-button"
                      onClick={() => setIsLogin(!isLogin)}
                    >
                      {isLogin ? 'Sign Up' : 'Sign In'}
                    </button>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AuthModal; 