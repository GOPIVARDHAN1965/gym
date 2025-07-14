import { motion } from 'framer-motion';
import { CheckCircle, Coffee, Flame } from 'lucide-react';
import { MuscleGroupCard } from '../components/MuscleGroupCard';
import { useWorkouts } from '../hooks/useWorkouts';

interface HomePageProps {
  onStartWorkout: (muscleGroup: string) => void;
}

export const HomePage = ({ onStartWorkout }: HomePageProps) => {
  const { 
    getMuscleGroups, 
    getTodayQuote, 
    logRestDay, 
    streak, 
    todayLog, 
    hasTodayLog 
  } = useWorkouts();

  const muscleGroups = getMuscleGroups();
  const quote = getTodayQuote();

  const getTodayStatus = () => {
    if (!todayLog) return null;
    
    if (todayLog.type === 'rest') {
      return (
        <motion.div 
          className="flex items-center gap-2 px-4 py-3 bg-rest-day/10 border border-rest-day/20 rounded-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Coffee className="w-5 h-5 text-rest-day" />
          <span className="text-rest-day font-medium">Rest Day Logged</span>
        </motion.div>
      );
    }

    return (
      <motion.div 
        className="flex items-center gap-2 px-4 py-3 bg-workout-complete/10 border border-workout-complete/20 rounded-lg"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <CheckCircle className="w-5 h-5 text-workout-complete" />
        <span className="text-workout-complete font-medium">
          {todayLog.muscleGroup} Workout Completed
        </span>
      </motion.div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      <motion.div
        className="space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Motivational Quote */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <p className="quote-text text-lg">{quote}</p>
        </motion.div>

        {/* Streak Badge */}
        {streak > 0 && (
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="streak-badge">
              <Flame className="w-4 h-4" />
              <span>{streak}-Day Streak</span>
            </div>
          </motion.div>
        )}

        {/* Today's Status */}
        {hasTodayLog && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {getTodayStatus()}
          </motion.div>
        )}

        {/* Muscle Groups Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Choose Muscle Group
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {muscleGroups.map((group, index) => (
              <MuscleGroupCard
                key={group}
                name={group}
                onClick={() => onStartWorkout(group)}
                index={index}
              />
            ))}
          </div>
        </motion.div>

        {/* Log Rest Day Button */}
        {!hasTodayLog && (
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <motion.button
              onClick={logRestDay}
              className="px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-all"
              whileTap={{ scale: 0.98 }}
            >
              <Coffee className="w-4 h-4 mr-2 inline" />
              Log Rest Day
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};