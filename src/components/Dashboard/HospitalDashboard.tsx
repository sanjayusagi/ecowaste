import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Heart,
  Droplets,
  Users,
  Calendar,
  Clock,
  MapPin,
  Phone,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  Activity,
  Stethoscope,
  FileText,
  Shield,
  Truck,
  Recycle,
  BarChart3
} from 'lucide-react';

const HospitalDashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('blood-management');

  const stats = [
    { label: 'Blood Units Available', value: '245', icon: Droplets, color: 'text-red-600', bg: 'bg-red-50', trend: '+12 today' },
    { label: 'Active Donors', value: '89', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50', trend: '+5 this week' },
    { label: 'Emergency Requests', value: '3', icon: AlertCircle, color: 'text-orange-600', bg: 'bg-orange-50', trend: 'Critical' },
    { label: 'Waste Disposed', value: '1.2T', icon: Recycle, color: 'text-green-600', bg: 'bg-green-50', trend: 'This month' }
  ];

  const bloodRequests = [
    {
      id: 'BR001',
      bloodType: 'O-',
      unitsNeeded: 5,
      urgency: 'critical',
      patient: 'Emergency Room',
      requestedBy: 'Dr. Sarah Wilson',
      deadline: '2 hours',
      status: 'pending',
      notes: 'Major trauma case, immediate need'
    },
    {
      id: 'BR002',
      bloodType: 'A+',
      unitsNeeded: 2,
      urgency: 'high',
      patient: 'Surgery Ward',
      requestedBy: 'Dr. Michael Chen',
      deadline: '6 hours',
      status: 'confirmed',
      notes: 'Scheduled surgery tomorrow morning'
    },
    {
      id: 'BR003',
      bloodType: 'B+',
      unitsNeeded: 3,
      urgency: 'medium',
      patient: 'Oncology',
      requestedBy: 'Dr. Emily Davis',
      deadline: '24 hours',
      status: 'fulfilled',
      notes: 'Chemotherapy support'
    }
  ];

  const upcomingDonations = [
    {
      id: 1,
      donor: 'John Smith',
      bloodType: 'O+',
      scheduledTime: 'Today 2:00 PM',
      lastDonation: '3 months ago',
      phone: '+1 555-0123',
      status: 'confirmed'
    },
    {
      id: 2,
      donor: 'Maria Garcia',
      bloodType: 'A-',
      scheduledTime: 'Today 3:30 PM',
      lastDonation: '4 months ago',
      phone: '+1 555-0456',
      status: 'pending'
    },
    {
      id: 3,
      donor: 'David Kim',
      bloodType: 'B-',
      scheduledTime: 'Tomorrow 10:00 AM',
      lastDonation: '2 months ago',
      phone: '+1 555-0789',
      status: 'confirmed'
    }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'fulfilled': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
          Hospital Management Center 🏥
        </h1>
        <p className="text-gray-600">
          Manage blood donations, waste disposal, and healthcare sustainability initiatives.
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
            className={`${stat.bg} rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-red-500`}
            variants={itemVariants}
            whileHover={{ scale: 1.03, y: -5 }}
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
            <p className="text-sm text-gray-700 font-medium mb-1">{stat.label}</p>
            <p className="text-xs text-gray-500">{stat.trend}</p>
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
            { id: 'blood-management', label: 'Blood Management', icon: Droplets },
            { id: 'waste-disposal', label: 'Waste Disposal', icon: Recycle },
            { id: 'donations-drive', label: 'Donation Drives', icon: Heart },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 }
          ].map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                selectedTab === tab.id
                  ? 'text-red-600 border-b-2 border-red-600 bg-red-50'
                  : 'text-gray-600 hover:text-red-600 hover:bg-gray-50'
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Blood Requests */}
          <motion.div
            className="bg-white rounded-xl p-6 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Urgent Blood Requests</h2>
              <motion.button
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart className="h-4 w-4" />
                <span>New Request</span>
              </motion.button>
            </div>

            <div className="space-y-4">
              {bloodRequests.map((request, index) => (
                <motion.div
                  key={request.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                        <Droplets className="h-6 w-6 text-red-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">#{request.id}</h3>
                        <p className="text-sm text-gray-600">{request.patient}</p>
                        <p className="text-xs text-gray-500">By {request.requestedBy}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getUrgencyColor(request.urgency)}`}>
                        {request.urgency}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-3">
                    <div>
                      <p className="text-sm text-gray-600">Blood Type</p>
                      <p className="font-bold text-lg text-red-600">{request.bloodType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Units Needed</p>
                      <p className="font-bold text-lg text-gray-900">{request.unitsNeeded}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Deadline</p>
                      <p className="font-bold text-lg text-orange-600">{request.deadline}</p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-700 mb-4">{request.notes}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-500">Deadline: {request.deadline}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {request.status === 'pending' && (
                        <motion.button
                          className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Fulfill Request
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
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Blood Inventory */}
          <motion.div
            className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center mb-4">
              <Activity className="h-6 w-6 text-red-600 mr-2" />
              <h2 className="text-xl font-bold text-gray-900">Blood Inventory Status</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { type: 'O+', units: 45, status: 'good' },
                { type: 'O-', units: 12, status: 'low' },
                { type: 'A+', units: 38, status: 'good' },
                { type: 'A-', units: 8, status: 'critical' },
                { type: 'B+', units: 28, status: 'medium' },
                { type: 'B-', units: 15, status: 'low' },
                { type: 'AB+', units: 22, status: 'good' },
                { type: 'AB-', units: 6, status: 'critical' }
              ].map((blood, index) => (
                <motion.div
                  key={blood.type}
                  className="bg-white rounded-lg p-4 text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <div className="text-2xl font-bold text-red-600 mb-1">{blood.type}</div>
                  <div className="text-lg font-semibold text-gray-900">{blood.units} units</div>
                  <div className={`text-xs font-medium mt-1 ${
                    blood.status === 'good' ? 'text-green-600' :
                    blood.status === 'medium' ? 'text-yellow-600' :
                    blood.status === 'low' ? 'text-orange-600' : 'text-red-600'
                  }`}>
                    {blood.status.toUpperCase()}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Donations */}
          <motion.div
            className="bg-white rounded-xl p-6 shadow-lg"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-lg font-bold text-gray-900 mb-4">Today's Donations</h2>
            <div className="space-y-3">
              {upcomingDonations.slice(0, 2).map((donation, index) => (
                <motion.div
                  key={donation.id}
                  className="p-3 bg-gray-50 rounded-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{donation.donor}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      donation.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {donation.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div className="flex items-center justify-between">
                      <span>Blood Type:</span>
                      <span className="font-medium text-red-600">{donation.bloodType}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Time:</span>
                      <span className="font-medium">{donation.scheduledTime}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Last Donation:</span>
                      <span className="font-medium">{donation.lastDonation}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mt-3">
                    <motion.button
                      className="flex items-center space-x-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded hover:bg-blue-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Phone className="h-3 w-3" />
                      <span>Call</span>
                    </motion.button>
                    <motion.button
                      className="flex items-center space-x-1 px-2 py-1 bg-green-100 text-green-800 text-xs rounded hover:bg-green-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <CheckCircle className="h-3 w-3" />
                      <span>Confirm</span>
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.button
              className="w-full mt-4 text-center text-blue-600 hover:text-blue-800 font-medium text-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View All Appointments
            </motion.button>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            className="bg-white rounded-xl p-6 shadow-lg"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              {[
                { label: 'Schedule Drive', icon: Calendar, color: 'bg-red-500' },
                { label: 'Emergency Alert', icon: AlertCircle, color: 'bg-orange-500' },
                { label: 'Waste Pickup', icon: Truck, color: 'bg-green-500' },
                { label: 'Generate Report', icon: FileText, color: 'bg-blue-500' }
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

          {/* Waste Disposal Guidelines */}
          <motion.div
            className="bg-green-50 border border-green-200 rounded-xl p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex items-center mb-3">
              <Shield className="h-5 w-5 text-green-600 mr-2" />
              <h3 className="font-bold text-green-900">Disposal Guidelines</h3>
            </div>
            <div className="space-y-2 text-sm text-green-800">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-1.5 mr-2 flex-shrink-0" />
                <span>Sharps containers: Yellow bins</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-1.5 mr-2 flex-shrink-0" />
                <span>Pathological waste: Red containers</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-1.5 mr-2 flex-shrink-0" />
                <span>Pharmaceutical: Blue bins</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-1.5 mr-2 flex-shrink-0" />
                <span>General waste: Black bags</span>
              </div>
            </div>
            <motion.button
              className="w-full mt-4 bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View Full Guidelines
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HospitalDashboard;