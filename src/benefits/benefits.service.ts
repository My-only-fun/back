import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Benefit } from './benefit.entity';
import {CreateBenefitDTO} from "./dto/create-benefit.dto";
import {User} from "../users/user.entity";

@Injectable()
export class BenefitsService {
  constructor(
    @InjectRepository(Benefit)
    private benefitsRepository: Repository<Benefit>,
  ) {}


  // Create a new benefit
  async create(benefit: CreateBenefitDTO, user: User): Promise<Benefit> {
    const newBenefit = new Benefit(benefit);
    newBenefit.owner = user;
    return newBenefit.save();
  }

  // Get all benefits for a user
  async findAll(user: User): Promise<Benefit[]> {
    return this.benefitsRepository.find({ where: { owner: user } });
  }

}
