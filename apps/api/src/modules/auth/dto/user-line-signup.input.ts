import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserLineSignUpInput {
  @Field()
  code: string

  @Field()
  state: string
}
