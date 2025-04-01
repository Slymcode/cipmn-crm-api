import { Controller, Post, Body, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ApiTags, ApiBody, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('Authentication') // Group APIs under "Authentication"
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public() //  Allows anyone to access this route
  @Post('register')
  @ApiOperation({
    summary: 'Register a new user',
    description: 'Creates a new user account',
  })
  @ApiResponse({ status: 201, description: 'User successfully created' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiBody({ type: RegisterDto }) // This makes Swagger display the request body
  async register(@Body() body: RegisterDto) {
    return this.authService.register(body.name, body.email, body.password);
  }

  @Public() //  Allows anyone to access this route
  @Post('login')
  @ApiBody({ type: LoginDto }) // This makes Swagger display the request body
  async login(@Body() body: LoginDto) {
    return this.authService.login(body.email, body.password);
  }

  @Public() //  Allows anyone to access this route
  @Post('forgot-password')
  @ApiBody({ type: ForgotPasswordDto }) // This makes Swagger display the request body
  async forgotPassword(@Body() body: ForgotPasswordDto) {
    return this.authService.forgotPassword(body.email);
  }
}
