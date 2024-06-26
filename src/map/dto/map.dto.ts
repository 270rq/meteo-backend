import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  Min,
  Max,
  IsArray,
} from 'class-validator';
import { IMap } from '../interface/map.interface';
import { ApiProperty } from '@nestjs/swagger';
import { ICord } from '../interface/cord-map.dto';
import { Type } from 'class-transformer';

export class MapDto implements IMap {
  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  date: Date;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  flowerId: number;

  @ApiProperty()
  @IsArray()
  cord: ICord[];

  @ApiProperty()
  @IsNumber()
  @Min(1)
  @Max(100)
  lvl: number;
}
