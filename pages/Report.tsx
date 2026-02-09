
import React, { useEffect, useState } from 'react';
import { MOCK_REPORT } from '../constants';
import { summarizeReportWithAI } from '../services/geminiService';

interface ReportProps {
  onBack: () => void;
}

const Report: React.FC<ReportProps> = ({ onBack }) => {
  const [aiSummary, setAiSummary] = useState<string | null>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      const summary = await summarizeReportWithAI(MOCK_REPORT);
      setAiSummary(summary || null);
    };
    fetchSummary();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar - No Print */}
      <header className="no-print w-full border-b border-slate-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
          <div className="flex items-center gap-4">
            <div className="size-10 flex items-center justify-center bg-orange-100 rounded-xl text-orange-500">
              <span className="material-symbols-outlined text-3xl font-bold">medical_services</span>
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-800">تجهیز گستر تامین سلامت</h2>
              <p className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">Tamin Salamat Co.</p>
            </div>
          </div>
          <button onClick={onBack} className="text-slate-500 hover:text-slate-900 font-bold flex items-center gap-2">
            <span className="material-symbols-outlined">close</span>
            بستن گزارش
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-12 px-8 print-container">
        {/* Report Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10 border-b border-slate-200 pb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-orange-500">
              <span className="material-symbols-outlined font-bold">assignment_turned_in</span>
              <span className="text-sm font-black uppercase tracking-wider">گزارش نهایی ارزیابی عملکرد</span>
            </div>
            <h1 className="text-slate-900 text-4xl md:text-5xl font-black leading-tight">خلاصه ارزیابی واحد انبار کارخانه</h1>
            <div className="flex flex-wrap gap-8 text-slate-500 text-lg">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-lg text-orange-500/70">person</span>
                <span>ارزیاب شونده: <span className="font-bold text-slate-900">{MOCK_REPORT.personName}</span></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-lg text-orange-500/70">factory</span>
                <span>واحد عملیاتی: <span className="font-bold text-slate-900">{MOCK_REPORT.departmentName}</span></span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-3">
            <div className="px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm flex items-center gap-4">
              <span className="material-symbols-outlined text-orange-500 text-3xl">how_to_reg</span>
              <div className="text-right">
                <p className="text-xs text-slate-500">ارزیاب مسئول</p>
                <p className="text-sm font-bold text-slate-900">{MOCK_REPORT.evaluatorName}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-bold">
              <span className="material-symbols-outlined text-sm">calendar_month</span>
              <span>تاریخ ثبت نهایی: {MOCK_REPORT.date}</span>
            </div>
          </div>
        </div>

        {/* AI Summary Section - No Print */}
        {aiSummary && (
          <div className="mb-10 p-8 bg-blue-50 border border-blue-100 rounded-[2rem] space-y-3 no-print">
            <div className="flex items-center gap-2 text-blue-600">
              <span className="material-symbols-outlined">auto_awesome</span>
              <h4 className="font-black">تحلیل هوشمند مدیر سیستم</h4>
            </div>
            <p className="text-blue-800 leading-relaxed italic">{aiSummary}</p>
          </div>
        )}

        {/* Table */}
        <div className="mb-10 overflow-hidden rounded-[2rem] border border-slate-100 shadow-lg">
          <table className="w-full text-right">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-8 py-5 text-sm font-black text-slate-700 uppercase tracking-wide">شاخص ارزیابی عملکرد</th>
                <th className="px-8 py-5 text-sm font-black text-slate-700 w-48 text-center uppercase tracking-wide">امتیاز مکتسبه</th>
                <th className="px-8 py-5 text-sm font-black text-slate-700 hidden md:table-cell uppercase tracking-wide">توضیحات و بازخوردهای ارزیاب</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_REPORT.criteria.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/30 transition-colors">
                  <td className="px-8 py-6 text-slate-900 font-bold">{item.name}</td>
                  <td className="px-8 py-6 text-center">
                    <div className={`inline-flex items-center justify-center rounded-xl h-10 px-6 font-black text-base min-w-[100px] ${
                      item.score === 10 ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' : 'bg-orange-50 text-orange-500 border border-orange-100'
                    }`}>
                      {item.score} / {item.maxScore}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-slate-500 text-sm italic hidden md:table-cell">{item.feedback}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Final Score Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-8 bg-white border border-slate-200 rounded-[2rem] shadow-sm flex flex-col gap-4">
            <div className="flex items-center gap-3 text-slate-400">
              <span className="material-symbols-outlined text-xl">calculate</span>
              <p className="text-xs font-bold uppercase">جمع کل امتیازات</p>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-5xl font-black text-slate-900">{MOCK_REPORT.totalScore}</p>
              <p className="text-slate-400 text-xl font-bold">/ {MOCK_REPORT.maxTotalScore}</p>
            </div>
          </div>
          
          <div className="p-8 bg-orange-50 border border-orange-100 rounded-[2rem] shadow-sm flex flex-col gap-4 relative overflow-hidden group">
            <div className="flex items-center gap-3 text-orange-500 relative z-10">
              <span className="material-symbols-outlined text-xl font-bold">trending_up</span>
              <p className="text-xs font-bold uppercase">درصد تحقق اهداف</p>
            </div>
            <p className="text-5xl font-black text-slate-900 relative z-10">{MOCK_REPORT.achievementPercentage}٪</p>
            <span className="material-symbols-outlined absolute -bottom-4 -left-4 text-[120px] text-orange-500/5 rotate-12 transition-transform duration-700 group-hover:rotate-0">analytics</span>
          </div>

          <div className="p-8 bg-white border border-slate-200 rounded-[2rem] shadow-sm flex flex-col gap-4">
            <div className="flex items-center gap-3 text-slate-400">
              <span className="material-symbols-outlined text-xl text-orange-500">verified</span>
              <p className="text-xs font-bold uppercase">سطح ارزیابی نهایی</p>
            </div>
            <p className="text-4xl font-black text-slate-900">{MOCK_REPORT.level}</p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-16 no-print">
          <button 
            onClick={() => window.print()}
            className="flex min-w-[260px] items-center justify-center gap-3 rounded-2xl h-16 px-8 bg-orange-500 text-white text-xl font-black shadow-xl shadow-orange-500/20 hover:shadow-orange-500/40 hover:-translate-y-1 transition-all"
          >
            <span className="material-symbols-outlined">print</span>
            <span>چاپ گزارش نهایی</span>
          </button>
          <button 
            onClick={onBack}
            className="flex min-w-[260px] items-center justify-center gap-3 rounded-2xl h-16 px-8 bg-white border-2 border-slate-200 text-slate-900 text-xl font-black hover:bg-slate-50 transition-all"
          >
            <span className="material-symbols-outlined">home</span>
            <span>بازگشت به صفحه اول</span>
          </button>
        </div>

        <div className="mt-20 text-center text-slate-400 text-[10px] p-6 border-t border-slate-100">
          این سند توسط سامانه جامع مدیریت عملکرد تجهیز گستر تامین سلامت به صورت سیستمی تولید شده و فاقد مهر فیزیکی است. 
          <span className="mx-2">|</span> شناسه پیگیری دیجیتال: {MOCK_REPORT.id}
        </div>
      </main>
    </div>
  );
};

export default Report;
