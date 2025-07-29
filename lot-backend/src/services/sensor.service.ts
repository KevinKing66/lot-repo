import { SensorData } from "../entities/SensorData";
import { AppDataSource } from "../config/data-source";
import { AuthService } from "./auth.service";
import { maskDeviceId } from "../utils/mask";
import { SensorDataDto } from "../dto/sensor-data.dto";
import { calculateSpeed } from "../utils/geo-utils";

export class SensorService {
  private repo = AppDataSource.getRepository(SensorData);
  private authService = new AuthService();

  async save(dto: SensorDataDto) {
    const { deviceId, gps, temperature, fuel } = dto;

    const entity = this.repo.create({
      deviceId,
      latitude: gps.lat,
      longitude: gps.lng,
      speed: gps.speed,
      temperature,
      currentFuelLiters: fuel.current,
      fuelCapacityLiters: fuel.capacity,
    });

    return await this.repo.save(entity);
  }

  async findHistoryBydeviceId(deviceId: string) {
    return await this.repo.find({
      where: { deviceId: deviceId },
      order: { createdAt: 'DESC' },
    })
  }

  async getHistoryByActiveAlarms(token: string) {
    const user = await this.authService.getUserFromToken(token);

    if (!user) {
      throw ("User not Exist");
    }

    return (await this.repo
      .createQueryBuilder("sensor")
      .distinctOn(["sensor.deviceId"])
      .orderBy("sensor.deviceId", "ASC")
      .addOrderBy("sensor.createdAt", "DESC")
      .getMany())
      .map(e => e.toDto!(user.isAdmin()))
      .filter(e => e.gps.speed == 0 || this.isLowFuelAlert(e));
  }

  async processSensorData(data: SensorDataDto) {
    const last = await this.repo.findOne({
      where: { deviceId: data.deviceId },
      order: { createdAt: 'DESC' },
    });

    const { gps, fuel, createdAt } = data;
    let realSpeed = gps.speed ?? 0;

    if (last) {
      realSpeed = calculateSpeed(
        last.latitude,
        last.longitude,
        new Date(last.createdAt),
        gps.lat,
        gps.lng,
        new Date(createdAt)
      );
      data.gps.speed = realSpeed;
    }

    const requireSave = hasSensorDataChanged(data, last);
    if (requireSave) {
      await this.save(data);
    }

    const fuelEfficiency = 10;
    const estimatedRangeKm = fuel.current * fuelEfficiency;

    const estimatedHoursLeft =
      gps.speed > 0 ? estimatedRangeKm / gps.speed : Infinity;

    const lowFuelAlert = estimatedHoursLeft < 1;

    return {
      estimatedRangeKm: Math.round(estimatedRangeKm),
      estimatedHoursLeft: estimatedHoursLeft,
      lowFuelAlert,
    };
  }

  isLowFuelAlert = (dto: SensorDataDto, fuelEfficiency: number = 10) => {
    const { gps, fuel } = dto;
    const estimatedRangeKm = fuel.current * fuelEfficiency;

    const estimatedHoursLeft =
      gps.speed > 0 ? estimatedRangeKm / gps.speed : Infinity;

    return estimatedHoursLeft < 1;
  }


  async getLatestPosition(deviceId: string, token: string): Promise<SensorData | null> {
    const user = await this.authService.getUserFromToken(token);

    if (!user) {
      throw ("User not Exist");
    }


    const position = await this.repo.findOne({
      where: { deviceId: deviceId },
      order: { createdAt: 'DESC' },
    });

    if (!position) return null;

    return {
      ...position,
      deviceId: user.isAdmin() ? position.deviceId : maskDeviceId(position.deviceId)
    };
  }
}

function hasSensorDataChanged(data: SensorDataDto, last: SensorData | null): boolean {
  if (!last) return true;

  const latChanged = Math.abs(data.gps.lat - last.latitude) > 0.0001;
  const lngChanged = Math.abs(data.gps.lng - last.longitude) > 0.0001;
  const fuelChanged = Math.abs(data.fuel.current - last.currentFuelLiters) > 0.01;

  return latChanged || lngChanged || fuelChanged;
}