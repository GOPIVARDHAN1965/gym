import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Download, RotateCcw } from 'lucide-react';
import { dateUtils, storage } from '../utils/storage';

interface HeaderProps {
  currentTab: 'home' | 'schedules' | 'history';
  onTabChange: (tab: 'home' | 'schedules' | 'history') => void;
}

export const Header = ({ currentTab, onTabChange }: HeaderProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const handleExport = () => {
    const data = storage.exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gym-tracker-${dateUtils.getDateString(new Date())}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <motion.header 
      className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <motion.h1 
              className="text-xl font-semibold text-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              Gym Tracker
            </motion.h1>
            <motion.div 
              className="text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {dateUtils.formatDate(currentTime)} · {dateUtils.formatTime(currentTime)}
            </motion.div>
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              onClick={() => onTabChange('home')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                currentTab === 'home' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              Home
            </motion.button>
            
            <motion.button
              onClick={() => onTabChange('schedules')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                currentTab === 'schedules' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <Calendar className="w-4 h-4 mr-1 inline" />
              Schedule
            </motion.button>

            <motion.button
              onClick={() => onTabChange('history')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                currentTab === 'history' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <RotateCcw className="w-4 h-4 mr-1 inline" />
              History
            </motion.button>

            <motion.button
              onClick={handleExport}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
              whileTap={{ scale: 0.95 }}
              title="Export Data"
            >
              <Download className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};