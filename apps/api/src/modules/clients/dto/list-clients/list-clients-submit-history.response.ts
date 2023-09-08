import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class ListClientsSubmitHistoryResponse {
  @Field()
  userName: string

  @Field()
  description: string
}
