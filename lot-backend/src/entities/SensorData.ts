import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";
import { SensorDataDto } from "../dto/sensor-data.dto";

@Entity()
export class SensorData {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  deviceId!: string;

  @Column("float")
  latitude!: number;

  @Column("float")
  longitude!: number;

  @Column("float", { default: 0 })
  speed!: number;

  @Column("float")
  temperature!: number;

  @Column("float")
  currentFuelLiters!: number;

  @Column("float", { nullable: true })
  fuelCapacityLiters?: number;

  @CreateDateColumn()
  createdAt!: Date;


  toDto?(): SensorDataDto {
    return {
      deviceId: this.deviceId,
      fuel: {
        current: this.currentFuelLiters,
        capacity: this.fuelCapacityLiters
      },
      gps: {
        lat: this.latitude,
        lng: this.longitude,
        speed: this.speed
      },
      temperature: this.temperature,
    }
  }
}
