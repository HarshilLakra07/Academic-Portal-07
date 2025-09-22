import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  BookOpen, 
  Code, 
  Palette, 
  Music, 
  Calculator,
  Globe,
  Lightbulb,
  Clock,
  Star,
  TrendingUp,
  Award
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const ActivitySuggestions = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [completedActivities, setCompletedActivities] = useState([]);
  const [userGoals, setUserGoals] = useState([]);

  useEffect(() => {
    const savedCompleted = localStorage.getItem('completedActivities');
    const savedGoals = localStorage.getItem('userGoals');
    
    if (savedCompleted) {
      setCompletedActivities(JSON.parse(savedCompleted));
    }
    
    if (savedGoals) {
      setUserGoals(JSON.parse(savedGoals));
    } else {
      const sampleGoals = [
        { id: 1, title: 'Master Calculus', category: 'math', progress: 75, target: 100 },
        { id: 2, title: 'Learn Python Programming', category: 'coding', progress: 60, target: 100 },
        { id: 3, title: 'Improve English Writing', category: 'language', progress: 45, target: 100 },
        { id: 4, title: 'Physics Problem Solving', category: 'science', progress: 80, target: 100 }
      ];
      setUserGoals(sampleGoals);
      localStorage.setItem('userGoals', JSON.stringify(sampleGoals));
    }
  }, []);

  const categories = [
    { id: 'all', name: 'All Activities', icon: Target },
    { id: 'academic', name: 'Academic', icon: BookOpen },
    { id: 'coding', name: 'Programming', icon: Code },
    { id: 'creative', name: 'Creative', icon: Palette },
    { id: 'language', name: 'Language', icon: Globe },
    { id: 'math', name: 'Mathematics', icon: Calculator }
  ];

  const activities = [
    {
      id: 1,
      title: 'Solve 10 Calculus Problems',
      description: 'Practice integration and differentiation techniques',
      category: 'math',
      duration: '30 min',
      difficulty: 'Medium',
      points: 50,
      icon: Calculator,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 2,
      title: 'Build a Simple Calculator',
      description: 'Create a calculator app using JavaScript',
      category: 'coding',
      duration: '45 min',
      difficulty: 'Easy',
      points: 75,
      icon: Code,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 3,
      title: 'Write a Short Story',
      description: 'Creative writing exercise to improve language skills',
      category: 'language',
      duration: '25 min',
      difficulty: 'Easy',
      points: 40,
      icon: BookOpen,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 4,
      title: 'Design a Logo',
      description: 'Create a logo using design principles',
      category: 'creative',
      duration: '35 min',
      difficulty: 'Medium',
      points: 60,
      icon: Palette,
      color: 'from-pink-500 to-pink-600'
    },
    {
      id: 5,
      title: 'Physics Lab Simulation',
      description: 'Virtual experiment on wave properties',
      category: 'academic',
      duration: '40 min',
      difficulty: 'Hard',
      points: 80,
      icon: Lightbulb,
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 6,
      title: 'Learn Spanish Vocabulary',
      description: '50 new words with pronunciation practice',
      category: 'language',
      duration: '20 min',
      difficulty: 'Easy',
      points: 35,
      icon: Globe,
      color: 'from-teal-500 to-teal-600'
    }
  ];

  const filteredActivities = selectedCategory === 'all' 
    ? activities 
    : activities.filter(activity => activity.category === selectedCategory);

  const handleCompleteActivity = (activityId) => {
    const activity = activities.find(a => a.id === activityId);
    if (completedActivities.some(c => c.id === activityId)) return;

    const newCompleted = [...completedActivities, {
      ...activity,
      completedAt: new Date().toISOString(),
      pointsEarned: activity.points
    }];
    
    setCompletedActivities(newCompleted);
    localStorage.setItem('completedActivities', JSON.stringify(newCompleted));
    
    toast({
      title: "🎉 Activity Completed!",
      description: `You earned ${activity.points} points for completing "${activity.title}"`
    });
  };

  const handleStartActivity = (activityTitle) => {
    toast({
      title: "🚀 Activity Started!",
      description: `Get ready to work on "${activityTitle}". Good luck!`
    });
  };

  const totalPoints = completedActivities.reduce((sum, activity) => sum + activity.pointsEarned, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Activity Suggestions</h1>
          <p className="text-gray-600 mt-1">
            Personalized activities based on your goals and interests
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-800">
            {totalPoints} Points
          </div>
          <div className="text-gray-600">
            Total Earned
          </div>
        </div>
      </div>

      {/* Goals Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-effect rounded-xl p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <Target className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-800">Your Learning Goals</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {userGoals.map((goal, index) => (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg p-4 border border-gray-200"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-gray-800">{goal.title}</h3>
                <span className="text-sm font-medium text-blue-600">
                  {goal.progress}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-600">
                {goal.progress}/{goal.target} completed
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-effect rounded-xl p-6"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-4">Categories</h2>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.id;
            
            return (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{category.name}</span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Activity Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredActivities.map((activity, index) => {
          const Icon = activity.icon;
          const isCompleted = completedActivities.some(c => c.id === activity.id);
          
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`glass-effect rounded-xl p-6 ${
                isCompleted ? 'opacity-75 border-green-200' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${activity.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium text-gray-600">
                    {activity.points} pts
                  </span>
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {activity.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {activity.description}
              </p>
              
              <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {activity.duration}
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  {activity.difficulty}
                </div>
              </div>
              
              <div className="flex gap-2">
                {isCompleted ? (
                  <Button
                    disabled
                    className="flex-1 bg-green-500 text-white"
                  >
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      Completed
                    </div>
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={() => handleStartActivity(activity.title)}
                      className={`flex-1 bg-gradient-to-r ${activity.color} text-white hover:shadow-lg`}
                    >
                      Start
                    </Button>
                    <Button
                      onClick={() => handleCompleteActivity(activity.id)}
                      variant="outline"
                      className="border-green-300 text-green-600 hover:bg-green-50"
                    >
                      Mark Done
                    </Button>
                  </>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Completions */}
      {completedActivities.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-effect rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-6 h-6 text-green-600" />
            <h2 className="text-xl font-bold text-gray-800">Recent Completions</h2>
          </div>
          <div className="space-y-3">
            {completedActivities.slice(-3).map((activity, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-3 bg-green-50 rounded-lg"
              >
                <div className="p-2 bg-green-100 rounded-lg">
                  <Award className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">{activity.title}</h4>
                  <p className="text-sm text-gray-600">
                    Completed {new Date(activity.completedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-green-600">
                    +{activity.pointsEarned}
                  </span>
                  <p className="text-xs text-gray-500">points</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ActivitySuggestions;