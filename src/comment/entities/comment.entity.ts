import { Like } from "src/likes/entities/like.entity";
import { Post } from "src/posts/entities/post.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn('uuid')
    id:string;
    @Column()
    comment:string;
    @ManyToOne(()=>Post,post=>post.postId)
    post:Post;
    @ManyToOne(()=>Like, like=>like.id)
    likes:Like;
}
