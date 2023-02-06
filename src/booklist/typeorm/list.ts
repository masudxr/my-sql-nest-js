import { Book } from 'src/books/typeorm/entities/books';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'booklists' })
export class Booklist {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  listname: string;

  @Column()
  bookname: string;

  @OneToOne(() => Book)
  @JoinColumn()
  book: Book;
}
