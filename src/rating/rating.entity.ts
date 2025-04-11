// src/rating/rating.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  rating: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text', nullable: true })
  img: string;

  @Column({ type: 'varchar', length: 100 })
  username: string;
}