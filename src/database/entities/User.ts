import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";

import { UserRole } from "../../constants/roles.js";
// import { Worker } from "./Worker.js";

import type { Relation } from "typeorm";
import { AuthToken } from "./AuthToken.js";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", nullable: true })
  firstName!: string;

  @Column({ type: "varchar", nullable: true })
  lastName!: string;

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

  /**
   * ✅ SAFE inverse relation
   */
  @OneToMany("AuthToken", "user")
  tokens!: Relation<AuthToken[]>;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt!: Date;
}
