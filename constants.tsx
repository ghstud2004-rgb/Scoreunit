
import { Department, EvaluationStatus, Criteria, EvaluationRecord, EvaluationTemplate } from './types';

// *** 1. USERS (Derived from Unique Evaluators in CSV) ***
export const AUTH_USERS = [
  { id: 'u1', username: 'admin', password: '123', role: 'مدیرعامل', name: 'ساسان میرزاخانلویی' },
  { id: 'u2', username: 'm.alizad', password: '123', role: 'مدیریت کارخانه', name: 'معصومه علیزاد' },
  { id: 'u3', username: 'h.armakan', password: '123', role: 'مدیر مالی', name: 'حمید ارمکان' },
  { id: 'u4', username: 's.pourebrahimi', password: '123', role: 'مدیر تضمین کیفیت', name: 'ساره پورابراهیمی' },
  { id: 'u5', username: 'a.sarkhil', password: '123', role: 'مدیر انبار', name: 'احمد سرخیل' },
  { id: 'u6', username: 'k.asius', password: '123', role: 'مدیر کنترل کیفیت', name: 'کژال آسیوس' },
  { id: 'u7', username: 'modir.fani', password: '123', role: 'مدیریت فنی', name: 'مدیر فنی' },
  { id: 'u8', username: 'modir.tolid', password: '123', role: 'مدیریت تولید', name: 'مدیر تولید' },
  { id: 'u9', username: 'h.abbasi', password: '123', role: 'سرشیفت تولید', name: 'هانیه عباسی دلبران' },
  { id: 'u10', username: 'p.gholami', password: '123', role: 'سرشیفت بسته بندی', name: 'پروانه غلامی' },
  { id: 'u11', username: 'm.sargazi', password: '123', role: 'سرشیفت کارتونینگ', name: 'مریم سرگزی' },
];

// *** 2. CRITERIA DEFINITIONS ***

// -- Generic Criteria (Office, Finance, Sales, etc.) --
const GENERIC_CRITERIA: Criteria[] = [
  { id: 'g1', category: 'عملکردی', name: 'کیفیت و دقت در انجام وظایف', description: 'انجام امور محوله با دقت بالا و کمترین خطا طبق شرح شغل.', score: 0, maxScore: 10, feedback: '' },
  { id: 'g2', category: 'رفتاری', name: 'نظم و انضباط سازمانی', description: 'رعایت ساعات ورود و خروج، پوشش مناسب و قوانین داخلی شرکت.', score: 0, maxScore: 10, feedback: '' },
  { id: 'g3', category: 'عملکردی', name: 'مسئولیت‌پذیری و پیگیری', description: 'تعهد به انجام کامل کارها و پیگیری تا حصول نتیجه نهایی.', score: 0, maxScore: 10, feedback: '' },
  { id: 'g4', category: 'رفتاری', name: 'تعامل و همکاری تیمی', description: 'برخورد مناسب با همکاران و ارباب رجوع و روحیه کار گروهی.', score: 0, maxScore: 10, feedback: '' },
];

// -- Shift Supervisor Criteria --
const SHIFT_SUPERVISOR_CRITERIA: Criteria[] = [
  { id: 'WE-S01', category: 'انجام کار', name: 'تحقق تارگت تولید و راندمان خط', description: 'مسئولیت مستقیم در قبال خروجی نهایی شیفت؛ مدیریت سرعت خط و رفع گلوگاه‌ها.', score: 0, maxScore: 15 },
  { id: 'WE-S02', category: 'انجام کار', name: 'تسلط فنی و تنظیمات دستگاه (Setup)', description: 'توانایی تنظیم دقیق و سریع دستگاه‌ها و رفع ایرادات فنی جزئی.', score: 0, maxScore: 15 },
  { id: 'WE-S03', category: 'انجام کار', name: 'کنترل کیفیت و کاهش ضایعات تیمی', description: 'نظارت مستمر بر اپراتورها برای جلوگیری از خطای انسانی و کاهش ضایعات.', score: 0, maxScore: 10 },
  { id: 'WE-S04', category: 'انجام کار', name: 'دقت در آمار و گزارش‌دهی تولید', description: 'ثبت دقیق و واقعی آمار تولید، توقفات و ضایعات در فرم‌های روزانه.', score: 0, maxScore: 10 },
  { id: 'DS-S01', category: 'نظم و مهارت', name: 'نظارت بر الزامات اتاق تمیز (GMP)', description: 'اعمال قانون و سخت‌گیری در مورد پوشش و رفتار بهداشتی پرسنل زیرمجموعه.', score: 0, maxScore: 10 },
  { id: 'DS-S02', category: 'نظم و مهارت', name: 'مدیریت 5S و نظافت صنعتی', description: 'مدیریت نظم کل سالن تولید و اطمینان از نظافت ایستگاه‌ها.', score: 0, maxScore: 10 },
  { id: 'DS-S03', category: 'نظم و مهارت', name: 'مدیریت تحویل و تحول شیفت', description: 'انتقال کامل اطلاعات به سرشیفت بعدی و عدم ترک سالن تا استقرار شیفت جدید.', score: 0, maxScore: 5 },
  { id: 'GC-S01', category: 'آموزش و ارتباطات', name: 'آموزش حین کار به پرسنل', description: 'تلاش برای ارتقای سطح مهارت تیم زیرمجموعه و آموزش نفرات جدید.', score: 0, maxScore: 10 },
  { id: 'GC-S02', category: 'آموزش و ارتباطات', name: 'مدیریت بحران و تاب‌آوری', description: 'حفظ خونسردی و مدیریت تیم در زمان خرابی‌ها یا فشار کاری بالا.', score: 0, maxScore: 5 },
  { id: 'GC-S03', category: 'آموزش و ارتباطات', name: 'تعامل با بالادست و سایر واحدها', description: 'ارتباط حرفه‌ای با مدیر تولید، QC و فنی.', score: 0, maxScore: 5 },
  { id: 'GC-S04', category: 'آموزش و ارتباطات', name: 'انضباط و الگوی رفتاری', description: 'رعایت دقیق قوانین توسط خود سرشیفت به عنوان الگو.', score: 0, maxScore: 5 }
];

