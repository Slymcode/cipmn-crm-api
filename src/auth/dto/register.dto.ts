import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
  ValidationOptions,
  IsOptional,
  IsString,
  IsIn,
} from 'class-validator';

@ValidatorConstraint({ name: 'MatchPasswords', async: false })
class MatchPasswordsConstraint implements ValidatorConstraintInterface {
  validate(confirmPassword: string, args: ValidationArguments) {
    const object: any = args.object;
    return confirmPassword === object.password;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Passwords do not match';
  }
}

function Match(property: string, validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: MatchPasswordsConstraint,
    });
  };
}

export class RegisterDto {
  @ApiProperty({ example: 'John Doe', description: 'Full name of the user' })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'Unique email address',
  })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty({
    example: 'secure123',
    description: 'Strong password with minimum length 6',
  })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;

  @ApiProperty({ example: 'secure123', description: 'Password confirmation' })
  @IsNotEmpty({ message: 'Confirm Password is required' })
  @Match('password', { message: 'Passwords do not match' })
  confirmPassword: string;

  @ApiProperty({
    example: 'staff',
    description: 'User type (staff or member)',
    default: 'staff',
  })
  @IsOptional() // If you want to set the default from backend
  @IsString()
  @IsIn(['member', 'staff'], {
    message: 'userType must be either staff or member',
  })
  userType?: string;
}
