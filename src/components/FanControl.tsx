'use client';

import { FanDevice, FanSpeed } from '@/lib/types';

interface FanControlProps {
  device: FanDevice;
  onToggle: () => void;
  onUpdate: (updates: Partial<FanDevice>) => void;
}

const SPEEDS: { value: FanSpeed; label: string; bars: number }[] = [
  { value: 'auto', label: 'Tự động', bars: 0 },
  { value: 'low', label: 'Thấp', bars: 1 },
  { value: 'medium', label: 'Vừa', bars: 2 },
  { value: 'high', label: 'Cao', bars: 3 },
];

export default function FanControl({ device, onToggle, onUpdate }: FanControlProps) {
  return (
    <div className={`bg-slate-800 rounded-2xl border ${device.isOn ? 'border-emerald-500/30' : 'border-slate-700'} overflow-hidden`}>
      <div className={`p-4 ${device.isOn ? 'bg-gradient-to-r from-emerald-600/20 to-teal-600/10' : ''}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-all ${
                device.isOn ? 'bg-emerald-500/20 animate-spin' : 'bg-slate-700'
              }`}
              style={{ animationDuration: device.speed === 'high' ? '0.5s' : device.speed === 'medium' ? '1s' : '2s' }}
            >
              💨
            </div>
            <div>
              <h4 className="text-white font-bold">{device.name}</h4>
              <p className={`text-xs ${device.isOn ? 'text-emerald-400' : 'text-slate-500'}`}>
                {device.isOn
                  ? `${SPEEDS.find((s) => s.value === device.speed)?.label ?? ''} • ${device.oscillate ? 'Dao động' : 'Cố định'}`
                  : 'Đã tắt'}
              </p>
            </div>
          </div>
          <button
            onClick={onToggle}
            className={`relative w-12 h-6 rounded-full transition-all duration-300 ${device.isOn ? 'bg-emerald-500' : 'bg-slate-600'}`}
          >
            <span
              className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-300"
              style={{ left: device.isOn ? '26px' : '2px' }}
            />
          </button>
        </div>
      </div>

      {device.isOn && (
        <div className="p-4 space-y-4">
          {/* Speed */}
          <div>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Tốc Độ</p>
            <div className="grid grid-cols-4 gap-1.5">
              {SPEEDS.map((speed) => (
                <button
                  key={speed.value}
                  onClick={() => onUpdate({ speed: speed.value })}
                  className={`py-2.5 rounded-xl text-xs font-medium transition-all ${
                    device.speed === speed.value
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                      : 'bg-slate-700 text-slate-400 hover:bg-slate-600 hover:text-white'
                  }`}
                >
                  {speed.label}
                </button>
              ))}
            </div>
          </div>

          {/* Oscillate */}
          <div className="flex items-center justify-between py-1">
            <div>
              <p className="text-white text-sm font-medium">Chế Độ Dao Động</p>
              <p className="text-slate-400 text-xs">Quạt quét qua lại</p>
            </div>
            <button
              onClick={() => onUpdate({ oscillate: !device.oscillate })}
              className={`relative w-12 h-6 rounded-full transition-all duration-300 ${device.oscillate ? 'bg-emerald-500' : 'bg-slate-600'}`}
            >
              <span
                className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-300"
                style={{ left: device.oscillate ? '26px' : '2px' }}
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
