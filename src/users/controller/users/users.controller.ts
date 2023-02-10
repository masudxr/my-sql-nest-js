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
import { updateUserDto } from 'src/users/dtos/UpdateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  // @UseGuards(AuthenticateGuard)
  @Get()
  getUsers() {
    return this.userService.findUsers();
  }
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findUser(id);
  }

  @Post()
  createUser(@Body() CreateUserDto: CreateUserDto) {
    return this.userService.createUser(CreateUserDto);
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
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: updateUserDto,
  ) {
    await this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    await this.userService.deleteUser(id);
  }
}
