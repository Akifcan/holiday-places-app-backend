import { Field, ObjectType } from "@nestjs/graphql"

@ObjectType()
export class PaginatedSchema {
    @Field()
    totalPage: number
}
