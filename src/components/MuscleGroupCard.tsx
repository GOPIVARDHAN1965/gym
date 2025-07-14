import { motion } from 'framer-motion';
import { 
  Zap, 
  Target, 
  Activity, 
  Flame, 
  Dumbbell, 
  Shield 
} from 'lucide-react';

interface MuscleGroupCardProps {
  name: string;
  onClick: () => void;
  index: number;
}

const getMuscleIcon = (name: string) => {
  const iconMap: { [key: string]: any } = {
    'Chest': Target,
    'Back': Shield,
    'Legs': Activity,
    'Shoulders': Flame,
    'Arms': Dumbbell,
    'Core': Zap,
  };
  return iconMap[name] || Target;
};

export const MuscleGroupCard = ({ name, onClick, index }: MuscleGroupCardProps) => {
  const IconComponent = getMuscleIcon(name);

  return (
    <motion.div
      className="muscle-card cursor-pointer"
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
          <IconComponent className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-medium text-foreground">{name}</h3>
          <p className="text-sm text-muted-foreground">Tap to start</p>
        </div>
      </div>
    </motion.div>
  );
};