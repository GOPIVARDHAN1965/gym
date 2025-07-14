import { motion } from 'framer-motion';
import { useState } from 'react';
import { dateUtils, WorkoutLogs } from '../utils/storage';

interface WorkoutHeatmapProps {
  logs: WorkoutLogs;
}

interface TooltipData {
  date: string;
  log: any;
  x: number;
  y: number;
}

export const WorkoutHeatmap = ({ logs }: WorkoutHeatmapProps) => {
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const dates = dateUtils.getHeatmapDates();

  const getDotClass = (date: string) => {
    const log = logs[date];
    if (!log) return 'heatmap-dot empty';
    return log.type === 'workout' ? 'heatmap-dot workout' : 'heatmap-dot rest';
  };

  const getTooltipText = (date: string) => {
    const log = logs[date];
    if (!log) return 'No activity';
    
    if (log.type === 'rest') return 'Rest Day';
    return `${log.muscleGroup} - Variation ${log.variation + 1}`;
  };

  const handleMouseEnter = (date: string, event: React.MouseEvent) => {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    setTooltip({
      date,
      log: logs[date],
      x: rect.left + rect.width / 2,
      y: rect.top - 10
    });
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  // Group dates by week for proper grid layout
  const weeks: string[][] = [];
  for (let i = 0; i < dates.length; i += 7) {
    weeks.push(dates.slice(i, i + 7));
  }

  return (
    <div className="relative">
      <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${weeks.length}, 12px)` }}>
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1">
            {week.map((date, dayIndex) => (
              <motion.div
                key={date}
                className={getDotClass(date)}
                onMouseEnter={(e) => handleMouseEnter(date, e)}
                onMouseLeave={handleMouseLeave}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: (weekIndex * 7 + dayIndex) * 0.01,
                  duration: 0.2 
                }}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Tooltip */}
      {tooltip && (
        <motion.div
          className="fixed z-50 px-2 py-1 bg-card border border-border rounded-md shadow-lg text-xs"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: 'translateX(-50%) translateY(-100%)'
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
        >
          <div className="font-medium">
            {new Date(tooltip.date).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric' 
            })}
          </div>
          <div className="text-muted-foreground">
            {getTooltipText(tooltip.date)}
          </div>
        </motion.div>
      )}

      {/* Legend */}
      <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="heatmap-dot empty" />
          <span>No activity</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="heatmap-dot workout" />
          <span>Workout</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="heatmap-dot rest" />
          <span>Rest day</span>
        </div>
      </div>
    </div>
  );
};