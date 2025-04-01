import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';

@Injectable()
export class MembershipService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateMembershipDto) {
    return this.prisma.membership.create({ data });
  }

  async findAll() {
    return this.prisma.membership.findMany();
  }

  async findOne(id: string) {
    const membership = await this.prisma.membership.findUnique({
      where: { id },
    });
    if (!membership) throw new NotFoundException('Membership not found');
    return membership;
  }

  async update(id: string, data: UpdateMembershipDto) {
    return this.prisma.membership.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.membership.delete({ where: { id } });
  }
}
