import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabase';
import { RainbowButton } from '../components/ui/rainbow-button';
import { GradientHeading } from '../components/ui/gradient-heading';
import { Link } from 'react-router-dom';

function Account() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
    fetchOrders();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/signin');
        return;
      }
      setUser(user);
    } catch (error) {
      console.error('Error checking user:', error);
      navigate('/signin');
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      const { data: orders, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(orders || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/signin');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate('/');
  };

  if (loading) {
    return (
      <div className="pt-24 pb-16 flex items-center justify-center">
        <p className="text-primary">Loading...</p>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-between items-center mb-12">
            <div>
              <GradientHeading size="lg" variant="pink" className="mb-2">
                My Account
              </GradientHeading>
              <p className="text-gray-400">{user?.email}</p>
            </div>
            <RainbowButton onClick={handleSignOut}>
              Sign Out
            </RainbowButton>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-900 rounded-xl p-6">
              <h3 className="text-xl font-bold text-primary mb-4">Account Details</h3>
              <div className="space-y-2 text-gray-400">
                <p>Email: {user?.email}</p>
                <p>Member since: {new Date(user?.created_at).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="bg-gray-900 rounded-xl p-6">
              <h3 className="text-xl font-bold text-primary mb-4">Quick Actions</h3>
              <div className="space-y-4">
                <button
                  onClick={() => navigate('/cart')}
                  className="w-full text-left px-4 py-2 rounded-lg bg-gray-800 text-primary hover:bg-gray-700 transition-colors"
                >
                  View Cart
                </button>
                <button
                  onClick={() => navigate('/shop')}
                  className="w-full text-left px-4 py-2 rounded-lg bg-gray-800 text-primary hover:bg-gray-700 transition-colors"
                >
                  Browse Shop
                </button>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-xl p-6">
            <h3 className="text-xl font-bold text-primary mb-6">Order History</h3>
            {orders.length === 0 ? (
              <p className="text-gray-400">No orders yet</p>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="border border-gray-800 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-primary font-semibold">
                          Order #{order.id.slice(0, 8)}
                        </p>
                        <p className="text-sm text-gray-400">
                          {new Date(order.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-800 text-primary">
                        {order.status}
                      </span>
                    </div>
                    <p className="text-gray-400">
                      Total: ${order.total_amount}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Account;