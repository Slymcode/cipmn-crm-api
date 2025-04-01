import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { MembershipModule } from './membership/membership.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, UsersModule, MembershipModule],
  providers: [
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, // Global JWT Protection for all APIs
    },
  ],
})
export class AppModule {}
