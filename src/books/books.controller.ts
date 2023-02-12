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
import { updateBookDto } from 'src/books/dto/updateBook.dto';
import { BooksService } from 'src/books/books.service';

@Controller('books')
export class BooksController {
  constructor(private BookService: BooksService) {}
  @Get()
  getBooks() {
    return this.BookService.findBooks();
  }
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.BookService.findBook(id);
  }

  @Post()
  createBook(@Body() CreateBookDto: CreateBookDto) {
    return this.BookService.createBook(CreateBookDto);
  }
  // ------one to one/many----Start
  @Post(':id/Relation/:listid')
  async addBookOne2One(
    @Param('id', ParseIntPipe) id: number,
    @Param('listid', ParseIntPipe) listid: number,
  ) {
    console.log('id:', id);
    console.log('listid:', listid);
    return this.BookService.addBookOne2One(id, listid);
  }
  // ------one to one/Many----End

  // ------many to many----Start
  @Post(':bid/many2many/:lid')
  async addBook(
    @Param('bid', ParseIntPipe) bid: number,
    @Param('lid', ParseIntPipe) lid: number,
  ) {
    console.log('id:', bid);
    console.log('lid:', lid);
    return this.BookService.addBookToList(bid, lid);
  }
  // ------many to Many----End

  // Get list from the DB start//
  @Get('list/:id')
  async findList(@Param('id', ParseIntPipe) id: number) {
    return await this.BookService.findList(id);
  }

  // get list from the DB End
  @Put(':id')
  async updateBook(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookDto: updateBookDto,
  ) {
    await this.BookService.updateBook(id, updateBookDto);
  }

  @Delete(':id')
  async deleteBook(@Param('id', ParseIntPipe) id: number) {
    await this.BookService.deleteBook(id);
  }
}
