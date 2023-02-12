import { Booklist } from 'src/booklist/entities/list';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  createAt: Date;

  @Column({ nullable: true, default: '' })
  email: string;

  @OneToMany(() => Booklist, (booklist) => booklist.user)
  lists: Booklist[];
}
