'use client';

import { ACDevice, ACMode, FanSpeed } from '@/lib/types';
import { Minus, Plus } from 'lucide-react';

interface ACControlProps {
  device: ACDevice;
  onToggle: () => void;
  onUpdate: (updates: Partial<ACDevice>) => void;
}

const MODES: { value: ACMode; label: string; icon: string }[] = [
  { value: 'cool', label: 'Lạnh', icon: '❄️' },
  { value: 'heat', label: 'Nóng', icon: '🔥' },
  { value: 'dry', label: 'Hút ẩm', icon: '💧' },
  { value: 'fan', label: 'Quạt', icon: '💨' },
  { value: 'auto', label: 'Tự động', icon: '⚡' },
];

const FAN_SPEEDS: { value: FanSpeed; label: string }[] = [
  { value: 'auto', label: 'Tự động' },
  { value: 'low', label: 'Thấp' },
  { value: 'medium', label: 'Vừa' },
  { value: 'high', label: 'Cao' },
];

export default function ACControl({ device, onToggle, onUpdate }: ACControlProps) {
  return (
    <div className={`bg-slate-800 rounded-2xl border ${device.isOn ? 'border-blue-500/30' : 'border-slate-700'} overflow-hidden`}>
      {/* Header */}
      <div className={`p-4 ${device.isOn ? 'bg-gradient-to-r from-blue-600/20 to-cyan-600/10' : ''}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${device.isOn ? 'bg-blue-500/20' : 'bg-slate-700'}`}>
              ❄️
            </div>
            <div>
              <h4 className="text-white font-bold">{device.name}</h4>
              <p className={`text-xs ${device.isOn ? 'text-blue-400' : 'text-slate-500'}`}>
                {device.isOn ? 'Đang hoạt động' : 'Đã tắt'}
              </p>
            </div>
          </div>
          <button
            onClick={onToggle}
            className={`relative w-12 h-6 rounded-full transition-all duration-300 ${device.isOn ? 'bg-blue-500' : 'bg-slate-600'}`}
          >
            <span
              className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-300"
              style={{ left: device.isOn ? '26px' : '2px' }}
            />
          </button>
        </div>
      </div>

      {/* Controls - only show when on */}
      {device.isOn && (
        <div className="p-4 space-y-4">
          {/* Temperature */}
          <div>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">Nhiệt Độ</p>
            <div className="flex items-center justify-center gap-6">
              <button
                onClick={() => onUpdate({ temperature: Math.max(16, device.temperature - 1) })}
                className="w-9 h-9 rounded-xl bg-slate-700 hover:bg-slate-600 text-white flex items-center justify-center transition-all active:scale-95"
              >
                <Minus size={16} />
              </button>
              <div className="text-center">
                <span className="text-4xl font-bold text-white">{device.temperature}</span>
                <span className="text-lg text-slate-400 ml-1">°C</span>
              </div>
              <button
                onClick={() => onUpdate({ temperature: Math.min(30, device.temperature + 1) })}
                className="w-9 h-9 rounded-xl bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center transition-all active:scale-95"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Mode */}
          <div>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Chế Độ</p>
            <div className="grid grid-cols-5 gap-1.5">
              {MODES.map((mode) => (
                <button
                  key={mode.value}
                  onClick={() => onUpdate({ mode: mode.value })}
                  className={`flex flex-col items-center gap-1 p-2 rounded-xl text-xs font-medium transition-all ${
                    device.mode === mode.value
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                      : 'bg-slate-700 text-slate-400 hover:bg-slate-600 hover:text-white'
                  }`}
                >
                  <span className="text-base">{mode.icon}</span>
                  <span>{mode.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Fan Speed */}
          <div>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Tốc Độ Quạt</p>
            <div className="grid grid-cols-4 gap-1.5">
              {FAN_SPEEDS.map((speed) => (
                <button
                  key={speed.value}
                  onClick={() => onUpdate({ fanSpeed: speed.value })}
                  className={`py-2 px-1 rounded-xl text-xs font-medium transition-all ${
                    device.fanSpeed === speed.value
                      ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                      : 'bg-slate-700 text-slate-400 hover:bg-slate-600 hover:text-white'
                  }`}
                >
                  {speed.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
