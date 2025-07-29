export function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371000;
  const toRad = (deg: number) => deg * Math.PI / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function calculateSpeed(
  lat1: number, lon1: number, time1: Date,
  lat2: number, lon2: number, time2: Date
): number {
  const distance = haversineDistance(lat1, lon1, lat2, lon2);
  const timeDiffSec = Math.abs((+time2 - +time1) / 1000);
  if (timeDiffSec === 0) return 0;
  return (distance / timeDiffSec) * 3.6;
}
