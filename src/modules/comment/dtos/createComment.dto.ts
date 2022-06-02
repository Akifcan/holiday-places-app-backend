import { Field, InputType } from "@nestjs/graphql"
import { IsNotEmpty, IsOptional, Max, Min } from "class-validator"

@InputType()
export class CreateCommentDto {
    @Field(() => String)
    @IsNotEmpty()
    username: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    profilePhoto: string

    @Field(() => String)
    @IsNotEmpty()
    body: string

    @Field(() => Number)
    @IsNotEmpty()
    @Min(1)
    @Max(5)
    rate: number
}