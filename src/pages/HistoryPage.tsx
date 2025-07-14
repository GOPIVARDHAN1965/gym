import { motion } from 'framer-motion';
import { BarChart3, Flame, Calendar } from 'lucide-react';
import { WorkoutHeatmap } from '../components/WorkoutHeatmap';
import { useWorkouts } from '../hooks/useWorkouts';

export const HistoryPage = () => {
  const { logs, streak } = useWorkouts();
  
  // Calculate stats
  const totalWorkouts = Object.values(logs).filter(log => log.type === 'workout').length;
  const totalRestDays = Object.values(logs).filter(log => log.type === 'rest').length;
  const totalDays = Object.keys(logs).length;

  const stats = [
    {
      icon: BarChart3,
      label: 'Total Workouts',
      value: totalWorkouts,
      color: 'text-workout-complete'
    },
    {
      icon: Calendar,
      label: 'Rest Days',
      value: totalRestDays,
      color: 'text-rest-day'
    },
    {
      icon: Flame,
      label: 'Current Streak',
      value: streak,
      color: 'text-primary'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
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
          <h1 className="text-2xl font-bold text-foreground mb-2">Workout History</h1>
          <p className="text-muted-foreground">
            Track your progress over the last 365 days
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-card border border-border rounded-lg p-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Heatmap */}
        <motion.div
          className="bg-card border border-border rounded-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-lg font-semibold text-foreground mb-6">Activity Heatmap</h2>
          
          <div className="overflow-x-auto">
            <WorkoutHeatmap logs={logs} />
          </div>
        </motion.div>

        {/* Recent Activity */}
        {totalDays > 0 && (
          <motion.div
            className="bg-card border border-border rounded-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h2>
            
            <div className="space-y-2">
              {Object.entries(logs)
                .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
                .slice(0, 5)
                .map(([date, log], index) => (
                  <motion.div
                    key={date}
                    className="flex items-center justify-between p-3 rounded-md bg-muted/50"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    <div>
                      <div className="font-medium text-foreground">
                        {new Date(date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {log.type === 'workout' 
                          ? `${log.muscleGroup} - Variation ${log.variation + 1}`
                          : 'Rest Day'
                        }
                      </div>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${
                      log.type === 'workout' ? 'bg-workout-complete' : 'bg-rest-day'
                    }`} />
                  </motion.div>
                ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};