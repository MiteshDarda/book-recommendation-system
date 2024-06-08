import { BookSuggestions } from 'src/api/books/entities/book-suggestions.entity';
import { BookWishlist } from 'src/api/books/entities/book-wishlist.entity';
import { User } from 'src/api/user/entities/user.entity';

export const allEntities = [User, BookWishlist, BookSuggestions];
