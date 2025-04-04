import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional } from 'class-validator';

export class RegisterDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  displayname: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  birthday: Date;
}

export class LoginDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}

// DTO cho update (không bắt buộc nhập tất cả thông tin)
export class UpdateUserDto {
  @ApiProperty({ required: false })
  @IsOptional()
  displayname?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  birthday?: Date;
}
