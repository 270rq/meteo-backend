import { IsDate, IsNumber, IsNotEmpty } from 'class-validator';
import { ISun } from '../interface/sun.interface';
import { ApiProperty } from '@nestjs/swagger';

export class SunDto implements ISun {
  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  date: Date;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  cityId: number;

  @ApiProperty()
  @IsDate()
  sunset: Date;

  @ApiProperty()
  @IsDate()
  sunrise: Date;

  @ApiProperty()
  @IsNumber()
  createrUser: number;
}
