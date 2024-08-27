import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('customer')
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', length: 50, nullable: false })
  name: string;

  @Column({ name: 'phone', length: 20, nullable: false })
  phone: string;

  @Column({ name: 'location', length: 200 })
  location: string;
}
