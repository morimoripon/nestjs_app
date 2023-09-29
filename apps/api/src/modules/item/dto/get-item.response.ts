import { Field, ObjectType } from '@nestjs/graphql'
import { User } from '@prisma/client'

@ObjectType()
export class GetItemResponse {
  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  userId?: string

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  description?: string

  @Field({ nullable: true })
  amount?: number

  @Field({ nullable: true })
  imageUrl?: string
}
