import { Field, ObjectType } from "@nestjs/graphql";
import { Place } from "../../place/schemas/place.schema";
import { Comment } from "./comment.schema";

@ObjectType()
export class LastComment extends Comment {
    @Field(() => Place)
    place: Place
}