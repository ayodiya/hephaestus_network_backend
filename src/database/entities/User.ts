import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";

import type { Relation } from "typeorm";
import { UserRole } from "../../constants/roles.js";
import { AuthToken } from "./AuthToken.js";
import { Job } from "./Job.js";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", nullable: true })
  firstName?: string;

  @Column({ type: "varchar", nullable: true })
  lastName?: string;

  @Column({ unique: true, nullable: true })
  email?: string;

  @Column({ unique: true })
  username!: string;

  @Column({ nullable: true })
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

  /* =====================
     Relations
  ====================== */

  @OneToMany("AuthToken", "user")
  tokens!: Relation<AuthToken[]>;

  @OneToMany(() => Job, (job) => job.postedBy)
  jobs!: Relation<Job[]>;

  /* =====================
     Audit
  ====================== */

  @CreateDateColumn({ type: "timestamptz" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt!: Date;
}
