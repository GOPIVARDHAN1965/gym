import { useState, useEffect } from 'react';
import { WorkoutData, sampleWorkouts, motivationalQuotes } from '../data/workouts';
import { storage, WorkoutLog } from '../utils/storage';

export const useWorkouts = () => {
  const [workouts, setWorkouts] = useState<WorkoutData>(sampleWorkouts);
  const [logs, setLogs] = useState(storage.getLogs());

  const getRandomVariation = (muscleGroup: string, excludeVariation?: number): number => {
    const variations = workouts[muscleGroup] || [];
    if (variations.length === 0) return 0;
    
    let availableIndices = Array.from({ length: variations.length }, (_, i) => i);
    
    if (excludeVariation !== undefined && availableIndices.length > 1) {
      availableIndices = availableIndices.filter(i => i !== excludeVariation);
    }
    
    return availableIndices[Math.floor(Math.random() * availableIndices.length)];
  };

  const logWorkout = (muscleGroup: string, variation: number) => {
    const today = new Date().toISOString().split('T')[0];
    const log: WorkoutLog = {
      date: today,
      muscleGroup,
      variation,
      type: 'workout'
    };
    
    storage.saveLog(log);
    setLogs(storage.getLogs());
  };

  const logRestDay = () => {
    const today = new Date().toISOString().split('T')[0];
    const log: WorkoutLog = {
      date: today,
      muscleGroup: '',
      variation: 0,
      type: 'rest'
    };
    
    storage.saveLog(log);
    setLogs(storage.getLogs());
  };

  const getTodayQuote = (): string => {
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
    return motivationalQuotes[dayOfYear % motivationalQuotes.length];
  };

  const getMuscleGroups = (): string[] => {
    return Object.keys(workouts).filter(key => key !== 'Schedules');
  };

  const getSchedules = (): string[][] => {
    return workouts.Schedules || [];
  };

  return {
    workouts,
    logs,
    setWorkouts,
    getRandomVariation,
    logWorkout,
    logRestDay,
    getTodayQuote,
    getMuscleGroups,
    getSchedules,
    streak: storage.getStreak(),
    todayLog: storage.getTodayLog(),
    hasTodayLog: storage.hasTodayLog()
  };
};