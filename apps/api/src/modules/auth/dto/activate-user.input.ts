import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class ActivateUserInput {
  @Field()
  userId: string

  @Field()
  activationToken: string
}
