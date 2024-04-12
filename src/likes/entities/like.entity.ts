import { Auth } from "src/auth/entities/auth.entity";
import { Post } from "src/posts/entities/post.entity";
import { Column, Entity, ManyToOne, OneToOne,JoinColumn , PrimaryGeneratedColumn } from "typeorm";

@Entity('likes')
export class Like {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    likes: number;
    @Column({ nullable: true })
    postId: string;
    @ManyToOne(() => Auth, auth => auth.id)
    auth: Auth;
    
    @ManyToOne(() => Post, post => post.likes)
    @JoinColumn({ name: 'postId' })
    post: Post;
}
