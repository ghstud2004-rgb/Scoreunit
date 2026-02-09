
import React, { useState, useEffect } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import EvaluationForm from './pages/EvaluationForm';
import Success from './pages/Success';
import Report from './pages/Report';
import { User } from './types';

type Page = 'login' | 'dashboard' | 'form' | 'success' | 'report';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [user, setUser] = useState<User | null>(null);
  const [selectedDeptId, setSelectedDeptId] = useState<string | null>(null);

  // Simple persistence for demo
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setCurrentPage('dashboard');
    }
  }, []);

  const handleLogin = (u: User) => {
    setUser(u);
    localStorage.setItem('user', JSON.stringify(u));
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setCurrentPage('login');
  };

  const navigateTo = (page: Page, deptId?: string) => {
    if (deptId) setSelectedDeptId(deptId);
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <Login onLogin={handleLogin} />;
      case 'dashboard':
        return <Dashboard user={user} onLogout={handleLogout} onNavigate={navigateTo} />;
      case 'form':
        return <EvaluationForm user={user} deptId={selectedDeptId} onBack={() => navigateTo('dashboard')} onSuccess={() => navigateTo('success')} />;
      case 'success':
        return <Success onBackToDashboard={() => navigateTo('dashboard')} onShowReport={() => navigateTo('report')} />;
      case 'report':
        return <Report onBack={() => navigateTo('dashboard')} />;
      default:
        return <Login onLogin={handleLogin} />;
    }
  };

  return (
    <div className="min-h-screen font-vazir text-slate-900 bg-slate-50 transition-all duration-300">
      {renderPage()}
    </div>
  );
};

export default App;
