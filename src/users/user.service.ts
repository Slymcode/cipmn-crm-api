import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { successResponse } from '../common/utils/response.util';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const users = await this.prisma.user.findMany({
      select: { id: true, name: true, email: true },
    });

    return successResponse('Users retrieved successfully', users);
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return successResponse('User retrieved successfully', user);
  }

  async update(id: string, dto: UpdateUserDto) {
    const user = await this.prisma.user.update({
      where: { id },
      data: dto,
    });

    const { password, ...safeUser } = user;
    return successResponse('User updated successfully', safeUser);
  }

  async remove(id: string) {
    await this.prisma.user.delete({ where: { id } });
    return successResponse('User deleted successfully', null, 204);
  }
  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
