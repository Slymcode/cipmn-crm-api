import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  readonly name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Invalid email format' })
  readonly email?: string;

  @IsOptional()
  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  readonly password?: string;
}
