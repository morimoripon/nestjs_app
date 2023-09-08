import { Injectable } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'
import {
  CreateOneUserArgs,
  DeleteOneUserArgs,
  FindManyUserArgs,
  UpdateOneUserArgs,
  UserFindUniqueArgs,
} from '@prisma/client/generator-build'
import * as bcrypt from 'bcrypt'
import { PrismaService } from 'nestjs-prisma'

import { ImageUtils } from '../common/util/image.utils'
import { CreateClientInput } from './dto/create-client.input'
import { ListClientsResponse } from './dto/list-clients/list-clients.response'

@Injectable()
export class ClientsService {
  constructor(private readonly prisma: PrismaService, private readonly imageUtils: ImageUtils) {}

  async list(): Promise<ListClientsResponse[]> {
    return this.prisma.client.findMany({
      include: {
        submitHistories: true,
      },
    })
  }

  async create(data: CreateClientInput) {
    const existClient = await this.prisma.client.findFirst({
      where: {
        name: data.name,
      },
    })
    if (existClient) {
      throw new Error('既に同じ名前のクライアントが存在します')
    }

    const client = await this.prisma.client.create({
      data: {
        ...data,
      },
    })

    return client.id
  }
}
