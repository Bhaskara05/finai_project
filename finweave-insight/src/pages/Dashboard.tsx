import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Utensils, Plane, Receipt, ShoppingBag, Home, Users, Coffee, Car, Heart, MoreHorizontal,
  TrendingUp, TrendingDown, PiggyBank
} from 'lucide-react';
import { FloatingModel } from '@/components/3d/FloatingModel';
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import incomeImg from '@/images/income.png';
import expensesImg from '@/images/expense.png';
import savingsImg from '@/images/saving.png';

export default function Dashboard() {
  const { t } = useTranslation();

  const expenseCategories = [
    { title: t('food'), amount: 18000, icon: Utensils, color: '#ef4444' },
    { title: t('travel'), amount: 35000, icon: Plane, color: '#3b82f6' },
    { title: t('bills'), amount: 22000, icon: Receipt, color: '#f59e0b' },
    { title: t('shopping'), amount: 28000, icon: ShoppingBag, color: '#8b5cf6' },
    { title: t('homeSpent'), amount: 20000, icon: Home, color: '#10b981' },
    { title: t('familiesSpent'), amount: 15000, icon: Users, color: '#f97316' },
    { title: t('habits'), amount: 32000, icon: Coffee, color: '#84cc16' },
    { title: t('vehicles'), amount: 8000, icon: Car, color: '#06b6d4' },
    { title: t('donateForSociety'), amount: 12000, icon: Heart, color: '#ec4899' },
    { title: t('other'), amount: 15000, icon: MoreHorizontal, color: '#6b7280' },
  ];

  const totalExpenses = expenseCategories.reduce((sum, cat) => sum + cat.amount, 0);

  const monthlyData = [
    { month: 'Jan', income: 80000, expenses: 65000, savings: 15000 },
    { month: 'Feb', income: 82000, expenses: 68000, savings: 14000 },
    { month: 'Mar', income: 85000, expenses: 70000, savings: 15000 },
    { month: 'Apr', income: 83000, expenses: 72000, savings: 11000 },
    { month: 'May', income: 87000, expenses: 75000, savings: 12000 },
    { month: 'Jun', income: 90000, expenses: 78000, savings: 12000 },
  ];

  const totalIncome = 90000;
  const totalSavings = totalIncome - totalExpenses;

  const summaryCards = [
    { title: t('totalIncome'), amount: totalIncome, change: '+5.2%', changeType: 'positive' as const, icon: TrendingUp, image: incomeImg },
    { title: t('totalExpenses'), amount: totalExpenses, change: '+2.1%', changeType: 'negative' as const, icon: TrendingDown, image: expensesImg },
    { title: t('totalSavings'), amount: totalSavings, change: '+12.8%', changeType: 'positive' as const, icon: PiggyBank, image: savingsImg },
  ];

  return (
    <div className="min-h-screen bg-animated">
      <div className="container mx-auto px-4 py-8">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl font-bold font-poppins mb-2 bg-gradient-primary bg-clip-text text-transparent">
            {t('dashboard')}
          </h1>
          <p className="text-muted-foreground">
            Welcome back! Here's your financial overview for this month.
          </p>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {summaryCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card-3d p-6 relative overflow-hidden rounded-xl shadow-lg"
              style={{ backgroundColor: '#f5f5f5' }}
            >
              {card.image && (
                <img
                  src={card.image}
                  alt={card.title}
                  className="absolute top-1/2 left-1/2 w-4/5 h-4/5 object-contain -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                />
              )}
              <div className="absolute inset-0 bg-white/20 pointer-events-none"></div>
              <div className="relative flex items-center justify-between mb-4">
                <span
                  className={`text-sm font-medium px-2 py-1 rounded-full ${
                    card.changeType === 'positive' ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
                  }`}
                >
                  {card.change}
                </span>
              </div>
              <h3 className="relative text-sm font-medium text-foreground mb-1">{card.title}</h3>
              <p className="relative text-2xl font-bold text-foreground">₹{card.amount.toLocaleString()}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* Monthly Overview - Bar Chart */}
<motion.div
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: 0.2 }}
  className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center"
>
  <h3 className="text-lg font-semibold mb-4">{t('monthlyOverview')}</h3>
  <div className="w-4/5">
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={monthlyData} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
        <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
        <YAxis stroke="hsl(var(--muted-foreground))" />
        <Tooltip
          shared={false}
          contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px',
          }}
          formatter={(value: number, name: string) => [`₹${value.toLocaleString()}`, name]}
        />
        <Bar dataKey="income" name="Income" fill="#60A5FA" radius={[6, 6, 0, 0]} />
        <Bar dataKey="expenses" name="Expenses" fill="#F87171" radius={[6, 6, 0, 0]} />
        <Bar dataKey="savings" name="Savings" fill="#34D399" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
</motion.div>

{/* Expense Breakdown - Pie + List */}
<motion.div
  initial={{ opacity: 0, x: 20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: 0.3 }}
  className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center"
>
  <h3 className="text-lg font-semibold mb-6">Expense Breakdown</h3>
  <div className="flex flex-col lg:flex-row gap-8 items-center">
    
    {/* Donut Chart */}
    <div className="w-4/5 max-w-[260px] relative">
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={expenseCategories}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="amount"
            nameKey="title"
            labelLine={false}
            isAnimationActive={true}
            animationDuration={700}
          >
            {expenseCategories.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number, name: string) => [`₹${value.toLocaleString()}`, name]}
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <p className="text-xs text-muted-foreground">Total</p>
        <p className="text-lg font-bold text-foreground">₹{totalExpenses.toLocaleString()}</p>
      </div>
    </div>

    {/* Expense List */}
    <div className="flex-1 flex flex-col gap-3 w-full">
      {expenseCategories.map((entry, index) => {
        const percentage = ((entry.amount / totalExpenses) * 100).toFixed(1);
        const Icon = entry.icon;
        return (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-sm transition-all"
          >
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
              <Icon className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">{entry.title}</span>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-foreground">
                ₹{entry.amount.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">{percentage}%</p>
            </div>
          </div>
        );
      })}
    </div>
  </div>
</motion.div>
        </div>

        {/* 3D Model Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-8">
          <h3 className="text-2xl font-semibold mb-4 font-poppins">{t('interactiveModel')}</h3>
          <div className="chart-container">
            <FloatingModel />
          </div>
        </motion.div>
      </div>
    </div>
  );
};
