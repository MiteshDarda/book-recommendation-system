import { Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  search(@Query('query') query: string) {
    return this.booksService.search(query);
  }

  @UseGuards(AuthGuard)
  @Post('wishlist')
  addToWishlist(@Query('bookId') bookId: string, @Req() request: Request) {
    const userId = request['userId'];
    return this.booksService.addToWishlist(bookId, userId);
  }
}
