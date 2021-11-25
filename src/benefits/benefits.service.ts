import {forwardRef, Inject, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Benefit } from './benefit.entity';
import {CreateBenefitDTO} from "./dto/create-benefit.dto";
import {User} from "../users/user.entity";
import {UsersService} from "../users/users.service";

@Injectable()
export class BenefitsService {
  constructor(
    @InjectRepository(Benefit)
    private benefitsRepository: Repository<Benefit>,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {}


  // Create a new benefit
  async create(benefit: CreateBenefitDTO, user: User): Promise<Benefit> {
    const newBenefit = new Benefit(benefit);
    newBenefit.owner = user;
    return newBenefit.save();
  }

  // Get all benefits for a user
  async findAllForAnInfluencer(id: string): Promise<Benefit[]> {
    const user = this.usersService.findById(id);
    return this.benefitsRepository.find({ where: { owner: user } });
  }

}