// -- Production Operator Criteria --
const OPERATOR_CRITERIA: Criteria[] = [
  { id: 'WE-01', category: 'انجام کار', name: 'دقت عملیاتی و کیفیت فرآیند', description: 'تمرکز در اجرای مراحل تولید با هدف حذف خطای انسانی.', score: 0, maxScore: 10 },
  { id: 'WE-02', category: 'انجام کار', name: 'تحقق آمار تولید و کنترل ضایعات', description: 'دستیابی به تارگت کمی شیفت و حفظ نرخ ضایعات در محدوده مجاز.', score: 0, maxScore: 10 },
  { id: 'WE-03', category: 'انجام کار', name: 'صحت آزمون‌های عملکردی و بسته‌بندی', description: 'انجام دقیق تست‌های حین تولید و اطمینان از سیل‌بندی کامل.', score: 0, maxScore: 10 },
  { id: 'DS-01', category: 'نظم و مهارت', name: 'رعایت الزامات اتاق تمیز (Cleanroom)', description: 'پایبندی به پروتکل‌های گان‌گذاری و شستشو.', score: 0, maxScore: 10 },
  { id: 'DS-02', category: 'نظم و مهارت', name: 'نظم و نظافت ایستگاه کاری', description: 'اجرای اصول آراستگی و جلوگیری از انباشت مواد.', score: 0, maxScore: 5 },
  { id: 'DS-03', category: 'نظم و مهارت', name: 'نظم در تردد و حضور و غیاب', description: 'رعایت دقیق ساعت ورود/خروج و پرهیز از غیبت.', score: 0, maxScore: 5 },
  { id: 'DS-04', category: 'نظم و مهارت', name: 'حضور مؤثر در ایستگاه', description: 'استقرار به‌موقع در پست کاری.', score: 0, maxScore: 5 },
  { id: 'GC-01', category: 'آموزش و ارتباطات', name: 'آموزش‌پذیری و چابکی در یادگیری', description: 'اشتیاق و سرعت عمل در فراگیری کار با تجهیزات جدید.', score: 0, maxScore: 5 },
  { id: 'GC-02', category: 'آموزش و ارتباطات', name: 'روحیه مشارکت و کار تیمی', description: 'تعامل سازنده با سرشیفت و واحد QC.', score: 0, maxScore: 5 },
  { id: 'GC-03', category: 'آموزش و ارتباطات', name: 'انعطاف‌پذیری و تاب‌آوری', description: 'حفظ تمرکز در شرایط پرفشار.', score: 0, maxScore: 5 },
  { id: 'GC-04', category: 'آموزش و ارتباطات', name: 'مسئولیت‌پذیری و گزارش‌دهی', description: 'صداقت و سرعت در اطلاع‌رسانی مشکلات.', score: 0, maxScore: 5 }
];

// -- Warehouse Assistant Criteria --
const WAREHOUSE_ASSISTANT_CRITERIA: Criteria[] = [
  { id: 'WE-W01', category: 'انجام کار', name: 'تغذیه به‌موقع خط تولید', description: 'سرعت و دقت در تحویل کالا/مواد به واحد تولید مطابق درخواست‌ها جهت جلوگیری از توقف خط.', score: 0, maxScore: 10 },
  { id: 'WE-W02', category: 'انجام کار', name: 'نظافت و بهداشت انبار', description: 'اجرای دقیق برنامه نظافت قفسه‌ها و کف انبار برای جلوگیری از نشستن گرد و غبار روی بسته‌بندی محصولات استریل.', score: 0, maxScore: 10 },
  { id: 'WE-W03', category: 'انجام کار', name: 'چیدمان و جانمایی اصولی', description: 'قرار دادن صحیح کالاها در قفسه‌های مربوطه، استفاده بهینه از فضا و جلوگیری از انباشت نامنظم کالا در مسیرها.', score: 0, maxScore: 10 },
  { id: 'DS-W01', category: 'نظم و مهارت', name: 'رعایت اصول FIFO/FEFO', description: 'دقت در خروج کالا به ترتیب تاریخ ورود یا انقضا (بسیار حیاتی برای نخ بخیه و چسب آنژیوکت) جهت جلوگیری از ضایعات.', score: 0, maxScore: 10 },
  { id: 'DS-W02', category: 'نظم و مهارت', name: 'ایمنی و جابجایی کالا', description: 'استفاده صحیح از ابزارهای جابجایی (چرخ‌دستی/استکر) و رعایت اصول ایمنی برای جلوگیری از آسیب به خود و بسته‌بندی کالا.', score: 0, maxScore: 5 },
  { id: 'DS-W03', category: 'نظم و مهارت', name: 'دقت در شمارش و تگ‌گذاری', description: 'اطمینان از صحت تعداد اقلام جابجا شده و نصب درست برچسب‌ها یا کارت‌های شناسایی کالا بر روی پالت‌ها و کارتن‌ها.', score: 0, maxScore: 5 },
  { id: 'DS-W04', category: 'نظم و مهارت', name: 'نظم و حضور و غیاب', description: 'پایبندی به ساعات کاری، حضور در زمان تخلیه بار یا تحویل به تولید و عدم ترک غیرموجه انبار.', score: 0, maxScore: 5 },
  { id: 'GC-W01', category: 'آموزش و ارتباط', name: 'گزارش‌دهی مغایرت‌ها', description: 'اطلاع‌رسانی سریع به انباردار در صورت مشاهده کسری موجودی، خرابی بسته‌بندی یا نزدیک شدن به تاریخ انقضا.', score: 0, maxScore: 5 },
  { id: 'GC-W02', category: 'آموزش و ارتباط', name: 'روحیه همکاری و تیمی', description: 'تعامل مثبت با همکاران انبار و پرسنل تولید و سرعت در پاسخ به درخواست‌های فوری واحدها.', score: 0, maxScore: 5 },
  { id: 'GC-W03', category: 'آموزش و ارتباط', name: 'آموزش‌پذیری و یادگیری', description: 'سرعت در یادگیری کار با سیستم انبار، بارکدخوان یا روش‌های جدید بسته‌بندی و لیبل‌زنی.', score: 0, maxScore: 5 },
  { id: 'GC-W04', category: 'آموزش و ارتباط', name: 'مسئولیت‌پذیری و امانت', description: 'حفظ و حراست از اموال انبار و صداقت در گزارش حوادث یا اشتباهات احتمالی در حین جابجایی بار.', score: 0, maxScore: 5 },
];

