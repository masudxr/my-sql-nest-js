import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './typeorm/entities/user';
import { UsersModule } from './users/users.module';
import { PassportModule } from '@nestjs/passport';
import { SessionEntity } from './typeorm/session';
import { BooksModule } from './books/books.module';
import { IslamicBooksModule } from './islamic-books/islamic-books.module';
import { Book } from './books/typeorm/entities/books';
import { IslamicBook } from './islamic-books/typeorm/islamic-book';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'fun_db',
      entities: [User, SessionEntity, Book, IslamicBook],
      synchronize: true,
    }),
    UsersModule,
    PassportModule.register({
      session: true,
    }),
    BooksModule,
    IslamicBooksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
