import { Book } from 'src/books/entities/books';
import { User } from 'src/users/entities/user';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'booklists' })
export class Booklist {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  name: string;

  @Column({
    nullable: false,
  })
  userId: number;

  @ManyToMany(() => Book, (book) => book.lists)
  books: Book[];

  @ManyToOne(() => User, (user) => user.lists, { nullable: false })
  @JoinColumn({ name: 'userId' })
  user: User;
}
