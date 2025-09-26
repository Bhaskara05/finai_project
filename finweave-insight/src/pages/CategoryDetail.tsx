import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  BarChart,
  Bar
} from 'recharts';

export default function CategoryDetail() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Sample data for the category
  const monthlyData = [
    { month: 'Jan', amount: 22000, transactions: 45 },
    { month: 'Feb', amount: 25000, transactions: 52 },
    { month: 'Mar', amount: 23000, transactions: 48 },
    { month: 'Apr', amount: 28000, transactions: 55 },
    { month: 'May', amount: 26000, transactions: 50 },
    { month: 'Jun', amount: 30000, transactions: 58 },
  ];

  const weeklyData = [
    { week: 'Week 1', amount: 7500 },
    { week: 'Week 2', amount: 8200 },
    { week: 'Week 3', amount: 6800 },
    { week: 'Week 4', amount: 7500 },
  ];

  const recentTransactions = [
    { id: 1, description: 'Grocery Store', amount: 2500, date: '2024-01-15', type: 'expense' },
    { id: 2, description: 'Restaurant Dinner', amount: 1800, date: '2024-01-14', type: 'expense' },
    { id: 3, description: 'Coffee Shop', amount: 450, date: '2024-01-14', type: 'expense' },
    { id: 4, description: 'Supermarket', amount: 3200, date: '2024-01-13', type: 'expense' },
    { id: 5, description: 'Food Delivery', amount: 680, date: '2024-01-12', type: 'expense' },
  ];

  const categoryTitle = categoryId?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Category';
  const currentMonthTotal = 30000;
  const previousMonthTotal = 26000;
  const changePercent = ((currentMonthTotal - previousMonthTotal) / previousMonthTotal * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-animated">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4 hover:bg-primary/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold font-poppins mb-2 bg-gradient-primary bg-clip-text text-transparent">
                {categoryTitle} Expenses
              </h1>
              <p className="text-muted-foreground">
                Detailed analysis and transaction history for {categoryTitle.toLowerCase()}
              </p>
            </div>
            
            <div className="text-right">
              <div className="text-3xl font-bold text-foreground">
                ₹{currentMonthTotal.toLocaleString()}
              </div>
              <div className={`flex items-center ${changePercent.startsWith('-') ? 'text-success' : 'text-destructive'}`}>
                {changePercent.startsWith('-') ? (
                  <TrendingDown className="h-4 w-4 mr-1" />
                ) : (
                  <TrendingUp className="h-4 w-4 mr-1" />
                )}
                <span className="text-sm font-medium">
                  {changePercent}% from last month
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { title: 'This Month', amount: currentMonthTotal, change: '+15.4%' },
            { title: 'Last Month', amount: previousMonthTotal, change: '-2.1%' },
            { title: 'Average/Month', amount: 25800, change: '+5.2%' },
            { title: 'Total This Year', amount: 154800, change: '+12.8%' },
          ].map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card-3d p-6"
            >
              <h3 className="text-sm font-medium text-muted-foreground mb-1">
                {card.title}
              </h3>
              <p className="text-xl font-bold text-foreground mb-2">
                ₹{card.amount.toLocaleString()}
              </p>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                card.change.startsWith('-') 
                  ? 'bg-success/10 text-success' 
                  : 'bg-destructive/10 text-destructive'
              }`}>
                {card.change}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Monthly Trend */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="chart-container"
          >
            <h3 className="text-lg font-semibold mb-4">Monthly Trend</h3>
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
                  dataKey="amount" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Weekly Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="chart-container"
          >
            <h3 className="text-lg font-semibold mb-4">This Month's Weekly Breakdown</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar 
                  dataKey="amount" 
                  fill="hsl(var(--secondary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="chart-container"
        >
          <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
          <div className="space-y-4">
            {recentTransactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{transaction.description}</p>
                    <p className="text-sm text-muted-foreground">{transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-destructive">
                    -₹{transaction.amount.toLocaleString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}