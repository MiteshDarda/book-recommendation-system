import { User } from 'src/api/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BookWishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bookId: string;

  @ManyToOne(() => User, (user) => user.bookWishlist)
  user: BookWishlist | string;
}
