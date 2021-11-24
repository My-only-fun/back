import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class FindUserByIdDTO {
  @IsUUID('all')
  @ApiProperty()
  id: string;
}
