import { Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  //* ------------------------------------------- SEARCH -------------------------------------------
  @UseGuards(AuthGuard)
  @Get()
  search(@Query('query') query: string, @Req() request: Request) {
    const userId = request['userId'];
    return this.booksService.search(query, userId);
  }

  //* ------------------------------------------- ADD TO WISHLIST -------------------------------------------
  @UseGuards(AuthGuard)
  @Post('wishlist')
  addToWishlist(@Query('bookId') bookId: string, @Req() request: Request) {
    const userId = request['userId'];
    return this.booksService.addToWishlist(bookId, userId);
  }

  //* ------------------------------------------- GET WISHLIST -------------------------------------------
  @UseGuards(AuthGuard)
  @Get('wishlist')
  getWishlist(@Req() request: Request) {
    const userId = request['userId'];
    return this.booksService.getWishlist(userId);
  }

  //* ------------------------------------------- GET SUGGESTIONS -------------------------------------------
  @UseGuards(AuthGuard)
  @Get('suggestions')
  getSuggestions(@Req() request: Request) {
    const userId = request['userId'];
    return this.booksService.getSuggestions(userId);
  }
}
