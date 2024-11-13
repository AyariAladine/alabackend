import { Controller, Post, Body, BadRequestException, UnauthorizedException, Put, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signupdto.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-tokens.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { AuthGuard } from './guards/auth.guard';
import { ForgotPasswordDto } from './dto/forget-password.dto';
import { VerifyResetDto } from './dto/verifyreset.dto';
import { VerifyResetCodeDto } from './dto/VerifyResetCodeDto'; // Import the new DTO

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('signup')
    async signUp(@Body() signupDto: SignupDto) {
        try {
            await this.authService.signUp(signupDto);
            return { message: 'User successfully registered' };
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw new BadRequestException(error.message);
            }
            throw new BadRequestException('An unexpected error occurred');
        }
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        try {
            const result = await this.authService.login(loginDto);
            return result;
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw new UnauthorizedException(error.message);
            }
            throw new BadRequestException('An unexpected error occurred');
        }
    }

    @Post('refresh')
    async refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
        return this.authService.refreshTokens(refreshTokenDto.refreshToken);
    }

    @UseGuards(AuthGuard)
    @Put('change-password')
    async changePassword(
        @Body() changePasswordDto: ChangePasswordDto,
        @Req() req,
    ) {
        return this.authService.changePassword(
            req.userId,
            changePasswordDto.oldPassword,
            changePasswordDto.newPassword,
        );
    }

    @Post('forgot-password')
    async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
        return this.authService.forgotPassword(forgotPasswordDto.email);
    }

    @Post('verify-reset-code')
    async verifyResetCode(@Body() verifyResetCodeDto: VerifyResetCodeDto) {
        const isValid = await this.authService.verifyResetCode(verifyResetCodeDto.email, verifyResetCodeDto.code);
        if (!isValid) {
            throw new BadRequestException('Invalid reset code');
        }
        return { message: 'Reset code verified' };
    }

    @Post('reset-password')
    async resetPassword(@Body() verifyResetDto: VerifyResetDto): Promise<void> {
        await this.authService.resetPassword(verifyResetDto.email, verifyResetDto.code, verifyResetDto.newPassword);
    }
}