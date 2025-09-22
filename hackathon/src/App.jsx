import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/components/Dashboard';
import AttendanceTracker from '@/components/AttendanceTracker';
import ActivitySuggestions from '@/components/ActivitySuggestions';
import StudentProfile from '@/components/StudentProfile';
import ClassroomDisplay from '@/components/ClassroomDisplay';
import Reports from '@/components/Reports';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard setActiveTab={setActiveTab} />;
      case 'attendance':
        return <AttendanceTracker />;
      case 'activities':
        return <ActivitySuggestions />;
      case 'profile':
        return <StudentProfile />;
      case 'classroom':
        return <ClassroomDisplay />;
      case 'reports':
        return <Reports />;
      default:
        return <Dashboard setActiveTab={setActiveTab} />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Smart Curriculum Activity & Attendance App</title>
        <meta name="description" content="Automated attendance tracking and personalized learning activities for educational institutions" />
      </Helmet>
      
      <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="flex-1 p-6 ml-64">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto"
          >
            {renderContent()}
          </motion.div>
        </main>
        
        <Toaster />
      </div>
    </>
  );
}

export default App;