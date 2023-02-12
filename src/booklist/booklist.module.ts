import { Module } from '@nestjs/common';
import { BooklistController } from './booklist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booklist } from './entities/list';
import { BooklistService } from './booklist.service';

@Module({
  imports: [TypeOrmModule.forFeature([Booklist])],
  providers: [BooklistService],
  controllers: [BooklistController],
  exports: [TypeOrmModule, BooklistService],
})
export class BooklistModule {}
