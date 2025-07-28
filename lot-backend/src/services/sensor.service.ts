import { SensorData } from "../entities/SensorData";
import { AppDataSource } from "../config/data-source";
import { AuthService } from "./auth.service";
import { UserRole } from "../enum/user-role.enum";
import { maskDeviceId } from "../utils/mask";
import { SensorDataDto } from "../dto/sensor-data.dto";

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
    await this.save(data);
    const { gps, fuel } = data;

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