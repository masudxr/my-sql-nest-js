import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/user';
import { UsersService } from 'src/users/services/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './controllers/auth/auth.controller';
import { Auth } from './entities/auth_entity';
import { AuthService } from './services/auth/auth.service';
import { localStrategy } from './utilis/localStrategy';
import { SessionSerializer } from './utilis/sessionSerialization';

@Module({
  imports: [TypeOrmModule.forFeature([User, Auth]), UsersModule],
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
