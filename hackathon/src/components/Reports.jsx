import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { BarChart3, Users, Activity, Target, Award } from 'lucide-react';

const Reports = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [activityData, setActivityData] = useState([]);

  useEffect(() => {
    // Mock data for charts
    const weeklyAttendance = [
      { day: 'Mon', present: 28, absent: 4 },
      { day: 'Tue', present: 30, absent: 2 },
      { day: 'Wed', present: 29, absent: 3 },
      { day: 'Thu', present: 31, absent: 1 },
      { day: 'Fri', present: 27, absent: 5 },
    ];
    setAttendanceData(weeklyAttendance);

    const completedActivities = JSON.parse(localStorage.getItem('completedActivities')) || [];
    const categoryCounts = completedActivities.reduce((acc, activity) => {
      acc[activity.category] = (acc[activity.category] || 0) + 1;
      return acc;
    }, {});

    const activityChartData = Object.keys(categoryCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      count: categoryCounts[key]
    }));
    setActivityData(activityChartData);
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

  const stats = [
    { title: 'Overall Attendance', value: '92.5%', icon: Users, color: 'from-blue-500 to-blue-600' },
    { title: 'Activities Completed', value: '48', icon: Activity, color: 'from-green-500 to-green-600' },
    { title: 'Goals Achieved', value: '8', icon: Target, color: 'from-purple-500 to-purple-600' },
    { title: 'Total Points', value: '2,450', icon: Award, color: 'from-orange-500 to-orange-600' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Performance Reports</h1>
          <p className="text-gray-600 mt-1">
            Visual insights into attendance and activity trends.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-effect rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color} text-white`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-effect rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-800">Weekly Attendance Trend</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="day" tick={{ fill: '#4B5563' }} />
              <YAxis tick={{ fill: '#4B5563' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(5px)',
                  border: '1px solid rgba(209, 213, 219, 0.5)',
                  borderRadius: '0.5rem',
                }}
              />
              <Legend />
              <Bar dataKey="present" fill="#3B82F6" name="Present" radius={[4, 4, 0, 0]} />
              <Bar dataKey="absent" fill="#EF4444" name="Absent" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-effect rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <Activity className="w-6 h-6 text-green-600" />
            <h2 className="text-xl font-bold text-gray-800">Activities by Category</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={activityData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="count"
                nameKey="name"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {activityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(5px)',
                  border: '1px solid rgba(209, 213, 219, 0.5)',
                  borderRadius: '0.5rem',
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
};

export default Reports;