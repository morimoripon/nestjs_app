import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class SetNewPasswordInput {
  @Field()
  userId: string

  @Field()
  newPassword: string

  @Field()
  resetToken: string
}
