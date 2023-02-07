import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'books' })
export class Book {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ unique: true })
  bookname: string;

  @Column()
  writername: string;

  @Column()
  publishername: string;

  @Column()
  publishAt: Date;
}
