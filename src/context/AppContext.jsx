import { createContext, useContext, useState, useMemo, useCallback } from 'react';

const AppContext = createContext();

const initialTransactions = [
  { id: 1, name: 'Salary Deposit', account: 'Main Account', category: 'Income', amount: 5200, status: 'Completed', date: '2026-01-15', time: '09:00 AM', type: 'income' },
  { id: 2, name: 'Rent Payment', account: 'Checking', category: 'Housing', amount: 1800, status: 'Completed', date: '2026-01-20', time: '10:30 AM', type: 'expense' },
  { id: 3, name: 'Grocery Store', account: 'Credit Card', category: 'Food', amount: 156.50, status: 'Completed', date: '2026-02-05', time: '02:15 PM', type: 'expense' },
  { id: 4, name: 'Freelance Work', account: 'Main Account', category: 'Income', amount: 850, status: 'Completed', date: '2026-02-10', time: '04:45 PM', type: 'income' },
  { id: 5, name: 'Electric Bill', account: 'Checking', category: 'Utilities', amount: 95.20, status: 'Completed', date: '2026-02-15', time: '11:00 AM', type: 'expense' },
  { id: 6, name: 'Restaurant', account: 'Credit Card', category: 'Food', amount: 68.40, status: 'Completed', date: '2026-03-01', time: '07:30 PM', type: 'expense' },
  { id: 7, name: 'Gas Station', account: 'Credit Card', category: 'Transport', amount: 45.00, status: 'Completed', date: '2026-03-05', time: '08:15 AM', type: 'expense' },
  { id: 8, name: 'Netflix Subscription', account: 'Credit Card', category: 'Entertainment', amount: 15.99, status: 'Completed', date: '2026-03-10', time: '12:00 AM', type: 'expense' },
  { id: 9, name: 'Gym Membership', account: 'Checking', category: 'Health', amount: 50.00, status: 'Completed', date: '2026-03-15', time: '06:00 AM', type: 'expense' },
  { id: 10, name: 'Stock Dividend', account: 'Savings', category: 'Income', amount: 320, status: 'Completed', date: '2026-04-01', time: '09:00 AM', type: 'income' },
  { id: 11, name: 'Freelance Project', account: 'Main Account', category: 'Income', amount: 1200, status: 'Completed', date: '2026-04-02', time: '02:00 PM', type: 'income' },
  { id: 12, name: 'Shopping', account: 'Credit Card', category: 'Shopping', amount: 250, status: 'Completed', date: '2026-04-03', time: '03:30 PM', type: 'expense' },
];

const initialCards = [
  { id: 1, name: 'John Doe', number: '**** **** **** 4582', expiry: '12/28', type: 'Debit', balance: 12500, color: 'from-emerald-500 to-teal-600' },
  { id: 2, name: 'John Doe', number: '**** **** **** 8841', expiry: '09/27', type: 'Credit', balance: 8750, color: 'from-blue-500 to-indigo-600' },
];