// -- Financial Manager Criteria --
const FINANCIAL_MANAGER_CRITERIA: Criteria[] = [
  { id: 'WE-FIN01', category: 'انجام کار', name: 'مدیریت جریان نقدینگی (Cash Flow)', description: 'برنامه‌ریزی و پیش‌بینی دقیق منابع نقد جهت پرداخت به‌موقع حقوق، خرید مواد اولیه و اقساط بانکی؛ جلوگیری از رسوب نقدینگی یا کمبود ناگهانی.', score: 0, maxScore: 15 },
  { id: 'WE-FIN02', category: 'انجام کار', name: 'تحلیل بهای تمام شده (Costing)', description: 'محاسبه دقیق و به‌روز بهای تمام شده محصولات (نخ بخیه، گایدوایر و...) و تحلیل انحرافات مصرف مواد نسبت به استانداردهای تعریف شده تولید.', score: 0, maxScore: 15 },
  { id: 'WE-FIN03', category: 'انجام کار', name: 'صحت و سرعت گزارش‌گری مالی', description: 'تهیه و ارائه ترازنامه، صورت سود و زیان و گزارش‌های مدیریتی دقیق و بدون خطا در موعد مقرر (ماهانه/فصلی) جهت تصمیم‌گیری هیئت مدیره.', score: 0, maxScore: 10 },
  { id: 'WE-FIN04', category: 'انجام کار', name: 'مدیریت بودجه و تحلیل انحرافات', description: 'تدوین بودجه جامع سالانه و کنترل مستمر هزینه‌ها؛ شناسایی بخش‌هایی که بیش از بودجه مصوب هزینه کرده‌اند و ارائه هشدار به مدیریت ارشد.', score: 0, maxScore: 10 },
  { id: 'DS-FIN01', category: 'نظم و مهارت', name: 'انطباق با قوانین مالیاتی و بیمه', description: 'ارسال دقیق و به‌موقع اظهارنامه‌های ارزش افزوده، عملکرد، لیست بیمه و مالیات حقوق جهت جلوگیری از هرگونه جریمه یا مسدودی حساب.', score: 0, maxScore: 10 },
  { id: 'DS-FIN02', category: 'نظم و مهارت', name: 'استقرار و پایش کنترلهای داخلی', description: 'تعریف و نظارت بر فرآیندهای مالی (مثل تنخواه‌گردان، انبارگردانی و پرداختی‌ها) جهت پیشگیری از خطا، سوءاستفاده یا تضییع حقوق شرکت.', score: 0, maxScore: 10 },
  { id: 'DS-FIN03', category: 'نظم و مهارت', name: 'مدیریت دارایی‌ها و موجودی انبار', description: 'نظارت بر صحت ثبت ادواری دارایی‌های ثابت و مطابقت ریالی موجودی انبار با موجودی فیزیکی (جلوگیری از مغایرت انبار).', score: 0, maxScore: 5 },
  { id: 'GC-FIN01', category: 'آموزش و ارتباط', name: 'مشاوره مالی و استراتژیک به مدیریت', description: 'ارائه راهکارهای مالی برای کاهش مالیات، افزایش سودآوری و تحلیل نقاط سربه‌سر تولید برای محصولات جدید کارخانه.', score: 0, maxScore: 10 },
  { id: 'GC-FIN02', category: 'آموزش و ارتباط', name: 'تعامل با بانک‌ها و نهادهای خارجی', description: 'مدیریت روابط با بانک‌ها جهت اخذ تسهیلات، ضمانت‌نامه‌ها و همچنین تعامل حرفه‌ای با ممیزین مالیاتی و حسابرسان مستقل.', score: 0, maxScore: 5 },
  { id: 'GC-FIN03', category: 'آموزش و ارتباط', name: 'توسعه دانش مالی در سازمان', description: 'آموزش مفاهیم مالی پایه به سایر مدیران (مثل مدیر کارخانه یا فروش) جهت درک بهتر هزینه‌ها و همسویی با اهداف مالی شرکت.', score: 0, maxScore: 5 },
  { id: 'GC-FIN04', category: 'آموزش و ارتباط', name: 'مدیریت و انگیزش تیم مالی', description: 'نظارت بر عملکرد کارشناسان حسابداری، ارتقای سطح دانش فنی آن‌ها و حفظ نظم و اخلاق حرفه‌ای در واحد مالی.', score: 0, maxScore: 5 },
];

