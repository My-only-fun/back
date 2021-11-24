import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

import argon2 = require('argon2');

@Entity('users')
@Unique(['username', 'email'])
export class User extends BaseEntity {
  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }

  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  username: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @Column()
  site: string;

  @ApiProperty()
  @Column()
  hashtags: string;

  @ApiProperty()
  @Column()
  avatar_url: string;

  @Column()
  @Exclude()
  password: string;

  @ApiProperty()
  @Column()
  email: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @Exclude()
  @VersionColumn()
  dataVersion: number;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    this.password = await argon2.hash(this.password);
  }
}