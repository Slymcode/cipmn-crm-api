import { CreateMembershipDto } from './dto/create-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { successResponse } from '../common/utils/response.util';

@Injectable()
export class MembershipService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateMembershipDto) {
    const membership = await this.prisma.membership.create({
      data: dto,
    });

    return successResponse('Membership created successfully', membership, 201);
  }

  async findAll() {
    const memberships = await this.prisma.membership.findMany();
    return successResponse('All memberships retrieved', memberships);
  }

  async findOne(id: string) {
    const membership = await this.prisma.membership.findUnique({
      where: { id },
    });

    if (!membership) {
      throw new NotFoundException('Membership not found');
    }

    return successResponse('Membership found', membership);
  }

  async update(id: string, dto: UpdateMembershipDto) {
    const membership = await this.prisma.membership.update({
      where: { id },
      data: dto,
    });

    return successResponse('Membership updated successfully', membership);
  }

  async remove(id: string) {
    await this.prisma.membership.delete({ where: { id } });
    return successResponse('Membership deleted successfully', null, 204);
  }
}
