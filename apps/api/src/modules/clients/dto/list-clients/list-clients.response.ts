import { Field, ObjectType } from '@nestjs/graphql'

import { ListClientsSubmitHistoryResponse } from './list-clients-submit-history.response'

@ObjectType()
export class ListClientsResponse {
  @Field()
  id: string

  @Field()
  name: string

  @Field({ nullable: true })
  representName?: string

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date

  @Field(() => [ListClientsSubmitHistoryResponse])
  submitHistories: ListClientsSubmitHistoryResponse[]
}
