import { Book } from 'src/books/typeorm/entities/books';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'booklists' })
export class Booklist {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  listid: number;

  @Column()
  name: string;

  @OneToMany(() => Book, (Book) => Book.booklist, { cascade: true })
  @JoinColumn()
  id: Book[];
}
