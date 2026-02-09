
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
      return 'bg-red-50 text-red-600 border-red-100';
    }
    if (days === 1) {
      return 'bg-orange-50 text-orange-600 border-orange-100';
    }
    return 'bg-green-50 text-green-600 border-green-100';
  };

  const getIndicatorColor = (status: EvaluationStatus, days?: number) => {
    if (status === EvaluationStatus.OVERDUE) return 'bg-red-500';
    if (days === 1) return 'bg-orange-500';
    return 'bg-green-500';
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc]">
      <header className="bg-white border-b border-slate-100 h-20 flex items-center justify-between px-6 lg:px-12 sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <div className="border-r-4 border-blue-600 pr-4">
            <h2 className="text-xl font-black text-slate-800">خوش آمدید، {user?.name}</h2>
            <p className="text-xs text-slate-500 font-bold">{user?.role} • تجهیز گستر تامین سلامت</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-blue-600 bg-blue-50 px-4 py-2 rounded-xl border border-blue-100">
            <span className="material-symbols-outlined text-lg">calendar_today</span>
            <p className="text-sm font-black">{currentDate}</p>
          </div>
        </div>
      </header>

      <main className="flex-1 p-6 lg:p-12">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <p className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">واحدهای کل</p>
              <p className="text-3xl font-black text-slate-800">۱۲ واحد</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm border-r-4 border-r-green-500">
              <p className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">ارزیابی شده</p>
              <p className="text-3xl font-black text-green-600">۷</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm border-r-4 border-r-orange-500">
              <p className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">نیاز به اقدام</p>
              <p className="text-3xl font-black text-orange-500">۴</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm border-r-4 border-r-red-500">
              <p className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">معوق شده</p>
              <p className="text-3xl font-black text-red-600">۱</p>
            </div>
          </div>

          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead className="bg-slate-50/50 text-slate-400 text-xs font-black uppercase tracking-widest">
                  <tr>
                    <th className="px-10 py-6">واحد ارزیاب شونده</th>
                    <th className="px-10 py-6">آخرین تاریخ ارزیابی</th>
                    <th className="px-10 py-6 text-center">وضعیت زمانی</th>
                    <th className="px-10 py-6">عملیات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {DEPARTMENTS.map((dept) => (
                    <tr key={dept.id} className="hover:bg-slate-50/30 transition-colors">
                      <td className="px-10 py-7">
                        <div className="flex items-center gap-3">
                          <div className={`w-2.5 h-2.5 rounded-full ${getIndicatorColor(dept.status, dept.daysRemaining)} shadow-sm`}></div>
                          <div className="text-sm font-black text-slate-800">{dept.name}</div>
                        </div>
                      </td>
                      <td className="px-10 py-7 text-sm font-bold text-slate-500">{dept.lastEvaluationDate}</td>
                      <td className="px-10 py-7 text-center">
                        <span className={`px-5 py-2 text-[11px] font-black rounded-full border ${getStatusStyles(dept.status, dept.daysRemaining)}`}>
                          {dept.status === EvaluationStatus.OVERDUE ? 'معوق شده (بحرانی)' : 
                           dept.daysRemaining === 1 ? 'فقط ۱ روز باقی مانده' : 
                           `${dept.daysRemaining} روز تا سررسید`}
                        </span>
                      </td>
                      <td className="px-10 py-7">
                        <button 
                          onClick={() => onNavigate('form', dept.id)}
                          className="bg-white text-blue-600 border border-blue-200 font-black py-2 px-6 rounded-xl text-xs hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm"
                        >
                          شروع ارزیابی
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

      <footer className="p-10 flex justify-start">
        <button onClick={onLogout} className="text-red-500 font-black flex items-center gap-2 hover:bg-red-50 px-6 py-3 rounded-2xl transition-all">
          <span className="material-symbols-outlined">logout</span>
          <span>خروج از حساب</span>
        </button>
      </footer>
    </div>
  );
};

export default Dashboard;
