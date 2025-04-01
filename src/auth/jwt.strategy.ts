import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // ✅ Ensure expired tokens are rejected
      secretOrKey: process.env.JWT_SECRET || 'secret_key',
    });
  }

  async validate(payload: any) {
    if (!payload || !payload.exp) {
      throw new UnauthorizedException('Invalid token');
    }

    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (payload.exp < currentTimestamp) {
      throw new UnauthorizedException('Token has expired');
    }

    return { userId: payload.userId, email: payload.email }; // Attach user to request
  }
}
