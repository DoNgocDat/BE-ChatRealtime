import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

interface ConnectedUser {
  id: string;
  username: string;
}

@WebSocketGateway({
  cors: {
      origin: 'https://smartchat-eslp.onrender.com', // Địa chỉ của frontend
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private connectedUsers: ConnectedUser[] = []; // Lưu danh sách người dùng

  handleConnection(client: Socket) {
      console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
      console.log(`Client disconnected: ${client.id}`);
      // Xóa người dùng khỏi danh sách
      this.connectedUsers = this.connectedUsers.filter((user) => user.id !== client.id);
      this.server.emit('updateUsers', this.connectedUsers); // Cập nhật danh sách
  }

  @SubscribeMessage('userConnected')
  handleUserConnected(@MessageBody() data: { id: string; username: string }) {
      const user = { id: data.id, username: data.username };
      this.connectedUsers.push(user);
      this.server.emit('updateUsers', this.connectedUsers); // Cập nhật danh sách
  }

  @SubscribeMessage('sendMessage')
  handleMessage(@MessageBody() data: { user: string; message: string }) {
      console.log('Message received:', data);
      this.server.emit('receiveMessage', data); // Gửi tin nhắn đến tất cả client
  }
}


// import {
//   WebSocketGateway,
//   WebSocketServer,
//   SubscribeMessage,
//   MessageBody,
//   OnGatewayConnection,
//   OnGatewayDisconnect,
//   ConnectedSocket,
// } from '@nestjs/websockets';
// import { Server, Socket } from 'socket.io';
// import { ChatService } from './chat/chat.service';
// import { CreateMessageDto } from './chat/dto/create-message.dto';
// import { Injectable } from '@nestjs/common';

// interface ConnectedUser {
//   socketId: string;
//   userId: number;
//   username: string;
//   roomId: string;
// }

// @WebSocketGateway({
//   cors: {
//     origin: 'https://smartchat-eslp.onrender.com',
//   },
// })
// @Injectable()
// export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
//   @WebSocketServer()
//   server: Server;

//   constructor(private readonly chatService: ChatService) {}

//   private connectedUsers: ConnectedUser[] = [];

//   handleConnection(client: Socket) {
//     console.log(`Client connected: ${client.id}`);
//   }

//   handleDisconnect(client: Socket) {
//     console.log(`Client disconnected: ${client.id}`);
//     this.connectedUsers = this.connectedUsers.filter((user) => user.socketId !== client.id);
//     this.server.emit('updateUsers', this.connectedUsers);
//   }

//   @SubscribeMessage('joinRoom')
//   handleJoinRoom(
//     @MessageBody() data: { userId: number; username: string; roomId: string },
//     @ConnectedSocket() client: Socket,
//   ) {
//     client.join(data.roomId);
//     this.connectedUsers.push({
//       socketId: client.id,
//       userId: data.userId,
//       username: data.username,
//       roomId: data.roomId,
//     });

//     this.server.to(data.roomId).emit('updateUsers', this.connectedUsers.filter(u => u.roomId === data.roomId));
//     console.log(`${data.username} joined room ${data.roomId}`);
//   }

//   @SubscribeMessage('sendMessage')
//   async handleSendMessage(
//     @MessageBody()
//     data: {
//       senderId: number;
//       roomId: string;
//       text?: string;
//       fileUrl?: string;
//       fileType?: 'image' | 'video' | 'file';
//     },
//   ) {
//     // Lưu vào DB
//     const message = await this.chatService.create(data);

//     // Gửi tin nhắn tới tất cả client trong phòng
//     this.server.to(data.roomId).emit('receiveMessage', message);
//   }
// }
