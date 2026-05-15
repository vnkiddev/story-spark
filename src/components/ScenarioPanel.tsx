'use client';

import { Scenario, ScenarioLog } from '@/lib/types';
import { ToggleLeft, ToggleRight, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

interface ScenarioPanelProps {
  scenarios: Scenario[];
  logs: ScenarioLog[];
  onToggleScenario: (id: string) => void;
}

export default function ScenarioPanel({ scenarios, logs, onToggleScenario }: ScenarioPanelProps) {
  const enabledCount = scenarios.filter((s) => s.isEnabled).length;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-white font-bold text-xl">Kịch Bản Tự Động</h2>
          <p className="text-slate-400 text-sm mt-0.5">
            {enabledCount}/{scenarios.length} kịch bản đang bật
          </p>
        </div>
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl px-3 py-1.5 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-amber-400 text-xs font-semibold">Auto</span>
        </div>
      </div>

      {/* Scenario list */}
      <div className="space-y-3 mb-6">
        {scenarios.map((scenario) => (
          <div
            key={scenario.id}
            className={`bg-slate-800 rounded-2xl border transition-all ${
              scenario.isEnabled ? 'border-amber-500/30' : 'border-slate-700'
            }`}
          >
            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                      scenario.isEnabled ? 'bg-amber-500/20' : 'bg-slate-700'
                    }`}
                  >
                    {scenario.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-semibold text-sm">{scenario.name}</h4>
                    <p className="text-slate-400 text-xs mt-0.5">{scenario.description}</p>
                    {scenario.roomName && (
                      <span className="inline-block mt-1.5 text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full">
                        {scenario.roomName}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => onToggleScenario(scenario.id)}
                  className="shrink-0 text-2xl transition-all hover:scale-110"
                >
                  {scenario.isEnabled ? (
                    <ToggleRight className="text-amber-400" size={28} />
                  ) : (
                    <ToggleLeft className="text-slate-600" size={28} />
                  )}
                </button>
              </div>

              {/* Condition → Action */}
              {scenario.isEnabled && (
                <div className="mt-3 flex flex-col gap-1.5 pl-13">
                  <div className="flex items-center gap-2 bg-slate-700/50 rounded-xl px-3 py-2">
                    <span className="text-xs font-semibold text-slate-400 w-16 shrink-0">Điều kiện</span>
                    <span className="text-xs text-blue-300">{scenario.conditionLabel}</span>
                  </div>
                  <div className="flex justify-center">
                    <span className="text-slate-600 text-xs">▼</span>
                  </div>
                  <div className="flex items-center gap-2 bg-amber-500/10 rounded-xl px-3 py-2">
                    <span className="text-xs font-semibold text-slate-400 w-16 shrink-0">Hành động</span>
                    <span className="text-xs text-amber-300">{scenario.actionLabel}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Activity log */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Clock size={14} className="text-slate-400" />
          <h3 className="text-slate-400 text-sm font-semibold uppercase tracking-wider">
            Nhật Ký Hoạt Động
          </h3>
        </div>

        {logs.length === 0 ? (
          <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 text-center">
            <p className="text-slate-500 text-sm">Chưa có sự kiện nào được ghi lại.</p>
            <p className="text-slate-600 text-xs mt-1">Bật kịch bản để bắt đầu theo dõi.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {logs.slice(0, 12).map((log) => (
              <div
                key={log.id}
                className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 flex items-start gap-3"
              >
                {log.scenarioId === 'humidity-alert' ? (
                  <AlertCircle size={15} className="text-amber-400 mt-0.5 shrink-0" />
                ) : (
                  <CheckCircle2 size={15} className="text-emerald-400 mt-0.5 shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-white text-xs font-semibold">{log.scenarioName}</p>
                  <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">{log.message}</p>
                </div>
                <span className="text-slate-600 text-xs shrink-0">
                  {log.timestamp.toLocaleTimeString('vi-VN', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                  })}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
