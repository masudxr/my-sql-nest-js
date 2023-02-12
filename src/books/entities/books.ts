import { Booklist } from 'src/booklist/entities/list';
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

  @Column({ nullable: false })
  name: string;

  @Column()
  writer: string;

  @Column()
  publisher: string;

  @Column()
  publishAt: Date;

  @ManyToMany(() => Booklist)
  @JoinTable()
  lists: Booklist[];
}
