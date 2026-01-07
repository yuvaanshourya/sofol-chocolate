'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Coffee, RefreshCw } from 'lucide-react';
import OrderCard from '@/components/admin/OrderCard';
import { IOrder } from '@/lib/models/Order';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState(false);
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  // Check if already authenticated
  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Auto-refresh orders every 5 seconds
  useEffect(() => {
    if (!isAuthenticated) return;

    fetchOrders();
    const interval = setInterval(() => {
      fetchOrders();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const handleLogin = () => {
    // Simple password check (in production, use proper authentication)
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD || password === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/orders/active');
      const data = await response.json();
      
      if (data.success) {
        setOrders(data.orders);
        setLastRefresh(new Date());
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: 'waiting' | 'ready' | 'pickedup') => {
    try {
      const response = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        // Refresh orders
        fetchOrders();
        
        // Play success sound (optional)
        if (typeof Audio !== 'undefined') {
          const audio = new Audio('/sounds/success.mp3');
          audio.play().catch(() => {});
        }
      }
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-50 via-cream-100 to-chocolate-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full"
        >
          <div className="text-center mb-6">
            <Coffee className="w-16 h-16 text-chocolate-600 mx-auto mb-4" />
            <h1 className="text-3xl font-serif font-bold text-chocolate-900 mb-2">
              Admin Dashboard
            </h1>
            <p className="text-chocolate-600">Enter password to continue</p>
          </div>

          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setAuthError(false);
            }}
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            placeholder="Enter admin password"
            className={`w-full px-4 py-3 rounded-xl border-2 mb-4 focus:outline-none focus:ring-2 ${
              authError
                ? 'border-red-500 focus:border-red-600 focus:ring-red-200'
                : 'border-chocolate-200 focus:border-chocolate-500 focus:ring-chocolate-200'
            }`}
          />

          {authError && (
            <p className="text-red-600 text-sm mb-4">Incorrect password</p>
          )}

          <button
            onClick={handleLogin}
            className="w-full bg-chocolate-600 hover:bg-chocolate-700 text-white py-3 rounded-xl font-semibold transition-colors"
          >
            Login
          </button>
        </motion.div>
      </div>
    );
  }

  const waitingOrders = orders.filter((o) => o.status === 'waiting');
  const readyOrders = orders.filter((o) => o.status === 'ready');

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-cream-100 to-chocolate-50 p-4 sm:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-serif font-bold text-chocolate-900 mb-2">
              🍫 Order Dashboard
            </h1>
            <p className="text-chocolate-600">
              {waitingOrders.length} waiting • {readyOrders.length} ready
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-chocolate-600">
              Last updated: {lastRefresh.toLocaleTimeString()}
            </span>
            <button
              onClick={fetchOrders}
              disabled={loading}
              className="p-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow disabled:opacity-50"
            >
              <RefreshCw className={`w-5 h-5 text-chocolate-600 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Orders Grid */}
      <div className="max-w-7xl mx-auto">
        {orders.length === 0 ? (
          <div className="text-center py-20">
            <Coffee className="w-24 h-24 text-chocolate-300 mx-auto mb-4" />
            <p className="text-2xl text-chocolate-500 font-medium">No active orders</p>
            <p className="text-chocolate-400 mt-2">New orders will appear here automatically</p>
          </div>
        ) : (
          <>
            {/* Waiting Orders */}
            {waitingOrders.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-chocolate-900 mb-4">
                  🟡 Waiting ({waitingOrders.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {waitingOrders.map((order) => (
                    <OrderCard
                      key={order._id.toString()}
                      order={order}
                      onStatusChange={handleStatusChange}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Ready Orders */}
            {readyOrders.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-chocolate-900 mb-4">
                  🟢 Ready for Pickup ({readyOrders.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {readyOrders.map((order) => (
                    <OrderCard
                      key={order._id.toString()}
                      order={order}
                      onStatusChange={handleStatusChange}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
