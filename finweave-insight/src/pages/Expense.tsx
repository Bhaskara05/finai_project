import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Utensils, 
  Plane, 
  Receipt, 
  ShoppingBag, 
  Home, 
  Users, 
  Coffee, 
  Car, 
  Heart, 
  MoreHorizontal 
} from 'lucide-react';
import { ExpenseCard3D } from '@/components/3d/ExpenseCard3D';

export default function Expense() {
  const { t } = useTranslation();

  // Expense categories data
  const expenseCategories = [
    { title: t('food'), amount: 25000, icon: Utensils, color: '#ef4444', category: 'food' },
    { title: t('travel'), amount: 18000, icon: Plane, color: '#3b82f6', category: 'travel' },
    { title: t('bills'), amount: 35000, icon: Receipt, color: '#f59e0b', category: 'bills' },
    { title: t('shopping'), amount: 22000, icon: ShoppingBag, color: '#8b5cf6', category: 'shopping' },
    { title: t('homeSpent'), amount: 28000, icon: Home, color: '#10b981', category: 'home-spent' },
    { title: t('familiesSpent'), amount: 20000, icon: Users, color: '#f97316', category: 'families-spent' },
    { title: t('habits'), amount: 15000, icon: Coffee, color: '#84cc16', category: 'habits' },
    { title: t('vehicles'), amount: 32000, icon: Car, color: '#06b6d4', category: 'vehicles' },
    { title: t('donateForSociety'), amount: 8000, icon: Heart, color: '#ec4899', category: 'donate-for-society' },
    { title: t('other'), amount: 12000, icon: MoreHorizontal, color: '#6b7280', category: 'other' },
  ];

  return (
    <div className="min-h-screen bg-animated">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold font-poppins mb-2 bg-gradient-primary bg-clip-text text-transparent">
            {t('expenseCategories')}
          </h1>
          <p className="text-muted-foreground">
            {t('manageYourExpenses')} {/* Optional description */}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {expenseCategories.map((category, index) => (
            <ExpenseCard3D
              key={category.category}
              title={category.title}
              amount={category.amount}
              icon={category.icon}
              color={category.color}
              category={category.category}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
