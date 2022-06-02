import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from './../src/app.module'
import { createPlaceQuery, placesQuery } from './quaries'
import { PlaceService } from '../src/modules/place/place.service'
import { Types } from 'mongoose'


describe('AppController (e2e)', () => {
    let app: INestApplication
    let placeService: PlaceService

    const validUser = {
        email: "akfkara97@gmail.com",
        password: "1234"
    }

    const unvalidUser = {
        email: "unvalid@gmail.com",
        password: "1234"
    }

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile()

        app = moduleFixture.createNestApplication()
        placeService = moduleFixture.get<PlaceService>(PlaceService)
        await app.init();
    })

    afterAll(async () => {
        await app.close()
    })

    it('Error should be defined when credentials are unvalid', async () => {
        const result = await request(app.getHttpServer())
            .post('/graphql').set(unvalidUser).send({
                query: placesQuery
            })
        expect(result.body.errors).toBeDefined()
    })

    it('should create place', async () => {
        const result = await request(app.getHttpServer())
            .post('/graphql').set(validUser).send({
                query: createPlaceQuery
            })
        expect(result.body.data).not.toBe(null)
        await placeService.placeModel.deleteOne({ _id: new Types.ObjectId(result.body.data.createPlace._id) })
    })

    it('Data should be defined when credentials are valid', async () => {
        const result = await request(app.getHttpServer())
            .post('/graphql').set(validUser).send({
                query: placesQuery
            })
        expect(result.body.data).not.toBe(null)
    })
})
