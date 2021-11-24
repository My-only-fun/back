import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { FindUserDTO } from './dto/find-user.dto';
import { User } from './user.entity';
import { isUUID } from 'class-validator';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async isEmailTaken(email: string): Promise<boolean> {
    const existingUser = await this.usersRepository.findOne({ email });
    if (existingUser) {
      return true;
    }
    return false;
  }

  async isUsernameTaken(username: string): Promise<boolean> {
    const existingUser = await this.usersRepository.findOne({ username });
    if (existingUser) {
      return true;
    }
    return false;
  }

  async create(userData: CreateUserDTO): Promise<User> {
    const user = new User(userData);
    return user.save();
  }

  async findOne(user: FindUserDTO): Promise<User | undefined> {
    return this.usersRepository.findOne({ username: user.username });
  }

  // Find by id
  async findById(id: string): Promise<User | undefined> {
    if (!isUUID(id)) {
      throw new BadRequestException(`Invalid user id: ${id}`);
    }

    const user = this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  // Find all users
  async findAll(): Promise<User[]> {
    return this.usersRepository.find({is_influencer: true});
  }

}
