import { User } from 'src/api/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BookSuggestions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  author: string | null;

  @Column({ nullable: true })
  category: string | null;

  @ManyToOne(() => User, (user) => user.bookWishlist)
  user: BookSuggestions | string;
}
