// src/rating/rating.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rating } from './rating.entity';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(Rating)
    private ratingRepo: Repository<Rating>,
  ) {}

  async create(data: Partial<Rating>) {
    return this.ratingRepo.save(data);
  }

  async findAll() {
    return this.ratingRepo.find();
  }

  async findOne(id: number) {
    return this.ratingRepo.findOneBy({ id });
  }

  async update(id: number, data: Partial<Rating>) {
    await this.ratingRepo.update(id, data);
    return this.ratingRepo.findOneBy({ id });
  }

  async delete(id: number) {
    const rating = await this.ratingRepo.findOneBy({ id });
    if (!rating) throw new NotFoundException('Rating not found');
    return this.ratingRepo.remove(rating);
  }
}