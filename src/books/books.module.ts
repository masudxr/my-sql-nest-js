import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booklist } from 'src/booklist/typeorm/list';
import { BooksController } from './controllers/books/books.controller';
import { BooksService } from './services/books/books.service';
import { Book } from './typeorm/entities/books';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Booklist])],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
