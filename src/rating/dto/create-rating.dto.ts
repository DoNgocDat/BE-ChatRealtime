// src/rating/dto/create-rating.dto.ts
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRatingDto {
  @ApiProperty()
  @IsNumber()
  rating: number;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  img?: any; // để Swagger hiện phần upload ảnh
}