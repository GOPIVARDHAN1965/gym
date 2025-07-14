import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, RotateCcw } from 'lucide-react';
import { useWorkouts } from '../hooks/useWorkouts';

export const SchedulesPage = () => {
  const { getSchedules } = useWorkouts();
  const schedules = getSchedules();
  const [currentScheduleIndex, setCurrentScheduleIndex] = useState(0);

  const currentSchedule = schedules[currentScheduleIndex] || [];

  const nextSchedule = () => {
    setCurrentScheduleIndex((prev) => (prev + 1) % schedules.length);
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      <motion.div
        className="space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <Calendar className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Weekly Schedule</h1>
          </div>
          <p className="text-muted-foreground">
            Your structured workout plan
          </p>
        </motion.div>

        {/* Current Schedule */}
        <motion.div
          className="bg-card border border-border rounded-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">
              Schedule {currentScheduleIndex + 1} of {schedules.length}
            </h2>
            
            {schedules.length > 1 && (
              <motion.button
                onClick={nextSchedule}
                className="px-3 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all"
                whileTap={{ scale: 0.95 }}
              >
                <RotateCcw className="w-4 h-4 mr-2 inline" />
                Next Schedule
              </motion.button>
            )}
          </div>

          <div className="space-y-3">
            {currentSchedule.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3 p-3 rounded-md bg-muted/50 border border-border/50"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <span className="text-sm font-medium text-primary">
                    {index + 1}
                  </span>
                </div>
                <span className="text-foreground">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Schedule Info */}
        <motion.div
          className="text-center text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p>
            Follow this schedule for consistent progress. Remember to listen to your body
            and adjust as needed.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};