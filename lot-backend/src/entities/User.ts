import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm";
import * as bcrypt from "bcrypt";
import { UserRole } from "../enum/user-role.enum";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ default: UserRole.USER, type: 'enum', enum: UserRole })
  role!: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  isAdmin(){
    return this.role === UserRole.ADMIN;
  }
}
