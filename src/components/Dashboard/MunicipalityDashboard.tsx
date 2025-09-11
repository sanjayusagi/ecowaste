import React, { useState } from 'react';
import { motion } from 'framer-motion';
import EcoChatbot from '../Chatbot/EcoChatbot';
import {
  MapPin,
  AlertTriangle,
  CheckCircle,
  Clock,
  Truck,
  Users,
  BarChart3,
  Settings,
  Calendar,
  Phone,
  FileText,
  Zap,
  Shield,
  TrendingUp,
  Filter,
  Search,
  MessageCircle
} from 'lucide-react';

const MunicipalityDashboard: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const stats = [
    { label: 'Pending Reports', value: '127', icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50', trend: '+5%' },
    { label: 'Resolved Today', value: '43', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50', trend: '+12%' },
    { label: 'Critical Alerts', value: '8', icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50', trend: '-23%' },
    { label: 'Active Trucks', value: '24', icon: Truck, color: 'text-blue-600', bg: 'bg-blue-50', trend: '+3%' }
  ];

  const wasteReports = [
    {
      id: 'WR001',
      location: 'Central Park Avenue',
      type: 'Illegal Dumping',
      severity: 'high',
      status: 'pending',
      reportedBy: 'Sarah Johnson',
      timestamp: '2 hours ago',
      coordinates: { lat: 40.7829, lng: -73.9654 },
      description: 'Large pile of construction waste dumped near park entrance'
    },
    {
      id: 'WR002', 
      location: 'Market Street Plaza',
      type: 'Overflowing Bins',
      severity: 'medium',
      status: 'in-progress',
      reportedBy: 'Mike Chen',
      timestamp: '4 hours ago',
      coordinates: { lat: 40.7589, lng: -73.9851 },
      description: 'Multiple garbage bins overflowing during market day'
    },
    {
      id: 'WR003',
      location: 'Riverside Drive',
      type: 'Plastic Waste',
      severity: 'low',
      status: 'resolved',
      reportedBy: 'Emma Davis',
      timestamp: '1 day ago',
      coordinates: { lat: 40.7834, lng: -73.9662 },
      description: 'Plastic bottles scattered along the riverside path'
    },
    {
      id: 'WR004',
      location: 'Industrial Zone B',
      type: 'Chemical Waste',
      severity: 'critical',
      status: 'pending',
      reportedBy: 'David Kim',
      timestamp: '30 minutes ago',
      coordinates: { lat: 40.7505, lng: -73.9934 },
      description: 'Suspected chemical waste leak reported by factory worker'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
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
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
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
          Municipality Control Center 🏛️
        </h1>
        <p className="text-gray-600">
          Monitor waste reports, manage cleanup operations, and coordinate with citizens.
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
            className={`${stat.bg} rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500`}
            variants={itemVariants}
            whileHover={{ scale: 1.03, y: -5 }}
          >
            <div className="flex items-center justify-between mb-2">
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
              <div className="text-right">
                <motion.div
                  className="text-2xl font-bold text-gray-900"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
                >
                  {stat.value}
                </motion.div>
                <span className={`text-xs font-medium ${
                  stat.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend}
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-700 font-medium">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Filters and Search */}
          <motion.div
            className="bg-white rounded-xl p-6 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex items-center space-x-4 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search reports..."
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <motion.button
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                </motion.button>
              </div>
              
              <div className="flex items-center space-x-2">
                {['all', 'pending', 'in-progress', 'resolved'].map((status) => (
                  <motion.button
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className={`px-3 py-1 text-sm font-medium rounded-full transition-all duration-200 ${
                      selectedStatus === status
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Waste Reports */}
          <motion.div
            className="bg-white rounded-xl p-6 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Active Waste Reports</h2>
              <motion.button
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MapPin className="h-4 w-4" />
                <span>Map View</span>
              </motion.button>
            </div>

            <div className="space-y-4">
              {wasteReports.map((report, index) => (
                <motion.div
                  key={report.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        report.severity === 'critical' ? 'bg-red-500' :
                        report.severity === 'high' ? 'bg-orange-500' :
                        report.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`} />
                      <div>
                        <h3 className="font-semibold text-gray-900">#{report.id}</h3>
                        <p className="text-sm text-gray-600">{report.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getSeverityColor(report.severity)}`}>
                        {report.severity}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(report.status)}`}>
                        {report.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-sm text-gray-600">Type: <span className="font-medium">{report.type}</span></p>
                      <p className="text-sm text-gray-600">Reporter: <span className="font-medium">{report.reportedBy}</span></p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Time: <span className="font-medium">{report.timestamp}</span></p>
                      <p className="text-sm text-gray-600">
                        Location: <span className="font-medium">{report.coordinates.lat.toFixed(4)}, {report.coordinates.lng.toFixed(4)}</span>
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-700 mb-4">{report.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <motion.button
                        className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-lg hover:bg-blue-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <MapPin className="h-3 w-3" />
                        <span>Locate</span>
                      </motion.button>
                      <motion.button
                        className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-lg hover:bg-green-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Truck className="h-3 w-3" />
                        <span>Dispatch</span>
                      </motion.button>
                      <motion.button
                        className="flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-lg hover:bg-gray-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Phone className="h-3 w-3" />
                        <span>Contact</span>
                      </motion.button>
                    </div>
                    
                    {report.status === 'pending' && (
                      <motion.button
                        className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Assign Team
                      </motion.button>
                    )}
                  </div>
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
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              {[
                { label: 'Deploy Cleanup Team', icon: Truck, color: 'bg-blue-500' },
                { label: 'Send Alert Notice', icon: AlertTriangle, color: 'bg-red-500' },
                { label: 'Schedule Pickup', icon: Calendar, color: 'bg-green-500' },
                { label: 'Generate Report', icon: FileText, color: 'bg-purple-500' }
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

          {/* Performance Metrics */}
          <motion.div
            className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="flex items-center mb-4">
              <BarChart3 className="h-6 w-6 text-blue-600 mr-2" />
              <h2 className="text-lg font-bold text-gray-900">This Week</h2>
            </div>
            
            <div className="space-y-4">
              {[
                { label: 'Response Time', value: '2.4h', target: '< 3h', status: 'good' },
                { label: 'Resolution Rate', value: '89%', target: '> 85%', status: 'good' },
                { label: 'Citizen Satisfaction', value: '4.6/5', target: '> 4.0', status: 'excellent' },
                { label: 'Team Efficiency', value: '94%', target: '> 90%', status: 'good' }
              ].map((metric, index) => (
                <motion.div
                  key={metric.label}
                  className="bg-white rounded-lg p-3"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">{metric.label}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      metric.status === 'excellent' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {metric.status}
                    </span>
                  </div>
                  <div className="text-lg font-bold text-gray-900">{metric.value}</div>
                  <div className="text-xs text-gray-500">Target: {metric.target}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Real-time Alerts */}
          <motion.div
            className="bg-red-50 border border-red-200 rounded-xl p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex items-center mb-3">
              <Shield className="h-5 w-5 text-red-600 mr-2" />
              <h3 className="font-bold text-red-900">Critical Alerts</h3>
            </div>
            <div className="space-y-2 mb-4">
              <motion.div
                className="flex items-center text-sm text-red-800"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Zap className="h-3 w-3 mr-2" />
                <span>Chemical spill reported - Zone B</span>
              </motion.div>
              <motion.div
                className="flex items-center text-sm text-red-800"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <AlertTriangle className="h-3 w-3 mr-2" />
                <span>Overflowing bins - Market area</span>
              </motion.div>
            </div>
            <motion.button
              className="w-full bg-red-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View All Alerts
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* EcoChatbot Floating Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-40"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <motion.button
          className="bg-gradient-to-r from-eco-400 to-nature-400 p-5 rounded-full shadow-2xl text-white"
          whileHover={{ 
            scale: 1.15,
            rotate: 360,
            boxShadow: "0 15px 40px rgba(34, 197, 94, 0.4)"
          }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsChatbotOpen(true)}
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(34, 197, 94, 0.7)",
              "0 0 0 15px rgba(34, 197, 94, 0)",
              "0 0 0 0 rgba(34, 197, 94, 0)"
            ]
          }}
          transition={{
            boxShadow: {
              duration: 2,
              repeat: Infinity,
              repeatType: "loop"
            }
          }}
        >
          <MessageCircle className="h-7 w-7" />
        </motion.button>
      </motion.div>

      {/* EcoChatbot */}
      <EcoChatbot 
        isOpen={isChatbotOpen} 
        onClose={() => setIsChatbotOpen(false)} 
      />
    </div>
  );
};

export default MunicipalityDashboard;