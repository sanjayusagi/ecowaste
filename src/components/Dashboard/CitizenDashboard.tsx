import React, { useState } from 'react';
import { motion } from 'framer-motion';
import EcoChatbot from '../Chatbot/EcoChatbot';
import WasteReportModal from '../WasteClassifier/WasteReportModal';
import EcoEducationModal from '../EcoEducation/EcoEducationModal';
import {
  Camera,
  MapPin,
  Gift,
  Recycle,
  TrendingUp,
  Award,
  Heart,
  BookOpen,
  ShoppingCart,
  Calculator,
  Bell,
  Trophy,
  MessageCircle,
  Upload,
  Star,
  Zap,
  Target,
  Users
} from 'lucide-react';

const CitizenDashboard: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isWasteReportOpen, setIsWasteReportOpen] = useState(false);
  const [isEcoEducationOpen, setIsEcoEducationOpen] = useState(false);
  const [co2Data, setCo2Data] = useState({
    transport: 50,
    energy: 75,
    waste: 25,
    food: 40
  });

  const features = [
    {
      id: 'waste-report',
      title: 'Smart Waste Reporting',
      icon: Camera,
      color: 'bg-green-500',
      description: 'AI-powered waste classification and illegal dumping detection',
      points: '+50 points'
    },
    {
      id: 'donations',
      title: 'Donations Hub',
      icon: Gift,
      color: 'bg-blue-500',
      description: 'Donate food, clothes, books to verified NGOs',
      points: '+100 points'
    },
    {
      id: 'social-service',
      title: 'Social Service',
      icon: Users,
      color: 'bg-purple-500',
      description: 'Verify cleanup activities with before/after photos',
      points: '+150 points'
    },
    {
      id: 'blood-donation',
      title: 'Blood Donation',
      icon: Heart,
      color: 'bg-red-500',
      description: 'Connect with hospitals for blood donation drives',
      points: '+200 points'
    },
    {
      id: 'eco-education',
      title: 'Eco Education',
      icon: BookOpen,
      color: 'bg-yellow-500',
      description: 'Interactive tutorials and AR waste segregation game',
      points: '+25 points'
    },
    {
      id: 'ecomarket',
      title: 'Global Ecomarket',
      icon: ShoppingCart,
      color: 'bg-teal-500',
      description: 'Buy/sell eco-friendly and reusable products',
      points: 'Earn coins'
    },
    {
      id: 'co2-calculator',
      title: 'CO₂ Calculator',
      icon: Calculator,
      color: 'bg-orange-500',
      description: 'Track your personal carbon footprint',
      points: '+30 points'
    },
    {
      id: 'leaderboard',
      title: 'Leaderboards',
      icon: Trophy,
      color: 'bg-indigo-500',
      description: 'View district rankings and earn badges',
      points: 'Win prizes'
    }
  ];

  const stats = [
    { label: 'Points Earned', value: '2,450', icon: Star, color: 'text-yellow-600' },
    { label: 'Reports Filed', value: '23', icon: Camera, color: 'text-green-600' },
    { label: 'CO₂ Reduced', value: '125kg', icon: Zap, color: 'text-blue-600' },
    { label: 'Current Level', value: '7', icon: Target, color: 'text-purple-600' }
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
      {/* Welcome Section */}
      <motion.div
        className="mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl font-display font-bold text-white mb-4 tracking-wide">
          Welcome back, Eco Warrior! 🌱
        </h1>
        <p className="text-white/80 text-lg font-body max-w-2xl mx-auto">
          Make a positive impact today. Every small action counts towards a greener future.
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="card-premium p-6 hover:shadow-2xl transition-all duration-500 border border-white/30"
            variants={itemVariants}
            whileHover={{ scale: 1.08, y: -8, rotateY: 5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className={`p-2 rounded-xl bg-gradient-to-r ${
                stat.color === 'text-yellow-600' ? 'from-sunset-400 to-sunset-500' :
                stat.color === 'text-green-600' ? 'from-eco-400 to-nature-500' :
                stat.color === 'text-blue-600' ? 'from-ocean-400 to-ocean-500' :
                'from-purple-400 to-purple-500'
              } shadow-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <motion.div
                className="text-3xl font-display font-bold text-gradient"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
              >
                {stat.value}
              </motion.div>
            </div>
            <p className="text-sm font-semibold text-gray-700 font-body">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Feature Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {features.map((feature) => (
          <motion.div
            key={feature.id}
            className="card-premium overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer border border-white/30 group"
            variants={itemVariants}
            whileHover={{ 
              scale: 1.05, 
              y: -12,
              rotateY: 8,
              boxShadow: "0 25px 50px rgba(0,0,0,0.15)"
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              if (feature.id === 'waste-report') {
                setIsWasteReportOpen(true);
              } else if (feature.id === 'eco-education') {
                setIsEcoEducationOpen(true);
              } else {
                setSelectedFeature(feature.id);
              }
            }}
          >
            <div className={`${feature.color} p-6 relative overflow-hidden`}>
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
              <feature.icon className="h-10 w-10 text-white mb-3 relative z-10 group-hover:animate-bounce" />
              <h3 className="text-lg font-heading font-bold text-white relative z-10">{feature.title}</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-700 text-sm mb-4 font-body leading-relaxed">{feature.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs bg-gradient-to-r from-eco-100 to-nature-100 text-eco-800 px-3 py-1 rounded-full font-semibold">
                  {feature.points}
                </span>
                <motion.button
                  className="text-gradient-purple hover:scale-110 font-bold text-sm transition-all duration-300"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="font-display">Open →</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* CO₂ Calculator Section */}
      <motion.div
        className="card-glass rounded-2xl p-8 mb-8 border border-white/30"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="flex items-center mb-6">
          <div className="p-3 rounded-xl bg-gradient-to-r from-eco-400 to-nature-500 shadow-lg mr-4">
            <Calculator className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl font-heading font-bold text-white">Your Carbon Footprint</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(co2Data).map(([category, value]) => (
            <div key={category} className="card-premium p-5 border border-white/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-800 capitalize font-body">
                  {category}
                </span>
                <span className="text-sm font-bold text-gradient">{value}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <motion.div
                  className={`h-3 rounded-full ${
                    value > 60 ? 'bg-gradient-to-r from-red-400 to-red-500' : 
                    value > 30 ? 'bg-gradient-to-r from-sunset-400 to-sunset-500' : 
                    'bg-gradient-to-r from-eco-400 to-nature-500'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${value}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        className="card-premium p-8 border border-white/30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-2xl font-heading font-bold text-gradient mb-6">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.button
            className="btn-primary flex flex-col items-center p-6 rounded-2xl"
            whileHover={{ scale: 1.08, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsWasteReportOpen(true)}
          >
            <Upload className="h-8 w-8 text-white mb-3" />
            <span className="text-sm font-bold text-white font-body">Report Waste</span>
          </motion.button>
          
          <motion.button
            className="btn-secondary flex flex-col items-center p-6 rounded-2xl"
            whileHover={{ scale: 1.08, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsWasteReportOpen(true)}
          >
            <Gift className="h-8 w-8 text-white mb-3" />
            <span className="text-sm font-bold text-white font-body">Donate Items</span>
          </motion.button>
          
          <motion.button
            className="btn-accent flex flex-col items-center p-6 rounded-2xl"
            whileHover={{ scale: 1.08, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsEcoEducationOpen(true)}
          >
            <BookOpen className="h-8 w-8 text-white mb-3" />
            <span className="text-sm font-bold text-white font-body">Eco Education</span>
          </motion.button>
          
          <motion.button
            className="bg-gradient-to-r from-purple-500 to-pink-500 flex flex-col items-center p-6 rounded-2xl text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-108 transition-all duration-300"
            whileHover={{ scale: 1.08, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsChatbotOpen(true)}
          >
            <Trophy className="h-8 w-8 text-white mb-3" />
            <span className="text-sm font-bold text-white font-body">Leaderboard</span>
          </motion.button>
        </div>
      </motion.div>

      {/* EcoChatbot Floating Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-40"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <motion.button
          className="btn-glow p-5 rounded-full shadow-2xl"
          whileHover={{ 
            scale: 1.15,
            rotate: 360,
            boxShadow: "0 15px 40px rgba(34, 197, 94, 0.4)"
          }}
          whileTap={{ scale: 0.9 }}
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
          onClick={() => setIsChatbotOpen(true)}
        >
          <MessageCircle className="h-7 w-7" />
        </motion.button>
      </motion.div>

      {/* EcoChatbot */}
      <EcoChatbot 
        isOpen={isChatbotOpen} 
        onClose={() => setIsChatbotOpen(false)} 
      />

      {/* Waste Report Modal */}
      <WasteReportModal
        isOpen={isWasteReportOpen}
        onClose={() => setIsWasteReportOpen(false)}
        onSuccess={(result) => {
          console.log('Waste classification result:', result);
          // You can update the user's points or show a success message here
        }}
      />

      {/* Eco Education Modal */}
      <EcoEducationModal
        isOpen={isEcoEducationOpen}
        onClose={() => setIsEcoEducationOpen(false)}
      />

    </div>
  );
};

export default CitizenDashboard;