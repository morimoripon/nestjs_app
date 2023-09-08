import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class PublicUserResponse {
  @Field()
  id: string

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  imageUrl?: string
}
