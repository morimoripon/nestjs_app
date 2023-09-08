import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class UserLoginResponse {
  @Field()
  jwtToken: string

  @Field({ nullable: true })
  errorMessage?: string
}
