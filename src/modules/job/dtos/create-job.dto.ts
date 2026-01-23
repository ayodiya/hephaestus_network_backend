import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsEnum,
  IsArray,
  IsNumber,
  Min,
  ArrayNotEmpty,
} from "class-validator";
import { JobStatus, JobType } from "../../../database/entities/Job.js";

export class CreateJobDto {
  /* =====================
     Core Info
  ====================== */

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  requiredSkills!: string[];

  /* =====================
     Location & Mode
  ====================== */

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsBoolean()
  isRemote?: boolean;

  /* =====================
     Payment & Type
  ====================== */

  @IsOptional()
  @IsNumber()
  @Min(0)
  budget?: number;

  @IsOptional()
  @IsEnum(JobType)
  jobType?: JobType;

  /* =====================
     Status (admin/internal)
  ====================== */

  @IsOptional()
  @IsEnum(JobStatus)
  status?: JobStatus;
}
