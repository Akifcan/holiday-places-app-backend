import { Inject } from '@nestjs/common'
import { Args, Mutation, Query, Resolver, ID } from '@nestjs/graphql'
import { CommentService } from './comment.service'
import { CreateCommentDto } from './dtos/createComment.dto'
import { Comment, CommentType } from './schemas/comment.schema'
import mongoose from 'mongoose'
import { LastComment } from './schemas/lastComment.type'
import { Average, Percentage } from './schemas/average.type'


@Resolver()
export class CommentResolver {

    @Inject() private readonly commentService: CommentService

    @Query(() => CommentType)
    listComments(
        @Args('placeId', { type: () => ID }) placeId: string,
        @Args('page', { type: () => Number }) page: number,
    ): Promise<CommentType> {
        return this.commentService.findComments(placeId, page)
    }

    @Query(() => [LastComment])
    lastComments() {
        return this.commentService.lastComments()
    }

    @Query(() => Average)
    averagePoint(
        @Args('placeId', { type: () => ID }) placeId: string,
    ): Promise<Average> {
        return this.commentService.averagePoint(placeId)
    }

    @Query(() => [Percentage])
    async commentPercentage(
        @Args('placeId', { type: () => ID })
        placeId: string,
    ): Promise<Percentage[]> {
        return this.commentService.commentPercentage(placeId)
    }

    @Mutation(() => Comment)
    createComment(
        @Args('placeId', { type: () => ID }) placeId: string,
        @Args('comment', { type: () => CreateCommentDto }) createCommentDto: CreateCommentDto,
    ) {
        return this.commentService.createComment(new mongoose.Types.ObjectId(placeId), createCommentDto)
    }

}
