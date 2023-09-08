import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class ReSendActivationInput {
  @Field()
  email: string
}
