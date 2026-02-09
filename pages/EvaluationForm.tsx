
import React, { useState } from 'react';
import { User, Criteria } from '../types';
import { INITIAL_CRITERIA } from '../constants';
import { getAIFeedbackSuggestion } from '../services/geminiService';

interface EvaluationFormProps {
  user: User | null;
  deptId: string | null;
  onBack: () => void;
  onSuccess: () => void;
}

const EvaluationForm: React.FC<EvaluationFormProps> = ({ user, deptId, onBack, onSuccess }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [criteria, setCriteria] = useState<Criteria[]>(INITIAL_CRITERIA);
  const [isSuggesting, setIsSuggesting] = useState(false);

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

  const handleSuggestFeedback = async () => {
    setIsSuggesting(true);
    const suggestion = await getAIFeedbackSuggestion(currentItem.name, currentItem.score);
    handleFeedbackChange(suggestion);
    setIsSuggesting(false);
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
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 h-20 flex items-center justify-between px-6 lg:px-12 sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
             <span className="material-symbols-outlined text-blue-600 text-3xl">medical_services</span>
             <div className="hidden md:block h-8 w-px bg-slate-100"></div>
             <h1 className="hidden md:block text-slate-900 text-lg font-bold">تجهیز گستر تامین سلامت</h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200">
              <span className="material-symbols-outlined text-slate-400 text-xl">person</span>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-sm font-bold">{user?.name}</span>
              <span className="text-[10px] text-slate-400">ارزیاب سیستم</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 py-12 px-6 flex justify-center bg-slate-50">
        <div className="w-full max-w-3xl space-y-8">
          {/* Breadcrumb & Progress */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <nav className="flex items-center text-sm font-medium text-slate-400">
              <button onClick={onBack} className="hover:text-blue-600 transition-colors">داشبورد</button>
              <span className="mx-3 text-slate-200">/</span>
              <span className="text-slate-900 font-bold">ارزیابی آقای احمد سرخیل</span>
            </nav>
            <div className="flex items-center gap-2 text-sm font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-full border border-blue-100">
              <span className="material-symbols-outlined text-base">task_alt</span>
              <span>{currentStep + 1} از {criteria.length} شاخص</span>
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">ارزیابی: <span className="text-blue-600">آقای احمد سرخیل</span></h2>
            <div className="flex items-center gap-4 text-slate-400 text-lg">
              <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-lg">factory</span><span>واحد انبار</span></div>
              <span className="size-1.5 bg-slate-300 rounded-full"></span>
              <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-lg">calendar_today</span><span>دوره جاری</span></div>
            </div>
          </div>

          {/* Card */}
          <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-8 sm:p-12 space-y-12">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <span className="bg-blue-100 text-blue-600 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">شاخص کلیدی</span>
                  <h3 className="text-2xl font-black text-slate-900">{currentItem.name}</h3>
                </div>
                <div className="size-14 bg-slate-50 rounded-2xl flex items-center justify-center text-blue-600 border border-slate-100">
                  <span className="material-symbols-outlined text-3xl">analytics</span>
                </div>
              </div>
              <p className="text-slate-500 text-lg leading-relaxed max-w-2xl">{currentItem.description}</p>
            </div>

            {/* Score Slider */}
            <div className="space-y-8 bg-slate-50/50 p-8 rounded-3xl border border-slate-100">
              <div className="flex justify-between items-center">
                <label className="text-xl font-black">امتیاز نهایی</label>
                <div className="flex items-baseline gap-1.5 bg-white px-5 py-2 rounded-2xl shadow-sm border border-slate-100">
                  <span className="text-4xl font-black text-blue-600">{currentItem.score}</span>
                  <span className="text-slate-400 font-bold text-xl">/ ۱۰</span>
                </div>
              </div>
              
              <div className="relative group">
                <input 
                  type="range" 
                  min="1" 
                  max="10" 
                  value={currentItem.score}
                  onChange={(e) => handleScoreChange(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between px-1 mt-4 text-xs font-bold text-slate-400">
                  <span>ضعیف (۱)</span>
                  <span className="mr-6">متوسط (۵)</span>
                  <span>عالی (۱۰)</span>
                </div>
              </div>
            </div>

            {/* AI Feedback Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-base font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-2xl text-blue-600">edit_note</span>
                  توضیحات و ملاحظات ارزیاب (اختیاری)
                </label>
                <button 
                  onClick={handleSuggestFeedback}
                  disabled={isSuggesting}
                  className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-all flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-base">{isSuggesting ? 'sync' : 'auto_awesome'}</span>
                  {isSuggesting ? 'درحال پردازش...' : 'پیشنهاد هوشمند'}
                </button>
              </div>
              <textarea 
                rows={4}
                value={currentItem.feedback}
                onChange={(e) => handleFeedbackChange(e.target.value)}
                placeholder="توضیحات خود را اینجا بنویسید..."
                className="w-full rounded-2xl border-slate-100 bg-slate-50 p-5 text-slate-900 focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all outline-none resize-none"
              ></textarea>
            </div>

            {/* Actions */}
            <div className="pt-10 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
              {currentStep === criteria.length - 1 ? (
                <button 
                  onClick={onSuccess}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-lg font-black py-4 px-10 rounded-2xl shadow-xl shadow-blue-600/20 transition-all flex items-center justify-center gap-3"
                >
                  <span className="material-symbols-outlined">check_circle</span>
                  ثبت و تایید نهایی
                </button>
              ) : (
                <button 
                  onClick={handleNext}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-lg font-black py-4 px-10 rounded-2xl shadow-xl shadow-blue-600/20 transition-all flex items-center justify-center gap-3"
                >
                  تایید و بعدی
                  <span className="material-symbols-outlined">arrow_back</span>
                </button>
              )}
              
              <div className="flex gap-3">
                <button 
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  className="px-8 py-4 rounded-2xl bg-white border border-slate-200 text-slate-900 font-bold hover:bg-slate-50 transition-all disabled:opacity-30 flex items-center gap-2"
                >
                  <span className="material-symbols-outlined">arrow_forward</span>
                  قبلی
                </button>
                <button 
                  onClick={onBack}
                  className="px-8 py-4 rounded-2xl bg-white border border-slate-200 text-slate-900 font-bold hover:bg-slate-50 transition-all flex items-center gap-2"
                >
                  انصراف
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
