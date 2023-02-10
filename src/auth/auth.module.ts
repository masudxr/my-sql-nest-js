import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booklist } from 'src/booklist/typeorm/list';
import { Book } from 'src/books/typeorm/entities/books';
import { User } from 'src/typeorm/entities/user';
import { UsersService } from 'src/users/services/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { localStrategy } from './utilis/localStrategy';
import { SessionSerializer } from './utilis/sessionSerialization';

@Module({
  imports: [TypeOrmModule.forFeature([User, Book, Booklist]), UsersModule],
  controllers: [AuthController],
  providers: [
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
    {
      provide: 'USER_SERVICE',
      useClass: UsersService,
    },
    localStrategy,
    SessionSerializer,
  ],
})
export class AuthModule {}
