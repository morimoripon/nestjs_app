import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class CurrentUserResponse {
  @Field()
  id: string

  @Field()
  email: string

  @Field()
  payoutableAmount: number

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  imageUrl?: string

  @Field({ nullable: true })
  bannedAt?: Date

  @Field({ nullable: true })
  secretBannedAt?: Date

  @Field({ nullable: true })
  introduction?: string

  @Field({ nullable: true })
  confirmedAt?: Date

  @Field({ nullable: true })
  lineNotifySetAt?: Date

  @Field({ nullable: true })
  phoneNumberSetAt?: Date
}
