import { Auth } from "src/auth/entities/auth.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Like {
    @PrimaryGeneratedColumn('uuid')
    id:string;
    @Column()
    likes:number;
    @ManyToOne(()=>Auth, auth=>auth.id)
    user:Auth;
}
