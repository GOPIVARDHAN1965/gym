import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, RotateCcw, CheckCircle } from 'lucide-react';

interface ExerciseListProps {
  exercises: string[];
  onAllCompleted: () => void;
  onNewVariation: () => void;
}

export const ExerciseList = ({ exercises, onAllCompleted, onNewVariation }: ExerciseListProps) => {
  const [completedExercises, setCompletedExercises] = useState<boolean[]>(
    new Array(exercises.length).fill(false)
  );

  useEffect(() => {
    setCompletedExercises(new Array(exercises.length).fill(false));
  }, [exercises.length]);

  const toggleExercise = (index: number) => {
    const newCompleted = [...completedExercises];
    newCompleted[index] = !newCompleted[index];
    setCompletedExercises(newCompleted);

    // Check if all exercises are completed
    if (newCompleted.every(completed => completed)) {
      setTimeout(() => onAllCompleted(), 300);
    }
  };

  const allCompleted = completedExercises.every(completed => completed);

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <AnimatePresence mode="wait">
          {exercises.map((exercise, index) => (
            <motion.div
              key={`${exercise}-${index}`}
              className={`exercise-item ${completedExercises[index] ? 'completed' : ''}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.1 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.button
                className="custom-checkbox flex items-center justify-center"
                onClick={() => toggleExercise(index)}
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence>
                  {completedExercises[index] && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Check className="w-3 h-3 text-primary-foreground" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
              
              <span className={`flex-1 ${completedExercises[index] ? 'line-through opacity-70' : ''}`}>
                {exercise}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="flex gap-3 pt-4">
        <motion.button
          onClick={onNewVariation}
          className="flex-1 px-4 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-all"
          whileTap={{ scale: 0.98 }}
        >
          <RotateCcw className="w-4 h-4 mr-2 inline" />
          New Variation
        </motion.button>

        <AnimatePresence>
          {allCompleted && (
            <motion.button
              className="flex-1 glow-button px-4 py-3 font-medium"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileTap={{ scale: 0.98 }}
              onClick={onAllCompleted}
            >
              <CheckCircle className="w-4 h-4 mr-2 inline" />
              Complete Workout
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};