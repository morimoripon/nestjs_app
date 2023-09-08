import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { ClientsService } from './clients.service'
import { CreateClientInput } from './dto/create-client.input'
import { ListClientsResponse } from './dto/list-clients/list-clients.response'

@Resolver()
export class ClientsResolver {
  constructor(private readonly clientsService: ClientsService) {}

  @Query(() => [ListClientsResponse])
  async listClients(): Promise<ListClientsResponse[]> {
    return this.clientsService.list()
  }

  @Mutation(() => String)
  @UseGuards(JwtAuthGuard)
  async createClient(@Args('data') data: CreateClientInput): Promise<string> {
    return this.clientsService.create(data)
  }
}
