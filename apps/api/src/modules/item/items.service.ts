import { Injectable } from '@nestjs/common'
import { Item } from '@prisma/client'
import { PrismaService } from 'nestjs-prisma'

import { ImageUtils } from '../common/util/image.utils'
import { CreateItemInput } from './dto/create-item.input'
import { UpdateItemInput } from './dto/update-item.input'
import { GetItemResponse } from './dto/get-item.response'
import { GetItemInput } from './dto/get-item.input'

@Injectable()
export class ItemsService {
  constructor(private readonly prisma: PrismaService, private readonly imageUtils: ImageUtils) {}

  async findUnique(args): Promise<Item | null> {
    return this.prisma.item.findUnique(args)
  }

  async findMany(args): Promise<Item[] | null> {
    return this.prisma.item.findMany(args)
  }

  async getMyItems(userId: string): Promise<Item[] | null> {
    return this.prisma.item.findMany({
      where: {
        userId,
      },
    })
  }

  async getItemById(id: string): Promise<Item | null> {
    return this.prisma.item.findUnique({
      where: {
        id,
      },
    })
  }

  async getItems(data: GetItemInput): Promise<Item[] | null> {
    return this.prisma.item.findMany({
      where: {
        ...data,
      },
    })
  }

  async create(userId: string, args: CreateItemInput): Promise<boolean> {
    await this.prisma.item.create({
      data: {
        ...args,
        userId,
      },
    })
    return true
  }

  async update(id: string, args: UpdateItemInput): Promise<boolean> {
    const item = await this.prisma.item.findUnique({
      where: {
        id,
      },
    })
    if (!item) {
      return false
    }

    await this.prisma.item.update({
      where: {
        id,
      },
      data: {
        ...args,
      },
    })
    return true
  }
}
