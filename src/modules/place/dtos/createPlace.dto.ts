import { Field, InputType } from "@nestjs/graphql"
import { IsNotEmpty } from "class-validator"
import { Categories } from "../schemas/place.schema"

@InputType()
export class CreatePlaceDto {

    @Field(() => String)
    @IsNotEmpty()
    name: string

    @Field(() => String)
    @IsNotEmpty()
    logo: string

    @Field(() => [String])
    @IsNotEmpty()
    photos: string[]

    @Field(() => String)
    @IsNotEmpty()
    province: string

    @Field(() => Categories)
    @IsNotEmpty()
    category: Categories
}