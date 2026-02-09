
import { GoogleGenAI } from "@google/genai";

const getAIClient = () => {
  // Safe access to process.env
  const apiKey = (typeof process !== 'undefined' && process.env) ? (process.env.API_KEY || '') : '';
  return new GoogleGenAI({ apiKey });
};

export const getAIFeedbackSuggestion = async (criteriaName: string, score: number) => {
  const apiKey = (typeof process !== 'undefined' && process.env) ? process.env.API_KEY : null;
  if (!apiKey) return "لطفا کلید API را تنظیم کنید تا پیشنهاد هوشمند فعال شود.";
  
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `شما یک مدیر حرفه‌ای هستید. بر اساس شاخص "${criteriaName}" و امتیاز ${score} از 10، یک بازخورد کوتاه و حرفه‌ای به زبان فارسی برای پرونده ارزیابی پرسنل بنویسید. فقط متن بازخورد را برگردانید.`,
      config: {
        temperature: 0.7,
      },
    });
    return response.text?.trim() || "بدون پیشنهاد";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "خطا در ارتباط با هوش مصنوعی.";
  }
};

export const summarizeReportWithAI = async (record: any) => {
  const apiKey = (typeof process !== 'undefined' && process.env) ? process.env.API_KEY : null;
  if (!apiKey) return null;
  
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `گزارش ارزیابی زیر را تحلیل کنید و یک پاراگراف خلاصه مدیریتی به زبان فارسی بنویسید: ${JSON.stringify(record)}`,
    });
    return response.text?.trim();
  } catch (error) {
    console.error("Gemini Summary Error:", error);
    return "تحلیل هوشمند فعلاً در دسترس نیست.";
  }
};
