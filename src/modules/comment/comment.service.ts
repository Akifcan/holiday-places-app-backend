import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { CreateCommentDto } from './dtos/createComment.dto'
import { Average, Percentage } from './schemas/average.type'
import { Comment, CommentType } from './schemas/comment.schema'

@Injectable()
export class CommentService {
    @InjectModel(Comment.name) readonly commentModel: Model<Comment>

    createComment(placeId: Types.ObjectId, createCommentDto: CreateCommentDto): Promise<Comment> {
        const comment = new this.commentModel({ placeId, ...createCommentDto })
        return comment.save()
    }

    async findComments(placeId: string, page: number): Promise<CommentType> {
        const limit = 3

        const totalRecord = await this.commentModel.count({ placeId: new Types.ObjectId(placeId) })
        const totalPage = Math.ceil(totalRecord / 3)
        const places = await this.commentModel
            .find({ placeId: new Types.ObjectId(placeId) })
            .skip((page - 1) * limit)
            .limit(limit)
            .exec()
        return { data: places, totalPage }
    }

    lastComments(): Promise<Comment[]> {
        return this.commentModel.aggregate([
            { "$addFields": { "_id": { "$toString": "$_id" } } },
            {
                $lookup: {
                    from: 'places',
                    localField: 'placeId',
                    foreignField: '_id',
                    as: 'place'
                },
            },
            { $unwind: '$place' },
            {
                $sort: { createdAt: -1 }
            },
            {
                $limit: 4
            }
        ]).exec()
    }

    async averagePoint(placeId: string): Promise<Average> {
        const result = await this.commentModel.aggregate([
            {
                $match: {
                    placeId: new Types.ObjectId(placeId),
                },
            },
            {
                $group: {
                    _id: "$placeId", count: { $sum: 1 }, avg: { $avg: "$rate" }
                }
            },
            {
                $project: {
                    _id: 0,
                    count: 1,
                    avg: 1
                }
            }
        ]).exec()

        return result[0]
    }

    async commentPercentage(placeId: string): Promise<Percentage[]> {
        const count = await this.commentModel.count({ placeId: new Types.ObjectId(placeId) })
        const result = await this.commentModel.aggregate([
            {
                $match: {
                    placeId: new Types.ObjectId(placeId),
                },
            },
            {
                $group: {
                    _id: "$rate", count: { $sum: 1 }
                }
            },
        ])


        return result.map(item => {
            return { per: (item.count / count) * 100, rate: item._id }
        })

    }

}