// -- Factory Manager Criteria --
const FACTORY_MANAGER_CRITERIA: Criteria[] = [
  { id: 'WE-FM01', category: 'انجام کار', name: 'تحقق برنامه کلان تولید (MPS)', description: 'مسئولیت مستقیم در قبال خروجی نهایی کارخانه؛ اطمینان از تولید محصولات طبق بودجه‌بندی سالانه و سفارشات ابلاغی از دفتر مرکزی.', score: 0, maxScore: 10 },
  { id: 'WE-FM02', category: 'انجام کار', name: 'مدیریت هزینه‌ها و بهای تمام شده', description: 'کنترل هزینه‌های سربار کارخانه، بهینه‌سازی مصرف انرژی و مواد اولیه، و کاهش هزینه‌های غیرضروری جهت حفظ حاشیه سود محصولات.', score: 0, maxScore: 10 },
  { id: 'WE-FM03', category: 'انجام کار', name: 'شاخص اثربخشی کل تجهیزات (OEE)', description: 'نظارت بر بهره‌وری کل خطوط تولید؛ تحلیل توقفات بزرگ و اطمینان از اینکه ظرفیت‌های بلااستفاده کارخانه به حداقل رسیده است.', score: 0, maxScore: 10 },
  { id: 'WE-FM04', category: 'انجام کار', name: 'انضباط زنجیره تأمین داخلی', description: 'هماهنگی بین انبار، خرید و تولید؛ اطمینان از اینکه گلوگاه مواد اولیه باعث توقف تولید نمی‌شود (بخصوص در نبود مدیر تولید).', score: 0, maxScore: 10 },
  { id: 'DS-FM01', category: 'نظم و مهارت', name: 'تضمین انطباق سیستمی و رگولاتوری', description: 'حفظ اعتبار پروانه‌های ساخت و گواهینامه‌های ISO؛ آمادگی دائمی کارخانه برای بازرسی‌های اداره تجهیزات پزشکی (IMED) بدون جریمه یا اخطار.', score: 0, maxScore: 10 },
  { id: 'DS-FM02', category: 'نظم و مهارت', name: 'نظارت بر ایمنی و بهداشت (HSE)', description: 'مسئولیت نهایی در قبال حوادث ناشی از کار و حفظ سلامت پرسنل؛ اطمینان از رعایت استانداردهای ایمنی در تمامی سطوح کارخانه.', score: 0, maxScore: 5 },
  { id: 'DS-FM03', category: 'نظم و مهارت', name: 'برنامه‌ریزی استراتژیک منابع', description: 'تخصیص بهینه نیروی انسانی و تجهیزات؛ پیش‌بینی نیازهای آتی کارخانه (ماشین‌آلات یا پرسنل تخصصی) و ارائه طرح توسعه به دفتر مرکزی.', score: 0, maxScore: 5 },
  { id: 'GC-FM01', category: 'آموزش و ارتباط', name: 'رهبری و فرهنگ سازمانی', description: 'ایجاد انگیزه در پرسنل، مدیریت تعارضات بین واحدها (مثلاً تولید و QC) و حفظ ثبات و آرامش روانی در محیط کارخانه.', score: 0, maxScore: 10 },
  { id: 'GC-FM02', category: 'آموزش و ارتباط', name: 'گزارش‌دهی استراتژیک به مدیریت ارشد', description: 'ارائه گزارش‌های تحلیلی و شفاف از وضعیت کارخانه به هیئت مدیره؛ تبدیل داده‌های خام تولید به اطلاعات تصمیم‌ساز مدیریتی.', score: 0, maxScore: 10 },
  { id: 'GC-FM03', category: 'آموزش و ارتباط', name: 'توسعه بدنه کارشناسی و جانشین‌پروری', description: 'شناسایی و ارتقای پرسنل مستعد؛ تلاش برای تربیت مدیران میانی (مانند مدیر تولید آینده) جهت کاهش وابستگی سازمان به شخص.', score: 0, maxScore: 5 },
  { id: 'GC-FM04', category: 'آموزش و ارتباط', name: 'مدیریت پروژه‌های بهبود (کایزن)', description: 'هدایت پروژه‌های بهبود کیفیت یا کاهش ضایعات در سطح کل کارخانه و تشویق نظام پیشنهادات موثر.', score: 0, maxScore: 5 },
];

// -- QA Manager Criteria --
const QA_MANAGER_CRITERIA: Criteria[] = [
  { id: 'WE-QAM01', category: 'انجام کار', name: 'اثربخشی سیستم مدیریت کیفیت (QMS)', description: 'نظارت بر اجرای دقیق فرآیندهای ISO 13485؛ کاهش تعداد عدم انطباق‌های (NC) شناسایی شده در ممیزی‌های داخلی و خارجی.', score: 0, maxScore: 10 },
  { id: 'WE-QAM02', category: 'انجام کار', name: 'مدیریت فرآیند CAPA', description: 'سرعت و کیفیت در اجرای اقدامات اصلاحی و پیشگیرانه؛ اطمینان از اینکه علل ریشه‌ای خطاها شناسایی و برای همیشه حذف شده‌اند.', score: 0, maxScore: 10 },
  { id: 'WE-QAM03', category: 'انجام کار', name: 'نظارت بر آزادسازی دسته‌های تولید (Release)', description: 'بررسی نهایی Batch Recordها و اطمینان از انطباق کامل فرآیند تولید و استریل با پروتکل‌ها قبل از صدور مجوز خروج محصول از انبار.', score: 0, maxScore: 10 },
  { id: 'WE-QAM04', category: 'انجام کار', name: 'مدیریت ممیزی تأمین‌کنندگان', description: 'ارزیابی دوره‌ای و فنی تأمین‌کنندگان مواد اولیه جهت اطمینان از تداوم کیفیت ورودی به کارخانه.', score: 0, maxScore: 5 },
  { id: 'DS-QAM01', category: 'نظم و مهارت', name: 'مدیریت ریسک (ISO 14971)', description: 'پیاده‌سازی و به‌روزرسانی مستمر فایل‌های مدیریت ریسک محصول؛ پیش‌بینی خطرات احتمالی برای بیمار و ارائه راهکارهای کنترلی.', score: 0, maxScore: 10 },
  { id: 'DS-QAM02', category: 'نظم و مهارت', name: 'صحه‌گذاری فرآیندها (Validation)', description: 'نظارت بر اجرای صحیح پروتکل‌های IQ/OQ/PQ برای تجهیزات تولید، استریل و هواسازها و اطمینان از معتبر بودن نتایج فرآیندهای ویژه.', score: 0, maxScore: 10 },
  { id: 'DS-QAM03', category: 'نظم و مهارت', name: 'کنترل مستندات و تغییرات (Change Control)', description: 'مدیریت دقیق تغییرات در نقشه محصولات، فرمولاسیون یا فرآیندها؛ اطمینان از اینکه هیچ تغییری بدون تحلیل ریسک و تأیید فنی انجام نمی‌شود.', score: 0, maxScore: 10 },
  { id: 'GC-QAM01', category: 'آموزش و ارتباط', name: 'تعامل با نهادهای قانونی (IMED)', description: 'پیگیری و تمدید پروانه‌های ساخت و کدهای IRC؛ پاسخگویی حرفه‌ای به بازرسان اداره کل تجهیزات پزشکی و رفع یافته‌های بازرسی.', score: 0, maxScore: 10 },
  { id: 'GC-QAM02', category: 'آموزش و ارتباط', name: 'ترویج فرهنگ کیفیت در سازمان', description: 'برگزاری دوره‌های آموزشی مفاهیم GMP و ISO برای تمامی سطوح سازمان؛ تبدیل "کیفیت" به یک باور عمومی در بین پرسنل.', score: 0, maxScore: 5 },
  { id: 'GC-QAM03', category: 'آموزش و ارتباط', name: 'پایش شاخص‌های رضایت مشتری', description: 'تحلیل داده‌های مربوط به شکایات یا نظرسنجی‌ها و تبدیل آن‌ها به پروژه‌های بهبود برای ارتقای سطح کیفی محصولات.', score: 0, maxScore: 5 },
];


