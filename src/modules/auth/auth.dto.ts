import { IsEmail, IsOptional, IsMobilePhone, IsString, MinLength } from "class-validator";

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
}


export class LoginDto {
  @IsOptional()
  email?: string;

  @IsString()
  @MinLength(8)
  password!: string;
}
