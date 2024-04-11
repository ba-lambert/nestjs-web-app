// import { Auth } from "src/auth/entities/auth.entity";
// import { Comment } from "src/comment/entities/comment.entity";
// import { Like } from "src/likes/entities/like.entity";
// import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

// @Entity()
// export class Post {
//     @PrimaryGeneratedColumn('uuid')
//     postId:string;
//     @Column()
//     author:string;
//     @Column()
//     header:string;
//     @Column()
//     content:string;
//     @ManyToOne(()=>Like,like=>like.id)
//     likes:Like;
//     // @ManyToOne(()=>Comment, comments => comments.id)
//     @OneToMany(() => Comment, comments => comments.id)
//     comments:Comment[];
//     @ManyToOne(()=>Auth, auth=> auth.id)
//     auth:Auth;
// }

import { Auth } from "src/auth/entities/auth.entity";
import { Comment } from "src/comment/entities/comment.entity";
import { Like } from "src/likes/entities/like.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post {
    @PrimaryGeneratedColumn('uuid')
    postId: string;

    @Column()
    author: string;

    @Column()
    header: string;

    @Column()
    content: string;

    @OneToMany(() => Like, like => like.likes)
    likes: Like[];

    @OneToMany(() => Comment, comment => comment.post)
    comments: Comment[];

    @ManyToOne(() => Auth, auth => auth.posts)
    auth: Auth;
}
