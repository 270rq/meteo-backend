import { IsDate, IsNotEmpty, IsNumber, Min, Max } from 'class-validator';
import { IMap } from '../interface/map.interface';
import { ApiProperty } from '@nestjs/swagger';
import { ICord } from '../interface/cord-map.dto';

export class MapDto implements IMap {
  @ApiProperty()
  @IsDate()
  day: Date;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  flowerId: number;

  @ApiProperty()
  cord: ICord[];

  @ApiProperty()
  @IsNumber()
  @Min(1)
  @Max(100)
  lvl: number;

  @ApiProperty()
  @IsNumber()
  createrUserId: number;
}
