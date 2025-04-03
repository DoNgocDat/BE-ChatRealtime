// auth.controller.ts
import { Controller, Get, Post, Put, Delete, Body, UseGuards, Req, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, UpdateUserDto } from './auth.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ApiBearerAuth, ApiTags, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({summary: "Register"})
  @ApiBody({ type: RegisterDto })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({summary: 'Login'})
  @ApiBody({ type: LoginDto })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
  
  @UseGuards(JwtAuthGuard)  // Sử dụng JwtAuthGuard để bảo vệ endpoint này
  @Get('profile') 
  @ApiOperation({summary: 'Get profile one user'})
  @ApiBearerAuth('access-token')  // Chỉ ra rằng endpoint này yêu cầu access token
  async getProfile(@Req() req: any) {
    const token = req.headers['authorization']?.split(' ')[1]; // Lấy token từ header
    if (!token) {
      throw new Error('No token provided');
    }

    try {
      const user = await this.authService.getUserInfo(token);
      return {
        status: 'success',
        data: user,
      };
    } catch (error) {
      return {
        status: 'error',
        message: error.message,
      };
    }
  }

  @Get('all')
  @ApiOperation({summary: 'Get all users'})
  @ApiResponse({status: 200, description: 'Successfull operation'})
  @ApiResponse({status: 500, description: 'Internal server error'})
  async getAllUsers() {
    try {
      const users = await this.authService.getAllUsers();
      return {
        ststus: 'success',
        data: users,
      };
    } catch (error) {
      return {
        status: 'error',
        message: error.message,
      };
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')  // Chỉ ra rằng endpoint này yêu cầu access token
  @Put('update/:id')
  @ApiOperation({ summary: 'Update user info' })
  @ApiBody({ type: UpdateUserDto })
  async updateUser(@Param('id') id: string, @Body() updateDto: UpdateUserDto) {
    return this.authService.updateUser(Number(id), updateDto);
  }
  

  // @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  @ApiBearerAuth('access-token')  // Chỉ ra rằng endpoint này yêu cầu access token
  @ApiOperation({ summary: 'Delete user' })
  async deleteUser(@Param('id') id: number) {
    return this.authService.deleteUser(id);
  }
}
