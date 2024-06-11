import { User } from 'src/api/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BookSuggestions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: false })
  term: string;

  @ManyToOne(() => User, (user) => user.bookWishlist)
  user: BookSuggestions | string;
}
