import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

/* eslint-disable @typescript-eslint/no-explicit-any */
export class ReqPageSunDto {
  @ApiProperty()
  @IsOptional()
  where?: any;
  @ApiProperty()
  @IsOptional()
  order?: any;
}
