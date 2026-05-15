'use client';

import { useEffect, useState } from 'react';
import { Bell, Settings } from 'lucide-react';

export default function Header() {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }));
      setDate(
        now.toLocaleDateString('vi-VN', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-10">
      <div>
        <p className="text-white font-semibold text-lg leading-none">{time}</p>
        <p className="text-slate-400 text-xs mt-0.5">{date}</p>
      </div>
      <div className="flex items-center gap-2">
        <button className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-all">
          <Bell size={16} />
        </button>
        <button className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-all">
          <Settings size={16} />
        </button>
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-purple-400 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-purple-500/30">
          N
        </div>
      </div>
    </header>
  );
}
