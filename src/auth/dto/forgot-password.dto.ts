import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class ForgotPasswordDto {

  @ApiProperty({ example: 'john@example.com', description: 'Unique email address' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;
}
