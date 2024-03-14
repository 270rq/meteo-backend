import { IsDate, IsNotEmpty, IsNumber, Min, Max } from 'class-validator';
import { IMap } from '../interface/map.interface';
import { ApiProperty } from '@nestjs/swagger';

export class MapDto implements IMap {
  @ApiProperty()
  @IsDate()
  day: Date;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  flowerId: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  x: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  y: number;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  @Max(100)
  lvl: number;

  @ApiProperty()
  @IsNumber()
  createrUserId: number;
}
