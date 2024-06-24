import { IsDate, IsNumber, IsNotEmpty, IsIn } from 'class-validator';
import { IMenu } from '../interface/menu.interface';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class MenuDto implements IMenu {
  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  date: Date;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  cityId: number;

  @ApiProperty()
  @IsNumber()
  temperature: number;

  @ApiProperty()
  @IsNumber()
  humidity: number;

  @ApiProperty()
  @IsNumber()
  uv: number;

  @ApiProperty()
  @IsNumber()
  windSpeed: number;

  @ApiProperty()
  @IsIn(['N', 'NE', 'E', 'SE', 'SW', 'S', 'W', 'NW'])
  windType: 'N' | 'NE' | 'E' | 'SE' | 'SW' | 'S' | 'W' | 'NW';

  @ApiProperty()
  @IsNumber()
  pressure: number;

  @ApiProperty()
  @IsIn(['Sunny', 'Cloudy', 'Rain', 'Snow', 'Fog', 'Windy', 'Storm'])
  weatherType: 'Sunny' | 'Cloudy' | 'Rain' | 'Snow' | 'Fog' | 'Windy' | 'Storm';

  @ApiProperty()
  @IsNumber()
  createrUserId: number;
}
