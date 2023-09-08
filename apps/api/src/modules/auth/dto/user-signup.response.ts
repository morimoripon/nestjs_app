import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class UserSignUpResponse {
  @Field()
  userId?: string

  @Field()
  jwtToken: string

  @Field({ nullable: true })
  errorMessage?: string
}
