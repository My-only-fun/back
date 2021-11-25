import { BaseEntity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/user.entity';

export class Benefit extends BaseEntity {
  constructor(partial: Partial<Benefit>) {
    super();
    Object.assign(this, partial);
  }
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @Column()
  price: number;

  @ManyToOne(() => User, (user) => user.benefits, {
    eager: true,
  })
  @ApiProperty({ type: () => User })
  user: User;
}
