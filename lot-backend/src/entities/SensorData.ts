import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

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

  @Column("float", {default: 0})
  speed!: number;

  @Column("float")
  temperature!: number;

  @Column("float")
  currentFuelLiters!: number;

  @Column("float", {nullable: true})
  fuelCapacityLiters?: number;

  @CreateDateColumn()
  createdAt!: Date;
}
