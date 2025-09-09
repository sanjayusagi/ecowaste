import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Leaf, 
  User, 
  Menu, 
  X, 
  Bell,
  Settings,
  Crown,
  Award
} from 'lucide-react';
import { User as UserType } from '../../types';

interface NavbarProps {
  user: UserType;
  onUserTypeChange: (type: UserType['type']) => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onUserTypeChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notifications] = useState(3);

  const userTypes = [
    { type: 'citizen' as const, label: 'Citizen', icon: User },
    { type: 'ngo' as const, label: 'NGO', icon: Award },
    { type: 'municipality' as const, label: 'Municipality', icon: Settings },
    { type: 'government' as const, label: 'Government', icon: Crown },
    { type: 'hospital' as const, label: 'Hospital', icon: User },
  ];

  return (
    <motion.nav
      className="card-glass sticky top-0 z-50 border-b border-white/20"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative">
              <Leaf className="h-8 w-8 text-eco-500" />
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-sunset-400 to-nature-400 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <div>
              <h1 className="text-xl font-display font-bold text-gradient">Zero Waste</h1>
              <p className="text-xs text-white/70 font-body">Global Sustainability</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* User Type Selector */}
            <div className="flex items-center space-x-2 card-glass rounded-xl p-1 border border-white/20">
              {userTypes.map((type) => (
                <motion.button
                  key={type.type}
                  onClick={() => onUserTypeChange(type.type)}
                  className={`px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${
                    user.type === type.type
                      ? 'bg-gradient-to-r from-eco-500 to-nature-500 text-white shadow-lg'
                      : 'text-white/80 hover:text-white hover:bg-white/20'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex items-center space-x-1">
                    <type.icon className="h-4 w-4" />
                    <span className="font-body">{type.label}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Notifications */}
            <motion.div 
              className="relative p-2 rounded-xl card-glass border border-white/20 hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
            >
              <Bell className="h-5 w-5 text-white cursor-pointer" />
              {notifications > 0 && (
                <motion.span
                  className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-lg"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {notifications}
                </motion.span>
              )}
            </motion.div>

            {/* User Profile */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="text-right">
                  <p className="text-sm font-semibold text-white font-heading">{user.name}</p>
                  <div className="flex items-center space-x-2">
                    <p className="text-xs text-white/70 font-body">Level {user.level}</p>
                    <div className="flex items-center space-x-1">
                      <Award className="h-3 w-3 text-sunset-400" />
                      <span className="text-xs font-semibold text-sunset-300">{user.points}</span>
                    </div>
                    {user.isPremium && (
                      <Crown className="h-3 w-3 text-sunset-400 animate-pulse" />
                    )}
                  </div>
                </div>
                <motion.div
                  className="h-10 w-10 bg-gradient-to-r from-eco-400 to-ocean-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white/30"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <User className="h-5 w-5 text-white" />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-xl card-glass border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            className="md:hidden border-t border-white/20 py-4 card-glass"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-3">
              {userTypes.map((type) => (
                <motion.button
                  key={type.type}
                  onClick={() => {
                    onUserTypeChange(type.type);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
                    user.type === type.type
                      ? 'bg-gradient-to-r from-eco-500 to-nature-500 text-white shadow-lg'
                      : 'text-white/80 hover:text-white hover:bg-white/20'
                  }`}
                  whileTap={{ scale: 0.98 }}
                >
                  <type.icon className="h-4 w-4 inline mr-2" />
                  {type.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;