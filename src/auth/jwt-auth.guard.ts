import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from './public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true; // Allow public routes
    }
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err || info?.name === 'TokenExpiredError') {
      throw new UnauthorizedException('Session expired. Please log in again.');
    }
    if (!user) {
      throw new UnauthorizedException('Invalid authentication token');
    }
    return user;
  }
}
