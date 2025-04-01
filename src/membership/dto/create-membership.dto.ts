import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  IsDate,
  IsInt,
  IsJSON,
} from 'class-validator';

export class CreateMembershipDto {
  @ApiProperty({
    example: 'b07a9c10-8f1d-4c8e-bb8a-123456789abc',
    description: 'User ID',
  })
  @IsUUID()
  userId: string;

  @ApiProperty({
    example: 'passport.jpg',
    description: 'Path to passport image',
    required: false,
  })
  @IsOptional()
  @IsString()
  passport?: string;

  @ApiProperty({ example: 'John Doe', description: 'Full name of the member' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Dr.', description: 'Title of the member' })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email address',
  })
  @IsString()
  email: string;

  @ApiProperty({ example: '+2349012345678', description: 'Phone number' })
  @IsString()
  phone: string;

  @ApiProperty({
    example: '1990-01-01T00:00:00.000Z',
    description: 'Date of Birth',
  })
  @IsString()
  dob: string;

  @ApiProperty({
    example: 'MARRIED',
    description: 'Marital status',
  })
  @IsString()
  maritalStatus: string;

  @ApiProperty({ example: 'MEM12345', description: 'Unique membership ID' })
  @IsString()
  membershipID: string;

  @ApiProperty({ example: 'Professional', description: 'Membership category' })
  @IsString()
  membershipCategory: string;

  @ApiProperty({
    example: 'PRO123',
    description: 'Professional License ID',
    required: false,
  })
  @IsOptional()
  @IsString()
  professionalLicenseID?: string;

  @ApiProperty({
    example: '2015',
    description: 'Year of License',
    required: false,
  })
  @IsOptional()
  @IsString()
  yearOfLicense?: string;

  @ApiProperty({
    example: 'STAMP123',
    description: 'Stamp ID Number',
    required: false,
  })
  @IsOptional()
  @IsString()
  stampIDNumber?: string;

  @ApiProperty({
    example: 'SEAL123',
    description: 'Seal ID Number',
    required: false,
  })
  @IsOptional()
  @IsString()
  sealIDNumber?: string;

  @ApiProperty({
    example: 'IT Project Manager',
    description: 'Specialization',
    required: false,
  })
  @IsOptional()
  @IsString()
  specialization?: string;

  @ApiProperty({
    example: {
      name: 'Nigeria',
      geopoliticalZone: 'North Central',
      state: 'Kwara',
      lga: 'Ilorin East',
    },
    description: 'Country of Origin',
  })
  @IsJSON()
  countryOfOrigin: object;

  @ApiProperty({
    example: {
      name: 'Nigeria',
      geopoliticalZone: 'South West',
      state: 'Lagos',
      lga: 'Ikeja',
      address: '123 Main Street',
    },
    description: 'Country of Residence',
  })
  @IsJSON()
  countryOfResidence: object;

  @ApiProperty({
    example: {
      name: 'Ghana',
      geopoliticalZone: 'West Africa',
      state: 'Accra',
      lga: 'Greater Accra',
      address: '456 Business Avenue',
    },
    description: 'Country of Operation',
  })
  @IsJSON()
  countryOfOperation: object;

  @ApiProperty({
    example: {
      highestQualification: 'PhD',
      degrees: [
        {
          name: 'BSc Computer Science',
          institution: 'University of Lagos',
          year: 2015,
        },
      ],
    },
    description: 'Education Qualification',
  })
  @IsJSON()
  educationQualification: object;

  @ApiProperty({
    example: [{ professionalBody: 'PMI', certificateName: 'PMP', year: 2022 }],
    description: 'Professional Qualifications',
  })
  @IsJSON()
  professionalQualification: object;

  @ApiProperty({
    example: [
      { companyName: 'Tech Corp', role: 'Project Manager', yearJoined: 2019 },
    ],
    description: 'Work Experience',
  })
  @IsJSON()
  workExperience: object;

  @ApiProperty({
    example: [
      {
        name: 'Tech Corp',
        position: 'Project Manager',
        phone: '09000000000',
        email: 'johndoe@gmail.com',
      },
    ],
    description: 'References',
  })
  @IsJSON()
  references: object;

  @ApiProperty({
    example: 'Software Engineer',
    description: 'Occupation',
    required: false,
  })
  @IsOptional()
  @IsString()
  occupation?: string;

  @ApiProperty({
    example: 'Private',
    description: 'Operational Sector',
    required: false,
  })
  @IsOptional()
  @IsString()
  operationalSector?: string;
}
