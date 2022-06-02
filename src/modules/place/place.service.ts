import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { CreatePlaceDto } from './dtos/createPlace.dto'
import { Place, PlaceDocument, PlaceType } from './schemas/place.schema'

@Injectable()
export class PlaceService {
    @InjectModel(Place.name) readonly placeModel: Model<PlaceDocument>

    createPlace(createPlaceDto: CreatePlaceDto): Promise<Place> {
        const place = new this.placeModel({ ...createPlaceDto })
        return place.save()
    }

    async findOne(id: string) {
        return await this.placeModel.findOne({ _id: new Types.ObjectId(id) })
    }

    async findAll(page: number, province?: string): Promise<PlaceType> {
        const limit = 5
        let query = {}
        if (province) query = { ...query, province }
        const totalRecord = await this.placeModel.count({ ...query })
        const totalPage = Math.ceil(totalRecord / limit)
        const places = await this.placeModel
            .find({ ...query })
            .skip((page - 1) * limit)
            .limit(limit)
            .exec()
        return { data: places, totalPage }
    }

}
