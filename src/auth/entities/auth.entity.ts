import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import uuid from 'uuid';
@Entity('Auth')
export class Auth {
  @PrimaryGeneratedColumn('uuid')
  id:string;
  @Column()
  username:string;
  @Column()
  email:string;
  @Column()
  password:string;
  @Column()
  permission:string;

}
