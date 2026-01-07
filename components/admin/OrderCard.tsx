'use client';

import { motion } from 'framer-motion';
import { Clock, User } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { IOrder } from '@/lib/models/Order';

interface OrderCardProps {
  order: IOrder;
  onStatusChange: (orderId: string, newStatus: 'waiting' | 'ready' | 'pickedup') => void;
}

const statusConfig = {
  waiting: {
    color: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    label: '🟡 WAITING',
  },
  ready: {
    color: 'bg-green-100 text-green-800 border-green-300',
    label: '🟢 READY',
  },
  pickedup: {
    color: 'bg-gray-100 text-gray-800 border-gray-300',
    label: '⚪ PICKED UP',
  },
};

export default function OrderCard({ order, onStatusChange }: OrderCardProps) {
  const timeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  const statusInfo = statusConfig[order.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-lg border-2 border-chocolate-200 hover:shadow-xl transition-shadow"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold text-chocolate-900">#{order.orderNumber}</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-semibold border-2 ${statusInfo.color}`}>
          {statusInfo.label}
        </span>
      </div>

      {/* Customer Name */}
      <div className="flex items-center gap-2 mb-4 bg-chocolate-50 rounded-lg p-3">
        <User className="w-6 h-6 text-chocolate-600" />
        <span className="text-2xl font-bold text-chocolate-900 uppercase">
          {order.customerName}
        </span>
      </div>

      {/* Order Items */}
      <div className="space-y-2 mb-4">
        {order.items.map((item, index) => (
          <div key={index} className="text-chocolate-700">
            <p className="font-semibold">
              {item.quantity}x {item.size} Hot Chocolate
            </p>
            <p className="text-sm text-chocolate-600">
              • {item.milkType} • {item.sweetness}
            </p>
            {item.toppings.length > 0 && (
              <p className="text-sm text-chocolate-600">
                • Toppings: {item.toppings.join(', ')}
              </p>
            )}
            {item.flavorAddons.length > 0 && (
              <p className="text-sm text-chocolate-600">
                • Flavors: {item.flavorAddons.join(', ')}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Order Info */}
      <div className="flex items-center justify-between text-sm text-chocolate-600 mb-4 pb-4 border-b border-chocolate-200">
        <span className="font-semibold text-lg text-chocolate-900">
          {formatPrice(order.totalAmount)}
        </span>
        <div className="flex items-center gap-3">
          <span className="capitalize">{order.paymentMethod}</span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {timeAgo(order.createdAt)}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        {order.status === 'waiting' && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onStatusChange(order._id.toString(), 'ready')}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition-colors"
          >
            Mark as Ready
          </motion.button>
        )}
        {order.status === 'ready' && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onStatusChange(order._id.toString(), 'pickedup')}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-xl font-semibold transition-colors"
          >
            Mark as Picked Up
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
