'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Room, ActiveView, Device, Scenario, ScenarioLog, ACDevice, FanDevice } from '@/lib/types';
import { initialRooms, initialScenarios } from '@/lib/data';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import HomeOverview from '@/components/HomeOverview';
import RoomDetail from '@/components/RoomDetail';
import ScenarioPanel from '@/components/ScenarioPanel';

// Small random nudge within [-range, +range]
const nudge = (range: number) => (Math.random() * 2 - 1) * range;

function applyScenarios(
  rooms: Room[],
  scenarios: Scenario[],
  addLog: (scenarioId: string, scenarioName: string, message: string) => void
): Room[] {
  let result: Room[] = rooms.map((r) => ({ ...r, devices: [...r.devices] }));

  for (const scenario of scenarios) {
    if (!scenario.isEnabled) continue;

    // --- Kịch bản 1: Bảo vệ nhiệt độ Phòng Lie ---
    if (scenario.id === 'lie-temp-guard') {
      const lieRoom = result.find((r) => r.id === 'phong-lie');
      if (!lieRoom) continue;
      if (lieRoom.temperature < 24) {
        const ac = lieRoom.devices.find((d) => d.type === 'ac' && d.isOn) as ACDevice | undefined;
        if (ac && ac.temperature < 30) {
          const newTemp = ac.temperature + 1;
          result = result.map((room) =>
            room.id === 'phong-lie'
              ? {
                  ...room,
                  devices: room.devices.map((d) =>
                    d.id === ac.id ? { ...d, temperature: newTemp } : d
                  ),
                }
              : room
          );
          addLog(
            scenario.id,
            scenario.name,
            `Nhiệt độ phòng ${lieRoom.temperature.toFixed(1)}°C < 24°C → Tăng điều hoà lên ${newTemp}°C`
          );
        }
      }
    }

    // --- Kịch bản 2: Bật quạt Phòng Khách khi nóng ---
    if (scenario.id === 'auto-fan-khach') {
      const khachRoom = result.find((r) => r.id === 'phong-khach');
      if (!khachRoom) continue;
      if (khachRoom.temperature > 30) {
        const fan = khachRoom.devices.find((d) => d.type === 'fan') as FanDevice | undefined;
        if (fan && !fan.isOn) {
          result = result.map((room) =>
            room.id === 'phong-khach'
              ? {
                  ...room,
                  devices: room.devices.map((d) =>
                    d.id === fan.id ? { ...d, isOn: true, speed: 'medium' } : d
                  ),
                }
              : room
          );
          addLog(
            scenario.id,
            scenario.name,
            `Nhiệt độ phòng ${khachRoom.temperature.toFixed(1)}°C > 30°C → Bật quạt (tốc độ vừa)`
          );
        }
      }
    }

    // --- Kịch bản 3: Cảnh báo độ ẩm cao ---
    if (scenario.id === 'humidity-alert') {
      for (const room of result) {
        if (room.humidity > 80) {
          addLog(
            scenario.id,
            scenario.name,
            `⚠️ ${room.name}: Độ ẩm ${room.humidity}% vượt ngưỡng 80%`
          );
        }
      }
    }
  }

  return result;
}

export default function SmartHomePage() {
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [scenarios, setScenarios] = useState<Scenario[]>(initialScenarios);
  const [scenarioLogs, setScenarioLogs] = useState<ScenarioLog[]>([]);
  const logIdRef = useRef(0);

  const addLog = useCallback((scenarioId: string, scenarioName: string, message: string) => {
    setScenarioLogs((prev) => [
      {
        id: String(++logIdRef.current),
        scenarioId,
        scenarioName,
        message,
        timestamp: new Date(),
      },
      ...prev.slice(0, 49), // keep last 50
    ]);
  }, []);

  // Sensor auto-update every 10 seconds
  useEffect(() => {
    const id = setInterval(() => {
      setRooms((prev) => {
        const updated = prev.map((room) => ({
          ...room,
          temperature: parseFloat(
            Math.max(15, Math.min(42, room.temperature + nudge(0.3))).toFixed(1)
          ),
          humidity: Math.max(25, Math.min(95, Math.round(room.humidity + nudge(1.5)))),
        }));
        return applyScenarios(updated, scenarios, addLog);
      });
    }, 10000);
    return () => clearInterval(id);
  }, [scenarios, addLog]);

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

  const toggleScenario = (id: string) => {
    setScenarios((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isEnabled: !s.isEnabled } : s))
    );
  };

  const activeRoom = rooms.find((r) => r.id === activeView);

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <Sidebar
        rooms={rooms}
        activeView={activeView}
        onNavigate={setActiveView}
        scenarios={scenarios}
      />

      <div className="flex-1 ml-60 flex flex-col min-h-screen">
        <Header />

        <main className="flex-1 p-6 max-w-3xl">
          {activeView === 'home' && (
            <HomeOverview rooms={rooms} onRoomClick={setActiveView} onToggleDevice={toggleDevice} />
          )}
          {activeView === 'scenarios' && (
            <ScenarioPanel
              scenarios={scenarios}
              logs={scenarioLogs}
              onToggleScenario={toggleScenario}
            />
          )}
          {activeView !== 'home' && activeView !== 'scenarios' && activeRoom && (
            <RoomDetail
              room={activeRoom}
              onBack={() => setActiveView('home')}
              onToggleDevice={toggleDevice}
              onUpdateDevice={updateDevice}
            />
          )}
        </main>
      </div>
    </div>
  );
}
