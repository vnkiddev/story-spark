'use client';

import { TVDevice, TVInput } from '@/lib/types';
import { Minus, Plus, Volume2 } from 'lucide-react';

interface TVControlProps {
  device: TVDevice;
  onToggle: () => void;
  onUpdate: (updates: Partial<TVDevice>) => void;
}

const INPUTS: { value: TVInput; label: string }[] = [
  { value: 'tv', label: 'Ăng-ten' },
  { value: 'hdmi1', label: 'HDMI 1' },
  { value: 'hdmi2', label: 'HDMI 2' },
  { value: 'av', label: 'AV' },
];

export default function TVControl({ device, onToggle, onUpdate }: TVControlProps) {
  return (
    <div className={`bg-slate-800 rounded-2xl border ${device.isOn ? 'border-violet-500/30' : 'border-slate-700'} overflow-hidden`}>
      <div className={`p-4 ${device.isOn ? 'bg-gradient-to-r from-violet-600/20 to-purple-600/10' : ''}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${device.isOn ? 'bg-violet-500/20' : 'bg-slate-700'}`}>
              📺
            </div>
            <div>
              <h4 className="text-white font-bold">{device.name}</h4>
              <p className={`text-xs ${device.isOn ? 'text-violet-400' : 'text-slate-500'}`}>
                {device.isOn ? `Kênh ${device.channel}` : 'Đã tắt'}
              </p>
            </div>
          </div>
          <button
            onClick={onToggle}
            className={`relative w-12 h-6 rounded-full transition-all duration-300 ${device.isOn ? 'bg-violet-500' : 'bg-slate-600'}`}
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
          {/* Volume */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Âm Lượng</p>
              <span className="text-white font-bold">{device.volume}%</span>
            </div>
            <div className="flex items-center gap-3">
              <Volume2 size={16} className="text-slate-400" />
              <input
                type="range"
                min={0}
                max={100}
                value={device.volume}
                onChange={(e) => onUpdate({ volume: Number(e.target.value) })}
                className="flex-1 accent-violet-500 h-1.5 rounded-full"
              />
            </div>
          </div>

          {/* Channel */}
          <div>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Kênh</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => onUpdate({ channel: Math.max(1, device.channel - 1) })}
                className="w-9 h-9 rounded-xl bg-slate-700 hover:bg-slate-600 text-white flex items-center justify-center transition-all"
              >
                <Minus size={16} />
              </button>
              <div className="flex-1 bg-slate-700 rounded-xl py-2 text-center text-white font-bold text-lg">
                {device.channel}
              </div>
              <button
                onClick={() => onUpdate({ channel: Math.min(999, device.channel + 1) })}
                className="w-9 h-9 rounded-xl bg-violet-600 hover:bg-violet-500 text-white flex items-center justify-center transition-all"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Input */}
          <div>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Nguồn Vào</p>
            <div className="grid grid-cols-4 gap-1.5">
              {INPUTS.map((input) => (
                <button
                  key={input.value}
                  onClick={() => onUpdate({ input: input.value })}
                  className={`py-2 rounded-xl text-xs font-medium transition-all ${
                    device.input === input.value
                      ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30'
                      : 'bg-slate-700 text-slate-400 hover:bg-slate-600 hover:text-white'
                  }`}
                >
                  {input.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
