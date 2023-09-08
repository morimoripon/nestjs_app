import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class UserFormSettingResponse {
  @Field({ nullable: true })
  companyName: string

  @Field({ nullable: true })
  phoneNumber: string

  @Field({ nullable: true })
  description: string
}
