import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Layout/Navbar';
import CitizenDashboard from './components/Dashboard/CitizenDashboard';
import NGODashboard from './components/Dashboard/NGODashboard';
import MunicipalityDashboard from './components/Dashboard/MunicipalityDashboard';
import HospitalDashboard from './components/Dashboard/HospitalDashboard';
import { User } from './types';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User>({
    id: '1',
    name: 'Tharun Balaji D',
    email: 'tharun@zerowasteplatform.com',
    type: 'citizen',
    points: 2450,
    level: 7,
    isPremium: true
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleUserTypeChange = (newType: User['type']) => {
    setCurrentUser(prev => ({
      ...prev,
      type: newType,
      name: getUserName(newType),
      email: getUserEmail(newType)
    }));
  };

  const getUserName = (type: User['type']) => {
    switch (type) {
      case 'citizen': return 'Tharun Balaji D';
      case 'ngo': return 'Green Earth NGO';
      case 'municipality': return 'Chennai Municipality';
      case 'government': return 'Tamil Nadu Govt';
      case 'hospital': return 'Apollo Hospital';
      default: return 'User';
    }
  };

  const getUserEmail = (type: User['type']) => {
    switch (type) {
      case 'citizen': return 'tharun@zerowasteplatform.com';
      case 'ngo': return 'contact@greenearthngo.org';
      case 'municipality': return 'admin@chennaicity.gov.in';
      case 'government': return 'contact@tn.gov.in';
      case 'hospital': return 'admin@apollohospital.com';
      default: return 'user@example.com';
    }
  };

  const renderDashboard = () => {
    switch (currentUser.type) {
      case 'citizen': return <CitizenDashboard />;
      case 'ngo': return <NGODashboard />;
      case 'municipality': return <MunicipalityDashboard />;
      case 'hospital': return <HospitalDashboard />;
      case 'government': return <CitizenDashboard />; // Can be customized later
      default: return <CitizenDashboard />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen mesh-background flex items-center justify-center">
        <div className="text-center">
          <motion.div
            className="inline-block mb-8"
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-20 h-20 card-glass rounded-full flex items-center justify-center shadow-2xl">
              <div className="w-10 h-10 bg-gradient-to-r from-eco-400 to-nature-400 rounded-full animate-pulse" />
            </div>
          </motion.div>
          
          <motion.div
            className="mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h1 className="text-4xl font-display font-bold text-white mb-3 tracking-wide">Zero Waste</h1>
            <p className="text-white/90 font-body text-lg">Global Sustainability Platform</p>
          </motion.div>
          
          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="flex space-x-1 justify-center">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 bg-white/80 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen mesh-background">
        <Navbar user={currentUser} onUserTypeChange={handleUserTypeChange} />
        
        <AnimatePresence mode="wait">
          <motion.main
            key={currentUser.type}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="relative"
          >
            {renderDashboard()}
          </motion.main>
        </AnimatePresence>

        {/* Background Elements */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-eco-300/30 to-nature-300/30 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-ocean-300/30 to-purple-300/30 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0]
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-sunset-300/20 to-nature-300/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Premium Features Indicator */}
        {currentUser.isPremium && (
          <motion.div
            className="fixed top-20 right-6 bg-gradient-to-r from-sunset-400 to-nature-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-2xl z-30 card-glass border border-white/30"
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <span className="flex items-center space-x-1">
              <span>✨</span>
              <span className="font-display">Premium Member</span>
            </span>
          </motion.div>
        )}
      </div>
    </Router>
  );
};

export default App;