
import { GoogleGenAI } from "@google/genai";

const getAIClient = () => {
  const apiKey = process.env.API_KEY || '';
  return new GoogleGenAI({ apiKey });
};

export const getAIFeedbackSuggestion = async (criteriaName: string, score: number) => {
  if (!process.env.API_KEY) return "لطفا کلید API را تنظیم کنید.";
  
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
    return "خطا در دریافت پیشنهاد هوشمند.";
  }
};

export const summarizeReportWithAI = async (record: any) => {
  if (!process.env.API_KEY) return null;
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `گزارش ارزیابی زیر را تحلیل کنید و یک پاراگراف خلاصه مدیریتی به زبان فارسی بنویسید: ${JSON.stringify(record)}`,
    });
    return response.text?.trim();
  } catch (error) {
    return "تحلیل هوشمند فعلاً در دسترس نیست.";
  }
};
