'use client';

import { DehumidifierDevice, FanSpeed } from '@/lib/types';
import { Minus, Plus } from 'lucide-react';

interface DehumidifierControlProps {
  device: DehumidifierDevice;
  onToggle: () => void;
  onUpdate: (updates: Partial<DehumidifierDevice>) => void;
}

const FAN_SPEEDS: { value: FanSpeed; label: string }[] = [
  { value: 'low', label: 'Thấp' },
  { value: 'medium', label: 'Vừa' },
  { value: 'high', label: 'Cao' },
  { value: 'auto', label: 'Tự động' },
];

export default function DehumidifierControl({ device, onToggle, onUpdate }: DehumidifierControlProps) {
  return (
    <div className={`bg-slate-800 rounded-2xl border ${device.isOn ? 'border-rose-500/30' : 'border-slate-700'} overflow-hidden`}>
      <div className={`p-4 ${device.isOn ? 'bg-gradient-to-r from-rose-600/20 to-pink-600/10' : ''}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${device.isOn ? 'bg-rose-500/20' : 'bg-slate-700'}`}>
              💧
            </div>
            <div>
              <h4 className="text-white font-bold">{device.name}</h4>
              <p className={`text-xs ${device.isOn ? 'text-rose-400' : 'text-slate-500'}`}>
                {device.isOn ? `Mục tiêu: ${device.targetHumidity}% độ ẩm` : 'Đã tắt'}
              </p>
            </div>
          </div>
          <button
            onClick={onToggle}
            className={`relative w-12 h-6 rounded-full transition-all duration-300 ${device.isOn ? 'bg-rose-500' : 'bg-slate-600'}`}
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
          {/* Target Humidity */}
          <div>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">Độ Ẩm Mục Tiêu</p>
            <div className="flex items-center justify-center gap-6">
              <button
                onClick={() => onUpdate({ targetHumidity: Math.max(30, device.targetHumidity - 5) })}
                className="w-9 h-9 rounded-xl bg-slate-700 hover:bg-slate-600 text-white flex items-center justify-center transition-all active:scale-95"
              >
                <Minus size={16} />
              </button>
              <div className="text-center">
                <span className="text-4xl font-bold text-white">{device.targetHumidity}</span>
                <span className="text-lg text-slate-400 ml-1">%</span>
              </div>
              <button
                onClick={() => onUpdate({ targetHumidity: Math.min(80, device.targetHumidity + 5) })}
                className="w-9 h-9 rounded-xl bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center transition-all active:scale-95"
              >
                <Plus size={16} />
              </button>
            </div>
            {/* Progress bar */}
            <div className="mt-3 bg-slate-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-rose-500 to-pink-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${(device.targetHumidity / 80) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>30%</span>
              <span>80%</span>
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
                  className={`py-2 rounded-xl text-xs font-medium transition-all ${
                    device.fanSpeed === speed.value
                      ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
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
