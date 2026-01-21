// src/database/entities/Worker.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from "typeorm";
import { User } from "./User.js";

export enum WorkerApprovalStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

@Entity({ name: "workers" })
@Index(["approvalStatus"])
@Index(["location"])
export class Worker {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  /**
   * Short professional bio
   */
  @Column({ type: "text" })
  bio!: string;

  /**
   * Skills stored as array (Postgres native)
   * Example: ["Plumbing", "Electrical", "Solar Installation"]
   */
  @Column({ type: "text", array: true })
  skills!: string[];

  /**
   * Worker location (city/state/country)
   * Example: "Lagos, Nigeria"
   */
  @Column({ type: "varchar", length: 255 })
  location!: string;

  /**
   * Certifications / licenses (URLs or filenames)
   */
  @Column({ type: "text", array: true, nullable: true })
  certifications?: string[];

  /**
   * Admin approval flow
   */
  @Column({
    type: "enum",
    enum: WorkerApprovalStatus,
    default: WorkerApprovalStatus.PENDING,
  })
  approvalStatus!: WorkerApprovalStatus;

  /**
   * Whether worker is active and visible
   */
  @Column({ default: false })
  isActive!: boolean;

  @OneToOne(() => User, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  user!: User;

  /**
   * Audit timestamps
   */
  @CreateDateColumn({ type: "timestamptz" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt!: Date;
}
