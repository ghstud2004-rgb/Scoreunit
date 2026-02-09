
import React, { useState } from 'react';
import { User, Criteria } from '../types';
import { INITIAL_CRITERIA } from '../constants';

interface EvaluationFormProps {
  user: User | null;
  deptId: string | null;
  onBack: () => void;
  onSuccess: () => void;
}

const EvaluationForm: React.FC<EvaluationFormProps> = ({ user, deptId, onBack, onSuccess }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [criteria, setCriteria] = useState<Criteria[]>(INITIAL_CRITERIA);

  const currentItem = criteria[currentStep];

  const handleScoreChange = (score: number) => {
    const updated = [...criteria];
    updated[currentStep].score = score;
    setCriteria(updated);
  };

  const handleFeedbackChange = (text: string) => {
    const updated = [...criteria];
    updated[currentStep].feedback = text;
    setCriteria(updated);
  };

  const handleNext = () => {
    if (currentStep < criteria.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <header className="bg-white border-b border-slate-100 h-20 flex items-center justify-between px-6 lg:px-12 sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
             <span className="material-symbols-outlined text-blue-600 text-3xl">medical_services</span>
             <div className="h-8 w-px bg-slate-100 hidden md:block"></div>
             <h1 className="hidden md:block text-slate-800 text-lg font-black tracking-tight">تجهیز گستر تامین سلامت</h1>
          </div>
        </div>

        <div className="flex flex-col text-right">
          <span className="text-sm font-black text-slate-800">{user?.name}</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">مدیر کارخانه</span>
        </div>
      </header>

      <main className="flex-1 py-12 px-6 flex justify-center">
        <div className="w-full max-w-3xl space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <nav className="flex items-center text-sm font-black text-slate-400">
              <button onClick={onBack} className="hover:text-blue-600 transition-colors">داشبورد</button>
              <span className="mx-3 text-slate-200">/</span>
              <span className="text-slate-800">ارزیابی عملکرد</span>
            </nav>
            <div className="flex items-center gap-2 text-sm font-black text-blue-600 bg-blue-50 px-5 py-2.5 rounded-full border border-blue-100 shadow-sm">
              <span className="material-symbols-outlined text-base">task_alt</span>
              <span>شاخص {currentStep + 1} از {criteria.length}</span>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-black text-slate-900 leading-tight">واحد ارزیابی: <span className="text-blue-600">انبار کارخانه</span></h2>
            <div className="flex items-center gap-4 text-slate-400 font-bold">
              <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-lg">person</span><span>احمد سرخیل</span></div>
              <span className="size-1 bg-slate-200 rounded-full"></span>
              <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-lg">update</span><span>دوره زمستان ۱۴۰۳</span></div>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-slate-100 p-8 sm:p-14 space-y-12">
            <div className="space-y-5">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-slate-800 leading-tight">
                    <span className="text-slate-500 font-bold ml-1">عنوان شاخص :</span>
                    {currentItem.name}
                  </h3>
                </div>
                <div className="size-16 bg-blue-50 rounded-3xl flex items-center justify-center text-blue-600 border border-blue-100 shadow-inner">
                  <span className="material-symbols-outlined text-4xl">analytics</span>
                </div>
              </div>
              <p className="text-slate-500 text-lg font-medium leading-relaxed">{currentItem.description}</p>
            </div>

            <div className="space-y-10 bg-slate-50/50 p-10 rounded-[2rem] border border-slate-100 shadow-sm">
              <div className="flex justify-between items-center">
                <label className="text-xl font-black text-slate-800">امتیاز تخصیص یافته</label>
                <div className="flex items-baseline gap-2 bg-white px-6 py-3 rounded-2xl shadow-md border border-slate-100">
                  <span className="text-5xl font-black text-blue-600">{currentItem.score}</span>
                  <span className="text-slate-300 font-black text-xl">/ ۱۰</span>
                </div>
              </div>
              
              <div className="relative pt-4">
                <input 
                  type="range" 
                  min="1" 
                  max="10" 
                  value={currentItem.score}
                  onChange={(e) => handleScoreChange(parseInt(e.target.value))}
                  className="w-full h-3 bg-slate-200 rounded-full appearance-none cursor-pointer"
                />
                <div className="flex justify-between mt-6 text-[11px] font-black text-slate-400 px-1">
                  <span className="text-red-400">(۱) ضعیف</span>
                  <span className="text-orange-400">(۵) متوسط</span>
                  <span className="text-green-500">(۱۰) عالی</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-black text-slate-700 flex items-center gap-2">
                  <span className="material-symbols-outlined text-blue-600">rate_review</span>
                  گزارش توصیفی ارزیاب (در صورت نیاز)
                </label>
              </div>
              <textarea 
                rows={4}
                value={currentItem.feedback}
                onChange={(e) => handleFeedbackChange(e.target.value)}
                placeholder="توضیحات تکمیلی یا شواهد عینی عملکرد را در این بخش وارد کنید..."
                className="w-full rounded-2xl border-2 border-slate-50 bg-slate-50/50 p-6 text-slate-800 font-medium focus:border-blue-500 focus:bg-white transition-all outline-none resize-none shadow-inner"
              ></textarea>
            </div>

            <div className="pt-10 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
              {currentStep === criteria.length - 1 ? (
                <button 
                  onClick={onSuccess}
                  className="flex-1 bg-slate-900 hover:bg-black text-white text-lg font-black py-5 px-10 rounded-2xl shadow-xl shadow-slate-900/20 transition-all flex items-center justify-center gap-3"
                >
                  <span className="material-symbols-outlined">verified</span>
                  تایید و نهایی‌سازی گزارش
                </button>
              ) : (
                <button 
                  onClick={handleNext}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-lg font-black py-5 px-10 rounded-2xl shadow-xl shadow-blue-600/20 transition-all flex items-center justify-center gap-3"
                >
                  تایید شاخص و بعدی
                  <span className="material-symbols-outlined">arrow_back</span>
                </button>
              )}
              
              <div className="flex gap-3">
                <button 
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  className="px-8 py-5 rounded-2xl bg-white border border-slate-200 text-slate-800 font-black hover:bg-slate-50 transition-all disabled:opacity-20 flex items-center gap-2 shadow-sm"
                >
                  <span className="material-symbols-outlined">arrow_forward</span>
                  قبلی
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EvaluationForm;
