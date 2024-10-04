import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { Request } from 'express';
  import { IRol } from 'src/users/user.entity';
  import { UserService } from 'src/users/user.service'; 
  
  interface JwtPayload {
    exp: number;
    iat: number;
    isAdmin?: boolean;
    isOwner?: boolean;
    email: string; 
  }
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService, private readonly userService: UserService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest<Request>();
      const token = this.extractTokenFromHeader(request);
  
      if (!token) throw new UnauthorizedException('Token requerido');
  
      const payload = this.verifyToken(token);
  

      const user = await this.userService.findByEmail(payload.email);
      if (!user) {
        throw new UnauthorizedException('Usuario no encontrado');
      }
  
      request.user = {
        uuid: user.uuid,
        email: user.email,
        roles: this.getUserRoles(payload),
      };
  
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  
    private verifyToken(token: string): JwtPayload {
      try {
        const secret = process.env.JWT_SECRET;
        return this.jwtService.verify<JwtPayload>(token, { secret });
      } catch (error) {
        throw new UnauthorizedException(`Token inválido: ${error.message}`);
      }
    }
  
    private getUserRoles(payload: JwtPayload): IRol[] {
      const roles: IRol[] = [];
      if (payload.isAdmin) {
        roles.push(IRol.Admin);
      }
      if (payload.isOwner) {
        roles.push(IRol.Owner);
      }

      return roles.length ? roles : [IRol.User]; 
    }
  }
  