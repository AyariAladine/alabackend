import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
    ForbiddenException,
    Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import {Request} from 'express';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    canActivate(context: ExecutionContext): boolean | Promise <boolean> | Observable < boolean > {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeadear(request);
        if(!token){
            throw new UnauthorizedException('Token not found');
        }
     

        try{
            const payload = this.jwtService.verify(token);
            request.userId = payload.userId;
        }
        catch(e){
            Logger.error(e.message);
            throw new ForbiddenException('Invalid token');
        }
        return true;
    }

    private extractTokenFromHeadear(request: Request): string | undefined {
        return request.headers.authorization?.split(' ')[1];
    }
}
