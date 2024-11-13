import { IsEmail, IsString } from 'class-validator';

// verify-reset-code.dto.ts
export class VerifyResetCodeDto {
    @IsEmail()
    email: string;

    @IsString()
    code: string;
}