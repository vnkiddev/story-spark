'use client';

import { useState } from 'react';
import { Room, ActiveView, Device } from '@/lib/types';
import { initialRooms } from '@/lib/data';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import HomeOverview from '@/components/HomeOverview';
import RoomDetail from '@/components/RoomDetail';

export default function SmartHomePage() {
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [activeView, setActiveView] = useState<ActiveView>('home');

  const toggleDevice = (roomId: string, deviceId: string) => {
    setRooms((prev) =>
      prev.map((room) =>
        room.id === roomId
          ? {
              ...room,
              devices: room.devices.map((d) => (d.id === deviceId ? { ...d, isOn: !d.isOn } : d)),
            }
          : room
      )
    );
  };

  const updateDevice = (roomId: string, deviceId: string, updates: Partial<Device>) => {
    setRooms((prev) =>
      prev.map((room) =>
        room.id === roomId
          ? {
              ...room,
              devices: room.devices.map((d) =>
                d.id === deviceId ? ({ ...d, ...updates } as Device) : d
              ),
            }
          : room
      )
    );
  };

  const activeRoom = rooms.find((r) => r.id === activeView);

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <Sidebar rooms={rooms} activeView={activeView} onNavigate={setActiveView} />

      <div className="flex-1 ml-60 flex flex-col min-h-screen">
        <Header />

        <main className="flex-1 p-6 max-w-3xl">
          {activeView === 'home' ? (
            <HomeOverview
              rooms={rooms}
              onRoomClick={setActiveView}
              onToggleDevice={toggleDevice}
            />
          ) : activeRoom ? (
            <RoomDetail
              room={activeRoom}
              onBack={() => setActiveView('home')}
              onToggleDevice={toggleDevice}
              onUpdateDevice={updateDevice}
            />
          ) : null}
        </main>
      </div>
    </div>
  );
}
