// import { Like } from "src/likes/entities/like.entity";
// import { Post } from "src/posts/entities/post.entity";
// import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn,JoinColumn, ManyToMany } from "typeorm";

// @Entity()
// export class Comment {
//     @PrimaryGeneratedColumn('uuid')
//     id:string;
//     @Column()
//     comment:string;
//     @ManyToOne(() => Post ,post=>post.comments)
//     post:Post;
//     @ManyToOne(()=>Like, like=>like.id)
//     likes:Like;
// }
import { Post } from "src/posts/entities/post.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    comment: string;

    @ManyToOne(() => Post, post => post.comments)
    post: Post;
}
