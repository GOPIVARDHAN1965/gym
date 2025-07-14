import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Target } from 'lucide-react';
import { ExerciseList } from '../components/ExerciseList';
import { useWorkouts } from '../hooks/useWorkouts';

interface WorkoutPageProps {
  muscleGroup: string;
  onBack: () => void;
  onComplete: () => void;
}

export const WorkoutPage = ({ muscleGroup, onBack, onComplete }: WorkoutPageProps) => {
  const { workouts, getRandomVariation, logWorkout } = useWorkouts();
  const [currentVariation, setCurrentVariation] = useState(0);
  const [usedVariations, setUsedVariations] = useState<number[]>([]);

  useEffect(() => {
    const variation = getRandomVariation(muscleGroup);
    setCurrentVariation(variation);
    setUsedVariations([variation]);
  }, [muscleGroup]);

  const exercises = workouts[muscleGroup]?.[currentVariation] || [];

  const handleNewVariation = () => {
    const newVariation = getRandomVariation(muscleGroup, currentVariation);
    setCurrentVariation(newVariation);
    setUsedVariations([...usedVariations, newVariation]);
  };

  const handleComplete = () => {
    logWorkout(muscleGroup, currentVariation);
    onComplete();
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <motion.button
            onClick={onBack}
            className="p-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all"
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
          
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground">{muscleGroup} Workout</h1>
            <p className="text-muted-foreground">
              Variation {currentVariation + 1} of {workouts[muscleGroup]?.length || 1}
            </p>
          </div>

          <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
            <Target className="w-6 h-6 text-primary" />
          </div>
        </div>

        {/* Exercise List */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentVariation}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-card border border-border rounded-lg p-6"
          >
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Today's Exercises
            </h2>
            
            <ExerciseList
              exercises={exercises}
              onAllCompleted={handleComplete}
              onNewVariation={handleNewVariation}
            />
          </motion.div>
        </AnimatePresence>

        {/* Variation Counter */}
        <motion.div
          className="flex justify-center mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="text-sm text-muted-foreground">
            Variations tried: {usedVariations.length}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};