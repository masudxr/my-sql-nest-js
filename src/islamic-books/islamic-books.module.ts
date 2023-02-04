import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IslamicBooksController } from './controllers/islamic-books/islamic-books.controller';
import { IslamicBooksService } from './services/islamic-books/islamic-books.service';
import { IslamicBook } from './typeorm/islamic-book';

@Module({
  imports: [TypeOrmModule.forFeature([IslamicBook])],
  controllers: [IslamicBooksController],
  providers: [IslamicBooksService],
})
export class IslamicBooksModule {}
