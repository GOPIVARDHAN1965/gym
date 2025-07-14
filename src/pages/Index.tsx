import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Header } from '../components/Header';
import { HomePage } from './HomePage';
import { WorkoutPage } from './WorkoutPage';
import { SchedulesPage } from './SchedulesPage';
import { HistoryPage } from './HistoryPage';
import { useToast } from '../hooks/use-toast';

type AppState = 'home' | 'workout' | 'schedules' | 'history';

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('home');
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string>('');
  const { toast } = useToast();

  const handleStartWorkout = (muscleGroup: string) => {
    setSelectedMuscleGroup(muscleGroup);
    setCurrentState('workout');
  };

  const handleBackToHome = () => {
    setCurrentState('home');
    setSelectedMuscleGroup('');
  };

  const handleWorkoutComplete = () => {
    toast({
      title: "Workout Complete! 🎉",
      description: `Great job completing your ${selectedMuscleGroup} workout!`,
    });
    handleBackToHome();
  };

  const handleTabChange = (tab: 'home' | 'schedules' | 'history') => {
    setCurrentState(tab);
    if (tab !== 'home') {
      setSelectedMuscleGroup('');
    }
  };

  return (
    <div className="min-h-screen bg-background dark">
      <Header 
        currentTab={currentState === 'workout' ? 'home' : currentState}
        onTabChange={handleTabChange}
      />
      
      <AnimatePresence mode="wait">
        {currentState === 'home' && (
          <HomePage 
            key="home"
            onStartWorkout={handleStartWorkout}
          />
        )}
        
        {currentState === 'workout' && selectedMuscleGroup && (
          <WorkoutPage
            key="workout"
            muscleGroup={selectedMuscleGroup}
            onBack={handleBackToHome}
            onComplete={handleWorkoutComplete}
          />
        )}
        
        {currentState === 'schedules' && (
          <SchedulesPage key="schedules" />
        )}
        
        {currentState === 'history' && (
          <HistoryPage key="history" />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
