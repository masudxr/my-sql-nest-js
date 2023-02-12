import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { User } from './entities/user';
import { UsersService } from './users.service';
import { BooklistModule } from 'src/booklist/booklist.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), BooklistModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [TypeOrmModule, UsersService],
})
export class UsersModule {}
