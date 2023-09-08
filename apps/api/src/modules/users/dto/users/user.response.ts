import { Field, ObjectType } from '@nestjs/graphql'

import { UserFormSettingResponse } from './user-formsetting.response'

@ObjectType()
export class UserResponse {
  @Field()
  id: string

  @Field({ nullable: true })
  name?: string

  @Field(() => UserFormSettingResponse, { nullable: true })
  formSetting?: UserFormSettingResponse
}
