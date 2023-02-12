import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { BooklistModule } from './booklist/booklist.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'fun_db',
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsersModule,
    BooksModule,
    BooklistModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
