import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UpdateUserPasswordInput {
  @Field()
  userId: string

  @Field()
  password: string
}
