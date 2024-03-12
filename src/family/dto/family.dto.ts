import { ApiProperty } from '@nestjs/swagger';
import { IFamily } from '../interface/family.interface';

export class FamilyDto implements IFamily {
  @ApiProperty({ example: 'Tree' })
  name: string;
}
