import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { User } from './entities/user';
import { UsersService } from './users.service';
import { BooklistModule } from 'src/booklist/booklist.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), BooklistModule], //--added booklist module and export typeorm and usersService to import module and services in the defferent modules.
  controllers: [UsersController],
  providers: [UsersService],
  exports: [TypeOrmModule, UsersService], //exports typeormModule and UsersService to imports it into the differrent services section.
})
export class UsersModule {}
