import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

export enum UserRole {
  USER = "USER",
  WORKER = "WORKER",
  ADMIN = "ADMIN",
}

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true, nullable: true })
  email?: string;

  @Column({ unique: true })
  username!: string;

  @Column({ unique: false, nullable: true })
  profileImage?: string;

  @Column({ unique: true, nullable: true })
  phone?: string;

  @Column()
  password!: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.USER,
  })
  role!: UserRole;

  @Column({ default: false })
  isVerified!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
