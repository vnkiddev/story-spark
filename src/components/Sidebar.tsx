'use client';

import { Room, ActiveView } from '@/lib/types';
import { Home, ChevronRight } from 'lucide-react';

interface SidebarProps {
  rooms: Room[];
  activeView: ActiveView;
  onNavigate: (view: ActiveView) => void;
}

export default function Sidebar({ rooms, activeView, onNavigate }: SidebarProps) {
  const totalDevicesOn = rooms.reduce(
    (acc, room) => acc + room.devices.filter((d) => d.isOn).length,
    0
  );
  const totalDevices = rooms.reduce((acc, room) => acc + room.devices.length, 0);

  return (
    <aside className="fixed left-0 top-0 h-full w-60 bg-slate-900 border-r border-slate-800 z-20 flex flex-col">
      {/* Logo */}
      <div className="p-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <span className="text-lg">🏠</span>
          </div>
          <div>
            <h1 className="text-white font-bold text-sm leading-none">Smart Home</h1>
            <p className="text-slate-400 text-xs mt-0.5">Nhà Thông Minh</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        <button
          onClick={() => onNavigate('home')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
            activeView === 'home'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Home size={16} />
          <span>Tổng Quan</span>
          {activeView === 'home' && <ChevronRight size={14} className="ml-auto" />}
        </button>

        <div className="pt-2 pb-1">
          <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider px-3">Các Phòng</p>
        </div>

        {rooms.map((room) => {
          const onCount = room.devices.filter((d) => d.isOn).length;
          const isActive = activeView === room.id;
          return (
            <button
              key={room.id}
              onClick={() => onNavigate(room.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-slate-700 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span className="text-base w-5 text-center">{room.icon}</span>
              <span className="flex-1 text-left">{room.name}</span>
              {onCount > 0 && (
                <span className="text-xs bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded-full font-semibold">
                  {onCount}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer stats */}
      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800 rounded-xl p-3">
          <p className="text-xs text-slate-400 mb-2">Thiết Bị Đang Bật</p>
          <div className="flex items-end gap-1">
            <span className="text-2xl font-bold text-white">{totalDevicesOn}</span>
            <span className="text-slate-500 text-sm mb-0.5">/ {totalDevices}</span>
          </div>
          <div className="mt-2 bg-slate-700 rounded-full h-1.5">
            <div
              className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${(totalDevicesOn / totalDevices) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
