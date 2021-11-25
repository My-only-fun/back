import {
  Body,
  Controller,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { BenefitsService } from './benefits.service';
import { CreateBenefitDTO } from './dto/create-benefit.dto';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Benefit } from './benefit.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ValidatedJWTReq } from '../auth/dto/validated-jwt-req';

@Controller('benefits')
export class BenefitsController {
  constructor(private readonly benefitsService: BenefitsService) {}

  // Create a new benefit
  @ApiOperation({ summary: 'Create a new benefit for an influencer' })
  @ApiOkResponse({ type: [Benefit] })
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() benefit: CreateBenefitDTO,
    @Request() req: ValidatedJWTReq,
  ) {
    if (!req.user.is_influencer) {
      throw new UnauthorizedException('You are not an influencer');
    }
    return await this.benefitsService.create(benefit, req.user);
  }
}
