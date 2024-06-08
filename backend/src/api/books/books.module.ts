import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { BookWishlist } from './entities/book-wishlist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookSuggestions } from './entities/book-suggestions.entity';
import { User } from '../user/entities/user.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookWishlist, BookSuggestions, User]),
    AuthModule,
    UserModule,
  ],
  controllers: [BooksController],
  providers: [BooksService, AuthGuard, AuthService, UserService],
})
export class BooksModule {}
