import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Monitor, 
  Users, 
  Clock, 
  MapPin, 
  CheckCircle, 
  XCircle,
  TrendingUp,
  Calendar,
  BookOpen,
  User
} from 'lucide-react';

const ClassroomDisplay = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [attendanceData, setAttendanceData] = useState([]);
  const [classInfo, setClassInfo] = useState({
    subject: 'Advanced Physics',
    teacher: 'Dr. Sarah Smith',
    room: 'Laboratory 2',
    time: '10:30 - 11:30 AM',
    date: new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Load attendance data from localStorage
    const savedData = localStorage.getItem('attendanceRecords');
    if (savedData) {
      setAttendanceData(JSON.parse(savedData));
    } else {
      // Initialize with sample data
      const sampleData = [
        { id: 1, name: 'John Doe', rollNo: '2021001', status: 'present', time: '10:32', avatar: 'JD' },
        { id: 2, name: 'Jane Smith', rollNo: '2021002', status: 'present', time: '10:33', avatar: 'JS' },
        { id: 3, name: 'Mike Johnson', rollNo: '2021003', status: 'absent', time: '-', avatar: 'MJ' },
        { id: 4, name: 'Sarah Wilson', rollNo: '2021004', status: 'present', time: '10:35', avatar: 'SW' },
        { id: 5, name: 'David Brown', rollNo: '2021005', status: 'present', time: '10:31', avatar: 'DB' },
        { id: 6, name: 'Emily Davis', rollNo: '2021006', status: 'present', time: '10:34', avatar: 'ED' },
        { id: 7, name: 'Alex Chen', rollNo: '2021007', status: 'late', time: '10:45', avatar: 'AC' },
        { id: 8, name: 'Lisa Wang', rollNo: '2021008', status: 'present', time: '10:30', avatar: 'LW' },
      ];
      setAttendanceData(sampleData);
    }

    return () => clearInterval(timer);
  }, []);

  const presentCount = attendanceData.filter(s => s.status === 'present').length;
  const lateCount = attendanceData.filter(s => s.status === 'late').length;
  const absentCount = attendanceData.filter(s => s.status === 'absent').length;
  const totalCount = attendanceData.length;
  const attendancePercentage = totalCount > 0 ? ((presentCount + lateCount) / totalCount * 100).toFixed(1) : 0;

  const getStatusColor = (status) => {
    switch (status) {
      case 'present':
        return 'text-green-600 bg-green-100';
      case 'late':
        return 'text-yellow-600 bg-yellow-100';
      case 'absent':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="w-5 h-5" />;
      case 'late':
        return <Clock className="w-5 h-5" />;
      case 'absent':
        return <XCircle className="w-5 h-5" />;
      default:
        return <User className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="p-3 bg-white/20 backdrop-blur-lg rounded-lg">
            <Monitor className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold">Classroom Display</h1>
        </div>
        <p className="text-xl text-blue-200">Real-time Attendance Monitoring</p>
      </motion.div>

      {/* Current Time */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center mb-8"
      >
        <div className="text-6xl font-bold mb-2">
          {currentTime.toLocaleTimeString('en-US', { 
            hour12: false, 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
        <div className="text-xl text-blue-200">
          {classInfo.date}
        </div>
      </motion.div>

      {/* Class Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center">
            <BookOpen className="w-8 h-8 mb-3 text-blue-300" />
            <h3 className="text-lg font-semibold mb-1">Subject</h3>
            <p className="text-2xl font-bold">{classInfo.subject}</p>
          </div>
          <div className="flex flex-col items-center">
            <User className="w-8 h-8 mb-3 text-green-300" />
            <h3 className="text-lg font-semibold mb-1">Instructor</h3>
            <p className="text-2xl font-bold">{classInfo.teacher}</p>
          </div>
          <div className="flex flex-col items-center">
            <MapPin className="w-8 h-8 mb-3 text-purple-300" />
            <h3 className="text-lg font-semibold mb-1">Room</h3>
            <p className="text-2xl font-bold">{classInfo.room}</p>
          </div>
          <div className="flex flex-col items-center">
            <Clock className="w-8 h-8 mb-3 text-orange-300" />
            <h3 className="text-lg font-semibold mb-1">Time</h3>
            <p className="text-2xl font-bold">{classInfo.time}</p>
          </div>
        </div>
      </motion.div>

      {/* Attendance Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
      >
        <div className="bg-green-500/20 backdrop-blur-lg rounded-xl p-6 text-center">
          <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-300" />
          <div className="text-3xl font-bold mb-2">{presentCount}</div>
          <div className="text-green-200">Present</div>
        </div>
        <div className="bg-yellow-500/20 backdrop-blur-lg rounded-xl p-6 text-center">
          <Clock className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
          <div className="text-3xl font-bold mb-2">{lateCount}</div>
          <div className="text-yellow-200">Late</div>
        </div>
        <div className="bg-red-500/20 backdrop-blur-lg rounded-xl p-6 text-center">
          <XCircle className="w-12 h-12 mx-auto mb-4 text-red-300" />
          <div className="text-3xl font-bold mb-2">{absentCount}</div>
          <div className="text-red-200">Absent</div>
        </div>
        <div className="bg-blue-500/20 backdrop-blur-lg rounded-xl p-6 text-center">
          <TrendingUp className="w-12 h-12 mx-auto mb-4 text-blue-300" />
          <div className="text-3xl font-bold mb-2">{attendancePercentage}%</div>
          <div className="text-blue-200">Attendance Rate</div>
        </div>
      </motion.div>

      {/* Student Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/10 backdrop-blur-lg rounded-2xl p-8"
      >
        <div className="flex items-center gap-4 mb-6">
          <Users className="w-8 h-8 text-blue-300" />
          <h2 className="text-3xl font-bold">Student Attendance</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {attendanceData.map((student, index) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className={`p-4 rounded-xl border-2 transition-all ${
                student.status === 'present' 
                  ? 'bg-green-500/20 border-green-400' 
                  : student.status === 'late'
                  ? 'bg-yellow-500/20 border-yellow-400'
                  : 'bg-red-500/20 border-red-400'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                  student.status === 'present' 
                    ? 'bg-green-500 text-white' 
                    : student.status === 'late'
                    ? 'bg-yellow-500 text-white'
                    : 'bg-red-500 text-white'
                }`}>
                  {student.avatar}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{student.name}</h3>
                  <p className="text-sm opacity-75">{student.rollNo}</p>
                </div>
              </div>
              
              <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${getStatusColor(student.status)}`}>
                {getStatusIcon(student.status)}
                <span className="font-medium capitalize">{student.status}</span>
                {student.time !== '-' && (
                  <span className="ml-auto text-sm">{student.time}</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center mt-8 text-blue-200"
      >
        <p className="text-lg">
          Powered by EduSmart - Smart Curriculum Activity & Attendance System
        </p>
      </motion.div>
    </div>
  );
};

export default ClassroomDisplay;