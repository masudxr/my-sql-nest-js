import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Islamic-Book' })
export class IslamicBook {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ unique: true })
  bookname: string;

  @Column()
  writername: string;

  @Column()
  publishername: string;
}
