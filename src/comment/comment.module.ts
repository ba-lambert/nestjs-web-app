import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Post } from 'src/posts/entities/post.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Comment,Post])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
