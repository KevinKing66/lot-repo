export interface SensorDataDto {
  deviceId: string;
  gps: {
    lat: number;
    lng: number;
    speed: number;
  };
  temperature: number;
  fuel: {
    current: number;
    capacity?: number;
  };
}