import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MembershipService } from './membership.service';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';
import { UseGuards } from '@nestjs/common';
import { createReadStream, existsSync } from 'fs';
import { join } from 'path';
import { Response } from 'express';

@ApiTags('Membership')
@ApiBearerAuth() // Requires JWT Bearer Token
@Controller('membership')
export class MembershipController {
  constructor(private readonly membershipService: MembershipService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new membership record' })
  @ApiResponse({
    status: 201,
    description: 'Membership record created successfully',
  })
  create(@Body() createMembershipDto: CreateMembershipDto) {
    return this.membershipService.create(createMembershipDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all memberships' })
  findAll() {
    return this.membershipService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get membership details by ID' })
  findOne(@Param('id') id: string) {
    return this.membershipService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('generate-barcode/:id')
  @ApiOperation({ summary: 'Generate and download QR code for a membership' })
  @ApiResponse({
    status: 200,
    description: 'Downloads the generated QR code image',
  })
  async downloadQRCode(@Param('id') id: string, @Res() res: Response) {
    const member = await this.membershipService.findOne(id);
    if (!member) {
      throw new NotFoundException('Membership not found');
    }

    const qrData = `https://www.app.cipmn.gov.ng/verified-member-profile/${member.data.membershipID}`;
    const qrImagePath = await this.membershipService.generateQRCode(
      qrData,
      member.data.membershipID,
    );

    // Update the barcode field in the database
    //await this.membershipService.update(id, { barcode: qrImagePath });

    const fullPath = join(process.cwd(), qrImagePath);
    if (!existsSync(fullPath)) {
      throw new NotFoundException('QR code image not found');
    }

    // Set headers to force download
    res.set({
      'Content-Type': 'image/png',
      'Content-Disposition': `attachment; filename="${member.data.membershipID}.png"`,
    });

    return createReadStream(fullPath).pipe(res);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a membership record' })
  update(
    @Param('id') id: string,
    @Body() updateMembershipDto: UpdateMembershipDto,
  ) {
    return this.membershipService.update(id, updateMembershipDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a membership record' })
  remove(@Param('id') id: string) {
    return this.membershipService.remove(id);
  }
}
