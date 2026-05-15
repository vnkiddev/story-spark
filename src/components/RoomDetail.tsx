'use client';

import { Room, ACDevice, TVDevice, FanDevice, DehumidifierDevice, Device } from '@/lib/types';
import { Thermometer, Droplets, ArrowLeft, Wifi } from 'lucide-react';
import ACControl from './ACControl';
import TVControl from './TVControl';
import FanControl from './FanControl';
import DehumidifierControl from './DehumidifierControl';

interface RoomDetailProps {
  room: Room;
  onBack: () => void;
  onToggleDevice: (roomId: string, deviceId: string) => void;
  onUpdateDevice: (roomId: string, deviceId: string, updates: Partial<Device>) => void;
}

export default function RoomDetail({ room, onBack, onToggleDevice, onUpdateDevice }: RoomDetailProps) {
  const onCount = room.devices.filter((d) => d.isOn).length;

  return (
    <div>
      {/* Room header */}
      <div className={`bg-gradient-to-r ${room.color} rounded-2xl p-6 mb-6`}>
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium mb-4 transition-colors"
        >
          <ArrowLeft size={16} />
          Quay lại
        </button>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-4xl">{room.icon}</span>
              <h2 className="text-white font-bold text-2xl">{room.name}</h2>
            </div>
            <p className="text-white/70 text-sm">{onCount}/{room.devices.length} thiết bị đang bật</p>
          </div>
          <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm rounded-xl px-3 py-1.5">
            <Wifi size={12} className="text-white" />
            <span className="text-white text-xs font-medium">Kết nối tốt</span>
          </div>
        </div>

        {/* Sensor readings */}
        <div className="flex gap-3 mt-4">
          <div className="flex-1 bg-white/20 backdrop-blur-sm rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <Thermometer size={16} className="text-white" />
              <span className="text-white/70 text-xs">Nhiệt Độ</span>
            </div>
            <p className="text-white font-bold text-2xl">{room.temperature}°C</p>
          </div>
          <div className="flex-1 bg-white/20 backdrop-blur-sm rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <Droplets size={16} className="text-white" />
              <span className="text-white/70 text-xs">Độ Ẩm</span>
            </div>
            <p className="text-white font-bold text-2xl">{room.humidity}%</p>
          </div>
        </div>
      </div>

      {/* Devices */}
      <div>
        <h3 className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-3">Thiết Bị</h3>
        <div className="space-y-3">
          {room.devices.map((device) => {
            const toggleFn = () => onToggleDevice(room.id, device.id);
            const updateFn = (updates: Partial<Device>) => onUpdateDevice(room.id, device.id, updates);

            if (device.type === 'ac') {
              return (
                <ACControl
                  key={device.id}
                  device={device as ACDevice}
                  onToggle={toggleFn}
                  onUpdate={(u) => updateFn(u as Partial<Device>)}
                />
              );
            }
            if (device.type === 'tv') {
              return (
                <TVControl
                  key={device.id}
                  device={device as TVDevice}
                  onToggle={toggleFn}
                  onUpdate={(u) => updateFn(u as Partial<Device>)}
                />
              );
            }
            if (device.type === 'fan') {
              return (
                <FanControl
                  key={device.id}
                  device={device as FanDevice}
                  onToggle={toggleFn}
                  onUpdate={(u) => updateFn(u as Partial<Device>)}
                />
              );
            }
            if (device.type === 'dehumidifier') {
              return (
                <DehumidifierControl
                  key={device.id}
                  device={device as DehumidifierDevice}
                  onToggle={toggleFn}
                  onUpdate={(u) => updateFn(u as Partial<Device>)}
                />
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
}
