
import React, { useState } from 'react';
import { User } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Dummy login
    onLogin({
      id: '1',
      name: 'خانم علیزاد',
      role: 'مدیر ارزیابی',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCqCrwuGW9CsaXzyZieMEE58faz2ubH_2X7Wzk8mx7jIyGoCvNOqK-EFpSlTCNy3FK6XzxGFIEU7jsMz5CiG8LE8-bOSyEvvZv-Ntkqr_716jX-EBOUiLwaxsMZZQQ5pXmQBEdKWzr8TnnFBwruZ6J5PCvHniG9MC_6YtJgtdd8LkbE2XrkA_RbBdw6HzOKfxmO03rW1wDnQLp9s8GEeTz4QKt_b6nEwqjugLTKOM8cWmQ-SOTJz6vvviJVfv0jDy-43DZiGUGyMu0'
    });
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* Left Decoration Panel */}
      <div className="hidden lg:flex w-1/2 relative bg-[#fff7ed] items-center justify-center overflow-hidden">
        <div className="absolute w-[800px] h-[800px] rounded-full bg-orange-100/40 blur-3xl -top-40 -right-40"></div>
        <div className="absolute w-[600px] h-[600px] rounded-full bg-orange-200/20 blur-2xl -bottom-20 -left-20"></div>
        
        <div className="relative z-10 text-center max-w-md px-12">
          <div className="mb-10 flex justify-center">
            <div className="w-32 h-32 bg-white rounded-3xl flex items-center justify-center shadow-xl p-4">
              <span className="material-symbols-outlined text-orange-500 text-6xl">health_metrics</span>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-5xl font-black text-slate-500 leading-tight">تامین سلامت</h1>
            <span className="text-2xl font-bold tracking-widest text-orange-500 mt-2">TAMIN SALAMAT</span>
            <div className="h-1 w-20 bg-orange-200 mx-auto my-6 rounded-full"></div>
            <h2 className="text-xl text-slate-500/80 font-medium">سامانه هوشمند ارزیابی عملکرد کارکنان</h2>
            <p className="mt-4 text-slate-400 font-light">تجهیز گستر تامین سلامت</p>
          </div>
        </div>
      </div>

      {/* Login Form Panel */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 bg-white">
        <div className="w-full max-w-[400px]">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">ورود به پنل کاربری</h2>
            <p className="text-slate-500">خوش آمدید، لطفاً مشخصات خود را وارد کنید.</p>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 block mr-1">نام کاربری</label>
              <div className="relative">
                <input 
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="مثال: admin"
                  className="w-full rounded-xl border-slate-200 bg-slate-50/50 px-4 py-4 pr-12 text-slate-900 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none"
                />
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">person</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 block mr-1">رمز عبور</label>
              <div className="relative">
                <input 
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border-slate-200 bg-slate-50/50 px-4 py-4 pr-12 text-slate-900 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none"
                />
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">lock</span>
                <button type="button" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <span className="material-symbols-outlined">visibility</span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded text-orange-500 focus:ring-orange-500/20 w-4 h-4 border-slate-300" />
                <span className="text-sm text-slate-500">مرا به خاطر بسپار</span>
              </label>
              <a href="#" className="text-sm font-medium text-orange-500 hover:text-orange-600">فراموشی رمز عبور؟</a>
            </div>

            <button 
              type="submit" 
              className="w-full rounded-xl bg-orange-500 px-6 py-4 text-white font-bold shadow-lg shadow-orange-500/20 hover:bg-orange-600 transition-all transform active:scale-[0.98]"
            >
              ورود به سامانه
            </button>
          </form>

          <div className="mt-20 pt-8 border-t border-slate-100 flex items-center justify-center text-xs text-slate-400 font-medium">
            <p>© ۱۴۰۴ تجهیز گستر تامین سلامت</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
