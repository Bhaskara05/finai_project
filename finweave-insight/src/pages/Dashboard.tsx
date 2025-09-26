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
import income from '@/images/income.png';
import expense from '@/images/expense.png';
import savings from '@/images/saving.png';

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
    gradient: 'linear-gradient(135deg, #34d399, #059669)',
    image: income,
  },
  {
    title: t('totalExpenses'),
    amount: totalExpenses,
    change: '+2.1%',
    changeType: 'negative' as const,
    gradient: 'linear-gradient(135deg, #f87171, #b91c1c)',
    image: expense,
  },
  {
    title: t('totalSavings'),
    amount: totalSavings,
    change: '+12.8%',
    changeType: 'positive' as const,
    gradient: 'linear-gradient(135deg, #60a5fa, #2563eb)',
    image: savings,
  },
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
      className="card-3d p-6 relative overflow-hidden rounded-xl shadow-lg"
      style={{
        backgroundColor: '#f5f5f5', // light grey background
      }}
    >
      {/* Image at full intensity */}
      {card.image && (
        <img
          src={card.image}
          alt={card.title}
          className="absolute top-1/2 left-1/2 w-4/5 h-4/5 object-contain -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        />
      )}

      {/* Optional subtle overlay to improve text readability */}
      <div className="absolute inset-0 bg-white/20 pointer-events-none"></div>

      {/* Card Content */}
      <div className="relative flex items-center justify-between mb-4">
        <span className={`text-sm font-medium px-2 py-1 rounded-full ${
          card.changeType === 'positive' 
            ? 'bg-success/10 text-success' 
            : 'bg-destructive/10 text-destructive'
        }`}>
          {card.change}
        </span>
      </div>
      <h3 className="relative text-sm font-medium text-foreground mb-1">
        {card.title}
      </h3>
      <p className="relative text-2xl font-bold text-foreground">
        ₹{card.amount.toLocaleString()}
      </p>
    </motion.div>
  ))}
</div>
        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Monthly Overview as Bar Chart */}
<motion.div
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: 0.2 }}
  className="chart-container"
>
  <h3 className="text-lg font-semibold mb-4">{t('monthlyOverview')}</h3>
  <ResponsiveContainer width="100%" height={300}>
  <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
    <YAxis stroke="hsl(var(--muted-foreground))" />

    {/* Tooltip shows only one bar */}
    <Tooltip 
      shared={false} // important: only show the hovered bar
      contentStyle={{
        backgroundColor: 'hsl(var(--card))',
        border: '1px solid hsl(var(--border))',
        borderRadius: '8px'
      }}
      formatter={(value: number, name: string) => [`₹${value.toLocaleString()}`, name]}
    />

    {/* Income Bar */}
    <Bar dataKey="income" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />

    {/* Expenses Bar */}
    <Bar dataKey="expenses" fill="hsl(var(--chart-4))" radius={[4, 4, 0, 0]} />

    {/* Savings Bar */}
    <Bar dataKey="savings" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} />
  </BarChart>
</ResponsiveContainer>

</motion.div>

          {/* Expense Breakdown */}
<motion.div
  initial={{ opacity: 0, x: 20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: 0.3 }}
  className="chart-container flex flex-col lg:flex-row items-center gap-6"
>
  <div className="w-full lg:w-2/3">
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
      </PieChart>
    </ResponsiveContainer>
  </div>

  {/* Side Legend */}
  <div className="w-full lg:w-1/3 flex flex-col space-y-2">
    {expenseBreakdown.map((entry, index) => (
      <div key={index} className="flex items-center gap-3">
        <span
          className="w-4 h-4 rounded-full"
          style={{ backgroundColor: entry.color }}
        ></span>
        <span className="text-sm font-medium text-foreground">
          {entry.name} - ₹{entry.value.toLocaleString()}
        </span>
      </div>
    ))}
  </div>
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

        
      </div>
    </div>
  );
}