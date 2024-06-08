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

  async search(query: string) {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${process.env.GOOGLE_API_KEY}&filter=free-ebooks`,
      headers: {},
    };

    return axios
      .request(config)
      .then((response) => {
        console.log('response', response.data);
        return response.data;
      })
      .catch((error) => {
        return error;
      });
  }

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

      console.log(book);
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
        console.log(newBook);
        return { message: 'Book added to wishlist' };
      }
    } catch (error) {
      console.log(error);
      throw new HttpException('Internal server error', HttpStatus.NOT_FOUND);
    }
  }
}
