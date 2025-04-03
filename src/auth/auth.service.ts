import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { RegisterDto, UpdateUserDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async validateUser(username: string, pass: string): Promise<any> {
    console.log('Validating user:', username);
    const user = await this.usersService.findOne(username);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      console.log('User validated successfully:', result);
      return result;
    }
    console.log('User validation failed');
    return null;
  }

  async login(user: any) {
    const payload = {
      sub: user.id,
      username: user.username,
      email: user.email,
      displayName: user.displayname,
      birthday: user.birthday,
    };
    const token = this.jwtService.sign(payload);
    return {
      access_token: token,
      user: payload
    };
  }

  async register(userDto: RegisterDto) {
    return this.usersService.create(userDto);
  }

  async getUserInfo(token: string) {
    try {
      const decoded = this.jwtService.verify(token); // Giải mã token
      const user = await this.usersService.findOne(decoded.username); // Lấy thông tin người dùng từ decoded.username
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      console.error('Error decoding token or finding user:', error);
      throw new Error('Invalid or expired token');
    }
  }

  async getAllUsers() {
    const users = await this.usersService.findAll();
    return users;
  }
  
  async updateUser(id: number, updateDto: Partial<UpdateUserDto>) {
    const updatedUser = await this.usersService.update(id, updateDto);
    const { password, ...result } = updatedUser; // Ẩn password khi trả về
    return result;
  }  

  async deleteUser(id: number) {
    return this.usersService.delete(id);
  }
}
