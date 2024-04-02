import { Column, PrimaryGeneratedColumn } from 'typeorm';
import uuid from 'uuid';

export class Auth {
  @PrimaryGeneratedColumn('uuid')
  id:string;
  @Column()
  username:string;
  @Column()
  email:string;
  @Column()
  password:string;

}
