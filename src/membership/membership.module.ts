import { Module } from '@nestjs/common';
import { MembershipService } from './membership.service';
import { MembershipController } from './membership.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [MembershipController],
  providers: [MembershipService, PrismaService],
  exports: [MembershipService], // Export UsersService for use in other modules if needed
})
export class MembershipModule {}
