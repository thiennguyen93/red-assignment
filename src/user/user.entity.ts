import { PickType } from '@nestjs/swagger';
import { Type } from '@nestjs/common';
import { Hash } from 'src/utils/hash';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  firstName: string;

  @Column({ length: 255 })
  lastName: string;

  @Column({ length: 255 })
  email: string;

  @Column({
    name: 'password',
    length: 255,
    transformer: {
      from: (value: string) => value,
      to: (value: string) => Hash.make(value),
    },
  })
  password: string;

  toJSON() {
    const { ...self } = this;
    return { ...self, password: undefined };
  }
}
export class UserFillableFields extends PickType(User as Type<User>, [
  'firstName',
  'lastName',
  'email',
  'password',
]) {}
