'use client';

import { Room, Device } from '@/lib/types';
import { Thermometer, Droplets, Wind, Tv, AirVent, ZapOff } from 'lucide-react';

interface RoomCardProps {
  room: Room;
  onClick: () => void;
  onToggleDevice: (roomId: string, deviceId: string) => void;
}

const DeviceIcon = ({ device }: { device: Device }) => {
  if (device.type === 'ac') return <AirVent size={14} />;
  if (device.type === 'tv') return <Tv size={14} />;
  if (device.type === 'fan') return <Wind size={14} />;
  return <Droplets size={14} />;
};

export default function RoomCard({ room, onClick, onToggleDevice }: RoomCardProps) {
  const onCount = room.devices.filter((d) => d.isOn).length;

  return (
    <div
      className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-slate-600 transition-all cursor-pointer group hover:shadow-xl hover:shadow-slate-900/50 hover:-translate-y-0.5"
      onClick={onClick}
    >
      {/* Card header with gradient */}
      <div className={`bg-gradient-to-r ${room.color} p-4`}>
        <div className="flex items-start justify-between">
          <div>
            <span className="text-3xl">{room.icon}</span>
            <h3 className="text-white font-bold text-lg mt-1">{room.name}</h3>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl px-2.5 py-1 text-white text-xs font-semibold">
            {onCount}/{room.devices.length} bật
          </div>
        </div>

        {/* Sensors */}
        <div className="flex gap-4 mt-3">
          <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm rounded-lg px-2.5 py-1.5">
            <Thermometer size={14} className="text-white" />
            <span className="text-white font-bold text-sm">{room.temperature}°C</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm rounded-lg px-2.5 py-1.5">
            <Droplets size={14} className="text-white" />
            <span className="text-white font-bold text-sm">{room.humidity}%</span>
          </div>
        </div>
      </div>

      {/* Devices list */}
      <div className="p-4">
        <div className="space-y-2">
          {room.devices.map((device) => (
            <div key={device.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                    device.isOn ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-700 text-slate-500'
                  }`}
                >
                  <DeviceIcon device={device} />
                </div>
                <span className={`text-sm font-medium ${device.isOn ? 'text-white' : 'text-slate-500'}`}>
                  {device.name}
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleDevice(room.id, device.id);
                }}
                className={`relative w-10 h-5 rounded-full transition-all duration-300 ${
                  device.isOn ? 'bg-blue-500' : 'bg-slate-600'
                }`}
              >
                <span
                  className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${
                    device.isOn ? 'left-5.5' : 'left-0.5'
                  }`}
                  style={{ left: device.isOn ? '22px' : '2px' }}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
