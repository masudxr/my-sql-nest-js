import { Test, TestingModule } from '@nestjs/testing';
import { BooklistService } from './booklist.service';

describe('BooklistService', () => {
  let service: BooklistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooklistService],
    }).compile();

    service = module.get<BooklistService>(BooklistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
