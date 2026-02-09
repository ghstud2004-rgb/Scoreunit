
import React from 'react';
import { User, EvaluationStatus } from '../types';
import { DEPARTMENTS } from '../constants';

interface DashboardProps {
  user: User | null;
  onLogout: () => void;
  onNavigate: (page: 'form' | 'report' | 'success' | 'dashboard', deptId?: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout, onNavigate }) => {
  // Dynamic Persian Date
  const currentDate = new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(new Date());

  const getStatusStyles = (status: EvaluationStatus, days?: number) => {
    if (status === EvaluationStatus.OVERDUE) {
      return 'bg-red-100 text-red-700 border-red-200';
    }
    if (days === 1) {
      return 'bg-orange-100 text-orange-700 border-orange-200';
    }
    return 'bg-green-100 text-green-700 border-green-200';
  };

  const getIndicatorColor = (status: EvaluationStatus, days?: number) => {
    if (status === EvaluationStatus.OVERDUE) return 'bg-red-600';
    if (days === 1) return 'bg-orange-500';
    return 'bg-green-500';
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 h-20 flex items-center justify-between px-6 lg:px-12 sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <div className="border-r-4 border-blue-600 pr-4">
            <h2 className="text-xl font-bold">خوش آمدید، {user?.name}</h2>
            <p className="text-xs text-slate-500 mt-1">{user?.role} • پنل ارزیابی عملکرد پرسنل</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-blue-600 bg-blue-50 px-4 py-2 rounded-xl">
            <span className="material-symbols-outlined text-lg">calendar_today</span>
            <p className="text-sm font-bold">{currentDate}</p>
          </div>
          
          <div className="hidden md:flex flex-col text-left">
            <h1 className="text-slate-900 text-base font-bold">تجهیز گستر <span className="text-orange-500">تامین سلامت</span></h1>
            <span className="text-[10px] text-slate-400 tracking-wider">Tamin Salamat Co.</span>
          </div>

          <div className="size-12 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200">
            <span className="material-symbols-outlined text-slate-400">person</span>
          </div>
        </div>
      </header>

      <main className="flex-1 p-6 lg:p-12">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <p className="text-sm text-slate-500">واحدهای کل</p>
                <span className="material-symbols-outlined text-slate-400">domain</span>
              </div>
              <p className="text-3xl font-black text-slate-800">۱۲ واحد</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <p className="text-sm text-slate-500">ارزیابی شده</p>
                <span className="material-symbols-outlined text-green-500">check_circle</span>
              </div>
              <p className="text-3xl font-black text-green-600">۷ واحد</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <p className="text-sm text-slate-500">نیاز به اقدام</p>
                <span className="material-symbols-outlined text-orange-500">pending_actions</span>
              </div>
              <p className="text-3xl font-black text-orange-500">۴ واحد</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <p className="text-sm text-slate-500">معوق شده</p>
                <span className="material-symbols-outlined text-red-500">error</span>
              </div>
              <p className="text-3xl font-black text-red-600">۱ واحد</p>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-100 flex flex-wrap justify-between items-center gap-4">
              <div>
                <h3 className="text-xl font-bold">لیست وضعیت ارزیابی واحدها</h3>
                <p className="text-sm text-slate-400 mt-1">مدیریت و مشاهده وضعیت دوره‌ای ارزیابی پرسنل</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
                  <input 
                    type="text" 
                    placeholder="جستجو در واحدها..." 
                    className="w-64 lg:w-80 pr-10 pl-4 py-2 text-sm border border-slate-200 rounded-xl bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500/10"
                  />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                  <tr>
                    <th className="px-10 py-5">ردیف</th>
                    <th className="px-10 py-5">واحد ارزیاب شونده</th>
                    <th className="px-10 py-5">تاریخ آخرین ارزیابی</th>
                    <th className="px-10 py-5 text-center">وضعیت / مهلت باقی‌مانده</th>
                    <th className="px-10 py-5">عملیات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {DEPARTMENTS.map((dept, idx) => (
                    <tr key={dept.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-10 py-6 text-sm text-slate-400">{(idx + 1).toString().padStart(2, '۰')}</td>
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-3">
                          <div className={`w-2.5 h-2.5 rounded-full ${getIndicatorColor(dept.status, dept.daysRemaining)}`}></div>
                          <div className="text-sm font-bold">{dept.name}</div>
                        </div>
                      </td>
                      <td className="px-10 py-6 text-sm text-slate-500">{dept.lastEvaluationDate}</td>
                      <td className="px-10 py-6 text-center">
                        <span className={`px-4 py-1.5 inline-flex text-xs font-bold rounded-full border ${getStatusStyles(dept.status, dept.daysRemaining)}`}>
                          {dept.status === EvaluationStatus.OVERDUE ? 'معوق شده' : `${dept.daysRemaining} روز مانده`}
                        </span>
                      </td>
                      <td className="px-10 py-6">
                        <button 
                          onClick={() => onNavigate('form', dept.id)}
                          className={`font-bold py-2 px-6 rounded-xl transition-all text-xs border ${
                            dept.status === EvaluationStatus.OVERDUE 
                            ? 'bg-red-600 text-white border-red-600 hover:bg-red-700' 
                            : 'text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white'
                          }`}
                        >
                          {dept.status === EvaluationStatus.OVERDUE ? 'تکمیل فوری' : 'ورود به فرم'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-10 py-6 border-t border-slate-100 flex items-center justify-between bg-slate-50/30">
              <p className="text-sm text-slate-400">
                نمایش <span className="font-bold text-slate-900">۱</span> تا <span className="font-bold text-slate-900">۵</span> از <span className="font-bold text-slate-900">۱۲</span> واحد
              </p>
            </div>
          </div>
        </div>
      </main>

      <div className="p-10 flex justify-start">
        <button 
          onClick={onLogout}
          className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-red-600 border border-red-100 rounded-2xl bg-white hover:bg-red-600 hover:text-white transition-all shadow-sm"
        >
          <span className="material-symbols-outlined">logout</span>
          <span>خروج از سامانه</span>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
