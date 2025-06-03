import React, { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { motion } from 'framer-motion';

interface DashboardStats {
  eventsCount: number;
  contactsCount: number;
  galleryCount: number;
  servicesCount: number;
  usersCount: number;
}

const Dashboard = () => {
  const { theme } = useTheme();
  const [stats, setStats] = useState<DashboardStats>({
    eventsCount: 0,
    contactsCount: 0,
    galleryCount: 0,
    servicesCount: 0,
    usersCount: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch events count
      const eventsResponse = await fetch('https://127.0.0.1:8000/api/admin/events');
      const eventsData = await eventsResponse.json();
      
      // Fetch contacts count
      const contactsResponse = await fetch('https://127.0.0.1:8000/api/admin/contacts');
      const contactsData = await contactsResponse.json();

      // Fetch gallery count
      const galleryResponse = await fetch('https://127.0.0.1:8000/api/admin/gallery');
      const galleryData = await galleryResponse.json();

      setStats({
        eventsCount: eventsData.length || 0,
        contactsCount: contactsData.length || 0,
        galleryCount: galleryData.length || 0,
        servicesCount: 0, // To be implemented when services API is available
        usersCount: 0 // To be implemented when users API is available
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
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

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const numberVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-dark-500 dark:text-brand-blanc mb-6">Dashboard</h1>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-semibold text-dark-500 dark:text-brand-blanc mb-6"
      >
        Dashboard
      </motion.h1>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {/* Stats Cards */}
        <motion.div 
          variants={cardVariants}
          whileHover="hover"
          className="bg-brand-blanc dark:bg-dark-500 rounded-lg shadow-lg p-6 transition-all duration-300"
        >
          <h3 className="text-primary-600 dark:text-primary-300 text-sm font-medium">Total Events</h3>
          <motion.p 
            variants={numberVariants}
            className="text-3xl font-bold text-dark-500 dark:text-brand-blanc"
          >
            {stats.eventsCount}
          </motion.p>
        </motion.div>
        
        <motion.div 
          variants={cardVariants}
          whileHover="hover"
          className="bg-brand-blanc dark:bg-dark-500 rounded-lg shadow-lg p-6 transition-all duration-300"
        >
          <h3 className="text-primary-600 dark:text-primary-300 text-sm font-medium">Total Contacts</h3>
          <motion.p 
            variants={numberVariants}
            className="text-3xl font-bold text-dark-500 dark:text-brand-blanc"
          >
            {stats.contactsCount}
          </motion.p>
        </motion.div>
        
        <motion.div 
          variants={cardVariants}
          whileHover="hover"
          className="bg-brand-blanc dark:bg-dark-500 rounded-lg shadow-lg p-6 transition-all duration-300"
        >
          <h3 className="text-primary-600 dark:text-primary-300 text-sm font-medium">Total Galleries</h3>
          <motion.p 
            variants={numberVariants}
            className="text-3xl font-bold text-dark-500 dark:text-brand-blanc"
          >
            {stats.galleryCount}
          </motion.p>
        </motion.div>

        <motion.div 
          variants={cardVariants}
          whileHover="hover"
          className="bg-brand-blanc dark:bg-dark-500 rounded-lg shadow-lg p-6 transition-all duration-300"
        >
          <h3 className="text-primary-600 dark:text-primary-300 text-sm font-medium">Total Services</h3>
          <motion.p 
            variants={numberVariants}
            className="text-3xl font-bold text-dark-500 dark:text-brand-blanc"
          >
            {stats.servicesCount}
          </motion.p>
        </motion.div>
        
        <motion.div 
          variants={cardVariants}
          whileHover="hover"
          className="bg-brand-blanc dark:bg-dark-500 rounded-lg shadow-lg p-6 transition-all duration-300"
        >
          <h3 className="text-primary-600 dark:text-primary-300 text-sm font-medium">Total Users</h3>
          <motion.p 
            variants={numberVariants}
            className="text-3xl font-bold text-dark-500 dark:text-brand-blanc"
          >
            {stats.usersCount}
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8"
      >
        <h2 className="text-lg font-medium text-dark-500 dark:text-brand-blanc mb-4">Recent Activity</h2>
        <div className="bg-brand-blanc dark:bg-dark-500 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
          <div className="p-6">
            <p className="text-primary-600 dark:text-primary-300">No recent activity</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard; 