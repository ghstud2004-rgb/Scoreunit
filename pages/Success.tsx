
import React from 'react';
import { EVALUATION_TEMPLATES, WAREHOUSE_DATA } from '../constants';

interface SuccessProps {
  deptId: string | null;
  onBackToDashboard: () => void;
  onShowReport: () => void;
}

const Success: React.FC<SuccessProps> = ({ deptId, onBackToDashboard, onShowReport }) => {
  // Get template data dynamically based on deptId, fallback to generic if not found
  const template = deptId && EVALUATION_TEMPLATES[deptId] 
    ? EVALUATION_TEMPLATES[deptId] 
    : WAREHOUSE_DATA;

  // Dynamic Persian Date
  const currentFullDateTime = new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date());

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 items-center justify-center p-8 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-500/5 rounded-full blur-[140px] -z-10 translate-x-1/4 -translate-y-1/4"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[140px] -z-10 -translate-x-1/4 translate-y-1/4"></div>
      
      <div className="w-full max-w-2xl bg-white shadow-2xl shadow-slate-200/50 border border-slate-100 rounded-[3rem] p-12 lg:p-20 text-center relative z-10">
        <div className="relative mx-auto w-36 h-36 mb-12">
          <div className="absolute inset-0 bg-green-500/20 rounded-full scale-110"></div>
          <div className="relative flex items-center justify-center w-full h-full rounded-full bg-green-500 shadow-2xl shadow-green-500/40">
            <span className="material-symbols-outlined text-white text-7xl font-bold">check_circle</span>
          </div>
        </div>

        <div className="space-y-6 mb-14">
          <h2 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">ارزیابی واحد با موفقیت به پایان رسید</h2>
          <div className="max-w-md mx-auto">
            <p className="text-slate-500 text-lg lg:text-xl leading-relaxed">
              تمامی شاخص‌های ارزیابی برای واحد {template.departmentName} <span className="block mt-2 text-slate-900 font-black text-2xl">({template.evaluateeName})</span> با موفقیت در سامانه ثبت و نهایی گردید.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-lg mx-auto">
          <button 
            onClick={onShowReport}
            className="flex items-center justify-center gap-3 bg-slate-900 hover:bg-black text-white font-bold py-5 px-8 rounded-2xl transition-all shadow-xl shadow-slate-900/10 hover:shadow-2xl hover:-translate-y-1"
          >
            <span className="material-symbols-outlined text-2xl">analytics</span>
            <span>مشاهده خلاصه ارزیابی</span>
          </button>
          <button 
            onClick={onBackToDashboard}
            className="flex items-center justify-center gap-3 bg-white hover:bg-slate-50 text-slate-900 font-bold py-5 px-8 rounded-2xl border-2 border-slate-100 transition-all hover:-translate-y-1"
          >
            <span className="material-symbols-outlined text-2xl">format_list_bulleted</span>
            <span>بازگشت به لیست واحدها</span>
          </button>
        </div>

        <div className="mt-20 pt-10 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5 text-slate-400">
            <span className="material-symbols-outlined text-lg">fingerprint</span>
            <span className="text-sm font-medium">شناسه نهایی‌سازی:</span>
            <span className="font-mono text-sm font-bold text-slate-600">FIN-2024-{deptId?.split('-')[1] || 'GEN'}</span>
          </div>
          <div className="text-sm text-slate-400 font-medium bg-slate-50 px-4 py-1.5 rounded-full">تاریخ ثبت: {currentFullDateTime}</div>
        </div>
      </div>
    </div>
  );
};

export default Success;
