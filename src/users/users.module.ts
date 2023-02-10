import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booklist } from 'src/booklist/typeorm/list';
import { Book } from 'src/books/typeorm/entities/books';
import { User } from 'src/typeorm/entities/user';
import { UsersController } from './controller/users/users.controller';
import { UsersService } from './services/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Book, Booklist])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
