export function maskDeviceId(deviceId: string): string {
  const start = deviceId.slice(0, 3);
  const end = deviceId.slice(-4);
  return `${start}-****-${end}`;
}