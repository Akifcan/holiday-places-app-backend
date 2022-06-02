import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from './../src/app.module'
import { averagePointQuery, commentPercentageQuery, commentsQuery, createCommentQuery, lastCommentsQuery } from './quaries'
import { CommentService } from '../src/modules/comment/comment.service'
import { Types } from 'mongoose'
import { PlaceService } from '../src/modules/place/place.service'
import { Categories } from '../src/modules/place/schemas/place.schema'


describe('Comments Resolver (e2e)', () => {
    let app: INestApplication
    let commentService: CommentService
    let placeService: PlaceService

    let tempPlaceId = ''
    let tempCommentId = ''

    const validUser = {
        email: "akfkara97@gmail.com",
        password: "1234"
    }

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile()

        app = moduleFixture.createNestApplication()
        commentService = moduleFixture.get<CommentService>(CommentService)
        placeService = moduleFixture.get<PlaceService>(PlaceService)

        const tempPlace = new placeService.placeModel({
            name: "test place",
            logo: "logo.jpeg",
            photos: ["1.jpg", "2.jpg"],
            province: "istanbul",
            category: Categories.library
        })

        const { _id: placeId } = await tempPlace.save()

        tempPlaceId = placeId

        const tempComment = new commentService.commentModel({
            username: "test",
            body: "test comment",
            rate: 5,
            placeId: tempPlaceId
        })
        const { _id: commentId } = await tempComment.save()
        tempCommentId = commentId.toString()

        await app.init()
    })

    afterAll(async () => {
        await commentService.commentModel.deleteOne({ _id: new Types.ObjectId(tempCommentId) })
        await placeService.placeModel.deleteOne({ _id: new Types.ObjectId(tempPlaceId) })
        await app.close()
    })

    it('should create comment', async () => {
        const result = await request(app.getHttpServer())
            .post('/graphql').set(validUser).send({
                query: createCommentQuery(tempPlaceId)
            })
        expect(result.body.data).not.toBe(null)
        await commentService.commentModel.deleteOne({ _id: new Types.ObjectId(result.body.data.createComment._id) })
    })

    it('Comments should be listed', async () => {
        const result = await request(app.getHttpServer())
            .post('/graphql').set(validUser).send({
                query: commentsQuery(tempPlaceId)
            })
        expect(result.body.data).not.toBe(null)
    })

    it('Average points should be listed', async () => {
        const result = await request(app.getHttpServer())
            .post('/graphql').set(validUser).send({
                query: averagePointQuery(tempPlaceId)
            })
        expect(result.body.data).not.toBe(null)
    })

    it('Comment Percentage should be listed', async () => {
        const result = await request(app.getHttpServer())
            .post('/graphql').set(validUser).send({
                query: commentPercentageQuery(tempPlaceId)
            })
        expect(result.body.data).not.toBe(null)
    })

    it('Last comments should be listed', async () => {
        const result = await request(app.getHttpServer())
            .post('/graphql').set(validUser).send({
                query: lastCommentsQuery
            })
        expect(result.body.data).not.toBe(null)
    })

})
