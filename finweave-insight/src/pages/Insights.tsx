import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { TrendingUp, TrendingDown, Target, AlertTriangle, CheckCircle } from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  AreaChart,
  Area,
  BarChart,
  Bar,
  RadialBarChart,
  RadialBar,
  Legend
} from 'recharts';

export default function Insights() {
  const { t } = useTranslation();

  const savingsData = [
    { month: 'Jan', actual: 15000, potential: 22000 },
    { month: 'Feb', actual: 14000, potential: 21000 },
    { month: 'Mar', actual: 15000, potential: 23000 },
    { month: 'Apr', actual: 11000, potential: 20000 },
    { month: 'May', actual: 12000, potential: 24000 },
    { month: 'Jun', actual: 12000, potential: 25000 },
  ];

  const predictiveData = [
    { month: 'Jul', predicted: 13500, confidence: 85 },
    { month: 'Aug', predicted: 15200, confidence: 80 },
    { month: 'Sep', predicted: 16800, confidence: 75 },
    { month: 'Oct', predicted: 18500, confidence: 70 },
    { month: 'Nov', predicted: 20200, confidence: 65 },
    { month: 'Dec', predicted: 22000, confidence: 60 },
  ];

  const spendingPatterns = [
    { category: 'Food', current: 25000, optimized: 20000, savings: 5000 },
    { category: 'Transport', current: 18000, optimized: 15000, savings: 3000 },
    { category: 'Entertainment', current: 15000, optimized: 10000, savings: 5000 },
    { category: 'Shopping', current: 22000, optimized: 18000, savings: 4000 },
    { category: 'Bills', current: 35000, optimized: 33000, savings: 2000 },
  ];

  const insights = [
    {
      type: 'warning',
      title: 'High Food Expenses',
      description: 'Your food expenses are 25% higher than similar users. Consider meal planning.',
      impact: '₹5,000 potential monthly savings',
      icon: AlertTriangle,
      color: 'text-warning'
    },
    {
      type: 'success',
      title: 'Great Savings Rate',
      description: 'You are saving 15% of your income, which is above average.',
      impact: 'On track for financial goals',
      icon: CheckCircle,
      color: 'text-success'
    },
    {
      type: 'info',
      title: 'Investment Opportunity',
      description: 'Consider investing your excess savings for better returns.',
      impact: '₹2,000 additional monthly income potential',
      icon: TrendingUp,
      color: 'text-primary'
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
            {t('insights')}
          </h1>
          <p className="text-muted-foreground">
            AI-powered insights to optimize your financial health and maximize savings potential.
          </p>
        </motion.div>

        {/* Key Insights Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {insights.map((insight, index) => (
            <motion.div
              key={insight.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card-3d p-6"
            >
              <div className="flex items-start space-x-4">
                <div className={`w-10 h-10 rounded-lg bg-${insight.type === 'warning' ? 'warning' : insight.type === 'success' ? 'success' : 'primary'}/10 flex items-center justify-center`}>
                  <insight.icon className={`h-5 w-5 ${insight.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-2">{insight.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>
                  <p className="text-sm font-medium text-primary">{insight.impact}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Actual vs Potential Savings */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="chart-container"
          >
            <h3 className="text-lg font-semibold mb-4">{t('actualVsPotentialSavings')}</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={savingsData}>
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
                <Area 
                  type="monotone" 
                  dataKey="potential" 
                  stackId="1"
                  stroke="hsl(var(--chart-2))" 
                  fill="hsl(var(--chart-2))"
                  fillOpacity={0.3}
                />
                <Area 
                  type="monotone" 
                  dataKey="actual" 
                  stackId="2"
                  stroke="hsl(var(--chart-1))" 
                  fill="hsl(var(--chart-1))"
                  fillOpacity={0.8}
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Predictive Trends */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="chart-container"
          >
            <h3 className="text-lg font-semibold mb-4">{t('predictiveTrends')}</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={predictiveData}>
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
                  dataKey="predicted" 
                  stroke="hsl(var(--chart-3))" 
                  strokeWidth={3}
                  strokeDasharray="5 5"
                  dot={{ fill: 'hsl(var(--chart-3))', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Spending Optimization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="chart-container mb-8"
        >
          <h3 className="text-lg font-semibold mb-4">Spending Optimization Opportunities</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={spendingPatterns} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="category" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="current" fill="hsl(var(--chart-4))" name="Current Spending" radius={[0, 0, 0, 0]} />
              <Bar dataKey="optimized" fill="hsl(var(--chart-1))" name="Optimized Spending" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Savings Potential Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <div className="card-3d p-6">
            <div className="flex items-center justify-between mb-4">
              <Target className="h-8 w-8 text-primary" />
              <span className="text-sm font-medium text-success bg-success/10 px-2 py-1 rounded-full">
                Achievable
              </span>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Monthly Savings Goal</h3>
            <p className="text-3xl font-bold text-primary mb-2">₹25,000</p>
            <p className="text-sm text-muted-foreground">
              Based on your income and optimized spending patterns
            </p>
          </div>

          <div className="card-3d p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="h-8 w-8 text-success" />
              <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                +67%
              </span>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Improvement Potential</h3>
            <p className="text-3xl font-bold text-success mb-2">₹19,000</p>
            <p className="text-sm text-muted-foreground">
              Additional monthly savings with optimization
            </p>
          </div>

          <div className="card-3d p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingDown className="h-8 w-8 text-warning" />
              <span className="text-sm font-medium text-warning bg-warning/10 px-2 py-1 rounded-full">
                High Impact
              </span>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Biggest Opportunity</h3>
            <p className="text-3xl font-bold text-warning mb-2">Food</p>
            <p className="text-sm text-muted-foreground">
              Category with highest savings potential
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}