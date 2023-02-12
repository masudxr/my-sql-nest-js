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
  // UseGuards,
} from '@nestjs/common';
// import { AuthenticateGuard } from 'src/auth/utilis/LocalGuard';
import { CreateListDto } from 'src/booklist/dto/create.list.dto';
import { updateListDto } from 'src/booklist/dto/update.list.dto';
import { BooklistService } from './booklist.service';
// import { CreateBookDto } from 'src/books/dto/createBook.dto';

@Controller('booklist')
export class BooklistController {
  constructor(private ListService: BooklistService) {}
  // @UseGuards(AuthenticateGuard)
  @Get()
  getLists() {
    return this.ListService.findLists();
  }
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ListService.findList(id);
  }

  @Post()
  createList(@Body() CreateListDto: CreateListDto) {
    return this.ListService.createList(CreateListDto);
  }

  @Put(':id')
  async updateBookById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateListDto: updateListDto,
  ) {
    await this.ListService.updateList(id, updateListDto);
  }

  @Delete(':id')
  async deleteListById(@Param('id', ParseIntPipe) id: number) {
    await this.ListService.deleteList(id);
  }
}
