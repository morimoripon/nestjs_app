import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserUpdateInput {
  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  imageUrl?: string

  @Field({ nullable: true })
  email?: string

  @Field({ nullable: true })
  password?: string

  @Field({ nullable: true })
  lineNotifyAccessToken?: string
}
