import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Clock, 
  Target, 
  TrendingUp,
  Calendar,
  BookOpen,
  Award,
  Activity,
  QrCode
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const Dashboard = ({ setActiveTab }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [attendanceData, setAttendanceData] = useState({
    present: 28,
    total: 32,
    percentage: 87.5
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const savedAttendance = localStorage.getItem('attendanceRecords');
    if (savedAttendance) {
      const records = JSON.parse(savedAttendance);
      const present = records.filter(s => s.status === 'present' || s.status === 'late').length;
      const total = records.length;
      const percentage = total > 0 ? ((present / total) * 100).toFixed(1) : 0;
      const newData = { present, total, percentage: parseFloat(percentage) };
      setAttendanceData(newData);
      localStorage.setItem('attendanceData', JSON.stringify(newData));
    } else {
        const initialData = { present: 28, total: 32, percentage: 87.5 };
        localStorage.setItem('attendanceData', JSON.stringify(initialData));
        setAttendanceData(initialData);
    }

    return () => clearInterval(timer);
  }, []);

  const stats = [
    {
      title: 'Today\'s Attendance',
      value: `${attendanceData.present}/${attendanceData.total}`,
      percentage: `${attendanceData.percentage}%`,
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Active Classes',
      value: '6',
      subtitle: 'Currently Running',
      icon: BookOpen,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Completed Goals',
      value: '12',
      subtitle: 'This Week',
      icon: Target,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Study Hours',
      value: '24.5',
      subtitle: 'This Week',
      icon: Clock,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const upcomingClasses = [
    { time: '09:00', subject: 'Mathematics', room: 'Room 101', status: 'upcoming' },
    { time: '10:30', subject: 'Physics', room: 'Lab 2', status: 'current' },
    { time: '12:00', subject: 'Chemistry', room: 'Lab 1', status: 'upcoming' },
    { time: '14:00', subject: 'English', room: 'Room 205', status: 'upcoming' }
  ];

  const recentActivities = [
    { time: '2 min ago', activity: 'Marked attendance for Physics class', type: 'attendance' },
    { time: '15 min ago', activity: 'Completed Math assignment', type: 'assignment' },
    { time: '1 hour ago', activity: 'Joined study group session', type: 'study' },
    { time: '2 hours ago', activity: 'Updated learning goals', type: 'goal' }
  ];

  const handleQuickAction = (action) => {
    const tabMap = {
        scan: 'attendance',
        activities: 'activities',
        goals: 'profile',
        report: 'reports'
    };
    if (tabMap[action]) {
        setActiveTab(tabMap[action]);
    } else {
        toast({
            title: "🚧 Feature Coming Soon!",
            description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
        });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome back! Here's what's happening today.
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-800">
            {currentTime.toLocaleTimeString()}
          </div>
          <div className="text-gray-600">
            {currentTime.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-effect rounded-xl p-6 floating-animation"
              style={{ animationDelay: `${index * 0.5}s` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
                </div>
                {stat.percentage && (
                  <span className="text-sm font-medium text-green-600">
                    {stat.percentage}
                  </span>
                )}
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              {stat.subtitle && (
                <p className="text-sm text-gray-500 mt-1">{stat.subtitle}</p>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-effect rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-800">Today's Schedule</h2>
          </div>
          <div className="space-y-4">
            {upcomingClasses.map((class_, index) => (
              <div
                key={index}
                className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
                  class_.status === 'current'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white pulse-glow'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="text-center">
                  <div className={`text-lg font-bold ${
                    class_.status === 'current' ? 'text-white' : 'text-gray-800'
                  }`}>
                    {class_.time}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className={`font-semibold ${
                    class_.status === 'current' ? 'text-white' : 'text-gray-800'
                  }`}>
                    {class_.subject}
                  </h3>
                  <p className={`text-sm ${
                    class_.status === 'current' ? 'text-blue-100' : 'text-gray-600'
                  }`}>
                    {class_.room}
                  </p>
                </div>
                {class_.status === 'current' && (
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 animate-pulse" />
                    <span className="text-sm font-medium">Live</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-effect rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-green-600" />
            <h2 className="text-xl font-bold text-gray-800">Recent Activities</h2>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className={`p-2 rounded-full ${
                  activity.type === 'attendance' ? 'bg-blue-100' :
                  activity.type === 'assignment' ? 'bg-green-100' :
                  activity.type === 'study' ? 'bg-purple-100' : 'bg-orange-100'
                }`}>
                  {activity.type === 'attendance' && <Users className="w-4 h-4 text-blue-600" />}
                  {activity.type === 'assignment' && <BookOpen className="w-4 h-4 text-green-600" />}
                  {activity.type === 'study' && <Target className="w-4 h-4 text-purple-600" />}
                  {activity.type === 'goal' && <Award className="w-4 h-4 text-orange-600" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800">{activity.activity}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-effect rounded-xl p-6"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button
            onClick={() => handleQuickAction('scan')}
            className="h-20 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
          >
            <div className="text-center">
              <QrCode className="w-6 h-6 mx-auto mb-2" />
              <span className="text-sm">Scan QR</span>
            </div>
          </Button>
          <Button
            onClick={() => handleQuickAction('goals')}
            className="h-20 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
          >
            <div className="text-center">
              <Target className="w-6 h-6 mx-auto mb-2" />
              <span className="text-sm">Set Goals</span>
            </div>
          </Button>
          <Button
            onClick={() => handleQuickAction('activities')}
            className="h-20 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white"
          >
            <div className="text-center">
              <BookOpen className="w-6 h-6 mx-auto mb-2" />
              <span className="text-sm">Activities</span>
            </div>
          </Button>
          <Button
            onClick={() => handleQuickAction('report')}
            className="h-20 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
          >
            <div className="text-center">
              <TrendingUp className="w-6 h-6 mx-auto mb-2" />
              <span className="text-sm">Reports</span>
            </div>
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;