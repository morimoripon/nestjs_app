import { Field, InputType } from '@nestjs/graphql'
import { Gender } from '@prisma/client'

@InputType()
export class CreateFormSettingInput {
  @Field({ nullable: true })
  companyName?: string

  @Field({ nullable: true })
  userName?: string

  @Field({ nullable: true })
  userNameFurigana?: string

  @Field({ nullable: true })
  gender?: Gender

  @Field({ nullable: true })
  phoneNumber?: string

  @Field({ nullable: true })
  description?: string
}
