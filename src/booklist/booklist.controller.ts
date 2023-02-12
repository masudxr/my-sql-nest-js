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
import { UpdateListDto } from 'src/booklist/dto/update.list.dto';
import { BooklistService } from './booklist.service';

@Controller('booklist')
export class BooklistController {
  constructor(private listService: BooklistService) {}
  @Get()
  findAll() {
    return this.listService.findAll();
  }
  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.listService.get(id);
  }

  @Post()
  create(@Body() CreateListDto: CreateListDto) {
    return this.listService.create(CreateListDto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateListDto: UpdateListDto,
  ) {
    await this.listService.update(id, updateListDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.listService.delete(id);
  }

  @Get(':id/books')
  async findWithBooks(@Param('id', ParseIntPipe) id: number) {
    return await this.listService.findWithBooks(id);
  }
}
