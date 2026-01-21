import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ArrayMinSize,
  MaxLength,
} from "class-validator";

export class CreateWorkerDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  bio!: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  skills!: string[];

  @IsString()
  @IsNotEmpty()
  location!: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  certifications?: string[];
}
