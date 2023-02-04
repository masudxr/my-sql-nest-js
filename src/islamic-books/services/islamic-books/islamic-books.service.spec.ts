import { Test, TestingModule } from '@nestjs/testing';
import { IslamicBooksService } from './islamic-books.service';

describe('IslamicBooksService', () => {
  let service: IslamicBooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IslamicBooksService],
    }).compile();

    service = module.get<IslamicBooksService>(IslamicBooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
