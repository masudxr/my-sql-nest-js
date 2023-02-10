import { Book } from 'src/books/typeorm/entities/books';
import { User } from 'src/typeorm';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'booklists' })
export class Booklist {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  name: string;

  // one to one relation with book Start
  @OneToMany(() => Book, (Book) => Book.list, { cascade: true })
  @JoinColumn()
  book: Book[];
  // one to one relation with book End

  // manny to many relation with booklist Start
  @ManyToMany(() => Book, (book) => book.lists)
  books: Book[];

  // manny to many relation with User Start
  @OneToOne(() => User, (user) => user.lists)
  @JoinColumn()
  user: User;
}
