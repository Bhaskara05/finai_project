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
  MoreHorizontal,
  TrendingUp,
  TrendingDown,
  DollarSign,
  PiggyBank
} from 'lucide-react';
import { ExpenseCard3D } from '@/components/3d/ExpenseCard3D';
import { FloatingModel } from '@/components/3d/FloatingModel';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell,
  BarChart,
  Bar
} from 'recharts';

export default function Dashboard() {
  const { t } = useTranslation();

  // Sample data
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

  const monthlyData = [
    { month: 'Jan', income: 80000, expenses: 65000, savings: 15000 },
    { month: 'Feb', income: 82000, expenses: 68000, savings: 14000 },
    { month: 'Mar', income: 85000, expenses: 70000, savings: 15000 },
    { month: 'Apr', income: 83000, expenses: 72000, savings: 11000 },
    { month: 'May', income: 87000, expenses: 75000, savings: 12000 },
    { month: 'Jun', income: 90000, expenses: 78000, savings: 12000 },
  ];

  const expenseBreakdown = expenseCategories.slice(0, 6).map(cat => ({
    name: cat.title,
    value: cat.amount,
    color: cat.color
  }));

  const totalIncome = 90000;
  const totalExpenses = expenseCategories.reduce((sum, cat) => sum + cat.amount, 0);
  const totalSavings = totalIncome - totalExpenses;

  const summaryCards = [
    {
      title: t('totalIncome'),
      amount: totalIncome,
      change: '+5.2%',
      changeType: 'positive' as const,
      icon: TrendingUp,
      gradient: 'gradient-income'
    },
    {
      title: t('totalExpenses'),
      amount: totalExpenses,
      change: '+2.1%',
      changeType: 'negative' as const,
      icon: TrendingDown,
      gradient: 'gradient-expense'
    },
    {
      title: t('totalSavings'),
      amount: totalSavings,
      change: '+12.8%',
      changeType: 'positive' as const,
      icon: PiggyBank,
      gradient: 'gradient-savings'
    }
  ];

  return (
    <div className="min-h-screen bg-animated">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
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
              className="card-3d p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-${card.gradient} flex items-center justify-center`}>
                  <card.icon className="h-6 w-6 text-white" />
                </div>
                <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                  card.changeType === 'positive' 
                    ? 'bg-success/10 text-success' 
                    : 'bg-destructive/10 text-destructive'
                }`}>
                  {card.change}
                </span>
              </div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">
                {card.title}
              </h3>
              <p className="text-2xl font-bold text-foreground">
                ₹{card.amount.toLocaleString()}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Monthly Overview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="chart-container"
          >
            <h3 className="text-lg font-semibold mb-4">{t('monthlyOverview')}</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="income" 
                  stroke="hsl(var(--chart-1))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--chart-1))', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="expenses" 
                  stroke="hsl(var(--chart-4))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--chart-4))', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="savings" 
                  stroke="hsl(var(--chart-3))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--chart-3))', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Expense Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="chart-container"
          >
            <h3 className="text-lg font-semibold mb-4">Expense Breakdown</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={expenseBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {expenseBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Amount']}
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* 3D Model Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h3 className="text-2xl font-semibold mb-4 font-poppins">Interactive 3D Financial Model</h3>
          <div className="chart-container">
            <FloatingModel />
          </div>
        </motion.div>

        {/* Expense Categories 3D Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <h3 className="text-2xl font-semibold mb-6 font-poppins">{t('expenseCategories')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
          </div>
        </motion.div>
      </div>
    </div>
  );
}