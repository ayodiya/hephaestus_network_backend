import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Index,
} from "typeorm";
import type { Relation } from "typeorm";
import { User } from "./User.js";

export enum JobStatus {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export enum JobType {
  FULL_TIME = "FULL_TIME",
  PART_TIME = "PART_TIME",
  CONTRACT = "CONTRACT",
  GIG = "GIG",
}

@Entity({ name: "jobs" })
export class Job {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  /* =====================
     Core Job Information
  ====================== */

  @Column()
  @Index()
  title!: string;

  @Column({ type: "text" })
  description!: string;

  @Column({ type: "text", array: true, default: [] })
  requiredSkills!: string[];

  /* =====================
     Location & Work Mode
  ====================== */

  @Column({ nullable: true })
  location?: string;

  @Column({ default: false })
  isRemote!: boolean;

  /* =====================
     Payment & Type
  ====================== */

  @Column({ type: "decimal", nullable: true })
  budget?: number;

  @Column({
    type: "enum",
    enum: JobType,
    default: JobType.GIG,
  })
  jobType!: JobType;

  /* =====================
     Status
  ====================== */

  @Column({
    type: "enum",
    enum: JobStatus,
    default: JobStatus.OPEN,
  })
  status!: JobStatus;

  /* =====================
     Relationships
  ====================== */

  /**
   * User who posted the job
   * FK → users.id
   */
  @ManyToOne(() => User, (user) => user.jobs, {
    onDelete: "CASCADE",
  })
  postedBy?: Relation<User>;

  /**
   * User who got assigned the job
   * FK → users.id
   */
  @ManyToOne(() => User, { nullable: true })
  assignedWorker?: Relation<User>;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt!: Date;
}
