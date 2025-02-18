import { Post } from "src/posts/entities/post.entity";
import { Profile } from "src/profile/entities/profile.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import uuid from 'uuid';
export enum Role {
    User = 'user',
    Admin = 'admin'
}
@Entity()
export class Auth {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    username: string;
    @Column()
    password: string;
    @Column({
        type: 'enum',
        enum: Role,
        default: Role.User
    })
    role: string;
    @OneToOne(() => Profile, profile => profile.auth, { cascade: true })
    profile: Profile
    @OneToMany(() => Post, post => post.auth)
    posts: Post[];
}
