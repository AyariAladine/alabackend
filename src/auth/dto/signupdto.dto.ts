import { IsEmail, IsString, Matches, MinLength } from "class-validator"

export class SignupDto{
    @IsString()
    name:string
    @IsEmail()
    email:string
    @IsString()
    @MinLength(10, { message: 'password must not be less than 10 characters' })
    @Matches(/^(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/, { message: 'password must contain at least one number' })
    password:string
}