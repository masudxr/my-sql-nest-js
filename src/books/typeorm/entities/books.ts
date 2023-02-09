import { Booklist } from 'src/booklist/typeorm/list';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @ManyToOne(() => Booklist, (Booklist) => Booklist.id)
  booklist: Booklist[];
}
