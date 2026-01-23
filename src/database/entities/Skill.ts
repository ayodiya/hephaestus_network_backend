import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from "typeorm";

export enum SkillCategory {
  SoftwareDevelopment = "Software Development",
  FrontendDevelopment = "Frontend Development",
  BackendDevelopment = "Backend Development",
  Databases = "Databases",
  CloudAndDevOps = "Cloud & DevOps",
  Security = "Security",
  DataAndAI = "Data & AI",
  MobileDevelopment = "Mobile Development",
  TestingAndQA = "Testing & QA",
  DesignAndCreative = "Design & Creative",
  EngineeringAndTrades = "Engineering & Trades",
  Business = "Business",
  Marketing = "Marketing",
  SoftSkills = "Soft Skills",
}

@Entity({ name: "skills" })
@Index(["name", "category"], { unique: true })
export class Skill {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 120 })
  name!: string;

  @Column({
    type: "enum",
    enum: SkillCategory,
  })
  category!: SkillCategory;

  @Column({ default: true })
  isActive!: boolean;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt!: Date;
}
