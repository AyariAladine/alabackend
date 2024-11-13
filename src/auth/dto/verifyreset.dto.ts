import { IsEmail, IsString, MinLength } from 'class-validator';

export class VerifyResetDto {
  @IsEmail()
  email: string;

  @IsString()
  code: string;

  @IsString()
  @MinLength(6)
  newPassword: string;
}