// *** 3. FULL PERSONNEL LIST FROM CSV ***
interface PersonnelMap {
  evaluateeRole: string;
  evaluateeName: string;
  evaluatorRole: string;
  evaluatorName: string;
}

const PERSONNEL_LIST: PersonnelMap[] = [
  { evaluateeRole: 'مدیریت کارخانه', evaluateeName: 'معصومه علیزاد', evaluatorRole: 'مدیرعامل', evaluatorName: 'ساسان میرزاخانلویی' },
  { evaluateeRole: 'مدیر مالی', evaluateeName: 'حمید ارمکان', evaluatorRole: 'مدیرعامل', evaluatorName: 'ساسان میرزاخانلویی' },
  { evaluateeRole: 'مدیر تضمین کیفیت', evaluateeName: 'ساره پورابراهیمی', evaluatorRole: 'مدیرعامل', evaluatorName: 'ساسان میرزاخانلویی' },
  { evaluateeRole: 'مدیر انبار', evaluateeName: 'احمد سرخیل', evaluatorRole: 'مدیریت کارخانه', evaluatorName: 'معصومه علیزاد' },
  { evaluateeRole: 'مدیر کنترل کیفیت', evaluateeName: 'کژال آسیوس', evaluatorRole: 'مدیریت کارخانه', evaluatorName: 'معصومه علیزاد' },
  { evaluateeRole: 'مدیریت فنی', evaluateeName: 'مدیر فنی', evaluatorRole: 'مدیریت کارخانه', evaluatorName: 'معصومه علیزاد' },
  { evaluateeRole: 'مدیریت تولید', evaluateeName: 'مدیر تولید', evaluatorRole: 'مدیریت کارخانه', evaluatorName: 'معصومه علیزاد' },
  { evaluateeRole: 'مسئول IT', evaluateeName: 'یاور نجفی چالاوه', evaluatorRole: 'مدیریت کارخانه', evaluatorName: 'معصومه علیزاد' },
  { evaluateeRole: 'کارشناس تدارکات و پشتیبانی', evaluateeName: 'علیرضا احمدپور', evaluatorRole: 'مدیریت کارخانه', evaluatorName: 'معصومه علیزاد' },
  { evaluateeRole: 'کمک انباردار', evaluateeName: 'افشین بارانی خاوری', evaluatorRole: 'مدیر انبار', evaluatorName: 'احمد سرخیل' },
  { evaluateeRole: 'کارشناس کنترل کیفیت', evaluateeName: 'زهرا دوست اسفجیر', evaluatorRole: 'مدیر کنترل کیفیت', evaluatorName: 'کژال آسیوس' },
  { evaluateeRole: 'کارشناس کنترل کیفیت', evaluateeName: 'سوگند مهرعلی', evaluatorRole: 'مدیر کنترل کیفیت', evaluatorName: 'کژال آسیوس' },
  { evaluateeRole: 'کارشناس کنترل کیفیت', evaluateeName: 'محمدعلی قره شیخ لو', evaluatorRole: 'مدیر کنترل کیفیت', evaluatorName: 'کژال آسیوس' },
  { evaluateeRole: 'سرشیفت تولید', evaluateeName: 'هانیه عباسی دلبران', evaluatorRole: 'مدیریت تولید', evaluatorName: 'مدیر تولید' },
  { evaluateeRole: 'سرشیفت تولید', evaluateeName: 'کبرا نعمتی', evaluatorRole: 'مدیریت تولید', evaluatorName: 'مدیر تولید' },
  { evaluateeRole: 'سرشیفت بسته بندی', evaluateeName: 'پروانه غلامی', evaluatorRole: 'مدیریت تولید', evaluatorName: 'مدیر تولید' },
  { evaluateeRole: 'سرشیفت کارتونینگ', evaluateeName: 'مریم سرگزی', evaluatorRole: 'مدیریت تولید', evaluatorName: 'مدیر تولید' },
  { evaluateeRole: 'سرشیفت تولید', evaluateeName: 'زهرا بستاک', evaluatorRole: 'مدیریت تولید', evaluatorName: 'مدیر تولید' },
  { evaluateeRole: 'سرشیفت تولید', evaluateeName: 'زینب آریافرد', evaluatorRole: 'مدیریت تولید', evaluatorName: 'مدیر تولید' },
  { evaluateeRole: 'سرشیفت بسته بندی', evaluateeName: 'معصومه صحرائی', evaluatorRole: 'مدیریت تولید', evaluatorName: 'مدیر تولید' },
  { evaluateeRole: 'اپراتور', evaluateeName: 'مریم میربیک سبزواری', evaluatorRole: 'سرشیفت تولید', evaluatorName: 'هانیه عباسی دلبران' },
  { evaluateeRole: 'اپراتور', evaluateeName: 'زهرا وحیدیان بیات', evaluatorRole: 'سرشیفت تولید', evaluatorName: 'هانیه عباسی دلبران' },
  { evaluateeRole: 'اپراتور', evaluateeName: 'مریم نجارلو', evaluatorRole: 'سرشیفت تولید', evaluatorName: 'هانیه عباسی دلبران' },
  { evaluateeRole: 'اپراتور', evaluateeName: 'منصوره ترک', evaluatorRole: 'سرشیفت تولید', evaluatorName: 'هانیه عباسی دلبران' },
  { evaluateeRole: 'اپراتور', evaluateeName: 'کلثوم افشار', evaluatorRole: 'سرشیفت تولید', evaluatorName: 'هانیه عباسی دلبران' },
  { evaluateeRole: 'اپراتور', evaluateeName: 'فاطمه سجادی فر', evaluatorRole: 'سرشیفت تولید', evaluatorName: 'هانیه عباسی دلبران' },
  { evaluateeRole: 'اپراتور', evaluateeName: 'فاطمه تیموری', evaluatorRole: 'سرشیفت تولید', evaluatorName: 'هانیه عباسی دلبران' },
  { evaluateeRole: 'اپراتور', evaluateeName: 'بهاره عبدلی', evaluatorRole: 'سرشیفت تولید', evaluatorName: 'هانیه عباسی دلبران' },
  { evaluateeRole: 'اپراتور', evaluateeName: 'لیلا متدین', evaluatorRole: 'سرشیفت تولید', evaluatorName: 'هانیه عباسی دلبران' },
  { evaluateeRole: 'اپراتور', evaluateeName: 'وجیهه خادمی', evaluatorRole: 'سرشیفت تولید', evaluatorName: 'هانیه عباسی دلبران' },
  { evaluateeRole: 'اپراتور', evaluateeName: 'گلزار کنعانی', evaluatorRole: 'سرشیفت تولید', evaluatorName: 'هانیه عباسی دلبران' },
  { evaluateeRole: 'اپراتور', evaluateeName: 'منصوره تقوی', evaluatorRole: 'سرشیفت تولید', evaluatorName: 'هانیه عباسی دلبران' },
  { evaluateeRole: 'اپراتور', evaluateeName: 'آزاده بختیاری', evaluatorRole: 'سرشیفت تولید', evaluatorName: 'هانیه عباسی دلبران' },
  { evaluateeRole: 'اپراتور', evaluateeName: 'افسانه بی نیاز', evaluatorRole: 'سرشیفت تولید', evaluatorName: 'هانیه عباسی دلبران' },
  { evaluateeRole: 'اپراتور', evaluateeName: 'کبری رضوانی الوار', evaluatorRole: 'سرشیفت تولید', evaluatorName: 'هانیه عباسی دلبران' },
  { evaluateeRole: 'اپراتور', evaluateeName: 'فاطمه فعلی', evaluatorRole: 'سرشیفت تولید', evaluatorName: 'هانیه عباسی دلبران' },
  { evaluateeRole: 'اپراتور', evaluateeName: 'زهرا همتی باقرآبادی', evaluatorRole: 'سرشیفت تولید', evaluatorName: 'هانیه عباسی دلبران' },
  { evaluateeRole: 'اپراتور', evaluateeName: 'مهدیه ماماقانی', evaluatorRole: 'سرشیفت تولید', evaluatorName: 'هانیه عباسی دلبران' },
  { evaluateeRole: 'اپراتور', evaluateeName: 'اسراء مهدوی', evaluatorRole: 'سرشیفت تولید', evaluatorName: 'هانیه عباسی دلبران' },
  { evaluateeRole: 'اپراتور', evaluateeName: 'عاطفه صفری', evaluatorRole: 'سرشیفت تولید', evaluatorName: 'هانیه عباسی دلبران' },
  { evaluateeRole: 'اپراتور', evaluateeName: 'راضیه مشهدی', evaluatorRole: 'سرشیفت تولید', evaluatorName: 'هانیه عباسی دلبران' },
  { evaluateeRole: 'اپراتور', evaluateeName: 'فاطمه مرادی', evaluatorRole: 'سرشیفت تولید', evaluatorName: 'هانیه عباسی دلبران' },
  { evaluateeRole: 'اپراتور', evaluateeName: 'مطهره زرین', evaluatorRole: 'سرشیفت تولید', evaluatorName: 'هانیه عباسی دلبران' },
  { evaluateeRole: 'اپراتور', evaluateeName: 'مریم ساکی', evaluatorRole: 'سرشیفت تولید', evaluatorName: 'هانیه عباسی دلبران' },
  { evaluateeRole: 'اپراتور', evaluateeName: 'الهام امیریان', evaluatorRole: 'سرشیفت تولید', evaluatorName: 'هانیه عباسی دلبران' },
  { evaluateeRole: 'اپراتور', evaluateeName: 'معصومه نعمتی', evaluatorRole: 'سرشیفت بسته بندی', evaluatorName: 'پروانه غلامی' },
  { evaluateeRole: 'اپراتور', evaluateeName: 'سمیه شاکرمی', evaluatorRole: 'سرشیفت بسته بندی', evaluatorName: 'پروانه غلامی' },
  { evaluateeRole: 'اپراتور', evaluateeName: 'زهرا آزادبخت', evaluatorRole: 'سرشیفت بسته بندی', evaluatorName: 'پروانه غلامی' },
  { evaluateeRole: 'اپراتور', evaluateeName: 'چنور رحیمی ملکشان', evaluatorRole: 'سرشیفت بسته بندی', evaluatorName: 'پروانه غلامی' },
  { evaluateeRole: 'اپراتور', evaluateeName: 'هاجر ایاز', evaluatorRole: 'سرشیفت بسته بندی', evaluatorName: 'پروانه غلامی' },
  { evaluateeRole: 'اپراتور', evaluateeName: 'ناهید امیری حسن آباد', evaluatorRole: 'سرشیفت بسته بندی', evaluatorName: 'پروانه غلامی' },
  { evaluateeRole: 'اپراتور', evaluateeName: 'فرحناز ماهرو', evaluatorRole: 'سرشیفت بسته بندی', evaluatorName: 'پروانه غلامی' },
  { evaluateeRole: 'اپراتور', evaluateeName: 'سکینه طالب میر', evaluatorRole: 'سرشیفت کارتونینگ', evaluatorName: 'مریم سرگزی' },
  { evaluateeRole: 'اپراتور', evaluateeName: 'خدیجه افراسیابی جولاندان', evaluatorRole: 'سرشیفت کارتونینگ', evaluatorName: 'مریم سرگزی' },
  { evaluateeRole: 'اپراتور', evaluateeName: 'فاطمه حیات الغیب', evaluatorRole: 'سرشیفت کارتونینگ', evaluatorName: 'مریم سرگزی' },
  { evaluateeRole: 'اپراتور', evaluateeName: 'منصوره حمیدی', evaluatorRole: 'سرشیفت کارتونینگ', evaluatorName: 'مریم سرگزی' },
  { evaluateeRole: 'اپراتور', evaluateeName: 'پریسا محمدی', evaluatorRole: 'سرشیفت تولید', evaluatorName: 'هانیه عباسی دلبران' },
  { evaluateeRole: 'اپراتور', evaluateeName: 'سمیرا دلفان', evaluatorRole: 'سرشیفت بسته بندی', evaluatorName: 'پروانه غلامی' },
  { evaluateeRole: 'اپراتور', evaluateeName: 'صغری محمدخانی', evaluatorRole: 'سرشیفت بسته بندی', evaluatorName: 'پروانه غلامی' },
  { evaluateeRole: 'کارشناس ایمنی و بهداشت', evaluateeName: 'حامد کاشی', evaluatorRole: 'مدیریت کارخانه', evaluatorName: 'معصومه علیزاد' },
  { evaluateeRole: 'خدمات', evaluateeName: 'آمنه اکاتی وظیفه خواه', evaluatorRole: 'مدیریت کارخانه', evaluatorName: 'معصومه علیزاد' },
  { evaluateeRole: 'خدمات', evaluateeName: 'سارا حاجیوندالماسی', evaluatorRole: 'مدیریت کارخانه', evaluatorName: 'معصومه علیزاد' },
  { evaluateeRole: 'کارشناس تولید', evaluateeName: 'اکرم حیدریان', evaluatorRole: 'مدیریت کارخانه', evaluatorName: 'معصومه علیزاد' },
  { evaluateeRole: 'تکنسین فنی', evaluateeName: 'محمود احمدی', evaluatorRole: 'مدیریت فنی', evaluatorName: 'مدیر فنی' },
  { evaluateeRole: 'تکنسین استریل', evaluateeName: 'بهمن عروجی', evaluatorRole: 'مدیریت کارخانه', evaluatorName: 'معصومه علیزاد' },
  { evaluateeRole: 'نگهبان', evaluateeName: 'کیوان نجفی چالاوه', evaluatorRole: 'مدیریت کارخانه', evaluatorName: 'معصومه علیزاد' },
  { evaluateeRole: 'کارشناس منابع انسانی', evaluateeName: 'زینب چگنی', evaluatorRole: 'مدیریت کارخانه', evaluatorName: 'معصومه علیزاد' },
  { evaluateeRole: 'کارشناس تضمین کیفیت', evaluateeName: 'علیرضا شایسته ', evaluatorRole: 'مدیر تضمین کیفیت', evaluatorName: 'ساره پورابراهیمی' },
  { evaluateeRole: 'معاون اجرایی مدیرعامل', evaluateeName: 'هادی راهی', evaluatorRole: 'مدیرعامل', evaluatorName: 'ساسان میرزاخانلویی' },
  { evaluateeRole: 'انباردار اتاق تمیز', evaluateeName: 'سحر عبادی مطلق', evaluatorRole: 'مدیریت کارخانه', evaluatorName: 'معصومه علیزاد' },
  { evaluateeRole: 'مسئول دفتر ', evaluateeName: 'مهناز عبادی', evaluatorRole: 'مدیرعامل', evaluatorName: 'ساسان میرزاخانلویی' },
  { evaluateeRole: 'سرپرست محصول', evaluateeName: 'آرزو کامیار', evaluatorRole: 'مدیرعامل', evaluatorName: 'ساسان میرزاخانلویی' },
  { evaluateeRole: 'کارشناس فروش', evaluateeName: 'مریم عسکری نژاد بهادران', evaluatorRole: 'مدیرعامل', evaluatorName: 'ساسان میرزاخانلویی' },
  { evaluateeRole: 'کارشناس محصول', evaluateeName: 'مجید قندهاری فرد', evaluatorRole: 'مدیرعامل', evaluatorName: 'ساسان میرزاخانلویی' },
  { evaluateeRole: 'کارشناس محصول', evaluateeName: 'مهبد دهقانی سامانی', evaluatorRole: 'مدیرعامل', evaluatorName: 'ساسان میرزاخانلویی' },
  { evaluateeRole: 'کارشناس محصول( نخ پویندگان)', evaluateeName: 'عارفه اسدی ساوهء', evaluatorRole: 'مدیرعامل', evaluatorName: 'ساسان میرزاخانلویی' },
  { evaluateeRole: 'سرپرست محصول نخ ', evaluateeName: 'مهشاد کریمی', evaluatorRole: 'مدیرعامل', evaluatorName: 'ساسان میرزاخانلویی' },
  { evaluateeRole: 'کارشناس رگولاتوری و تضمین کیفیت', evaluateeName: 'فاطمه محمدی', evaluatorRole: 'مدیر تضمین کیفیت', evaluatorName: 'ساره پورابراهیمی' },
  { evaluateeRole: 'رئیس حسابداری', evaluateeName: 'فرشاد معمارمحمدی', evaluatorRole: 'مدیر مالی', evaluatorName: 'حمید ارمکان' },
  { evaluateeRole: 'کارشناس ارشد حسابداری', evaluateeName: 'خدیجه قربانی گلدهی', evaluatorRole: 'مدیر مالی', evaluatorName: 'حمید ارمکان' },
  { evaluateeRole: 'کارشناس حسابداری', evaluateeName: 'شقایق افلاکی', evaluatorRole: 'مدیر مالی', evaluatorName: 'حمید ارمکان' },
  { evaluateeRole: 'کارشناس حسابداری', evaluateeName: 'صفا غفاری نیا', evaluatorRole: 'مدیر مالی', evaluatorName: 'حمید ارمکان' },
  { evaluateeRole: 'طراح', evaluateeName: 'مرضیه خوشدل', evaluatorRole: 'مدیرعامل', evaluatorName: 'ساسان میرزاخانلویی' },
  { evaluateeRole: 'اپراتور', evaluateeName: 'محمد انوری', evaluatorRole: 'سرشیفت کارتونینگ', evaluatorName: 'مریم سرگزی' },
  { evaluateeRole: 'کارشناس تضمین کیفیت', evaluateeName: 'زهرا مصطفوی نیا', evaluatorRole: 'مدیر تضمین کیفیت', evaluatorName: 'ساره پورابراهیمی' },
  { evaluateeRole: 'مسئول دفتر', evaluateeName: 'مریم صفری', evaluatorRole: 'مدیریت کارخانه', evaluatorName: 'معصومه علیزاد' },
  { evaluateeRole: 'کارشناس ارشد حسابداری', evaluateeName: 'مهدیه حسنی', evaluatorRole: 'مدیر مالی', evaluatorName: 'حمید ارمکان' },
  { evaluateeRole: 'اپراتور', evaluateeName: 'لیلا یقینی', evaluatorRole: 'سرشیفت تولید', evaluatorName: 'هانیه عباسی دلبران' },
  { evaluateeRole: 'اپراتور', evaluateeName: 'مریم ابراهیم زاده', evaluatorRole: 'سرشیفت بسته بندی', evaluatorName: 'پروانه غلامی' },
  { evaluateeRole: 'نگهبان', evaluateeName: 'محمد جعفری', evaluatorRole: 'مدیریت کارخانه', evaluatorName: 'معصومه علیزاد' },
  { evaluateeRole: 'کارشناس برنامه ریزی', evaluateeName: 'قانع جلالی', evaluatorRole: 'مدیریت کارخانه', evaluatorName: 'معصومه علیزاد' },
];

