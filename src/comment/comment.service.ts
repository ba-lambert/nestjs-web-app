import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { Post } from 'src/posts/entities/post.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(Post)
    private postRepository: Repository<Post>
  ) { }
  async create(post, userId, res: any, data: CreateCommentDto) {
    try {
      const findPost = await this.postRepository.findOne({ where: { postId: post } })
      console.log(findPost)
      const comment = new Comment()
      comment.post = post
      comment.comment = data.comment;
      const newComment = await this.commentRepository.save(comment)
      if (!findPost.comments) {
        findPost.comments = [];
      }
      
      findPost.comments=[newComment,...findPost.comments];
      console.log(findPost);
      await this.postRepository.save(findPost);
      return res.status(HttpStatus.CREATED).json({ message: "You added a comment", })
    } catch (err) {
      console.log(err)
    }
  }


  findAll() {
    return `This action returns all comment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
