import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Average {
    @Field(() => Number)
    count: number
    @Field(() => Number)
    avg: number
}

@ObjectType()
export class Percentage {
    @Field(() => Number, { nullable: true })
    per?: number

    @Field(() => Number, { nullable: true })
    rate?: number
}