
import { Department, EvaluationStatus, Criteria, EvaluationRecord } from './types';

export const DEPARTMENTS: Department[] = [
  { id: '1', name: 'واحد انبارها', lastEvaluationDate: '۱۴۰۴/۱۱/۲۵', status: EvaluationStatus.PENDING, daysRemaining: 5 },
  { id: '2', name: 'کنترل کیفیت (QC)', lastEvaluationDate: '۱۴۰۴/۱۱/۳۰', status: EvaluationStatus.OVERDUE },
  { id: '3', name: 'منابع انسانی', lastEvaluationDate: '۱۴۰۴/۱۱/۱۸', status: EvaluationStatus.PENDING, daysRemaining: 1 },
  { id: '4', name: 'پشتیبانی فنی', lastEvaluationDate: '۱۴۰۴/۱۱/۰۲', status: EvaluationStatus.PENDING, daysRemaining: 12 },
  { id: '5', name: 'تدارکات', lastEvaluationDate: '۱۴۰۴/۱۰/۲۷', status: EvaluationStatus.PENDING, daysRemaining: 2 },
];

export const INITIAL_CRITERIA: Criteria[] = [
  {
    id: 'c1',
    name: 'سرعت عمل در تامین نیاز خطوط تولید',
    description: 'ارزیابی توانایی فرد در پردازش سریع درخواست‌های کالا و تحویل به موقع مواد اولیه به خطوط تولید جهت جلوگیری از توقف کار.',
    score: 8,
    maxScore: 10,
    feedback: 'عملکرد مناسب در شیفت‌های فشرده و بحرانی و هماهنگی بالا'
  },
  {
    id: 'c2',
    name: 'دقت در چیدمان و سیستم کدگذاری کالا',
    description: 'رعایت استانداردهای ۵S و دقت در ورود اطلاعات به سامانه انبارداری.',
    score: 9,
    maxScore: 10,
    feedback: 'رعایت کامل استانداردهای انبارداری ۵S و چیدمان بهینه'
  },
  {
    id: 'c3',
    name: 'نظم و انضباط فردی و حضور به موقع',
    description: 'حضور منظم در محل کار و رعایت قوانین شرکت.',
    score: 10,
    maxScore: 10,
    feedback: 'انضباط مثال‌زدنی، بدون تاخیر یا غیبت در بازه ارزیابی'
  },
  {
    id: 'c4',
    name: 'همکاری تیمی و روحیه مشارکت',
    description: 'تعامل سازنده با همکاران و واحدهای دیگر.',
    score: 7,
    maxScore: 10,
    feedback: 'نیاز به بهبود در تعاملات کلامی و مهارت‌های ارتباطی بین واحدی'
  }
];

export const MOCK_REPORT: EvaluationRecord = {
  id: 'TZ-9842104',
  personName: 'آقای احمد سرخیل',
  departmentName: 'انبار کارخانه',
  evaluatorName: 'خانم علیزاد',
  date: '۱۴۰۴/۰۸/۲۴',
  criteria: INITIAL_CRITERIA,
  totalScore: 34,
  maxTotalScore: 40,
  achievementPercentage: 85,
  level: 'خیلی خوب'
};
