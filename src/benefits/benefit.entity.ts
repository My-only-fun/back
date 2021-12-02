import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/user.entity';

@Entity('benefits')
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
  @Column({type: 'float'})
  price: number;

  @ApiProperty()
  @Column({default: false})
  highlight: boolean;

  @ManyToOne((type) => User, (user) => user.benefits, { eager: false })
  @ApiProperty({ type: () => User })
  owner: User;
}
