import { Field, ObjectType } from '@nestjs/graphql'
import { GetItemResponse } from '@api/src/modules/item/dto/get-item.response'

@ObjectType()
export class UserResponse {
  @Field()
  id: string

  @Field({ nullable: true })
  name?: string

  @Field(() => [GetItemResponse], { nullable: true })
  items?: GetItemResponse[]
}
