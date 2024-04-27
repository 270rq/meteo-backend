import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsNotEmpty, IsIn } from 'class-validator';

export class MenuFiveDaysDto {
  @ApiProperty()
  @IsDate()
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
  windSpeed: number;

  @ApiProperty()
  @IsIn(['N', 'NE', 'E', 'SE', 'SW', 'S', 'W', 'NW'])
  windType: 'N' | 'NE' | 'E' | 'SE' | 'SW' | 'S' | 'W' | 'NW';

  @ApiProperty()
  @IsIn(['Sunny', 'Cloudy', 'Rain', 'Snow', 'Fog', 'Windy', 'Storm'])
  weatherType: 'Sunny' | 'Cloudy' | 'Rain' | 'Snow' | 'Fog' | 'Windy' | 'Storm';
}
