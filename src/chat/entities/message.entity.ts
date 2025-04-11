// import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';

// @Entity()
// export class Message {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   senderId: number;

//   @Column()
//   roomId: string; // có thể là groupId hoặc ghép userId1_userId2

//   @Column({ nullable: true })
//   text?: string;

//   @Column({ nullable: true })
//   fileUrl?: string;

//   @Column({ nullable: true })
//   fileType?: 'image' | 'video' | 'file';

//   @CreateDateColumn()
//   createdAt: Date;
// }
