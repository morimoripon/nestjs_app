import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserLoginInput {
  @Field()
  email: string

  @Field()
  password: string
}
