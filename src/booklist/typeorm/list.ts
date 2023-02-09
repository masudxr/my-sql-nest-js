import { Book } from 'src/books/typeorm/entities/books';
import {
  Column,
  Entity,
  ManyToMany,
  // JoinColumn,
  // JoinTable,
  // OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'booklists' })
export class Booklist {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  listid: number;

  @Column()
  name: string;
  // booklists: Book[];
  // @OneToMany(() => Book, (Book) => Book.id, { cascade: true })
  // @JoinTable()
  // id: Book[][];
  @ManyToMany(() => Book, (book) => book.lists)
  books: Book[];
}
