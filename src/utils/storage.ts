// Local storage utilities for gym tracker
export interface WorkoutLog {
  date: string;
  muscleGroup: string;
  variation: number;
  type: 'workout' | 'rest';
}

export interface WorkoutLogs {
  [date: string]: WorkoutLog;
}

const STORAGE_KEY = 'gym-tracker-logs';

export const storage = {
  // Get all workout logs
  getLogs(): WorkoutLogs {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error('Error reading workout logs:', error);
      return {};
    }
  },

  // Save a workout log
  saveLog(log: WorkoutLog): void {
    try {
      const logs = this.getLogs();
      logs[log.date] = log;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
    } catch (error) {
      console.error('Error saving workout log:', error);
    }
  },

  // Get today's log
  getTodayLog(): WorkoutLog | null {
    const today = new Date().toISOString().split('T')[0];
    const logs = this.getLogs();
    return logs[today] || null;
  },

  // Check if today has any log
  hasTodayLog(): boolean {
    return this.getTodayLog() !== null;
  },

  // Get workout streak
  getStreak(): number {
    const logs = this.getLogs();
    const today = new Date();
    let streak = 0;
    
    for (let i = 0; i < 365; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      if (logs[dateStr]) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  },

  // Export all data as JSON
  exportData(): string {
    return JSON.stringify(this.getLogs(), null, 2);
  },

  // Import data from JSON
  importData(jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  },

  // Clear all data
  clearAll(): void {
    localStorage.removeItem(STORAGE_KEY);
  }
};

// Date utilities
export const dateUtils = {
  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  },

  formatTime(date: Date): string {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  },

  getDateString(date: Date): string {
    return date.toISOString().split('T')[0];
  },

  getDaysAgo(days: number): string {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return this.getDateString(date);
  },

  // Get array of dates for heatmap (365 days)
  getHeatmapDates(): string[] {
    const dates: string[] = [];
    const today = new Date();
    
    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      dates.push(this.getDateString(date));
    }
    
    return dates;
  }
};