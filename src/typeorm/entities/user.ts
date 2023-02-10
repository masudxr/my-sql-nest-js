import { Booklist } from 'src/booklist/typeorm/list';
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

  // manny to many relation with list Start
  @OneToMany(() => Booklist, (booklist) => booklist.user, {
    cascade: true,
  })
  lists: Booklist[];
  // manny to many relation with book End
}
