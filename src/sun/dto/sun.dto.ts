import { IsDate, IsNumber, IsNotEmpty } from 'class-validator';
import { ISun } from '../interface/sun.interface';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class SunDto implements ISun {
  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  date: Date;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  cityId: number;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  sunset: Date;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  sunrise: Date;

  @ApiProperty()
  @IsNumber()
  createrUserId: number;
}
