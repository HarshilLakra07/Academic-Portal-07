import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  QrCode, 
  Wifi, 
  Camera, 
  Users, 
  CheckCircle, 
  XCircle,
  Clock,
  MapPin,
  Smartphone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const AttendanceTracker = () => {
  const [attendanceMethod, setAttendanceMethod] = useState('qr');
  const [isScanning, setIsScanning] = useState(false);
  const [attendanceData, setAttendanceData] = useState([]);
  const [currentClass, setCurrentClass] = useState({
    subject: 'Physics',
    room: 'Lab 2',
    time: '10:30 - 11:30',
    teacher: 'Dr. Smith'
  });

  useEffect(() => {
    const savedData = localStorage.getItem('attendanceRecords');
    if (savedData) {
      setAttendanceData(JSON.parse(savedData));
    } else {
      const sampleData = [
        { id: 1, name: 'John Doe', rollNo: '2021001', status: 'present', time: '10:32', method: 'qr' },
        { id: 2, name: 'Jane Smith', rollNo: '2021002', status: 'present', time: '10:33', method: 'qr' },
        { id: 3, name: 'Mike Johnson', rollNo: '2021003', status: 'absent', time: '-', method: '-' },
        { id: 4, name: 'Sarah Wilson', rollNo: '2021004', status: 'present', time: '10:35', method: 'proximity' },
        { id: 5, name: 'David Brown', rollNo: '2021005', status: 'present', time: '10:31', method: 'face' },
      ];
      setAttendanceData(sampleData);
      localStorage.setItem('attendanceRecords', JSON.stringify(sampleData));
    }
  }, []);

  const attendanceMethods = [
    {
      id: 'qr',
      name: 'QR Code',
      icon: QrCode,
      description: 'Scan QR code to mark attendance',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'proximity',
      name: 'Proximity',
      icon: Wifi,
      description: 'Bluetooth/Wi-Fi based detection',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'face',
      name: 'Face Recognition',
      icon: Camera,
      description: 'AI-powered face detection',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const handleStartScanning = () => {
    setIsScanning(true);
    toast({
      title: "Scanning for Students...",
      description: `Using ${attendanceMethod} method.`
    });
    
    setTimeout(() => {
      setIsScanning(false);
      const newStudent = {
        id: Date.now(),
        name: 'New Student',
        rollNo: `20210${Math.floor(Math.random() * 90) + 10}`,
        status: 'present',
        time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
        method: attendanceMethod
      };
      const updatedData = [...attendanceData, newStudent];
      setAttendanceData(updatedData);
      localStorage.setItem('attendanceRecords', JSON.stringify(updatedData));
      toast({
        title: "✅ Student Found!",
        description: `${newStudent.name} has been marked present.`
      });
    }, 2500);
  };

  const handleMarkAttendance = (studentId, status) => {
    const updatedData = attendanceData.map(student => 
      student.id === studentId 
        ? { 
            ...student, 
            status, 
            time: status === 'present' ? new Date().toLocaleTimeString('en-US', { 
              hour12: false, 
              hour: '2-digit', 
              minute: '2-digit' 
            }) : '-',
            method: status === 'present' ? attendanceMethod : '-'
          }
        : student
    );
    
    setAttendanceData(updatedData);
    localStorage.setItem('attendanceRecords', JSON.stringify(updatedData));
    
    const student = attendanceData.find(s => s.id === studentId);
    toast({
      title: `Attendance ${status === 'present' ? 'Marked' : 'Updated'}`,
      description: `${student.name} marked as ${status}`
    });
  };

  const presentCount = attendanceData.filter(s => s.status === 'present').length;
  const totalCount = attendanceData.length;
  const attendancePercentage = totalCount > 0 ? ((presentCount / totalCount) * 100).toFixed(1) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Attendance Tracker</h1>
          <p className="text-gray-600 mt-1">
            Automated attendance marking and management
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-800">
            {presentCount}/{totalCount}
          </div>
          <div className="text-gray-600">
            {attendancePercentage}% Present
          </div>
        </div>
      </div>

      {/* Current Class Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-effect rounded-xl p-6"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">{currentClass.subject}</h2>
            <p className="text-gray-600">Current Class Session</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-gray-500" />
            <span className="text-gray-700">{currentClass.time}</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-gray-500" />
            <span className="text-gray-700">{currentClass.room}</span>
          </div>
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-gray-500" />
            <span className="text-gray-700">{currentClass.teacher}</span>
          </div>
        </div>
      </motion.div>

      {/* Attendance Methods */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-effect rounded-xl p-6"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-6">Attendance Methods</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {attendanceMethods.map((method) => {
            const Icon = method.icon;
            const isSelected = attendanceMethod === method.id;
            
            return (
              <motion.button
                key={method.id}
                onClick={() => setAttendanceMethod(method.id)}
                className={`p-6 rounded-xl border-2 transition-all ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`p-3 rounded-lg bg-gradient-to-r ${method.color} w-fit mx-auto mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{method.name}</h3>
                <p className="text-sm text-gray-600">{method.description}</p>
              </motion.button>
            );
          })}
        </div>
        
        <div className="flex justify-center">
          <Button
            onClick={handleStartScanning}
            disabled={isScanning}
            className={`px-8 py-3 bg-gradient-to-r ${
              attendanceMethods.find(m => m.id === attendanceMethod)?.color
            } text-white font-semibold rounded-lg hover:shadow-lg transition-all`}
          >
            {isScanning ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Scanning...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5" />
                Start {attendanceMethods.find(m => m.id === attendanceMethod)?.name} Scan
              </div>
            )}
          </Button>
        </div>
      </motion.div>

      {/* Student List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-effect rounded-xl p-6"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-6">Student Attendance</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Student</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Roll No</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">Time</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">Method</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((student, index) => (
                <motion.tr
                  key={student.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-medium text-gray-800">{student.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-600">{student.rollNo}</td>
                  <td className="py-4 px-4 text-center">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                      student.status === 'present'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {student.status === 'present' ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <XCircle className="w-4 h-4" />
                      )}
                      {student.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center text-gray-600">{student.time}</td>
                  <td className="py-4 px-4 text-center">
                    {student.method !== '-' && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                        {student.method === 'qr' && <QrCode className="w-3 h-3" />}
                        {student.method === 'proximity' && <Wifi className="w-3 h-3" />}
                        {student.method === 'face' && <Camera className="w-3 h-3" />}
                        {student.method}
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex gap-2 justify-center">
                      <Button
                        size="sm"
                        onClick={() => handleMarkAttendance(student.id, 'present')}
                        className="bg-green-500 hover:bg-green-600 text-white"
                      >
                        Present
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleMarkAttendance(student.id, 'absent')}
                        className="border-red-300 text-red-600 hover:bg-red-50"
                      >
                        Absent
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default AttendanceTracker;