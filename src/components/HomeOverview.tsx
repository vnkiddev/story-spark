'use client';

import { Room, Device } from '@/lib/types';
import { Thermometer, Droplets, Zap, Wind, AirVent, Tv } from 'lucide-react';
import RoomCard from './RoomCard';

interface HomeOverviewProps {
  rooms: Room[];
  onRoomClick: (roomId: string) => void;
  onToggleDevice: (roomId: string, deviceId: string) => void;
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700">
      <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mb-3`}>{icon}</div>
      <p className="text-slate-400 text-xs">{label}</p>
      <p className="text-white font-bold text-xl mt-0.5">{value}</p>
    </div>
  );
}

export default function HomeOverview({ rooms, onRoomClick, onToggleDevice }: HomeOverviewProps) {
  const totalDevicesOn = rooms.reduce((acc, r) => acc + r.devices.filter((d) => d.isOn).length, 0);
  const totalDevices = rooms.reduce((acc, r) => acc + r.devices.length, 0);
  const avgTemp = (rooms.reduce((acc, r) => acc + r.temperature, 0) / rooms.length).toFixed(1);
  const avgHumidity = Math.round(rooms.reduce((acc, r) => acc + r.humidity, 0) / rooms.length);

  const deviceTypeCounts = rooms.reduce(
    (acc, room) => {
      room.devices.forEach((d) => {
        if (d.isOn) acc[d.type] = (acc[d.type] || 0) + 1;
      });
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <div>
      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-6 mb-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-32 opacity-10 flex items-center justify-center text-8xl">
          🏠
        </div>
        <p className="text-blue-100 text-sm font-medium">Chào mừng trở lại!</p>
        <h2 className="text-white font-bold text-2xl mt-1">Nhà Thông Minh</h2>
        <p className="text-blue-100 text-sm mt-1">
          Hiện có <span className="text-white font-bold">{totalDevicesOn}</span> thiết bị đang hoạt động
        </p>
        <div className="flex gap-2 mt-4 flex-wrap">
          {deviceTypeCounts.ac && (
            <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full flex items-center gap-1.5">
              <AirVent size={12} /> {deviceTypeCounts.ac} Điều hoà
            </span>
          )}
          {deviceTypeCounts.tv && (
            <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full flex items-center gap-1.5">
              <Tv size={12} /> {deviceTypeCounts.tv} TV
            </span>
          )}
          {deviceTypeCounts.fan && (
            <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full flex items-center gap-1.5">
              <Wind size={12} /> {deviceTypeCounts.fan} Quạt
            </span>
          )}
          {deviceTypeCounts.dehumidifier && (
            <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full flex items-center gap-1.5">
              <Droplets size={12} /> {deviceTypeCounts.dehumidifier} Máy hút ẩm
            </span>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <StatCard
          icon={<Zap size={20} className="text-yellow-400" />}
          label="Thiết bị bật"
          value={`${totalDevicesOn}/${totalDevices}`}
          color="bg-yellow-500/20"
        />
        <StatCard
          icon={<Thermometer size={20} className="text-orange-400" />}
          label="Nhiệt độ TB"
          value={`${avgTemp}°C`}
          color="bg-orange-500/20"
        />
        <StatCard
          icon={<Droplets size={20} className="text-blue-400" />}
          label="Độ ẩm TB"
          value={`${avgHumidity}%`}
          color="bg-blue-500/20"
        />
      </div>

      {/* Room cards */}
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-slate-400 text-sm font-semibold uppercase tracking-wider">Các Phòng</h3>
        <span className="text-slate-500 text-xs">{rooms.length} phòng</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {rooms.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            onClick={() => onRoomClick(room.id)}
            onToggleDevice={onToggleDevice}
          />
        ))}
      </div>
    </div>
  );
}
