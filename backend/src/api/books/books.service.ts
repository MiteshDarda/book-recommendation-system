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
    try {
      const responseData = await this.searchInGoogleAPI(query);
      const results = await Promise.all(
        responseData?.items.map(async (item: any) => {
          const isInList = await this.bookWishlist
            .createQueryBuilder('bookWishlist')
            .where('bookWishlist.bookId = :bookId', { bookId: item.id })
            .andWhere('bookWishlist.user = :userId', { userId })
            .getOne();
          // Check if book is already in wishlist
          if (isInList) {
            item.isWishlisted = true;
          } else {
            item.isWishlisted = false;
          }
          return item;
        }),
      );
      // Add search term to suggestions
      this.bookSuggestions
        .createQueryBuilder('bookSuggestions')
        .insert()
        .values({ term: query, user: userId })
        .execute();
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

      // Check if user exists
      if (!user)
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);

      const book = await this.bookWishlist
        .createQueryBuilder('bookWishlist')
        .where('bookWishlist.bookId = :bookId', { bookId })
        .andWhere('bookWishlist.user = :userId', { userId })
        .getOne();

      // Check if book is already in wishlist
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
        // Add book to suggestions
        this.addToSuggestions(bookId, userId);
        if (newBook) return { message: 'Book added to wishlist' };
      }
    } catch (error) {
      console.log(error);
      throw new HttpException('Internal server error', HttpStatus.NOT_FOUND);
    }
  }

  //* ------------------------------------------- ADD TO SUGGESTIONS MODEL -------------------------------------------
  async addToSuggestions(bookId: string, userId: string) {
    const book = await this.searchById(bookId);
    const authors = book?.volumeInfo?.authors;
    const title = book?.volumeInfo?.title;
    const publisher = book?.volumeInfo?.publisher;

    console.log(authors, title, publisher);
    const newSuggestions = [];
    if (authors) {
      newSuggestions.push(...authors);
    }
    if (title) {
      newSuggestions.push(title);
    }
    if (publisher) {
      newSuggestions.push(publisher);
    }
    newSuggestions.map(async (term: string) => {
      this.bookSuggestions
        .createQueryBuilder('bookSuggestions')
        .insert()
        .values({ term, user: userId })
        .execute();
    });
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

  //* ------------------------------------------- GET SUGGESTIONS -------------------------------------------
  async getSuggestions(userId: string) {
    try {
      const count = await this.bookSuggestions
        .createQueryBuilder('bookSuggestions')
        .select('bookSuggestions.term')
        .where('bookSuggestions.user = :userId', { userId })
        .getCount();
      if (!count) {
        return await this.searchInGoogleAPI('best sellers', 10);
      } else {
        const result = { items: [] };
        for (let i = 0; i < 10; ++i) {
          const randomOffset = Math.floor(Math.random() * count);
          const suggestion = await this.bookSuggestions
            .createQueryBuilder('bookSuggestions')
            .select()
            .where('bookSuggestions.user = :userId', { userId })
            .offset(randomOffset)
            .limit(1)
            .getOne();
          const data = await this.searchInGoogleAPI(suggestion.term, 5);
          result.items.push(
            data.items[Math.floor(Math.random() * data.items.length)],
          );
        }
        return result;
      }
    } catch (error) {
      console.log(error);
      throw new HttpException('Internal server error', HttpStatus.NOT_FOUND);
    }
  }

  //* ------------------------------------------- SEARCH IN GOOGLE API -------------------------------------------
  async searchInGoogleAPI(query: string, limit: number = 10) {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${process.env.GOOGLE_API_KEY}&filter=free-ebooks&maxResults=${limit}`,
      headers: {},
    };
    try {
      const response = await axios.request(config);
      return response.data;
    } catch (error) {
      throw new HttpException('Internal server error', HttpStatus.NOT_FOUND);
    }
  }
}
