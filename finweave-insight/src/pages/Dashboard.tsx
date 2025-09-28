import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// import { useTranslation } from 'react-i18next'; // Removed for compatibility
import { 
  Utensils, Plane, Receipt, ShoppingBag, Home, Users, Coffee, Car, Heart, MoreHorizontal
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart, Pie, Cell,
  Tooltip
} from 'recharts';

// --- API Configuration ---
const API_BASE_URL = 'http://127.0.0.1:8000';

// --- Helper for mapping category names to icons and colors ---
const categoryDetails = {
  'Food & Drink': { icon: Utensils, color: '#ef4444' },
  'Travel': { icon: Plane, color: '#3b82f6' },
  'Bills & Utilities': { icon: Receipt, color: '#f59e0b' },
  'Shopping': { icon: ShoppingBag, color: '#8b5cf6' },
  'Home': { icon: Home, color: '#10b981' },
  'Family': { icon: Users, color: '#f97316' },
  'Entertainment': { icon: Coffee, color: '#84cc16' },
  'Transportation': { icon: Car, color: '#06b6d4' },
  'Health & Wellness': { icon: Heart, color: '#ec4899' },
  'Other': { icon: MoreHorizontal, color: '#6b7280' },
};

// Placeholder for translation function
const t = (key) => ({ 'dashboard': 'Dashboard' }[key] || key);

export default function Dashboard() {
  // --- State Management for Dynamic Data ---
  const [summaryData, setSummaryData] = useState(null);
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/dashboard/savings`);
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data from the server.');
        }
        const data = await response.json();

        // Process and set state
        setSummaryData(data.savings_bar);
        const formattedExpenses = data.spending_chart.map(cat => ({
          title: cat.category,
          amount: cat.total_amount,
          ...categoryDetails[cat.category] || categoryDetails['Other']
        }));
        setExpenseData(formattedExpenses);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white"><p>Loading Dashboard...</p></div>;
  }
  if (error) {
    return <div className="min-h-screen bg-gray-900 flex items-center justify-center"><p className="text-red-500">Error: {error}</p></div>;
  }

  const totalExpenses = expenseData.reduce((sum, cat) => sum + cat.amount, 0);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl font-bold text-white">{t('dashboard')}</h1>
          <p className="text-gray-400">Welcome back! Here's your financial overview.</p>
        </motion.div>

        {/* Summary Cards (Dynamic) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <SummaryCard title="Total Income" amount={summaryData.monthly_income} />
            <SummaryCard title="Total Expenses" amount={summaryData.total_expenses} />
            <SummaryCard title="Net Savings" amount={summaryData.net_savings} />
        </div>

        {/* Expense Breakdown (Restored and Dynamic) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800 p-6 rounded-xl shadow-lg"
        >
          <h3 className="text-xl font-semibold mb-4">Expense Breakdown</h3>
          {expenseData.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Pie Chart */}
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={expenseData} dataKey="amount" nameKey="title" cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={3}>
                      {expenseData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #4B5563' }} formatter={(value) => `₹${value.toLocaleString()}`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              {/* Expense List */}
              <div className="grid grid-cols-2 gap-4">
                {expenseData.map((entry) => {
                  const Icon = entry.icon;
                  return (
                    <div key={entry.title} className="bg-gray-700 p-3 rounded-lg">
                      <div className="flex items-center mb-1">
                        <Icon className="w-4 h-4 mr-2" style={{ color: entry.color }} />
                        <span className="text-sm text-gray-300">{entry.title}</span>
                      </div>
                      <p className="text-lg font-bold">₹{entry.amount.toLocaleString()}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="text-center py-10 text-gray-500">
              <p>No expense data for this month. Start tracking by adding expenses!</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

// A simple sub-component for the summary cards
const SummaryCard = ({ title, amount }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800 p-6 rounded-xl shadow-lg"
    >
      <h3 className="text-sm font-medium text-gray-400">{title}</h3>
      <p className="text-3xl font-bold mt-1">₹{amount.toLocaleString()}</p>
    </motion.div>
);

