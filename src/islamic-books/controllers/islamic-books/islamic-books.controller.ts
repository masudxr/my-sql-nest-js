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
import { CreateIslamicBookDto } from 'src/islamic-books/dto/create.dto';
import { updateIslamicBookDto } from 'src/islamic-books/dto/update.dto';
import { IslamicBooksService } from 'src/islamic-books/services/islamic-books/islamic-books.service';

@Controller('islamic-books')
export class IslamicBooksController {
  constructor(private IslamicBookService: IslamicBooksService) {}
  @Get()
  getIslamicBooks() {
    return this.IslamicBookService.findIslamicBooks();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.IslamicBookService.findIslamicBook(id);
  }

  @Post()
  createIslamicBook(@Body() CreateIslamicBookDto: CreateIslamicBookDto) {
    return this.IslamicBookService.createIslamicBook(CreateIslamicBookDto);
  }

  @Put(':id')
  async updateIslamicBookById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateIslamicBookDto: updateIslamicBookDto,
  ) {
    await this.IslamicBookService.updateIslamicBook(id, updateIslamicBookDto);
  }

  @Delete(':id')
  async deleteIslamicBookById(@Param('id', ParseIntPipe) id: number) {
    await this.IslamicBookService.deleteIslamicBook(id);
  }
}
