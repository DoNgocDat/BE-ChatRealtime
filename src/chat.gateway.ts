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
      origin: 'http://localhost:5173', // Địa chỉ của frontend
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
