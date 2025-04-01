import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users') // Groups under "Users" in Swagger
@ApiBearerAuth()  // Requires JWT Bearer Token
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiOperation({ summary: 'Get User Profile', description: 'Returns the authenticated user\'s profile' })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully',
    schema: {
      example: {
        id: "123e4567-e89b-12d3-a456-426614174000",
        name: "John Doe",
        email: "john@example.com",
        createdAt: "2025-03-19T12:00:00.000Z"
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized - Invalid or missing token' })
  async getProfile(@Req() req) {
    return this.usersService.getUserProfile(req.user.userId);
  }
}
