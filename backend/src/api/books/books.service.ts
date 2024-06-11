import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BookSuggestions } from './entities/book-suggestions.entity';
import { BookWishlist } from './entities/book-wishlist.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(BookSuggestions)
    private readonly bookSuggestions: Repository<BookSuggestions>,
    @InjectRepository(BookWishlist)
    private readonly bookWishlist: Repository<BookWishlist>,
  ) {}

  //* ------------------------------------------- SEARCH -------------------------------------------
  async search(query: string, userId: string) {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${process.env.GOOGLE_API_KEY}&filter=free-ebooks`,
      headers: {},
    };
    try {
      const response = await axios.request(config);
      const results = await Promise.all(
        response.data.items.map(async (item: any) => {
          const isInList = await this.bookWishlist
            .createQueryBuilder('bookWishlist')
            .where('bookWishlist.bookId = :bookId', { bookId: item.id })
            .andWhere('bookWishlist.user = :userId', { userId })
            .getOne();
          if (isInList) {
            item.isWishlisted = true;
          } else {
            item.isWishlisted = false;
          }
          return item;
        }),
      );
      return { items: results };
    } catch (error) {
      console.log('error', error);
      return error;
    }
  }

  //* ------------------------------------------- ADD TO WISHLIST -------------------------------------------
  async addToWishlist(bookId: string, userId: string) {
    try {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .where('user.id = :id', { id: userId })
        .getOne();

      if (!user)
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);

      const book = await this.bookWishlist
        .createQueryBuilder('bookWishlist')
        .where('bookWishlist.bookId = :bookId', { bookId })
        .andWhere('bookWishlist.user = :userId', { userId })
        .getOne();

      if (book) {
        this.bookWishlist
          .createQueryBuilder('bookWishlist')
          .delete()
          .whereInIds([book.id])
          .execute();
        return { message: 'Book removed from wishlist' };
      } else {
        const newBook = this.bookWishlist
          .createQueryBuilder('bookWishlist')
          .insert()
          .values({ bookId, user })
          .execute();
        if (newBook) return { message: 'Book added to wishlist' };
      }
    } catch (error) {
      console.log(error);
      throw new HttpException('Internal server error', HttpStatus.NOT_FOUND);
    }
  }

  //* ------------------------------------------- SEARCH FOR A SINGLE BOOK BY ID -------------------------------------------
  async searchById(bookId: string) {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://www.googleapis.com/books/v1/volumes/${bookId}?key=${process.env.GOOGLE_API_KEY}`,
      headers: {},
    };
    try {
      const response = await axios.request(config);
      return response.data;
    } catch (error) {
      return error;
    }
  }

  //* ------------------------------------------- GET WISHLIST -------------------------------------------
  async getWishlist(userId: string) {
    try {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .where('user.id = :id', { id: userId })
        .getOne();

      if (!user)
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);

      const wishlist = await this.bookWishlist
        .createQueryBuilder('bookWishlist')
        .where('bookWishlist.user = :userId', { userId })
        .getMany();

      const result = await Promise.all(
        wishlist.map(async (item: any) => {
          const book = await this.searchById(item.bookId);
          book.isWishlisted = true;
          return book;
        }),
      );

      return { items: result };
    } catch (error) {
      console.log(error);
      throw new HttpException('Internal server error', HttpStatus.NOT_FOUND);
    }
  }
}
