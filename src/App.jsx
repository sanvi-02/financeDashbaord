import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AppProvider } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Transactions from './components/Transactions';
import Analytics from './components/Analytics';
import FinancialDashboard from './components/FinancialDashboard';

function AppContent() {
  const [activePage, setActivePage] = useState('analytics');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Sidebar activePage={activePage} onPageChange={setActivePage} />

      <div className="lg:ml-64 transition-all duration-300">
        <Header />

        <main className="p-6">
          {/* {activePage === "financial" && <FinancialDashboard />} */}
          {activePage === 'analytics' && <Analytics />}
          {activePage === "transactions" && <Transactions />}
          {/* {activePage === "dashboard" && <Dashboard />} */}
          {activePage === "wallet" && <Analytics />}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
