import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import * as bcrypt from 'bcryptjs';
import { RegisterDto, UpdateUserDto } from '../auth/auth.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(userDto: RegisterDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(userDto.password, salt);

    const user = this.usersRepository.create({
      ...userDto,
      password: hashedPassword,
    });
    return this.usersRepository.save(user);
  }

  async findOne(username: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ where: { username } });
    return user ?? undefined;
  }

  async findById(id: number): Promise<User | undefined> {
    return await this.usersRepository.findOne({ where: { id } }) ?? undefined;
  }  

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async save(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  async delete(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({ where: { email } }) ?? undefined;
  }

  async update(id: number, updateDto: Partial<RegisterDto>): Promise<User> {
    await this.usersRepository.update(id, updateDto);
    const updatedUser = await this.findById(id);
  
    if (!updatedUser) {
      throw new Error('User not found'); // Xử lý trường hợp user không tồn tại
    }
  
    return updatedUser;
  }  
  
}
