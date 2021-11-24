import {
  Body,
  ConflictException,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';
import {FindUserByIdDTO} from "./dto/find-user-id.dto";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async signupUser(
    @Body()
    user: CreateUserDTO,
  ): Promise<User> {
    if (await this.usersService.isEmailTaken(user.email)) {
      throw new ConflictException('This email is already taken');
    }

    if (await this.usersService.isUsernameTaken(user.username)) {
      throw new ConflictException('This username is already taken');
    }

    return this.usersService.create(user);
  }

  // Get all users
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({ type: [User] })
  async getAllUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  // Get user by id
  @ApiOperation({ summary: 'Get user by id' })
  @ApiOkResponse({ type: User, description: 'Request benchmark' })
  @Get(':id')
  async getUserById(@Param() userFindById: FindUserByIdDTO): Promise<User> {
    const user = await this.usersService.findById(userFindById.id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}