import { Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('books')
@ApiBearerAuth('Authorization')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  //* ------------------------------------------- SEARCH -------------------------------------------
  @ApiOperation({ summary: 'Search for books' })
  @UseGuards(AuthGuard)
  @ApiQuery({
    name: 'query',
    required: true,
    type: 'string',
    description: 'Book ID',
    examples: {
      example1: {
        value: '',
      },
    },
  })
  @Get()
  search(@Query('query') query: string, @Req() request: Request) {
    const userId = request['userId'];
    return this.booksService.search(query, userId);
  }

  //* ------------------------------------------- ADD TO WISHLIST -------------------------------------------
  @ApiOperation({ summary: 'Add to Wishlist' })
  @UseGuards(AuthGuard)
  @ApiQuery({
    name: 'bookId',
    required: true,
    type: 'string',
    description: 'Book ID',
    examples: {
      example1: {
        value: '',
      },
    },
  })
  @Post('wishlist')
  addToWishlist(@Query('bookId') bookId: string, @Req() request: Request) {
    const userId = request['userId'];
    return this.booksService.addToWishlist(bookId, userId);
  }

  //* ------------------------------------------- GET WISHLIST -------------------------------------------
  @ApiOperation({ summary: 'Get all Wishlist Books' })
  @UseGuards(AuthGuard)
  @Get('wishlist')
  getWishlist(@Req() request: Request) {
    const userId = request['userId'];
    return this.booksService.getWishlist(userId);
  }

  //* ------------------------------------------- GET SUGGESTIONS -------------------------------------------
  @ApiOperation({ summary: 'Get suggestions' })
  @UseGuards(AuthGuard)
  @Get('suggestions')
  getSuggestions(@Req() request: Request) {
    const userId = request['userId'];
    return this.booksService.getSuggestions(userId);
  }
}
