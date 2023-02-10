import { Booklist } from 'src/booklist/typeorm/list';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  // ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'books' })
export class Book {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  writer: string;

  @Column()
  publisher: string;

  @Column()
  publishAt: Date;
  // one to one relation with booklist Start
  @ManyToOne(() => Booklist, (Booklist) => Booklist.book)
  list: Booklist[];
  // one to one relation with booklist End

  // manny to many relation with booklist Start
  @ManyToMany(() => Booklist, (list) => list.books, {
    cascade: true,
  })
  @JoinTable()
  lists: Booklist[];
  // manny to many relation with booklist End
}
