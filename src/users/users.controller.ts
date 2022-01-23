import {
  Body,
  ConflictException,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post, Request, UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';
import {FindUserByIdDTO} from "./dto/find-user-id.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {ValidatedJWTReq} from "../auth/dto/validated-jwt-req";

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
  @ApiOkResponse({ type: User, description: 'Requested user'})
  @Get(':id')
  async getUserById(@Param() userFindById: FindUserByIdDTO): Promise<User> {
    const user = await this.usersService.findById(userFindById.id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // Get my profile
  @ApiOperation({ summary: 'Get my profile' })
  @ApiOkResponse({ type: User, description: 'Get my profile' })
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMyProfile(@Request() req: ValidatedJWTReq): Promise<User> {
    return req.user;
  }

  @Post('becomeInfluencer')
  async becomeInfluencer(
      @Body()
          userByIdDTO: FindUserByIdDTO,
  ): Promise<User> {
    if (!userByIdDTO) {
      throw new NotFoundException('No body found');
    }
    const user = await this.usersService.findById(userByIdDTO.id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.usersService.userBecomeInfluencer(user);
  }

}
