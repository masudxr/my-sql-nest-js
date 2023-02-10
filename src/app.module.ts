import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { User } from './typeorm/entities/user';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
// import { Book } from './books/typeorm/entities/books';
import { BooklistModule } from './booklist/booklist.module';
// import { Booklist } from './booklist/typeorm/list';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'fun_db',
      synchronize: false,
      autoLoadEntities: true,
    }),
    UsersModule,
    BooksModule,
    BooklistModule,
    PassportModule.register({
      session: true,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
