import {
  IsEmail,
  IsOptional,
  IsMobilePhone,
  IsString,
  MinLength,
  IsEnum,
} from "class-validator";
import { UserRole } from "../../constants/roles.js";

export class RegisterDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsMobilePhone()
  phone?: string;

  @IsString()
  @MinLength(12)
  username!: string;

  @IsString()
  @MinLength(8)
  password!: string;

  @IsOptional()
  role?: UserRole;
}

export class LoginDto {
  @IsOptional()
  email?: string;

  @IsString()
  @MinLength(8)
  password!: string;
}