export function AppProvider({ children }) {
  // Role state
  const [userRole, setUserRole] = useState('admin');

  // Transactions state
  const [transactions, setTransactions] = useState(initialTransactions);

  // Cards state
  const [cards, setCards] = useState(initialCards);

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');
  const [timeFilter, setTimeFilter] = useState('all'); // 'week', 'month', 'year', 'all'

  const categories = useMemo(() => {
    const cats = new Set(transactions.map(t => t.category));
    return ['all', ...Array.from(cats)];
  }, [transactions]);

  // Filter and sort transactions
  const filteredTransactions = useMemo(() => {
    let result = [...transactions];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(t =>
        t.name.toLowerCase().includes(query) ||
        t.category.toLowerCase().includes(query)
      );
    }

    // Type filter
    if (filterType !== 'all') {
      result = result.filter(t => t.type === filterType);
    }

    // Category filter
    if (filterCategory !== 'all') {
      result = result.filter(t => t.category === filterCategory);
    }

    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return new Date(b.date) - new Date(a.date);
        case 'date-asc':
          return new Date(a.date) - new Date(b.date);
        case 'amount-desc':
          return b.amount - a.amount;
        case 'amount-asc':
          return a.amount - b.amount;
        default:
          return 0;
      }
    });

    return result;
  }, [transactions, searchQuery, filterType, filterCategory, sortBy]);

  // Transaction actions
  const addTransaction = useCallback((transactionData) => {
    const newTransaction = {
      id: Date.now(),
      ...transactionData,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setTransactions(prev => [newTransaction, ...prev]);
  }, []);

  const deleteTransaction = useCallback((id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  }, []);

  // Card actions
  const addCard = useCallback((cardData) => {
    const newCard = {
      id: Date.now(),
      ...cardData,
      balance: 0,
    };
    setCards(prev => [...prev, newCard]);
  }, []);

  const deleteCard = useCallback((id) => {
    setCards(prev => prev.filter(c => c.id !== id));
  }, []);

  const updateCardBalance = useCallback((id, newBalance) => {
    setCards(prev => prev.map(c => c.id === id ? { ...c, balance: newBalance } : c));
  }, []);

  // Role actions
  const canModifyTransactions = userRole === 'admin';

  // Filter transactions by time
  const filteredTransactionsByTime = useMemo(() => {
    if (timeFilter === 'all') return transactions;

    const now = new Date();
    const filterDate = new Date();

    switch (timeFilter) {
      case 'week':
        filterDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        filterDate.setMonth(now.getMonth() - 1);
        break;
      case 'year':
        filterDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        return transactions;
    }

    return transactions.filter(t => new Date(t.date) >= filterDate);
  }, [transactions, timeFilter]);

  // Analytics calculations
  const analytics = useMemo(() => {
    const expenses = filteredTransactionsByTime.filter(t => t.type === 'expense' && t.status === 'Completed');
    const income = filteredTransactionsByTime.filter(t => t.type === 'income' && t.status === 'Completed');

    const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0);
    const totalIncome = income.reduce((sum, t) => sum + t.amount, 0);
    const netBalance = totalIncome - totalExpenses;

    // Time series data (group by month)
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyData = monthNames.map((month, index) => {
      const monthIncome = income
        .filter(t => new Date(t.date).getMonth() === index)
        .reduce((sum, t) => sum + t.amount, 0);
      const monthExpenses = expenses
        .filter(t => new Date(t.date).getMonth() === index)
        .reduce((sum, t) => sum + t.amount, 0);
      return {
        month,
        income: monthIncome,
        expenses: monthExpenses,
        net: monthIncome - monthExpenses,
      };
    });

    // Expense breakdown by category
    const categoryTotals = expenses.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

    const expenseBreakdown = Object.entries(categoryTotals)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    // Color palette for charts
    const colors = ['#10b981', '#14b8a6', '#2dd4bf', '#5eead4', '#99f6e4', '#ccfbf1', '#f472b6', '#a78bfa'];
    const expenseBreakdownWithColors = expenseBreakdown.map((item, index) => ({
      ...item,
      color: colors[index % colors.length],
    }));

    // Highest spending category
    const highestSpendingCategory = expenseBreakdown[0] || { name: 'None', value: 0 };

    // Monthly change calculation
    const currentMonth = new Date().getMonth();
    const currentMonthIncome = monthlyData[currentMonth]?.income || 0;
    const currentMonthExpenses = monthlyData[currentMonth]?.expenses || 0;
    const lastMonthIncome = monthlyData[currentMonth - 1]?.income || monthlyData[11]?.income || 1;
    const lastMonthExpenses = monthlyData[currentMonth - 1]?.expenses || monthlyData[11]?.expenses || 1;

    const incomeChange = ((currentMonthIncome - lastMonthIncome) / lastMonthIncome) * 100;
    const expenseChange = ((currentMonthExpenses - lastMonthExpenses) / lastMonthExpenses) * 100;

    return {
      totalExpenses,
      totalIncome,
      netBalance,
      monthlyData,
      expenseBreakdown: expenseBreakdownWithColors,
      highestSpendingCategory,
      incomeChange,
      expenseChange,
      transactionCount: filteredTransactionsByTime.length,
    };
  }, [filteredTransactionsByTime]);

  // Insights calculations (for backward compatibility)
  const insights = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense' && t.status === 'Completed');
    const income = transactions.filter(t => t.type === 'income' && t.status === 'Completed');

    const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0);
    const totalIncome = income.reduce((sum, t) => sum + t.amount, 0);

    const categoryTotals = expenses.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

    const highestSpendingCategory = Object.entries(categoryTotals)
      .sort((a, b) => b[1] - a[1])[0] || ['None', 0];

    return {
      highestSpendingCategory: {
        name: highestSpendingCategory[0],
        amount: highestSpendingCategory[1],
      },
      totalExpenses,
      totalIncome,
      netBalance: totalIncome - totalExpenses,
      monthOverMonthChange: 0,
      avgDailySpending: totalExpenses / 30,
      recentExpenses: totalExpenses,
      transactionCount: transactions.length,
    };
  }, [transactions]);

  const value = {
    // Role
    userRole,
    setUserRole,
    canModifyTransactions,

    // Transactions
    transactions,
    filteredTransactions,
    addTransaction,
    deleteTransaction,

    // Cards
    cards,
    addCard,
    deleteCard,
    updateCardBalance,

    // Filters
    searchQuery,
    setSearchQuery,
    filterType,
    setFilterType,
    filterCategory,
    setFilterCategory,
    sortBy,
    setSortBy,
    categories,
    timeFilter,
    setTimeFilter,

    // Insights & Analytics
    insights,
    analytics,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
