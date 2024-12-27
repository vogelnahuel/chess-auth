import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Review } from './ReviewEntity';
import { Tournament } from './TournamentEntity';

@Entity('club')
export class Club {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255, nullable: false })
  name: string;

  @Column({ length: 255, nullable: true })
  address: string;

  @Column({ length: 100, nullable: true })
  city: string;

  @Column({ length: 100, nullable: true })
  province: string;

  @Column({ length: 50, nullable: true })
  phone: string;

  @Column({ length: 255, nullable: true })
  email: string;

  @Column({ length: 255, nullable: true })
  website: string;

  @Column({ default: false })
  isFederated: boolean;

  @Column('text', { nullable: true })
  description: string;

  @Column({ length: 255, nullable: true })
  openingHours: string;

  @Column({ length: 255, nullable: true })
  mapLocation: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToMany(() => Review, (review) => review.club)
  reviews: Review[];

  @OneToMany(() => Tournament, (tournament) => tournament.club)
  tournaments: Tournament[];
}
