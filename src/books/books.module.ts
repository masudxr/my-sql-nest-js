import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooklistModule } from 'src/booklist/booklist.module';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Book } from './entities/books';

@Module({
  imports: [TypeOrmModule.forFeature([Book]), BooklistModule],
  controllers: [BooksController],
  providers: [BooksService],
  exports: [BooksService],
})
export class BooksModule {}
