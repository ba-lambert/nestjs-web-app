import { Auth } from "src/auth/entities/auth.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Profile {
    @PrimaryGeneratedColumn('uuid')
    id:string;
    @Column()
    fullnames:string;
    @Column()
    email:string;
    @Column()
    phoneNo:number;
    @OneToOne(()=>Auth, auth =>auth.profile)
    @JoinColumn()
    auth:Auth;
}
