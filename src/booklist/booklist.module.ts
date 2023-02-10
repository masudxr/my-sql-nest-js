import { Module } from '@nestjs/common';
import { BooklistService } from './services/booklist/booklist.service';
import { BooklistController } from './controllers/booklist/booklist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booklist } from './typeorm/list';
import { Book } from 'src/books/typeorm/entities/books';
import { User } from 'src/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Booklist, User])],
  providers: [BooklistService],
  controllers: [BooklistController],
})
export class BooklistModule {}
