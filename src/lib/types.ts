export type DeviceType = 'ac' | 'tv' | 'fan' | 'dehumidifier';
export type ACMode = 'cool' | 'heat' | 'dry' | 'fan' | 'auto';
export type FanSpeed = 'low' | 'medium' | 'high' | 'auto';
export type TVInput = 'hdmi1' | 'hdmi2' | 'av' | 'tv';

export interface ACDevice {
  id: string;
  type: 'ac';
  name: string;
  isOn: boolean;
  temperature: number;
  mode: ACMode;
  fanSpeed: FanSpeed;
}

export interface TVDevice {
  id: string;
  type: 'tv';
  name: string;
  isOn: boolean;
  volume: number;
  channel: number;
  input: TVInput;
}

export interface FanDevice {
  id: string;
  type: 'fan';
  name: string;
  isOn: boolean;
  speed: FanSpeed;
  oscillate: boolean;
}

export interface DehumidifierDevice {
  id: string;
  type: 'dehumidifier';
  name: string;
  isOn: boolean;
  targetHumidity: number;
  fanSpeed: FanSpeed;
}

export type Device = ACDevice | TVDevice | FanDevice | DehumidifierDevice;

export interface Room {
  id: string;
  name: string;
  icon: string;
  color: string;
  temperature: number;
  humidity: number;
  devices: Device[];
}

export type ActiveView = 'home' | 'scenarios' | string;

export interface Scenario {
  id: string;
  name: string;
  description: string;
  roomId: string | null;
  roomName: string | null;
  icon: string;
  conditionLabel: string;
  actionLabel: string;
  isEnabled: boolean;
}

export interface ScenarioLog {
  id: string;
  scenarioId: string;
  scenarioName: string;
  message: string;
  timestamp: Date;
}
