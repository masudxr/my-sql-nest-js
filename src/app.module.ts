import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { Booklist } from './booklist/entities/list';
import { Book } from './books/entities/books';
import { User } from './users/entities/user';
import { ConfigModule } from '@nestjs/config';
// import configaretion from './config/configaretion';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // load: [configaretion],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.host,
      port: 3306,
      username: process.env.username,
      password: '',
      database: process.env.database,
      entities: [User, Book, Booklist],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
