
import React from 'react';
import { User, EvaluationStatus } from '../types.ts';
import { DEPARTMENTS } from '../constants.tsx';

interface DashboardProps {
  user: User | null;
  onLogout: () => void;
  onNavigate: (page: 'form' | 'report' | 'success' | 'dashboard', deptId?: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout, onNavigate }) => {
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
      <header className="bg-white border-b border-slate-100 h-20 flex items-center justify-between px-6 lg:px-12 sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <div className="border-r-4 border-blue-600 pr-4">
            <h2 className="text-xl font-bold">خوش آمدید، {user?.name}</h2>
            <p className="text-xs text-slate-500 mt-1">{user?.role} • پنل ارزیابی</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-blue-600 bg-blue-50 px-4 py-2 rounded-xl">
            <span className="material-symbols-outlined text-lg">calendar_today</span>
            <p className="text-sm font-bold">{currentDate}</p>
          </div>
          <div className="size-10 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200">
            <span className="material-symbols-outlined text-slate-400">person</span>
          </div>
        </div>
      </header>

      <main className="flex-1 p-6 lg:p-12">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <p className="text-sm text-slate-500 mb-1">واحدهای کل</p>
              <p className="text-3xl font-black text-slate-800">۱۲ واحد</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <p className="text-sm text-slate-500 mb-1">ارزیابی شده</p>
              <p className="text-3xl font-black text-green-600">۷</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <p className="text-sm text-slate-500 mb-1">نیاز به اقدام</p>
              <p className="text-3xl font-black text-orange-500">۴</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <p className="text-sm text-slate-500 mb-1">معوق شده</p>
              <p className="text-3xl font-black text-red-600">۱</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase">
                  <tr>
                    <th className="px-10 py-5">واحد ارزیاب شونده</th>
                    <th className="px-10 py-5">آخرین تاریخ</th>
                    <th className="px-10 py-5 text-center">وضعیت</th>
                    <th className="px-10 py-5">عملیات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {DEPARTMENTS.map((dept) => (
                    <tr key={dept.id} className="hover:bg-slate-50/50">
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${getIndicatorColor(dept.status, dept.daysRemaining)}`}></div>
                          <div className="text-sm font-bold">{dept.name}</div>
                        </div>
                      </td>
                      <td className="px-10 py-6 text-sm text-slate-500">{dept.lastEvaluationDate}</td>
                      <td className="px-10 py-6 text-center">
                        <span className={`px-4 py-1.5 text-xs font-bold rounded-full border ${getStatusStyles(dept.status, dept.daysRemaining)}`}>
                          {dept.status === EvaluationStatus.OVERDUE ? 'معوق شده' : `${dept.daysRemaining} روز مانده`}
                        </span>
                      </td>
                      <td className="px-10 py-6">
                        <button 
                          onClick={() => onNavigate('form', dept.id)}
                          className="text-blue-600 border border-blue-600 font-bold py-1.5 px-4 rounded-lg text-xs hover:bg-blue-600 hover:text-white transition-all"
                        >
                          ورود به فرم
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <div className="p-10 flex justify-start">
        <button onClick={onLogout} className="text-red-600 font-bold flex items-center gap-2 hover:bg-red-50 px-4 py-2 rounded-lg transition-all">
          <span className="material-symbols-outlined">logout</span>
          <span>خروج</span>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
