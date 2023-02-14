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
} from '@nestjs/common';
import { CreateListDto } from 'src/booklist/dto/create.list.dto';
import { CreateBookDto } from 'src/books/dto/createBook.dto';
import { UpdateBookDto } from 'src/books/dto/updateBook.dto';
import { BooksService } from 'src/books/books.service';

@Controller('books')
export class BooksController {
  constructor(private BookService: BooksService) {}
  @Get()
  findAll() {
    return this.BookService.findAll();
  }
  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return await this.BookService.get(id);
  }

  @Post()
  create(@Body() CreateBookDto: CreateBookDto) {
    return this.BookService.create(CreateBookDto);
  }
  // ------one to one/many----Start
  // @Post(':id/Relation/:listid')
  // async addBookOne2One(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Param('listid', ParseIntPipe) listid: number,
  // ) {
  //   console.log('id:', id);
  //   console.log('listid:', listid);
  //   return this.BookService.addBookOne2One(id, listid);
  // }
  // ------one to one/Many----End

  // ------many to many----Start
  @Post(':id/list/:lid')
  async addBookToList(
    @Param('id', ParseIntPipe) id: number,
    @Param('lid', ParseIntPipe) lid: number,
  ) {
    console.log('id:', id);
    console.log('lid:', lid);
    return this.BookService.addBookToList(id, lid);
  }

  @Delete('/:bid/list/:lid')
  async deleteFromList(
    @Param('bid', ParseIntPipe) bid: number,
    @Param('lid', ParseIntPipe) lid: number,
  ) {
    await this.BookService.deleteFromList(bid, lid);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    await this.BookService.update(id, updateBookDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.BookService.delete(id);
  }
}
