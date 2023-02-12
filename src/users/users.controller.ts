/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
// import { AuthenticateGuard } from 'src/auth/utilis/LocalGuard';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  // @UseGuards(AuthenticateGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }
  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.userService.get(id);
  }

  @Post()
  create(@Body() CreateUserDto: CreateUserDto) {
    return this.userService.create(CreateUserDto);
  }
  @Post(':uid/user2list/:lid')
  async addListForUser(
    @Param('uid', ParseIntPipe) uid: number,
    @Param('lid', ParseIntPipe) lid: number,
  ) {
    console.log('id:', uid);
    console.log('listid:', lid);
    return this.userService.addListForUser(uid, lid);
  }
  // ------many to Many----End

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.userService.delete(id);
  }
}
