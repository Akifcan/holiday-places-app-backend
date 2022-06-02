import { ObjectType, Field, registerEnumType, ID } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { PaginatedSchema } from '../../../common/paginatedSchema'

export type PlaceDocument = Place & Document

export enum Categories {
    cafe = 'cafe',
    restaurant = 'restaurant',
    library = 'library',
    nightClub = 'nightClub'
}

registerEnumType(Categories, {
    name: 'Categories',
})

@Schema()
@ObjectType()
export class Place {

    @Field(() => ID)
    _id: string

    @Prop({ required: true, lowercase: true })
    @Field(() => String)
    name: string

    @Prop({ required: true, lowercase: true })
    @Field(() => String)
    logo: string

    @Prop({ required: true, lowercase: true })
    @Field(() => [String])
    photos: string[]

    @Prop({ required: true, lowercase: true })
    @Field(() => String)
    province: string

    @Prop({ enum: Categories, required: true })
    @Field(() => Categories)
    category: Categories
}

@ObjectType()
export class PlaceType extends PaginatedSchema {
    @Field(() => [Place])
    data: Place[]
}


export const PlaceSchema = SchemaFactory.createForClass(Place);