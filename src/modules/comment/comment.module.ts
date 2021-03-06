import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CommentService } from './comment.service'
import { Comment, CommentSchema } from './schemas/comment.schema'
import { CommentResolver } from './comment.resolver';

@Module({
    imports: [MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }])],
    providers: [CommentService, CommentResolver]
})
export class CommentModule { }
