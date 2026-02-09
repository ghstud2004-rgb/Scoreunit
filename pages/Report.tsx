
import React, { useEffect, useState } from 'react';
import { MOCK_REPORT } from '../constants.tsx';
import { summarizeReportWithAI } from '../services/geminiService.ts';

interface ReportProps {
  onBack: () => void;
}

const Report: React.FC<ReportProps> = ({ onBack }) => {
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  
  const today = new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(new Date());

  useEffect(() => {
    const fetchSummary = async () => {
      const summary = await summarizeReportWithAI(MOCK_REPORT);
      setAiSummary(summary || null);
    };
    fetchSummary();
  }, []);

  return (
    <div className="min-h-screen bg-white p-8">
      <header className="no-print flex justify-between items-center mb-10 border-b pb-4">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-orange-500 text-3xl">medical_services</span>
          <h2 className="text-xl font-black">تجهیز گستر تامین سلامت</h2>
        </div>
        <button onClick={onBack} className="text-slate-400 hover:text-slate-900 flex items-center gap-1 font-bold">
          <span className="material-symbols-outlined">close</span>
          بستن
        </button>
      </header>

      <div className="max-w-4xl mx-auto print-container">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-3xl font-black">گزارش نهایی ارزیابی عملکرد</h1>
          <div className="flex justify-center gap-8 text-slate-500">
            <p>نام پرسنل: <span className="text-slate-900 font-bold">{MOCK_REPORT.personName}</span></p>
            <p>تاریخ گزارش: <span className="text-slate-900 font-bold">{today}</span></p>
          </div>
        </div>

        {aiSummary && (
          <div className="mb-8 p-6 bg-blue-50 border border-blue-100 rounded-2xl italic text-blue-900 no-print">
            <strong>تحلیل هوشمند:</strong> {aiSummary}
          </div>
        )}

        <div className="border border-slate-200 rounded-2xl overflow-hidden mb-10">
          <table className="w-full text-right">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="px-6 py-4">شاخص</th>
                <th className="px-6 py-4 text-center">امتیاز</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {MOCK_REPORT.criteria.map((c) => (
                <tr key={c.id}>
                  <td className="px-6 py-4 font-bold">{c.name}</td>
                  <td className="px-6 py-4 text-center">{c.score} / 10</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-12">
          <div className="p-6 bg-slate-50 rounded-2xl text-center">
            <p className="text-slate-500 text-sm">نمره کل</p>
            <p className="text-4xl font-black">{MOCK_REPORT.totalScore}</p>
          </div>
          <div className="p-6 bg-orange-50 rounded-2xl text-center">
            <p className="text-slate-500 text-sm">درصد تحقق</p>
            <p className="text-4xl font-black text-orange-600">{MOCK_REPORT.achievementPercentage}٪</p>
          </div>
        </div>

        <div className="flex justify-center gap-4 no-print">
          <button onClick={() => window.print()} className="bg-orange-500 text-white font-bold py-3 px-10 rounded-xl hover:bg-orange-600 shadow-lg shadow-orange-500/30 transition-all">
            چاپ گزارش
          </button>
          <button onClick={onBack} className="bg-white border border-slate-200 font-bold py-3 px-10 rounded-xl hover:bg-slate-50 transition-all">
            بازگشت
          </button>
        </div>
      </div>
    </div>
  );
};

export default Report;
