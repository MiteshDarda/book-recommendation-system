import { BookSuggestions } from 'src/api/books/entities/book-suggestions.entity';
import { BookWishlist } from 'src/api/books/entities/book-wishlist.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @OneToMany(() => BookWishlist, (bookWishlist) => bookWishlist.user)
  bookWishlist: BookWishlist[];

  @OneToMany(() => BookSuggestions, (bookSuggestions) => bookSuggestions.user)
  bookSuggestions: BookSuggestions[];
}
