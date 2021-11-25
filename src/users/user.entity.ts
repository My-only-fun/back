import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity, OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

import argon2 = require('argon2');
import {Benefit} from "../benefits/benefit.entity";

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
  @Column({ default: false })
  is_influencer: boolean;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @Exclude()
  @VersionColumn()
  dataVersion: number;

  @OneToMany((type) => Benefit, (benefit) => benefit.user)
  benefits: Benefit[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    this.password = await argon2.hash(this.password);
  }
}
