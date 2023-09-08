import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class GetMyFormSettingResponse {
  @Field()
  id: string

  @Field({ nullable: true })
  companyName?: string

  @Field({ nullable: true })
  userName?: string

  @Field()
  gender: string

  @Field({ nullable: true })
  phoneNumber?: string

  @Field({ nullable: true })
  description?: string
}
