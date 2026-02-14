
import React, { useState } from 'react';
import { User } from '../types';
import { AUTH_USERS } from '../constants';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showDemoUsers, setShowDemoUsers] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const foundUser = AUTH_USERS.find(
      (u) => u.username.toLowerCase() === username.toLowerCase() && u.password === password
    );

    if (foundUser) {
      onLogin({
        id: foundUser.id,
        name: foundUser.name,
        role: foundUser.role,
        username: foundUser.username
      });
    } else {
      setError('نام کاربری یا رمز عبور اشتباه است.');
    }
  };

  const handleDemoFill = (u: typeof AUTH_USERS[0]) => {
    setUsername(u.username);
    setPassword(u.password);
    setError('');
  };

  return (
    <div className="flex min-h-screen w-full font-vazir">
      {/* Right Side - Brand / Decorative */}
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

      {/* Left Side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 bg-white overflow-y-auto">
        <div className="w-full max-w-[400px]">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">ورود به پنل کاربری</h2>
            <p className="text-slate-500">جهت دسترسی به فرم‌های ارزیابی وارد شوید.</p>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 block mr-1">نام کاربری</label>
              <div className="relative">
                <input 
                  type="text"
                  required
                  dir="ltr"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="username"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-4 pr-12 text-slate-900 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none text-left"
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
                  dir="ltr"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-4 pr-12 text-slate-900 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none text-left"
                />
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">lock</span>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-600 text-sm font-bold rounded-xl border border-red-100 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">error</span>
                {error}
              </div>
            )}

            <button 
              type="submit" 
              className="w-full rounded-xl bg-orange-500 px-6 py-4 text-white font-bold shadow-lg shadow-orange-500/20 hover:bg-orange-600 transition-all transform active:scale-[0.98]"
            >
              ورود به سامانه
            </button>
          </form>

          {/* Demo Users Helper */}
          <div className="mt-8 border rounded-2xl border-slate-100 overflow-hidden">
            <button 
              onClick={() => setShowDemoUsers(!showDemoUsers)}
              className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors text-sm font-bold text-slate-600"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-orange-500">key</span>
                <span>مشاهده حساب‌های کاربری (نسخه دمو)</span>
              </div>
              <span className={`material-symbols-outlined transition-transform ${showDemoUsers ? 'rotate-180' : ''}`}>expand_more</span>
            </button>
            
            {showDemoUsers && (
              <div className="p-2 bg-white max-h-60 overflow-y-auto">
                <p className="text-xs text-slate-400 px-3 py-2 text-center">برای کپی کردن مشخصات روی کاربر کلیک کنید</p>
                <div className="space-y-1">
                  {AUTH_USERS.map(u => (
                    <button
                      key={u.id}
                      onClick={() => handleDemoFill(u)}
                      type="button"
                      className="w-full text-right p-3 rounded-xl hover:bg-orange-50 transition-colors flex items-center justify-between group"
                    >
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs font-bold text-slate-800">{u.name}</span>
                        <span className="text-[10px] text-slate-500">{u.role}</span>
                      </div>
                      <div className="text-[10px] font-mono bg-slate-100 px-2 py-1 rounded text-slate-600 group-hover:bg-white group-hover:text-orange-600">
                        {u.username}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center text-xs text-slate-400 font-medium">
            <p>© ۱۴۰۴ تجهیز گستر تامین سلامت</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
