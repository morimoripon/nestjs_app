import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class GetItemInput {
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
}