// Helper to generate simple IDs
const generateId = (idx: number) => `p-${idx + 1000}`;

// *** 4. GENERATE DEPARTMENTS AND TEMPLATES ***

const generatedDepartments: Department[] = [];
const generatedTemplates: Record<string, EvaluationTemplate> = {};

PERSONNEL_LIST.forEach((record, index) => {
  const pId = generateId(index);
  
  // Determine Criteria based on Evaluatee Role
  let criteria = GENERIC_CRITERIA;

  if (record.evaluateeName === 'حمید ارمکان' && record.evaluateeRole === 'مدیر مالی') {
    criteria = FINANCIAL_MANAGER_CRITERIA;
  } else if (record.evaluateeName === 'معصومه علیزاد' && record.evaluateeRole === 'مدیریت کارخانه') {
    criteria = FACTORY_MANAGER_CRITERIA;
  } else if (record.evaluateeName === 'ساره پورابراهیمی' && record.evaluateeRole === 'مدیر تضمین کیفیت') {
    criteria = QA_MANAGER_CRITERIA;
  } else if (record.evaluateeRole.includes('اپراتور')) {
    criteria = OPERATOR_CRITERIA;
  } else if (record.evaluateeRole.includes('سرشیفت')) {
    criteria = SHIFT_SUPERVISOR_CRITERIA;
  } else if (record.evaluateeRole.includes('انبار') && !record.evaluateeRole.includes('مدیر')) {
    criteria = WAREHOUSE_ASSISTANT_CRITERIA;
  }

  // Create Department (Evaluation Target)
  // STRICT AUTHORIZATION: Only the specific Evaluator Role listed in CSV can see this.
  // We removed 'مدیرعامل' from the default list to prevent blanket access.
  const authorizedRoles = [record.evaluatorRole];
  
  generatedDepartments.push({
    id: pId,
    name: `ارزیابی ${record.evaluateeName}`,
    lastEvaluationDate: '۱۴۰۳/۱۲/۰۱', // Current period
    status: Math.random() > 0.7 ? EvaluationStatus.COMPLETED : EvaluationStatus.PENDING,
    daysRemaining: Math.floor(Math.random() * 14) + 1,
    authorizedRoles: authorizedRoles
  });

  // Create Template
  generatedTemplates[pId] = {
    departmentId: pId,
    departmentName: record.evaluateeRole, // Use Role as Department Name for clarity
    evaluateeName: record.evaluateeName,
    evaluateeRole: record.evaluateeRole,
    evaluatorName: record.evaluatorName,
    evaluatorRole: record.evaluatorRole,
    criteria: JSON.parse(JSON.stringify(criteria)) // Deep copy
  };
});

