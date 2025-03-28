import { ApiProperty } from '@dataui/crud/lib/crud';
import { IsNumber, IsOptional } from 'class-validator';
import { Category } from 'src/category/category.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty()
  name: string;

  @Column({ type: 'text', nullable: true })
  @ApiProperty()
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @ApiProperty()
  price: number;

  @Column({ type: 'int', default: 0 })
  @ApiProperty()
  stock: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @IsNumber()
  @ApiProperty()
  @Column({ name: 'category_id', nullable: true })
  @IsOptional()
  categoryId?: number;

  @Column({
    name: 'file_name',
    nullable: true,
  })
  @ApiProperty()
  fileName: string;
}
