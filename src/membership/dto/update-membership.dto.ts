import { PartialType } from '@nestjs/mapped-types';
import { CreateMembershipDto } from './create-membership.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMembershipDto extends PartialType(CreateMembershipDto) {
  @ApiProperty({ example: 'MEM12345', description: 'Membership ID' })
  membershipID: string;
}
