import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Package,
  MapPin,
  Calendar,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle,
  Heart,
  Star,
  MessageSquare,
  Download
} from 'lucide-react';

const NGODashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('overview');

  const stats = [
    { label: 'Active Donations', value: '45', icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'People Helped', value: '1,234', icon: Users, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Pending Requests', value: '12', icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { label: 'Completed Projects', value: '89', icon: CheckCircle, color: 'text-purple-600', bg: 'bg-purple-50' }
  ];

  const recentDonations = [
    {
      id: 1,
      donor: 'Sarah Johnson',
      type: 'Food',
      quantity: '50 meals',
      location: 'Downtown Area',
      status: 'pending',
      time: '2 hours ago',
      urgency: 'high'
    },
    {
      id: 2,
      donor: 'Mike Chen',
      type: 'Clothes',
      quantity: '25 items',
      location: 'Suburban District',
      status: 'claimed',
      time: '4 hours ago',
      urgency: 'medium'
    },
    {
      id: 3,
      donor: 'Emma Davis',
      type: 'Books',
      quantity: '100 books',
      location: 'Education Zone',
      status: 'delivered',
      time: '1 day ago',
      urgency: 'low'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          NGO Management Dashboard 🏢
        </h1>
        <p className="text-gray-600">
          Manage donations, track impact, and coordinate with volunteers efficiently.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className={`${stat.bg} rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300`}
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <div className="flex items-center justify-between mb-2">
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
              <motion.div
                className="text-2xl font-bold text-gray-900"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
              >
                {stat.value}
              </motion.div>
            </div>
            <p className="text-sm text-gray-700 font-medium">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        className="bg-white rounded-xl shadow-lg mb-6 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex border-b border-gray-200">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'donations', label: 'Donations' },
            { id: 'volunteers', label: 'Volunteers' },
            { id: 'analytics', label: 'Analytics' }
          ].map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-all duration-200 ${
                selectedTab === tab.id
                  ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                  : 'text-gray-600 hover:text-green-600 hover:bg-gray-50'
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Donations */}
          <motion.div
            className="bg-white rounded-xl p-6 shadow-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Donations</h2>
              <motion.button
                className="text-green-600 hover:text-green-800 font-medium text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All
              </motion.button>
            </div>

            <div className="space-y-4">
              {recentDonations.map((donation, index) => (
                <motion.div
                  key={donation.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                        <Package className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{donation.donor}</h3>
                        <p className="text-sm text-gray-600">{donation.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        donation.urgency === 'high' 
                          ? 'bg-red-100 text-red-800'
                          : donation.urgency === 'medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {donation.urgency} priority
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        donation.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : donation.status === 'claimed'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {donation.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Type</p>
                      <p className="font-medium">{donation.type}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Quantity</p>
                      <p className="font-medium">{donation.quantity}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Location</p>
                      <p className="font-medium">{donation.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-end space-x-2 mt-4">
                    {donation.status === 'pending' && (
                      <motion.button
                        className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Claim Donation
                      </motion.button>
                    )}
                    <motion.button
                      className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Details
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Impact Metrics */}
          <motion.div
            className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center mb-4">
              <TrendingUp className="h-6 w-6 text-green-600 mr-2" />
              <h2 className="text-xl font-bold text-gray-900">Impact This Month</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Meals Distributed', value: '2,450', change: '+15%' },
                { label: 'Families Helped', value: '186', change: '+23%' },
                { label: 'Volunteers Active', value: '42', change: '+8%' },
                { label: 'Items Collected', value: '1,234', change: '+31%' }
              ].map((metric, index) => (
                <motion.div
                  key={metric.label}
                  className="bg-white rounded-lg p-4 text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
                  <div className="text-sm text-gray-600 mb-1">{metric.label}</div>
                  <div className="text-xs text-green-600 font-medium">{metric.change}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <motion.div
            className="bg-white rounded-xl p-6 shadow-lg"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              {[
                { label: 'Create Campaign', icon: Users, color: 'bg-blue-500' },
                { label: 'Schedule Pickup', icon: Calendar, color: 'bg-green-500' },
                { label: 'Send Updates', icon: MessageSquare, color: 'bg-purple-500' },
                { label: 'Generate Report', icon: Download, color: 'bg-orange-500' }
              ].map((action) => (
                <motion.button
                  key={action.label}
                  className={`w-full flex items-center space-x-3 ${action.color} text-white p-3 rounded-lg hover:opacity-90`}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <action.icon className="h-5 w-5" />
                  <span className="font-medium">{action.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Top Volunteers */}
          <motion.div
            className="bg-white rounded-xl p-6 shadow-lg"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-lg font-bold text-gray-900 mb-4">Top Volunteers</h2>
            <div className="space-y-3">
              {[
                { name: 'Alex Thompson', hours: 45, rating: 4.9 },
                { name: 'Maria Garcia', hours: 38, rating: 4.8 },
                { name: 'David Kim', hours: 32, rating: 4.7 }
              ].map((volunteer, index) => (
                <motion.div
                  key={volunteer.name}
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{volunteer.name}</p>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span>{volunteer.hours}h this month</span>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 text-yellow-500 mr-1" />
                        <span>{volunteer.rating}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Urgent Alerts */}
          <motion.div
            className="bg-red-50 border border-red-200 rounded-xl p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="flex items-center mb-3">
              <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
              <h3 className="font-bold text-red-900">Urgent Requests</h3>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-red-800">• Emergency food needed for 50 families</p>
              <p className="text-sm text-red-800">• Winter clothes required urgently</p>
              <p className="text-sm text-red-800">• Medical supplies running low</p>
            </div>
            <motion.button
              className="mt-3 w-full bg-red-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View All Alerts
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NGODashboard;