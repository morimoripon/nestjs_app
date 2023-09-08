import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserSignUpInput {
  @Field()
  name: string

  @Field()
  email: string

  @Field()
  password: string
}
