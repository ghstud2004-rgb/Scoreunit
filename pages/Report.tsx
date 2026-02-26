
import React, { useEffect, useState } from 'react';
import { MOCK_REPORT, EVALUATION_TEMPLATES } from '../constants.tsx';
import { summarizeReportWithAI } from '../services/geminiService.ts';
import { EvaluationRecord } from '../types.ts';

interface ReportProps {
  deptId: string | null;
  onBack: () => void;
}

const Report: React.FC<ReportProps> = ({ deptId, onBack }) => {
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [reportData, setReportData] = useState<EvaluationRecord>(MOCK_REPORT);

  const today = new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(new Date());

  useEffect(() => {
    // Generate Report Data dynamically based on the Department ID
    // In a real app, this would be fetched from backend/context.
    // Here we construct it from the template to ensure names are correct.
    if (deptId && EVALUATION_TEMPLATES[deptId]) {
        const template = EVALUATION_TEMPLATES[deptId];
        
        // Simulate score calculation for display purposes
        // We use random high scores to simulate a completed "Good" evaluation
        const simulatedCriteria = template.criteria.map(c => ({
            ...c,
            score: c.maxScore - (Math.random() > 0.7 ? 1 : 0) // Mostly max scores
        }));

        const totalScore = simulatedCriteria.reduce((acc, c) => acc + c.score, 0);
        const maxTotalScore = simulatedCriteria.reduce((acc, c) => acc + c.maxScore, 0);
        const percentage = Math.round((totalScore / maxTotalScore) * 100);

        setReportData({
            id: `TZ-${deptId.split('-')[1] || '999'}-1403`,
            personName: template.evaluateeName,
            departmentName: template.departmentName,
            evaluatorName: template.evaluatorName,
            date: today,
            criteria: simulatedCriteria,
            totalScore: totalScore,
            maxTotalScore: maxTotalScore,
            achievementPercentage: percentage,
            level: percentage > 90 ? 'عالی' : (percentage > 75 ? 'خیلی خوب' : 'خوب')
        });
    }
  }, [deptId, today]);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setAiSummary("در حال پردازش داده‌ها و تحلیل هوشمند عملکرد...");
        const summary = await summarizeReportWithAI(reportData);
        setAiSummary(summary || "تحلیل هوشمند انجام شد.");
      } catch (e) {
        setAiSummary("امکان تحلیل هوشمند در حال حاضر وجود ندارد.");
      }
    };
    
    // Debounce slightly to ensure reportData is set
    if (reportData) {
        fetchSummary();
    }
  }, [reportData]);

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-12 font-vazir print:bg-white print:p-0">
      {/* Action Bar (Hidden in Print) */}
      <header className="max-w-5xl mx-auto flex justify-between items-center mb-8 no-print">
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors font-bold px-4 py-2 rounded-xl hover:bg-white"
        >
          <span className="material-symbols-outlined">arrow_forward</span>
          بازگشت به داشبورد
        </button>
        <button 
          onClick={() => window.print()} 
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-600/20 transition-all"
        >
          <span className="material-symbols-outlined">print</span>
          چاپ گزارش
        </button>
      </header>

      {/* Report Container */}
      <div className="max-w-5xl mx-auto bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 overflow-hidden print:shadow-none print:rounded-none print:w-full print:max-w-none">
        
        {/* Report Header */}
        <div className="bg-slate-900 text-white p-8 lg:p-12 relative overflow-hidden print:bg-slate-900 print:text-white print:p-8">
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 print:hidden"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 print:hidden"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-4 opacity-90">
                        <span className="material-symbols-outlined text-3xl">health_metrics</span>
                        <h2 className="text-lg font-bold tracking-wide">تجهیز گستر تامین سلامت</h2>
                    </div>
                    <h1 className="text-3xl lg:text-4xl font-black leading-tight">کارنامه ارزیابی عملکرد</h1>
                    <p className="mt-2 text-slate-300 font-medium print:text-slate-300">دوره: اسفند ۱۴۰۳</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 min-w-[200px] print:border-white">
                    <div className="text-xs text-slate-300 mb-1">تاریخ صدور</div>
                    <div className="text-xl font-black font-mono">{today}</div>
                    <div className="mt-4 text-xs text-slate-300 mb-1">شماره پرونده</div>
                    <div className="text-lg font-bold font-mono tracking-wider">{reportData.id}</div>
                </div>
            </div>
        </div>

        <div className="p-8 lg:p-12 print:p-8">
            {/* Personnel Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 border-b border-slate-100 pb-12 print:grid-cols-3 print:gap-4 print:mb-8 print:pb-8">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 print:border print:border-slate-200">
                        <span className="material-symbols-outlined">person</span>
                    </div>
                    <div>
                        <div className="text-xs text-slate-400 font-bold mb-0.5">نام و نام خانوادگی</div>
                        <div className="text-lg font-black text-slate-800">{reportData.personName}</div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 print:border print:border-slate-200">
                        <span className="material-symbols-outlined">work</span>
                    </div>
                    <div>
                        <div className="text-xs text-slate-400 font-bold mb-0.5">واحد سازمانی</div>
                        <div className="text-lg font-black text-slate-800">{reportData.departmentName}</div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 print:border print:border-slate-200">
                        <span className="material-symbols-outlined">history_edu</span>
                    </div>
                    <div>
                        <div className="text-xs text-slate-400 font-bold mb-0.5">ارزیاب</div>
                        <div className="text-lg font-black text-slate-800">{reportData.evaluatorName}</div>
                    </div>
                </div>
            </div>

            {/* Scores Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 print:grid-cols-3 print:gap-4 print:mb-8">
                <div className="bg-blue-50 rounded-3xl p-6 border border-blue-100 flex flex-col items-center justify-center text-center print:border-slate-200 print:bg-white print:border-2">
                    <span className="text-blue-600 font-black text-5xl mb-2 print:text-slate-900">{reportData.totalScore}</span>
                    <span className="text-blue-400 font-bold text-sm print:text-slate-500">مجموع امتیازات</span>
                </div>
                <div className="bg-orange-50 rounded-3xl p-6 border border-orange-100 flex flex-col items-center justify-center text-center print:border-slate-200 print:bg-white print:border-2">
                    <span className="text-orange-500 font-black text-5xl mb-2 print:text-slate-900">%{reportData.achievementPercentage}</span>
                    <span className="text-orange-400 font-bold text-sm print:text-slate-500">درصد تحقق اهداف</span>
                </div>
                <div className="bg-green-50 rounded-3xl p-6 border border-green-100 flex flex-col items-center justify-center text-center print:border-slate-200 print:bg-white print:border-2">
                    <span className="text-green-600 font-black text-3xl mb-4 mt-2 print:text-slate-900">{reportData.level}</span>
                    <span className="text-green-500 font-bold text-sm print:text-slate-500">سطح عملکرد</span>
                </div>
            </div>

            {/* AI Insight */}
            <div className="bg-gradient-to-r from-slate-50 to-white rounded-3xl p-8 border border-slate-200 mb-12 relative overflow-hidden print:border print:border-slate-200 print:bg-white print:p-6 print:mb-8">
                <div className="absolute top-0 right-0 w-2 h-full bg-gradient-to-b from-blue-500 to-purple-500 print:bg-slate-800"></div>
                <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-blue-600 text-3xl mt-1 print:text-slate-800">auto_awesome</span>
                    <div className="space-y-2">
                        <h3 className="font-black text-slate-800 text-lg">تحلیل هوشمند عملکرد</h3>
                        <p className="text-slate-600 leading-loose text-justify pl-4 print:text-slate-800">
                            {aiSummary || "در حال بارگذاری تحلیل..."}
                        </p>
                    </div>
                </div>
            </div>

            {/* Detailed Criteria Grid */}
            <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2 print:mb-4">
                <span className="w-2 h-8 bg-slate-800 rounded-full print:bg-slate-800"></span>
                جزئیات شاخص‌های ارزیابی
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 print:grid-cols-2 print:gap-x-8 print:gap-y-6">
                {reportData.criteria.map((item, idx) => (
                    <div key={item.id} className="group break-inside-avoid">
                        <div className="flex justify-between items-baseline mb-3">
                            <h4 className="font-bold text-slate-700 text-sm pl-2 flex items-center gap-2 print:text-slate-900">
                                <span className="flex items-center justify-center w-6 h-6 rounded bg-slate-100 text-slate-500 text-xs font-mono font-bold print:border print:border-slate-200">
                                    {(idx + 1).toString()}
                                </span>
                                {item.name}
                            </h4>
                            <div className="text-sm font-black text-slate-900 whitespace-nowrap">
                                {item.score} <span className="text-slate-400 text-xs font-normal">/ {item.maxScore}</span>
                            </div>
                        </div>
                        {/* Progress Bar */}
                        <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden mb-2 print:bg-slate-200 print:h-2">
                            <div 
                                className={`h-full rounded-full transition-all duration-500 ${
                                    (item.score / item.maxScore) > 0.8 ? 'bg-green-500 print:bg-slate-800' : 
                                    (item.score / item.maxScore) > 0.5 ? 'bg-orange-400 print:bg-slate-600' : 'bg-red-400 print:bg-slate-400'
                                }`}
                                style={{ width: `${(item.score / item.maxScore) * 100}%` }}
                            ></div>
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-1 group-hover:line-clamp-none transition-all print:text-slate-500 print:line-clamp-none">
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>

            {/* Signatures Section */}
            <div className="mt-24 pt-10 border-t-2 border-slate-100 grid grid-cols-2 gap-12 text-center print:mt-16 print:pt-8">
                <div>
                    <div className="h-20 mb-4 flex items-center justify-center">
                        {/* Placeholder for Signature */}
                    </div>
                    <div className="font-bold text-slate-800">امضاء ارزیاب</div>
                    <div className="text-xs text-slate-400 mt-1">{reportData.evaluatorName}</div>
                </div>
                <div>
                    <div className="h-20 mb-4 flex items-center justify-center">
                         {/* Placeholder for Signature */}
                    </div>
                    <div className="font-bold text-slate-800">تاییدیه مدیریت منابع انسانی</div>
                    <div className="text-xs text-slate-400 mt-1">تجهیز گستر تامین سلامت</div>
                </div>
            </div>
            
            <div className="mt-12 text-center text-[10px] text-slate-300 font-mono print:text-slate-400">
                System Generated Report • ID: {reportData.id} • {new Date().toISOString().split('T')[0]}
            </div>

        </div>
      </div>
    </div>
  );
};

export default Report;
