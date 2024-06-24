import { IsString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { IFlower } from '../interface/flower.interaface';
import { ApiProperty } from '@nestjs/swagger';

export class FlowerDto implements IFlower {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  familyId: number;
}
