// src/rating/rating.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body, UploadedFile, UseInterceptors, } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { RatingService } from './rating.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { ApiBearerAuth, ApiTags, ApiBody, ApiOperation, ApiResponse, ApiConsumes, } from '@nestjs/swagger';

@ApiTags('rating')
@Controller('rating')
export class RatingController {
  constructor(
    private readonly ratingService: RatingService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create rating' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Rating creation payload',
    type: CreateRatingDto,
  })
  @UseInterceptors(FileInterceptor('img', { storage: memoryStorage() }))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createDto: CreateRatingDto,
  ) {
    const imgUrl = file
      ? await this.cloudinaryService.uploadImage(file)
      : null;
    return this.ratingService.create({ ...createDto, img: imgUrl ?? undefined });
  }

  @Get()
  @ApiOperation({ summary: 'Get all ratings' })
  async findAll() { 
    return this.ratingService.findAll();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update rating' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Rating update payload',
    type: UpdateRatingDto,
  })
  @UseInterceptors(FileInterceptor('img', { storage: memoryStorage() }))
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateDto: UpdateRatingDto,
  ) {
    const rating = await this.ratingService.findOne(+id);
    if (!rating) throw new Error('Rating not found');

    let imageUrl = rating.img;
    if (file) {
      if (imageUrl) {
        const publicId = this.cloudinaryService.getPublicIdFromUrl(imageUrl);
        await this.cloudinaryService.deleteImage(publicId);
      }
      imageUrl = await this.cloudinaryService.uploadImage(file);
    }

    return this.ratingService.update(+id, { ...updateDto, img: imageUrl });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete rating' })
  async remove(@Param('id') id: string) {
    const rating = await this.ratingService.findOne(+id);
    if (!rating) throw new Error('Rating not found');

    if (rating.img) {
      const publicId = this.cloudinaryService.getPublicIdFromUrl(rating.img);
      await this.cloudinaryService.deleteImage(publicId);
    }

    return this.ratingService.delete(+id);
  }
}