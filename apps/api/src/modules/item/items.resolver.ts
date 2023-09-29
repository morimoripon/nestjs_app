import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { User } from '@prisma/client'

import { CurrentUser } from '../auth/decorators/current-user.decorator'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { CreateItemInput } from './dto/create-item.input'
import { GetItemResponse } from './dto/get-item.response'
import { UpdateItemInput } from './dto/update-item.input'
import { ItemsService } from './items.service'
import { Item } from '@prisma/client'
import { GetItemInput } from './dto/get-item.input'

@Resolver()
export class ItemsResolver {
  constructor(private readonly itemsService: ItemsService) {}

  @Query(() => [GetItemResponse])
  async getItems(@Args('data') data: GetItemInput): Promise<Item[] | null> {
    console.log(data)
    return this.itemsService.getItems(data)
  }

  @Query(() => GetItemResponse)
  async getItemById(@Args('id') id: string): Promise<Item | null> {
    return this.itemsService.getItemById(id)
  }

  @Query(() => [GetItemResponse])
  @UseGuards(JwtAuthGuard)
  async getMyItems(@CurrentUser() user: User): Promise<Item[] | null> {
    return this.itemsService.getMyItems(user.id)
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async createItem(@CurrentUser() user: User, @Args('data') data: CreateItemInput): Promise<boolean> {
    return this.itemsService.create(user.id, data)
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async updateItem(@CurrentUser() user: User, @Args('data') data: UpdateItemInput): Promise<boolean> {
    return this.itemsService.update(user.id, data)
  }
}