export const DEPARTMENTS: Department[] = generatedDepartments;
export const EVALUATION_TEMPLATES: Record<string, EvaluationTemplate> = generatedTemplates;

// Exports for compatibility (can be removed later if not used directly)
export const INITIAL_CRITERIA = GENERIC_CRITERIA;
export const FINANCIAL_CRITERIA = FINANCIAL_MANAGER_CRITERIA;

export const WAREHOUSE_DATA: EvaluationTemplate = {
  departmentId: 'warehouse-mock',
  departmentName: 'انبار (نمونه)',
  evaluateeName: 'احمد سرخیل',
  evaluateeRole: 'مدیر انبار',
  evaluatorName: 'معصومه علیزاد',
  evaluatorRole: 'مدیریت کارخانه',
  criteria: JSON.parse(JSON.stringify(GENERIC_CRITERIA))
};

export const MOCK_REPORT: EvaluationRecord = {
  id: 'TZ-9842104',
  personName: 'احمد سرخیل',
  departmentName: 'انبار',
  evaluatorName: 'معصومه علیزاد',
  date: '۱۴۰۴/۱۱/۲۴',
  criteria: GENERIC_CRITERIA,
  totalScore: 34,
  maxTotalScore: 40,
  achievementPercentage: 85,
  level: 'خیلی خوب'
};
