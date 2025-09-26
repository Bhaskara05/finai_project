import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ExpenseCard3DProps {
  title: string;
  amount: number;
  icon: LucideIcon;
  color: string;
  category: string;
  index: number;
}

export function ExpenseCard3D({ 
  title, 
  amount, 
  icon: Icon, 
  color, 
  category, 
  index 
}: ExpenseCard3DProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/category/${category.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ 
        delay: index * 0.1, 
        duration: 0.6,
        type: "spring",
        stiffness: 100,
        damping: 12
      }}
      whileHover={{ 
        y: -8,
        rotateX: 5,
        rotateY: 5,
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className="card-3d cursor-pointer group perspective-1000"
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      <div className="p-6 relative overflow-hidden">
        {/* Background Gradient */}
        <div 
          className="absolute inset-0 opacity-10 rounded-xl"
          style={{
            background: `linear-gradient(135deg, ${color}22, ${color}44)`
          }}
        />
        
        {/* Icon */}
        <div className="flex items-center justify-between mb-4">
          <div 
            className="w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200"
            style={{ backgroundColor: `${color}20` }}
          >
            <Icon 
              className="h-6 w-6 transition-colors duration-200" 
              style={{ color: color }}
            />
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-foreground">
              ₹{amount.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
          {title}
        </h3>

        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-2 mb-4">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min((amount / 50000) * 100, 100)}%` }}
            transition={{ delay: index * 0.1 + 0.5, duration: 1, ease: "easeOut" }}
            className="h-2 rounded-full transition-all duration-300"
            style={{ backgroundColor: color }}
          />
        </div>

        {/* Additional Info */}
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <span>This Month</span>
          <span className="font-medium">
            {((amount / 100000) * 100).toFixed(1)}% of budget
          </span>
        </div>

        {/* Hover Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
      </div>
    </motion.div>
  );
}