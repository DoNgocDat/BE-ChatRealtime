// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Message } from './entities/message.entity';
// import { CreateMessageDto } from './dto/create-message.dto';
// import { UpdateMessageDto } from './dto/update-message.dto';
// import { CloudinaryService } from '../cloudinary/cloudinary.service';

// @Injectable()
// export class ChatService {
//     constructor(
//         @InjectRepository(Message)
//         private repo: Repository<Message>,
//         private cloudinary: CloudinaryService,
//     ) { }

//     async create(createDto: CreateMessageDto, file?: Express.Multer.File): Promise<Message> {
//         let fileUrl: string | undefined;
//         let fileType: 'image' | 'video' | 'file' | undefined;

//         if (file) {
//             fileUrl = await this.cloudinary.uploadImage(file); // bạn có thể tự detect type để đổi hàm này nếu là video/file
//             const mime = file.mimetype;
//             if (mime.startsWith('image')) fileType = 'image';
//             else if (mime.startsWith('video')) fileType = 'video';
//             else fileType = 'file';
//         }

//         const msg = this.repo.create({
//             ...createDto,
//             fileUrl,
//             fileType,
//         });

//         return this.repo.save(msg);
//     }

//     async findAll(roomId: string): Promise<Message[]> {
//         return this.repo.find({ where: { roomId }, order: { createdAt: 'ASC' } });
//     }

//     async update(id: number, dto: UpdateMessageDto): Promise<Message> {
//         await this.repo.update(id, dto);
//         const updatedMessage = await this.repo.findOneBy({ id });

//         if (!updatedMessage) {
//             throw new Error(`Message with id ${id} not found`);
//         }

//         return updatedMessage;
//     }

//     async delete(id: number): Promise<void> {
//         await this.repo.delete(id);
//     }
// }
