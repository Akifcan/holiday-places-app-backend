import { Inject } from '@nestjs/common'
import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql'
import { CreatePlaceDto } from './dtos/createPlace.dto'
import { PlaceService } from './place.service'
import { Place, PlaceType } from './schemas/place.schema'

@Resolver()
export class PlaceResolver {

    @Inject() private readonly placeService: PlaceService

    @Query(() => PlaceType)
    places(
        @Args('page', { type: () => Number, nullable: true }) page: number,
        @Args('province', { type: () => String, nullable: true }) province?: string
    ): Promise<PlaceType> {
        return this.placeService.findAll(page, province)
    }

    @Query(() => Place)
    place(
        @Args('id', { type: () => ID }) id: string,
    ): Promise<Place> {
        return this.placeService.findOne(id)
    }

    @Mutation(() => Place)
    createPlace(
        @Args('place', { type: () => CreatePlaceDto }) place: CreatePlaceDto,
    ): Promise<Place> {
        return this.placeService.createPlace(place)
    }

}
