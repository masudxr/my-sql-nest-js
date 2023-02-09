import { Booklist } from 'src/booklist/typeorm/list';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  // ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  // @ManyToOne(() => Booklist, (Booklist) => Booklist.id)
  // booklist: Booklist[];

  @ManyToMany(() => Booklist, (list) => list.books, {
    // eager: false,
    cascade: true,
  })
  @JoinTable()
  lists: Booklist[];
}
