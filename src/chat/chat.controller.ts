// import {
//     Controller, Post, Body, Get, Param, Put, Delete,
//     UploadedFile, UseInterceptors
//   } from '@nestjs/common';
//   import { ChatService } from './chat.service';
//   import { FileInterceptor } from '@nestjs/platform-express';
//   import { CreateMessageDto } from './dto/create-message.dto';
//   import { UpdateMessageDto } from './dto/update-message.dto';
//   import { memoryStorage } from 'multer';
//   import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';
  
//   @ApiTags('chat')
//   @Controller('chat')
//   export class ChatController {
//     constructor(private readonly chatService: ChatService) {}
  
//     @Post()
//     @ApiOperation({ summary: 'Send message' })
//     @ApiConsumes('multipart/form-data')
//     @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
//     @ApiBody({
//       schema: {
//         type: 'object',
//         properties: {
//           senderId: { type: 'number' },
//           roomId: { type: 'string' },
//           text: { type: 'string' },
//           file: {
//             type: 'string',
//             format: 'binary',
//           },
//         },
//       },
//     })
//     create(
//       @UploadedFile() file: Express.Multer.File,
//       @Body() body: CreateMessageDto,
//     ) {
//       return this.chatService.create(body, file);
//     }
  
//     @Get(':roomId')
//     @ApiOperation({ summary: 'Get messages by roomId' })
//     findAll(@Param('roomId') roomId: string) {
//       return this.chatService.findAll(roomId);
//     }
  
//     @Put(':id')
//     @ApiOperation({ summary: 'Update message' })
//     update(@Param('id') id: string, @Body() dto: UpdateMessageDto) {
//       return this.chatService.update(+id, dto);
//     }
  
//     @Delete(':id')
//     @ApiOperation({ summary: 'Delete message' })
//     remove(@Param('id') id: string) {
//       return this.chatService.delete(+id);
//     }
//   }
  