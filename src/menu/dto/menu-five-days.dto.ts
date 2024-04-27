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
  @IsIn(['Sunny', 'Cloudy', 'Rain', 'Snow', 'Fog', 'Windy', 'Storm'])
  weatherType: 'Sunny' | 'Cloudy' | 'Rain' | 'Snow' | 'Fog' | 'Windy' | 'Storm';
}
