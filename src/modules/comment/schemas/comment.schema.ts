import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { PaginatedSchema } from '../../../common/paginatedSchema'

export type CommentDocument = Comment & Document

@Schema()
@ObjectType()
export class Comment {

    @Field(() => ID)
    _id: string

    @Prop({ required: true, lowercase: true })
    @Field(() => String)
    username: string

    @Prop({ required: false, default: 'https://cdn-icons-png.flaticon.com/512/560/560216.png', lowercase: true })
    @Field(() => String)
    profilePhoto: string

    @Prop({ required: true, lowercase: true })
    @Field(() => String)
    body: string

    @Prop({ required: true, lowercase: true, min: 1, max: 5 })
    @Field(() => Number)
    rate: number

    @Field(() => ID)
    @Prop({ type: Types.ObjectId, required: true, ref: 'places' })
    placeId: Types.ObjectId

    @Field(() => Date)
    @Prop({ type: Date, default: new Date() })
    createdAt: Date

}

@ObjectType()
export class CommentType extends PaginatedSchema {
    @Field(() => [Comment])
    data: Comment[]
}

export const CommentSchema = SchemaFactory.createForClass(Comment)