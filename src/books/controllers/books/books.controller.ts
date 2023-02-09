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
import { CreateListDto } from 'src/booklist/dtolist/create.list.dto';
import { CreateBookDto } from 'src/books/dto/createBook.dto';
import { updateBookDto } from 'src/books/dto/updateBook.dto';
import { BooksService } from 'src/books/services/books/books.service';

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
  // ------one to many----Start
  @Post(':id/Relation/:listid')
  async addBook(
    @Param('id', ParseIntPipe) id: number,
    @Param('listid', ParseIntPipe) listid: number,
  ) {
    console.log('id:', id);
    console.log('listid:', listid);
    return this.BookService.addBookToList(id, listid);
  }
  // ------one to Many----End

  @Put(':id')
  async updateBookById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookDto: updateBookDto,
  ) {
    await this.BookService.updateBook(id, updateBookDto);
  }

  @Delete(':id')
  async deleteBookById(@Param('id', ParseIntPipe) id: number) {
    await this.BookService.deleteBook(id);
  }
}
